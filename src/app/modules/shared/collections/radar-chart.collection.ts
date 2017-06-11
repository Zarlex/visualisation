import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {RadarChartModel} from '../models/radar-chart.model';

@Injectable()
export class RadarChartCollection extends VisualisationCollection {
  model = RadarChartModel;

  getAverage(): Array<number> {
    let axesAmount: number = 0,
      averagePerAxis: Array<number> = [];

    if (this.length > 0) {
      axesAmount = this.first().get('data').length;
    }

    this.each((item: RadarChartModel) => {
      for (var i = 0; i < axesAmount; i++) {
        if (averagePerAxis[i]) {
          averagePerAxis[i] += item.get('data')[i];
        } else {
          averagePerAxis[i] = item.get('data')[i];
        }
      }
    });

    for (var i = 0; i < axesAmount; i++) {
      averagePerAxis[i] = averagePerAxis[i]/this.length;
    }

    return averagePerAxis;
  }
}
