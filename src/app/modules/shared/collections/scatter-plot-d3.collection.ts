import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {ScatterPlotD3Model} from '../models/scatter-plot-d3.model';

@Injectable()
export class ScatterPlotD3Collection extends VisualisationCollection {
  model = ScatterPlotD3Model;
}
