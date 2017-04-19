import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';
import {VisualisationModel} from '../../main/models/visualisation.model';
import {isUndefined, isNumber} from 'underscore';

@Injectable()
export class CircleExperimentModel extends VisualisationModel {
  endpoint = '/circle-results';

  defaults() {
    return {
      circle1: 0,
      circle2: 0,
      circle3: 0
    }
  }

  validate(): string{
    if(!isNumber(this.get('circle1Dev')) || !isNumber(this.get('circle2Dev')) || !isNumber(this.get('circle3Dev'))){
      return 'Please guess a circle size for all circles';
    }
  }

  getUserSetSize(circleName: string): number {
    return this.get(circleName) + 100;
  }

  getOrgSize(circleName: string): number {
    return this.getUserSetSize(circleName) - this.get(circleName + 'Dev');
  }

  userWasRight(circleName: string): boolean{
    return this.getOrgSize(circleName) === this.getUserSetSize(circleName);
  }
}
