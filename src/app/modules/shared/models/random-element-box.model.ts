import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class RandomElementBoxModel extends VisualisationModel {
  defaults(){
    return {
      poi: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }
}
