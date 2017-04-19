import {Component, OnInit, ElementRef} from '@angular/core';
import {WizardComponent} from '../wizard.component';

@Component({
  selector: 'wizard-entry',
  styles: [require('./wizard-entry.style.scss')],
  template: require('./wizard-entry.template.html')
})

export class WizardEntryComponent implements OnInit {
  private opened: boolean = false;
  private height: number = 0;
  private width: number = 0;

  constructor(private wizardComponent: WizardComponent, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.wizardComponent.addEntry(this);
  }

  public open() {
    this.opened = true;
  }

  public close() {
    this.opened = false;
  }
}
