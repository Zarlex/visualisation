import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

export enum Status{
  COUNTDOWN,
  TEST_IS_RUNNING,
  TEST_IS_FINISHED,
  CORRECT_RESULT_WAS_CHOSEN,
  WRONG_RESULT_WAS_CHOSEN
}

@Component({
  selector: 'hide-after-time',
  styles: [ require('./hide-after-time.style.scss') ],
  template: require('./hide-after-time.template.html')
})

export class HideAfterTimeComponent{

  public testIsRunning: boolean;
  public countdownIsVisible: boolean = true;
  public resultChooserIsVisible: boolean;
  public countdown: number = 3;

  @Output() statusChange = new EventEmitter();

  @Input()
  public correctResultNum: number;

  @Input()
  public testTime: number = 200;

  public getTestTime(): number {
    return Math.round(this.testTime);
  }

  public start(): void{
    this.countdownIsVisible = true;
    this.resultChooserIsVisible = false;
    let _countdown = this.countdown;
    this.statusChange.emit(Status.COUNTDOWN);
    let startCountDown = window.setInterval(()=>{
      if(this.countdown<=0){
        let start = performance.now();
        this.countdownIsVisible = false;
        this.testIsRunning = true;
        this.statusChange.emit(Status.TEST_IS_RUNNING);
        window.setTimeout(()=>{
          console.log(performance.now()-start);
          this.testIsRunning = false;
          this.resultChooserIsVisible = true;
          this.statusChange.emit(Status.TEST_IS_FINISHED);
        }, this.testTime);
        window.clearInterval(startCountDown);
        this.countdown = _countdown;
      } else {
        this.countdown--;
      }
    },200)
  }

  private notify(type: Status, el: Element){
    window.setTimeout(()=>{
      el.classList.remove('correct');
      el.classList.remove('wrong');
      this.statusChange.emit(type);
      this.countdownIsVisible = true;
      this.resultChooserIsVisible = false;
    }, 500);
  }

  public choseResult(result: number, ev: MouseEvent){
    let el: HTMLElement = <HTMLElement>ev.target;
    if(result === this.correctResultNum){
      el.classList.add('correct');
      this.notify(Status.CORRECT_RESULT_WAS_CHOSEN, el);
    } else {
      el.classList.add('wrong');
      this.notify(Status.WRONG_RESULT_WAS_CHOSEN, el);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.countdownIsVisible = true;
    this.resultChooserIsVisible = false;
  }
}
