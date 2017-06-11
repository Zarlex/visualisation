import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {MultiDataExperimentItemModel} from '../models/multi-data-experiment-item.model';
let dataItems = require( './multi-data-experiment-items.json');

@Injectable()
export class MultiDataExperimentItems extends VisualisationCollection {
  private _maxCache = {};
  model = MultiDataExperimentItemModel;

  constructor(){
    super();
    console.log('INIT')
  }

  initialize(){
    dataItems.forEach((item: any)=>{
      this.add(new MultiDataExperimentItemModel(item, {parse: true}));
    });
  }

  getMax(attr: string){
    if(!this._maxCache[attr]){
      this._maxCache[attr] = this.max((model: MultiDataExperimentItemModel)=>{
        return model.get(attr);
      }).get(attr);
    }
    return this._maxCache[attr];
  }
}
