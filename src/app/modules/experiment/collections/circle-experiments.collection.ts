import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {CircleExperimentModel} from '../models/circle-experiment.model';

@Injectable()
export class CircleExperimentsCollection extends VisualisationCollection {
  endpoint = '/circle-results';
  model = CircleExperimentModel
}
