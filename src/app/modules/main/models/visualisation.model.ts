import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';

@Injectable()
export class VisualisationModel extends BaseModel {
  hostName(): string {
    if (process.env.ENV === 'prod') {
      return 'http://ec2-52-59-231-57.eu-central-1.compute.amazonaws.com:3000';
    } else {
      return 'http://localhost:3000';
    }
  };

  basePath(): string {
    return 'api';
  };
}
