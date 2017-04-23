import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {WizardComponent} from '../../../shared/components/wizard/wizard.component';
import {CircleExperimentModel} from '../../models/circle-experiment.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'circle-experiment',
  styles: [ require('./circle-experiment.style.scss') ],
  template: require('./circle-experiment.template.html'),
  providers: [CircleExperimentModel]
})

export class CircleExperimentComponent {

  @ViewChild('orgCircle') orgCircle: ElementRef;
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('circle1') circle1: ElementRef;
  @ViewChild('circle2') circle2: ElementRef;
  @ViewChild('circle3') circle3: ElementRef;
  @ViewChild('square') square: ElementRef;

  constructor(private circleExperimentModel: CircleExperimentModel, private router: Router, private route: ActivatedRoute) {
  }

  private getDeviation(el: ElementRef, val: number): number{
    let scale = el.nativeElement.offsetWidth - 100;
    return Math.abs(scale-val);
  }

  private updateExperimentVal(attrName: string, el: ElementRef, val: number): void{
    this.circleExperimentModel.set(attrName, this.getDeviation(el, val));
  }

  public isSaving: boolean = false;

  public transformRangeVal = (val: any)=>{
    return val + '%';
  };

  public changedValCircle1(val: number){
    this.circleExperimentModel.set('circle1', val);
    this.updateExperimentVal('circle1Dev', this.circle1, val);
  }

  public changedValCircle2(val: number){
    this.circleExperimentModel.set('circle2', val);
    this.updateExperimentVal('circle2Dev', this.circle2, val);
  }

  public changedValCircle3(val: number){
    this.circleExperimentModel.set('circle3', val);
    this.updateExperimentVal('circle3Dev', this.circle3, val);
  }

  public changedValSquare(val: number){
    this.circleExperimentModel.set('square', val);
    this.updateExperimentVal('squareDev', this.square, val);
  }

  public save(): void{
    this.isSaving = true;
    this.circleExperimentModel.save().then(()=>{
      this.isSaving = false;
      this.router.navigate(['experiments/results/circle', this.circleExperimentModel.get('id')]);
    }, ()=>{
      this.isSaving = true;
    });
  }
}
