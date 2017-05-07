import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {PerceptionExperimentModel} from '../models/perception-experiment.model';

@Injectable()
export class PerceptionExperimentsCollection extends VisualisationCollection {
  endpoint = '/perception-results';
  model = PerceptionExperimentModel
}
