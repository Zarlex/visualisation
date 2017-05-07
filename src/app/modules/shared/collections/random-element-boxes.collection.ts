import {Injectable} from '@angular/core';
import {VisualisationCollection} from '../../main/collections/visualisation.collection';
import {RandomElementBoxModel} from '../models/random-element-box.model';
import {VisualisationModel} from '../../main/models/visualisation.model';

@Injectable()
export class RandomElementBoxesCollection extends VisualisationCollection {
  model = RandomElementBoxModel;

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private linesAreIntersecting(line1Start: number, line1Width: number, line2Start: number, line2Width: number): boolean {
    return line1Start + line1Width >= line2Start && line2Start + line2Width >= line1Start;
  }

  private boxIsIntersecting(box1: RandomElementBoxModel, box2: RandomElementBoxModel) {
    let xAxisIsOverlapping: boolean = this.linesAreIntersecting(
      box1.get('x'),
      box1.get('width'),
      box2.get('x'),
      box2.get('width'),
    );
    let yAxisIsOverlapping: boolean = this.linesAreIntersecting(
      box1.get('y'),
      box1.get('height'),
      box2.get('y'),
      box2.get('height'),
    );

    return xAxisIsOverlapping && yAxisIsOverlapping;
  }

  isOverlappingExistingBox(box: RandomElementBoxModel) {
    let overlapping: boolean = false;
    this.each((existingBox: RandomElementBoxModel) => {
      if (!overlapping) {
        overlapping = this.boxIsIntersecting(box, existingBox);
      }
    });
    return overlapping;
  }

  getRandomBox(): VisualisationModel {
    return this.at(this.getRandomInt(0, this.length - 1));
  }

  generateRandomBox(boxSize: number, canvasWidth: number, canvasHeight: number, maxTries = 5, currentTry: number = 0): RandomElementBoxModel {
    if (currentTry > maxTries) {
      return;
    }
    let x: number = this.getRandomInt(0, canvasWidth - boxSize);
    let y: number = this.getRandomInt(0, canvasHeight - boxSize);
    let box: RandomElementBoxModel = new RandomElementBoxModel({
      x: x,
      y: y,
      width: boxSize,
      height: boxSize
    });
    if (this.isOverlappingExistingBox(box)) {
      return this.generateRandomBox(boxSize, canvasWidth, canvasHeight, maxTries, currentTry + 1)
    } else {
      return box;
    }
  }

  setUpComposedMode() {
    this.each((box: RandomElementBoxModel) => {
      if(!box.get('poi')){
        box.set('type', this.getRandomInt(1,2));
      }
    });
  }

  generateRandomBoxes(amount: number, boxSize: number, canvasWidth: number, canvasHeight: number): void {
    for (var i = 0; i < amount; i++) {
      let box = this.generateRandomBox(boxSize, canvasWidth, canvasHeight);
      if (box) {
        this.add(box);
      } else {
        //console.info('Could not generate a box');
      }
    }
  }
}
