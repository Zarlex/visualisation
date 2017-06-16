import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';
import {MultiDataExperimentItems} from '../collections/multi-data-experiment-items.collection';

@Injectable()
export class MultiDataExperimentItemModel extends VisualisationModel {
  parse(attrs: any) {
    for (var key in attrs) {
      if (attrs.hasOwnProperty(key) && attrs[key] === 'NA') {
        attrs[key] = -1;
      }
    }
    attrs.acceleration = parseFloat(attrs.acceleration);
    attrs.cylinders = parseInt(attrs.acceleration, 10);
    attrs.horsepower = parseInt(attrs.horsepower, 10);
    attrs.modelYear = parseInt(attrs.modelYear, 10);
    attrs.mpg = parseInt(attrs.mpg, 10);
    attrs.weight = parseInt(attrs.weight, 10);
    return attrs;
  }

  getPercentage(attr: string) {
    let collection = <MultiDataExperimentItems>this.collection;
    let max: number = 0;
    if (collection) {
      max = collection.getMax(attr);
    }
    return (this.get(attr) / max) * 100;
  }

  getColor(): string {
    if(this.get('origin') === 'European'){
      return 'rgba(0,0,255,0.5)';
    } else if(this.get('origin') === 'American'){
      return 'rgba(0,255,255,0.5)';
    } else if(this.get('origin') === 'Japanese'){
      return 'rgba(255,0,255,0.5)';
    } else {
      return 'black';
    }
  }
}
