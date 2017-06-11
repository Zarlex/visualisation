import {Collection} from 'backbone';
import {BaseModel} from '../models/base.model';
import {Injectable} from '@angular/core';
import {getUrl} from '../utils/get_url.util';
import {isUndefined, extend} from 'underscore';
import {prepareSearchParams} from '../utils/prepare_search_params';
import {Selectable} from './selectable';
import {SelectableCollection} from './selectable.collection';

export class BaseCollection<TModel extends BaseModel> extends SelectableCollection<TModel> {
  model: any = BaseModel;

  queryParams: Object = {};

  endpoint: string = null;

  sortOrder: string = null;

  hostName(): string {
    return '';
  };

  basePath(): string {
    return '';
  };

  url = () => {
    return getUrl(this);
  };

  sync(method: string, model: any, options: any = {}) {
    let queryParams = this.queryParams;
    if (options.queryParams) {
      queryParams = extend({}, this.queryParams, options.queryParams);
    }
    options.search = prepareSearchParams(options.search, queryParams);
    return super.sync(method, model, options);
  }

  sortAscending() {
    this.sort();
    this.sortOrder = 'ASC';
  }

  sortDescending() {
    if (this.sortOrder !== 'ASC') {
      this.sortAscending();
    }
    this.models = this.models.reverse();
    this.trigger('sort', this);
    this.sortOrder = 'DESC';
  }

}


