import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RadarChartCollection} from '../../collections/radar-chart.collection';
import {debounce} from 'underscore';

@Component({
  selector: 'radar-chart',
  styles: [require('./radar-chart.style.scss')],
  template: require('./radar-chart.template.html')
})

export class RadarChartComponent implements AfterViewInit {
  @ViewChild('radarChart') radarChartCanvas: ElementRef;

  private canvasContext: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private axisWidth: number;
  private canvasCenter: Array<number>;

  @Input()
  public values: RadarChartCollection;

  @Input()
  public labels: Array<string>;

  @Input()
  public width: number = 660;

  @Input()
  public height: number = 400;

  constructor(private el: ElementRef) {
  }

  private multiplyMatrix(matrix1: Array<number>, matrix2: Array<Array<number>>): Array<number> {
    let x: number = matrix1[0] * matrix2[0][0] + matrix1[1] * matrix2[0][1];
    let y: number = matrix1[0] * matrix2[1][0] + matrix1[1] * matrix2[1][1];
    return [x, y];
  }

  private toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }

  private rotate2dMatrix(matrix: Array<number>, degree: number, point: Array<number> = [0, 0], clockwise: boolean = true) {
    let rotationMatrix: Array<Array<number>>;
    let rad = this.toRadians(degree);
    if (clockwise) {
      rotationMatrix = [
        [Math.cos(rad), Math.sin(rad)],
        [Math.sin(rad) * -1, Math.cos(rad)]
      ];
    } else {
      rotationMatrix = [
        [Math.cos(rad), Math.sin(rad) * -1],
        [Math.sin(rad), Math.cos(rad)]
      ];
    }
    let rotateAroundPointMatrix = [matrix[0] - point[0], matrix[1] - point[1]];
    let rotatedMatrix = this.multiplyMatrix(rotateAroundPointMatrix, rotationMatrix);
    return [rotatedMatrix[0] + point[0], rotatedMatrix[1] + point[1]];
  }

  private drawAxes(ctx: CanvasRenderingContext2D) {
    let axes = 6;
    let axeWidth = this.axisWidth;
    let labelMargin = 10;
    for (let i = 0; i < axes; i++) {
      let from = [this.canvasCenter[0], this.canvasCenter[1]];
      let to = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - axeWidth], (360 / axes) * i, from, false);
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(from[0], from[1]);
      ctx.lineTo(Math.round(to[0]), Math.round(to[1]));
      ctx.stroke();
      let labelPos = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - (axeWidth + labelMargin)], (360 / axes) * i, from, false);
      if (this.labels && this.labels[i]) {
        ctx.textAlign = "center";
        ctx.fillStyle = 'black';
        ctx.fillText(this.labels[i], labelPos[0], labelPos[1]);
      }
    }
  }

  private drawData(ctx: CanvasRenderingContext2D, data: Array<number>, color: string = 'black') {
    let axes = 6;
    let axeWidth = this.axisWidth;

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = 'transparent';
    ctx.beginPath();

    for (let i = 0; i < axes; i++) {
      let normalizedData = (axeWidth / 100) * data[i];
      let from = [this.canvasCenter[0], this.canvasCenter[1]];
      let to = this.rotate2dMatrix([this.canvasCenter[0], this.canvasCenter[1] - normalizedData], (360 / axes) * i, from, false);
      if (i === 0) {
        ctx.moveTo(to[0], to[1]);
      } else {
        ctx.lineTo(to[0], to[1]);
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  private draw() {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawAxes(this.canvasContext);
    this.values.each((value: any) => {
      this.drawData(this.canvasContext, value.get('data'), value.get('color'));
    });
    if (this.values.length > 1) {
      this.drawData(this.canvasContext, this.values.getAverage(), 'black');
    }
  }


  ngAfterViewInit(): void {
    let canvas: HTMLCanvasElement = this.radarChartCanvas.nativeElement;
    let throttledDraw = debounce(() => {
      this.draw();
    }, 100);
    this.values.on('update reset', throttledDraw, this);
    this.canvasWidth = this.width;
    this.canvasHeight = this.height;
    this.axisWidth = ( Math.min(this.canvasWidth, this.canvasHeight) / 2 ) - 20;
    this.canvasCenter = [this.canvasWidth / 2, this.canvasHeight / 2];
    this.canvasContext = canvas.getContext('2d');
    this.draw();
  }

  //
  // ngOnChanges() {
  //   this.setResults();
  // }
}
