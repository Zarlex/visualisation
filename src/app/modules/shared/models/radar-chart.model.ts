import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class RadarChartModel extends VisualisationModel {
  idAttribute = 'label';

  defaults(): {
    color: string,
    data: Array<number>
  }
  {
    return {
      color: '',
      data: []
    }
  }
}
