import {Directive, ElementRef, OnInit, Input, Output} from '@angular/core';

@Directive({
  selector: '[randomSize]'
})
export class RandomSizeDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  @Input()
  public orgSize: number;

  @Output()
  public size: number;

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public getRandomCircleSize(orgSize: number): number {
    let percent = (this.getRandomInt(1, 10)) * 10;

    return orgSize * (1 + (percent / 100));
  }

  private setSize(): void {
    let randomSize = this.getRandomCircleSize(this.orgSize);
    this.el.nativeElement.style.width = `${randomSize}px`;
    this.el.nativeElement.style.height = `${randomSize}px`;
    this.size = randomSize;
  }

  ngOnInit(): void {
    this.setSize();
  }
}
