import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {WizardComponent} from '../../../../shared/components/wizard/wizard.component';
import {CircleExperimentModel} from '../../../models/circle-experiment.model';
import {Route, Params, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'circle-experiment-result',
  styles: [ require('./circle-experiment-result.style.scss') ],
  template: require('./circle-experiment-result.template.html'),
  providers: [CircleExperimentModel]
})

export class CircleExperimentResultComponent implements OnInit{
  @ViewChild('orgCircle') orgCircle: ElementRef;
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('circle1') circle1: ElementRef;
  @ViewChild('circle2') circle2: ElementRef;
  @ViewChild('circle3') circle3: ElementRef;

  constructor(private route: ActivatedRoute, public circleExperimentModel: CircleExperimentModel) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.circleExperimentModel.set('id', id);
      this.circleExperimentModel.fetch();
    });
  }
}
