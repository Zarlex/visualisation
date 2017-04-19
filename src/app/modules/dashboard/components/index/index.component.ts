import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import localforage = require('localforage');

@Component({
  selector: 'my-dashboard',
  styles: [ require('./index.style.scss') ],
  template: require('./index.template.html')
})

export class DashboardIndexComponent {

  constructor() {
  }
}
