import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';

@Injectable()
export class VisualisationModel extends BaseModel {
  hostName(): string {
    return 'http://localhost:3000';
  };

  basePath(): string {
    return 'api';
  };
}
