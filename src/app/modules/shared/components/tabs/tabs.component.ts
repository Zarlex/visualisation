import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  moduleId: module.id.toString(),
  selector: 'tabs',
  styles: [require('./tabs.style.scss')],
  template: require('./tabs.template.html')
})

export class TabsComponent implements OnInit {
  public tabs: Array<any> = [];
  @Output() opened = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  addEntry(tab: any) {
    if (this.tabs.length === 0) {
      this.openTab(tab);
    }
    this.tabs.push(tab);
  }

  openTab(tab: any) {
    this.tabs.forEach((tab: any) => {
      tab.close();
    });
    tab.open();
  }
}

