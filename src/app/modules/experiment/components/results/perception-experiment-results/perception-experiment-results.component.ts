import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {WizardComponent} from '../../../../shared/components/wizard/wizard.component';
import {CircleExperimentModel} from '../../../models/circle-experiment.model';
import {Route, Params, ActivatedRoute} from '@angular/router';
import {CircleExperimentsCollection} from '../../../collections/circle-experiments.collection';
import {PerceptionExperimentsCollection} from '../../../collections/perception-experiments.collection';
import {PerceptionExperimentModel} from '../../../models/perception-experiment.model';
import {Modes} from '../../../../shared/components/random-element-placing/random-element-placing.component';
import {map, where, reduce} from 'underscore';

@Component({
  selector: 'perception-experiment-results',
  styles: [require('./perception-experiment-results.style.scss')],
  template: require('./perception-experiment-results.template.html'),
  providers: [PerceptionExperimentsCollection]
})

export class PerceptionExperimentResultsComponent implements OnInit {
  public colorResults: Array<any>;
  public enclosureResults: Array<any>;
  public animationResults: Array<any>;
  public directionResults: Array<any>;
  public shapeResults: Array<any>;
  public sizeResults: Array<any>;
  public composedResults: Array<any>;

  constructor(public perceptionExperimentsCollection: PerceptionExperimentsCollection) {
  }

  setUpResultFor(result: Array<any>) {
    let results: Array<{ amount: number, time: number }> = [];
    let resultJSON = map(result, (item: any) => {
      return item.toJSON()
    });

    [10, 20, 40, 100].forEach((amount) => {
      let totalResultForAmount;
      let resultsForAmount = where(resultJSON, {amount: amount});

      if(resultsForAmount.length === 0){
        return;
      } else if (resultsForAmount.length > 1) {
        totalResultForAmount = reduce(resultsForAmount, (memo: any, num: any) => {
          return memo.time + num.time;
        }) / resultsForAmount.length;
      } else {
        totalResultForAmount = resultsForAmount[0].time;
      }

      results.push({amount: amount, time: totalResultForAmount})
    });

    return results;
  }

  setUpResults() {
    if (this.perceptionExperimentsCollection.length > 0) {
      this.colorResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.COLOR}));
      this.enclosureResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.ENCLOSURE}));
      this.animationResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.BLINK}));
      this.directionResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.DIRECTION}));
      this.shapeResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.SHAPE}));
      this.sizeResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.SIZE}));
      this.composedResults = this.setUpResultFor(this.perceptionExperimentsCollection.where({mode: Modes.COMPOSED}));
    }
  }

  ngOnInit(): void {
    this.perceptionExperimentsCollection.on('update', this.setUpResults, this);
    this.perceptionExperimentsCollection.fetch();
  }
}
