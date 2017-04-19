import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  moduleId: module.id.toString(),
  selector: 'wizard',
  styles: [require('./wizard.style.scss')],
  template: require('./wizard.template.html')
})

export class WizardComponent implements OnInit {
  private slides: Array<any> = [];
  private displayIndex = 0;
  @Output() opened = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  addEntry(slide: any) {
    if (this.slides.length === 0) {
      slide.open();
    }
    this.slides.push(slide);
  }

  hasPrevious(): boolean {
    return this.displayIndex > 0;
  }

  hasNext(): boolean {
    return this.displayIndex < this.slides.length - 1;
  }

  previous() {
    if (this.hasPrevious()) {
      let currentSlide = this.slides[this.displayIndex];
      this.displayIndex--;
      let nextSlide = this.slides[this.displayIndex];
      currentSlide.close();
      nextSlide.open();
    }
  }

  next() {
    if (this.hasNext()) {
      let currentSlide = this.slides[this.displayIndex];
      this.displayIndex++;
      let nextSlide = this.slides[this.displayIndex];
      currentSlide.close();
      nextSlide.open();
    }
  }
}

