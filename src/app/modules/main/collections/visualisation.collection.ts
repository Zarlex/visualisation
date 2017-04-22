import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/base.collection';

@Injectable()
export class VisualisationCollection extends BaseCollection<BaseModel> {
  hostName(): string {
    if (process.env.ENV === 'prod') {
      return 'http://api.viz.zarg.es:3000';
    } else {
      return 'http://localhost:3000';
    }
  };

  basePath(): string {
    return 'api';
  };
}
