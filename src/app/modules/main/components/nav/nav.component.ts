import {Component, trigger, state, style, transition, animate, ContentChild} from '@angular/core';

@Component({
  selector: 'nav-sidebar',
  styles: [require('./nav.style.scss')],
  template: require('./nav.template.html')
})

export class NavComponent {


  constructor() {
  }

  ngOnInit(): void {

  };
}
