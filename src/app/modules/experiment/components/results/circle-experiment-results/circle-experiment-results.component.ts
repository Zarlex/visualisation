import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {WizardComponent} from '../../../../shared/components/wizard/wizard.component';
import {CircleExperimentModel} from '../../../models/circle-experiment.model';
import {Route, Params, ActivatedRoute} from '@angular/router';
import {CircleExperimentsCollection} from '../../../collections/circle-experiments.collection';

@Component({
  selector: 'circle-experiment-results',
  styles: [ require('./circle-experiment-results.style.scss') ],
  template: require('./circle-experiment-results.template.html'),
  providers: [CircleExperimentModel, CircleExperimentsCollection]
})

export class CircleExperimentResultsComponent implements OnInit{
  @ViewChild('orgCircle') orgCircle: ElementRef;
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('circle1') circle1: ElementRef;
  @ViewChild('circle2') circle2: ElementRef;
  @ViewChild('circle3') circle3: ElementRef;

  constructor(private route: ActivatedRoute, public circleExperimentModel: CircleExperimentModel, public circleExperimentsCollection: CircleExperimentsCollection) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.circleExperimentModel.set('id', id);
        this.circleExperimentModel.fetch();
      }
    });

    this.circleExperimentsCollection.fetch();
  }
}
