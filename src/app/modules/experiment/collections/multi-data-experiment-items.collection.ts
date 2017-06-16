import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {MultiDataExperimentItemModel} from '../models/multi-data-experiment-item.model';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class MultiDataExperimentItems extends VisualisationCollection {
  public maxCache = {};
  public minCache = {};
  model = MultiDataExperimentItemModel;

  constructor() {
    super();
  }

  getMin(attr: string) {
    if (!this.minCache[attr]) {
      this.minCache[attr] = this.min((model: MultiDataExperimentItemModel) => {
        return model.get(attr);
      }).get(attr);
    }
    return this.minCache[attr];
  }

  getMax(attr: string) {
    if (!this.maxCache[attr]) {
      this.maxCache[attr] = this.max((model: MultiDataExperimentItemModel) => {
        return model.get(attr);
      }).get(attr);
    }
    return this.maxCache[attr];
  }

  getManufacturers(): VisualisationCollection {
    let manufacturers = new VisualisationCollection();
    this.each((item: MultiDataExperimentItemModel) => {
      manufacturers.add({id: item.get('manufacturer')})
    });
    return manufacturers;
  }
}
