import {Component, OnInit} from '@angular/core';
import {MultiDataExperimentItems} from '../../collections/multi-data-experiment-items.collection';
import {RadarChartCollection} from '../../../shared/collections/radar-chart.collection';
import {VisualisationCollection} from '../../../main/collections/visualisation.collection';
import {VisualisationModel} from '../../../main/models/visualisation.model';
import {RadarChartModel} from '../../../shared/models/radar-chart.model';
import {MultiDataExperimentItemModel} from '../../models/multi-data-experiment-item.model';
import {ScatterPlotD3Collection} from '../../../shared/collections/scatter-plot-d3.collection';
let dataItems = require('../../collections/multi-data-experiment-items.json');

@Component({
  selector: 'multi-data-dimension-experiment-d3',
  styles: [require('./multi-data-dimension-d3-experiment.style.scss')],
  template: require('./multi-data-dimension-d3-experiment.template.html'),
  providers: [MultiDataExperimentItems, ScatterPlotD3Collection]
})

export class MultiDataDimensionD3ExperimentComponent implements OnInit {
  public minYear: number;
  public maxYear: number;
  public yearFilter: number;

  constructor(public multiDataExperimentItems: MultiDataExperimentItems, public scatterPlotD3Collection: ScatterPlotD3Collection) {
  }


  private setD3Collection(collection: MultiDataExperimentItems, yearFilter: number) {
    this.scatterPlotD3Collection.reset();
    let items: Array<MultiDataExperimentItemModel>;
    if (yearFilter) {
      items = <Array<MultiDataExperimentItemModel>>collection.where({
        modelYear: yearFilter,
      });
    } else {
      items = <Array<MultiDataExperimentItemModel>>collection.toArray();
    }
    items.forEach((item: MultiDataExperimentItemModel) => {
      let radarChartModel = new RadarChartModel({
        color: item.getColor(),
        xData: item.get('mpg'),
        yData: item.get('cylinders')
      });
      this.scatterPlotD3Collection.add(radarChartModel);
    });
  }

  public filterByYear(val: number) {
    this.yearFilter = val;
    this.multiDataExperimentItems.selectable.unSelectAll();
    this.setD3Collection(this.multiDataExperimentItems, val);
  }

  public getColorForOrigin(origin: string) {
    let originRes = <MultiDataExperimentItemModel>this.multiDataExperimentItems.findWhere({origin: origin});
    if (originRes) {
      return originRes.getColor();
    }
  }

  public toggleFilterByYear(){
    if(this.yearFilter){
      this.yearFilter = null;
    } else {
      this.yearFilter = this.minYear;
    }
  }

  ngOnInit(): void {
    dataItems.forEach((item: any) => {
      this.multiDataExperimentItems.add(new this.multiDataExperimentItems.model(item, {parse: true}))
    });
    this.minYear = this.multiDataExperimentItems.getMin('modelYear');
    this.maxYear = this.multiDataExperimentItems.getMax('modelYear');

    this.setD3Collection(this.multiDataExperimentItems, this.yearFilter);
    this.multiDataExperimentItems.selectable.on('change:add change:remove', () => {
      if (this.multiDataExperimentItems.selectable.getSelected().length > 0) {
        let selected: MultiDataExperimentItems = new MultiDataExperimentItems();
        selected.maxCache = this.multiDataExperimentItems.maxCache;
        selected.reset(this.multiDataExperimentItems.selectable.getSelected().toJSON());
        this.setD3Collection(selected, this.yearFilter);
      } else {
        this.setD3Collection(this.multiDataExperimentItems, this.yearFilter);
      }
    });
  }
}
