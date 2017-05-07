import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class PerceptionExperimentModel extends VisualisationModel {
  endpoint = '/perception-results';

  defaults() {
    return {
      mode: 0,
      amount: 0,
      time: 0
    }
  }
}
