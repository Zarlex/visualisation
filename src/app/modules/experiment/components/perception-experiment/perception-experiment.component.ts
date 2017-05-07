import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Modes
} from '../../../shared/components/random-element-placing/random-element-placing.component';
import {HideAfterTimeComponent, Status} from './hide-after-time/hide-after-time.component';
import {TargetFinderAreasComponent} from './target-finder-areas/target-finder-areas.component';
import {PerceptionExperimentModel} from '../../models/perception-experiment.model';

@Component({
  selector: 'perception-experiment',
  styles: [require('./perception-experiment.style.scss')],
  template: require('./perception-experiment.template.html'),
  providers: [PerceptionExperimentModel]
})

export class PerceptionExperimentComponent implements OnInit {

  @ViewChild('hideAfterTime') hideAfterTime: HideAfterTimeComponent;
  @ViewChild('targetFinder') targetFinder: TargetFinderAreasComponent;
  public targetNum: number;
  public testTime: number = 1000;
  public lastTestTime: number = this.testTime;
  public resultChooserIsVisible: boolean = false;
  public testIsRunning: boolean = false;
  public targetAmount = 200;
  public targetSize = 40;
  public selectedTargetAmount = 10;
  public selectedMode = Modes.COLOR;
  public mode: Modes = Modes.COLOR;
  public modes: Array<any> = [
    {label: 'Color', value: Modes.COLOR},
    {label: 'Enclosure', value: Modes.ENCLOSURE},
    {label: 'Animation', value: Modes.BLINK},
    {label: 'Direction', value: Modes.DIRECTION},
    {label: 'Shape', value: Modes.SHAPE},
    {label: 'Size', value: Modes.SIZE},
    {label: 'Composed', value: Modes.COMPOSED}
  ];

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(private perceptionExperimentModel: PerceptionExperimentModel) {
  }

  public test(): void {
    this.targetNum = this.getRandomInt(1, 4);
    this.targetFinder.initExperiment();
    this.hideAfterTime.start();
  }

  public abort(): void {
    this.perceptionExperimentModel.clear();
    this.perceptionExperimentModel.set({
      mode: parseInt(this.selectedMode.toString(), 10),
      amount: parseInt(this.selectedTargetAmount.toString(), 10),
      time: this.lastTestTime
    });
    this.perceptionExperimentModel.save();
    this.testIsRunning = false;
    this.resultChooserIsVisible = false;
    this.testTime = 1000;
  }

  public hideAfterTimeStatusChange(ev: any) {
    if (ev === Status.CORRECT_RESULT_WAS_CHOSEN) {
      this.lastTestTime = this.testTime;

      if (this.testTime > 20) {
        this.testTime = this.testTime - this.testTime / 4;
      }
      this.test();
      this.resultChooserIsVisible = false;
    }

    if (ev === Status.WRONG_RESULT_WAS_CHOSEN) {
      this.abort();
    }

    if (ev === Status.COUNTDOWN) {
      this.testIsRunning = true;
      this.resultChooserIsVisible = false;
    }

    if (ev === Status.TEST_IS_FINISHED) {
      this.testIsRunning = false;
      this.resultChooserIsVisible = true;
    }
  }

  public setTargetMode(): void {

  }

  public setTargetAmount(val: string): void {
    let number = parseInt(val, 10);
    this.targetAmount = number;
    if (number === 100) {
      this.targetSize = 15
    }
    if (number === 40) {
      this.targetSize = 20
    }
    if (number === 20) {
      this.targetSize = 30
    }
    if (number === 10) {
      this.targetSize = 40
    }
  }

  public setMode(val: string): void {
    this.mode = parseInt(val, 10);
  }

  ngOnInit(): void {
    this.targetNum = this.getRandomInt(1, 4);
  }

}
