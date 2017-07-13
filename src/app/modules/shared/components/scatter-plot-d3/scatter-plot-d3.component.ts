import {Component, Input, Output, ViewChild, ElementRef, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {ScatterPlotD3Collection} from '../../collections/scatter-plot-d3.collection';
import * as d3 from 'd3';
import {ScaleLinear, ScaleOrdinal} from 'd3-scale';
import {Axis} from 'd3-axis';
import {Selection} from 'd3-selection';
import {ScatterPlotD3Model} from '../../models/scatter-plot-d3.model';
import {debounce} from 'underscore';

@Component({
  selector: 'scatter-plot-d3',
  styles: [require('./scatter-plot-d3.style.scss')],
  template: require('./scatter-plot-d3.template.html'),
  encapsulation: ViewEncapsulation.None
})

export class ScatterPlotD3Component implements OnInit {
  @Input()
  public values: ScatterPlotD3Collection;

  @Input()
  public labels: Array<string>;

  private margin: {
    top: number,
    right: number,
    bottom: number,
    left: number
  } = {top: 20, right: 20, bottom: 30, left: 40};
  private width: number = 660 - this.margin.left - this.margin.right;
  private height: number = 500 - this.margin.top - this.margin.bottom;
  private x: ScaleLinear<number, number>;
  private y: ScaleLinear<number, number>;
  private color: ScaleOrdinal<string, string>;
  private xAxis: Axis<any>;
  private yAxis: Axis<any>;
  private svg: Selection<any, any, any, any>;
  private div: Selection<any, any, any, any>;

  constructor(private el: ElementRef){}

  private drawData() {
    let values: Array<any> = this.values.toArray();
    this.x.domain(d3.extent(values, (model: any): number => {
      return model.get('xData')
    })).nice();
    this.y.domain(d3.extent(values, (model: any): number => {
      return model.get('yData')
    })).nice();

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis)
      .append('text')
      .attr('class', 'label')
      .attr('x', this.width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .style('fill', 'black')
      .text('MPG');

    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', 'black')
      .text('Cylinders');

    this.svg.selectAll('.dot')
      .data(this.values.toArray())
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 10)
      .attr('cx', (d: any) => {
        return this.x(d.get('xData'));
      })
      .attr('cy', (d: any) => {
        return this.y(d.get('yData'));
      })
      .style('fill', (d: any) => {
        return d.get('color')
      })
      .on('mouseover', (d) => {
        this.div.transition()
          .duration(200)
          .style('opacity', .9);
        this.div.html(d.get('xData') + '<br/>' + d.get('yData'))
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        this.div.transition()
          .duration(500)
          .style('opacity', 0);
      });
  }

  private initD3() {
    let holderEl = this.el.nativeElement.querySelector('.scatter-plot-d3');
    holderEl.innerHTML = '';

    this.x = d3.scaleLinear().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.svg = d3.select(holderEl).append('svg').attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.div = d3.select(holderEl).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  ngOnInit(): void {
    let throttledDraw = debounce(() => {
      this.initD3();
      this.drawData();
    }, 100);
    this.values.on('update reset', throttledDraw, this);
    throttledDraw();
  }
}
