import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';

@Injectable()
export class DirectedGraphD3Model extends VisualisationModel {
  nested(){
    return {
      nodes: VisualisationCollection,
      links: VisualisationCollection
    }
  }
}
