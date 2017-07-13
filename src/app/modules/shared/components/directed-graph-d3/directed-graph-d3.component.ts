import {
  Component, Input, Output, ViewChild, ElementRef, EventEmitter, OnInit, ViewEncapsulation,
  AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';
import {ScaleLinear, ScaleOrdinal} from 'd3-scale';
import {Axis} from 'd3-axis';
import {Selection} from 'd3-selection';
import {debounce} from 'underscore';
import {VisualisationCollection} from '../../../main/collections/visualisation.collection';
import {DirectedGraphD3Model} from '../../models/directed-graph-d3.model';
import {VisualisationModel} from '../../../main/models/visualisation.model';
import {values, unique, difference} from 'underscore';

@Component({
  selector: 'directed-graph-d3',
  styles: [require('./directed-graph-d3.style.scss')],
  template: require('./directed-graph-d3.template.html'),
  encapsulation: ViewEncapsulation.None
})

export class DirectedGraphD3Component implements OnInit, AfterViewChecked, OnChanges {
  @Input()
  public values: VisualisationCollection;

  @Input()
  public searchTerm: string;

  @Input()
  public labels: Array<string>;

  private margin: {
    top: number,
    right: number,
    bottom: number,
    left: number
  } = {top: 20, right: 20, bottom: 30, left: 40};
  private width: number = 660;
  private height: number = 500;
  private svg: Selection<any, any, any, any>;
  private zoomHolder: Selection<any, any, any, any>;
  private simulation: any;
  private zoomHandler: any;
  private nodeColor: string = '#ccc';

  public isInitialising: boolean = false;

  constructor(private el: ElementRef) {

  }

  private dragstarted(d: any) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(d: any) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  private dragended(d: any) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  private zoomActions() {
    this.zoomHolder.attr("transform", d3.event.transform)
  }

  private getData(data: VisualisationCollection): DirectedGraphD3Model {
    let directedGraphD3Model = new DirectedGraphD3Model();
    let nodes: VisualisationCollection = directedGraphD3Model.get('nodes');
    let links: VisualisationCollection = directedGraphD3Model.get('links');

    data.forEach((obj: VisualisationModel) => {
      let dataValues = values(obj.toJSON());
      let node = {id: dataValues[0], amount: 1};
      let existingNode = nodes.get(node.id);
      if (existingNode) {
        existingNode.set('amount', existingNode.get('amount') + 1);
      } else {
        nodes.add(node);
      }

      let link = {source: node.id, target: dataValues[1], weight: dataValues[2]};
      links.add(link);
    });

    let missingTargets: Array<string> = difference(unique(links.pluck('target')), nodes.pluck('id'));
    missingTargets.forEach((id: string) => {
      links.where({target: id}).forEach((link: any) => {
        links.remove(link);
      });
      console.error("The target " + id + " does not exist as a node!");
    });

    return directedGraphD3Model;
  }

  private highlightNodes(searchTerm: string){

    d3.select('.nodes').selectAll('circle')
      .attr('fill', (d: any)=>{
        if(searchTerm && searchTerm.length>0 && d.id.match(searchTerm)){
          return 'red';
        } else {
          return this.nodeColor;
        }
      });
  }

  private drawData(data: DirectedGraphD3Model) {
    let nodeValues = data.get('nodes').toJSON();
    let linkValues = data.get('links').toJSON();

    d3.select('.nodes').remove();
    d3.select('.links').remove();

    let link = this.zoomHolder.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linkValues)
      .enter().append('line')
      .attr('stroke-width', (d: any) => {
        return d.weight;
      });

    let node = this.zoomHolder.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodeValues)
      .enter()
      .append("g")
      .attr('class', 'node')
      .call(d3.drag()
        .on("start", this.dragstarted.bind(this))
        .on("drag", this.dragged.bind(this))
        .on("end", this.dragended.bind(this)));

    node.append('circle')
      .attr("r", (d: any) => {
        return d.amount + 5
      })
      .attr("fill", this.nodeColor);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr("dx", (d: any) => {
        return 0;
      })
      .attr('font-size', (d) => {
        let scale = (d.amount * 3);
        scale = scale > 32 ? 32 : scale < 10 ? 10 : scale;
        return scale + 'px';
      })
      .attr("dy", ".35em")
      .text((d: any) => {
        return d.id;
      });

    this.simulation
      .nodes(nodeValues)
      .on('tick', ticked);

    this.simulation
      .force('link')
      .links(linkValues);

    function ticked() {
      link
        .attr('x1', (d: any) => {
          return d.source.x;
        })
        .attr('y1', (d: any) => {
          return d.source.y;
        })
        .attr('x2', (d: any) => {
          return d.target.x;
        })
        .attr('y2', (d: any) => {
          return d.target.y;
        });

      node.attr("transform", (d: any) => {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }

    setTimeout(() => {
      this.isInitialising = false;
    }, 100);
  }

  private initD3() {
    let holderEl = this.el.nativeElement.querySelector('.directed-graph-d3');
    holderEl.innerHTML ='';

    this.svg = d3.select(holderEl)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.zoomHolder = this.svg
      .append("g")
      .attr('class','zoom-holder-el');

    this.simulation = d3.forceSimulation()
      .force('collide', d3.forceCollide(function (d) {
        return d.amount + 20
      }).iterations(4))
      .force('link',
        d3.forceLink()
          .id((d: any) => {
            return d.id;
          })
          .distance((d: any) => {
            return d.weight;
          })
          .strength(0.5)
      )
      .force('charge', d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    this.zoomHandler = d3.zoom()
      .on("zoom", this.zoomActions.bind(this));

    this.zoomHandler(this.svg);
  }

  ngOnInit(): void {
    let throttledDraw = debounce(() => {
      this.isInitialising = true;
      setTimeout(()=>{
        this.initD3();
        this.drawData(this.getData(this.values));
        this.highlightNodes(this.searchTerm);
      }, 100);
    }, 100);

    this.initD3();
    this.values.on('update reset', throttledDraw, this);
    throttledDraw();
  }

  ngAfterViewChecked(): void {
    this.width = this.el.nativeElement.offsetWidth;
    this.height = this.el.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.searchTerm){
      this.highlightNodes(changes.searchTerm.currentValue);
    }
  }
}


