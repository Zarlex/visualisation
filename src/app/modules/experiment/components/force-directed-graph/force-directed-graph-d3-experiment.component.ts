import {Component, OnInit, ViewChild} from '@angular/core';
import {VisualisationCollection} from '../../../main/collections/visualisation.collection';
import {VisualisationModel} from '../../../main/models/visualisation.model';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {clone} from 'underscore';

let smallDataSet = require('../../collections/force-directed-graph-items-small-dataset.json');
let bigDataSet = require('../../collections/force-directed-graph-items-big-dataset.json');

@Component({
  selector: 'force-directed-graph-d3-experiment',
  styles: [require('./force-directed-graph-d3-experiment.style.scss')],
  template: require('./force-directed-graph-d3-experiment.template.html'),
  providers: []
})

export class ForceDirectedGraphD3ExperimentComponent implements OnInit {
  private smallDataSet: any;
  private bigDataSet: any;
  public dataCollection: VisualisationCollection;
  public searchTerm: string;

  @ViewChild('modal') modal: ModalComponent;

  constructor() {
    this.dataCollection = new VisualisationCollection();
  }

  public setDataCollection(dataSet: string){
    if(dataSet === 'SMALL'){
      this.dataCollection.reset(this.smallDataSet);
    } else {
      this.dataCollection.reset(this.bigDataSet);
    }

    this.modal.open();
  }

  ngOnInit(): void {
    this.bigDataSet = JSON.parse(JSON.stringify(bigDataSet));
    this.smallDataSet = JSON.parse(JSON.stringify(smallDataSet));
    this.smallDataSet.forEach((item: any) => {
      item.Weight = Math.round(item.Weight * 100000000)/10;
    });
  }
}
