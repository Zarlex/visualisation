import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {TabsComponent} from '../tabs.component';

@Component({
  selector: 'tab',
  styles: [require('./tab.style.scss')],
  template: require('./tab.template.html')
})

export class TabComponent implements OnInit {
  private opened: boolean = false;

  constructor(private tabsComponent: TabsComponent, private el: ElementRef) {
  }

  @Input()
  public title: string;

  ngOnInit(): void {
    this.tabsComponent.addEntry(this);
  }

  public isOpened(){
    return this.opened;
  }

  public open() {
    this.opened = true;
  }

  public close() {
    this.opened = false;
  }
}
