import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class ScatterPlotD3Model extends VisualisationModel {
  defaults(): {
    color: string,
    xData: number,
    yData: number
  }
  {
    return {
      color: '',
      xData: null,
      yData: null
    }
  }
}
