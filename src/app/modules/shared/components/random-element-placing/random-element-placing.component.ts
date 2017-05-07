import {
  Component, Input, ElementRef, OnInit, SimpleChanges,
  OnChanges
} from '@angular/core';
import {RandomElementBoxesCollection} from '../../collections/random-element-boxes.collection';
import {RandomElementBoxModel} from '../../models/random-element-box.model';
import {debounce} from 'underscore';

export enum Modes{
  COLOR,
  SHAPE,
  DIRECTION,
  BLINK,
  SIZE,
  ENCLOSURE,
  COMPOSED
}

@Component({
  selector: 'random-element-placing',
  styles: [require('./random-element-placing.style.scss')],
  template: require('./random-element-placing.template.html'),
  providers: [RandomElementBoxesCollection]
})

export class RandomElementPlacingComponent implements OnInit, OnChanges {
  @Input()
  public name: string;

  @Input()
  public boxSize: number = 10;

  @Input()
  public amount: number = 200;

  @Input()
  public hasPoi: boolean;

  @Input()
  public mode: Modes = Modes.COLOR;

  public options: {
    fontSize: number,
    poiFontSize: number,
    className: string,
    icon: string,
    poiIcon: string,
    color: string,
    poiColor: string
  } = {
    fontSize: null,
    poiFontSize: null,
    className: null,
    icon: null,
    poiIcon: null,
    color: null,
    poiColor: null
  };

  constructor(public randomElementBoxesCollection: RandomElementBoxesCollection, private el: ElementRef) {

  }

  private unsetPoi(): void {
    let existingPoi = this.randomElementBoxesCollection.findWhere({poi: true});
    if (existingPoi) {
      existingPoi.set({poi: false});
    }
  }

  public getClass(): string {
    return this.options.className;
  }

  public getIconForBox(box: RandomElementBoxModel) {
    if (box.get('poi')) {
      return this.options.poiIcon;
    } else if ((this.mode === Modes.COMPOSED)) {
      return box.get('type') === 1 ? 'fa-taxi' : 'fa-flask';
    } else {
      return this.options.icon;
    }
  }

  public getColorForBox(box: RandomElementBoxModel) {
    if (box.get('poi')) {
      return this.options.poiColor;
    } else if (this.mode === Modes.COMPOSED) {
      return box.get('type') === 1 ? 'blue' : 'red';
    } else {
      return this.options.color;
    }
  }

  public getFontSizeForBox(box: RandomElementBoxModel) {
    if (box.get('poi')) {
      return this.options.poiFontSize;
    } else {
      return this.options.fontSize;
    }
  }

  public generateRandomBoxes() {
    let canvasWidth = this.el.nativeElement.offsetWidth;
    let canvasHeight = this.el.nativeElement.offsetHeight;
    this.randomElementBoxesCollection.reset();
    this.randomElementBoxesCollection.generateRandomBoxes(this.amount, this.boxSize, canvasWidth, canvasHeight);
    this.setRandomPoi();
    this.setOptions();
    console.log('Generated ' + this.randomElementBoxesCollection.length + '/' + this.amount + ' boxes');
  }

  public setRandomPoi(): void {
    if (this.hasPoi) {
      this.unsetPoi();
      this.randomElementBoxesCollection.getRandomBox().set({poi: true});
    }
  }

  private setOptions() {
    let box = this.randomElementBoxesCollection.first();
    if (!box) {
      return;
    }
    switch (this.mode) {
      default:
      case Modes.COLOR:
        this.options.fontSize = box.get('width') - 3;
        this.options.poiFontSize = box.get('width') - 3;
        this.options.className = 'color-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-taxi';
        this.options.color = 'black';
        this.options.poiColor = 'red';
        break;
      case Modes.BLINK:
        this.options.fontSize = box.get('width') - 3;
        this.options.poiFontSize = box.get('width') - 3;
        this.options.className = 'blink-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-taxi';
        this.options.color = 'black';
        this.options.poiColor = 'black';
        break;
      case Modes.DIRECTION:
        this.options.fontSize = box.get('width') - 3;
        this.options.poiFontSize = box.get('width') - 3;
        this.options.className = 'direction-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-taxi';
        this.options.color = 'black';
        this.options.poiColor = 'black';
        break;
      case Modes.SHAPE:
        this.options.fontSize = box.get('width') - 3;
        this.options.poiFontSize = box.get('width') - 3;
        this.options.className = 'shape-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-flask';
        this.options.color = 'black';
        this.options.poiColor = 'black';
        break;
      case Modes.SIZE:
        this.options.fontSize = box.get('width') / 3;
        this.options.poiFontSize = box.get('width') - 3;
        this.options.className = 'size-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-taxi';
        this.options.color = 'black';
        this.options.poiColor = 'black';
        break;
      case Modes.ENCLOSURE:
        this.options.fontSize = box.get('width') / 2;
        this.options.poiFontSize = box.get('width') / 2;
        this.options.className = 'enclosure-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.icon = 'fa-taxi';
        this.options.color = 'black';
        this.options.poiColor = 'black';
        break;
      case Modes.COMPOSED:
        this.options.fontSize = box.get('width') / 2;
        this.options.poiFontSize = box.get('width') / 2;
        this.options.className = 'composed-mode';
        this.options.poiIcon = 'fa-taxi';
        this.options.poiColor = 'red';
        this.randomElementBoxesCollection.setUpComposedMode();
        break;
    }
  }

  private debouncedBoxesGenerator = debounce(this.generateRandomBoxes, 100);

  ngOnInit(): void {
    this.debouncedBoxesGenerator();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasPoi && changes.hasPoi.currentValue) {
      if (this.randomElementBoxesCollection.length === 0) {
        this.debouncedBoxesGenerator();
      } else {
        this.setRandomPoi();
      }
    } else if (changes.hasPoi && !changes.hasPoi.currentValue) {
      this.unsetPoi();
    } else if (changes.amount || changes.boxSize) {
      this.debouncedBoxesGenerator();
    } else if (changes.mode) {
      console.log(changes.mode, Modes[this.mode]);
      this.setOptions();
    }
  }

}
