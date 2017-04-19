import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/base.collection';

@Injectable()
export class VisualisationCollection extends BaseCollection<BaseModel> {
  hostName(): string {
    return 'http://localhost:3000';
  };

  basePath(): string {
    return 'api';
  };
}
