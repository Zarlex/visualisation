import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  Modes,
  RandomElementPlacingComponent
} from '../../../../shared/components/random-element-placing/random-element-placing.component';

@Component({
  selector: 'target-finder-areas',
  styles: [ require('./target-finder-areas.style.scss') ],
  template: require('./target-finder-areas.template.html')
})

export class TargetFinderAreasComponent implements OnInit{
  @ViewChild('segment1') segment1: RandomElementPlacingComponent;
  @ViewChild('segment2') segment2: RandomElementPlacingComponent;
  @ViewChild('segment3') segment3: RandomElementPlacingComponent;
  @ViewChild('segment4') segment4: RandomElementPlacingComponent;

  @Input()
  targetArea: number;

  @Input()
  amount: number;

  @Input()
  size: number;

  @Input()
  mode: Modes

  constructor() {
  }

  public initExperiment(): void{
    this.segment1.generateRandomBoxes();
    this.segment2.generateRandomBoxes();
    this.segment3.generateRandomBoxes();
    this.segment4.generateRandomBoxes();
  }

  ngOnInit(): void {
    this.initExperiment();
  }
}
