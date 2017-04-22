import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';

@Injectable()
export class VisualisationModel extends BaseModel {
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
