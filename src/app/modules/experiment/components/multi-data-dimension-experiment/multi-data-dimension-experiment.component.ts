import {Component, OnInit} from '@angular/core';
import {MultiDataExperimentItems} from '../../collections/multi-data-experiment-items.collection';
import {RadarChartCollection} from '../../../shared/collections/radar-chart.collection';
import {VisualisationCollection} from '../../../main/collections/visualisation.collection';
import {VisualisationModel} from '../../../main/models/visualisation.model';
import {RadarChartModel} from '../../../shared/models/radar-chart.model';
import {MultiDataExperimentItemModel} from '../../models/multi-data-experiment-item.model';
let dataItems = require('../../collections/multi-data-experiment-items.json');

@Component({
  selector: 'multi-data-dimension-experiment',
  styles: [require('./multi-data-dimension-experiment.style.scss')],
  template: require('./multi-data-dimension-experiment.template.html'),
  providers: [MultiDataExperimentItems, RadarChartCollection]
})

export class MultiDataDimensionExperimentComponent implements OnInit {
  public manufacturers: VisualisationCollection;
  public minYear: number;
  public maxYear: number;
  public yearFilter: number;
  public radarChartLabels: Array<String> = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration'];

  constructor(public multiDataExperimentItems: MultiDataExperimentItems, public radarChartCollection: RadarChartCollection) {
  }


  private setRadarChartCollection(collection: MultiDataExperimentItems, yearFilter: number) {
    this.radarChartCollection.reset();
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
        data: [
          item.getPercentage('mpg'),
          item.getPercentage('cylinders'),
          item.getPercentage('displacement'),
          item.getPercentage('horsepower'),
          item.getPercentage('weight'),
          item.getPercentage('acceleration')
        ]
      });
      this.radarChartCollection.add(radarChartModel);
    });
  }

  public filterByYear(val: number) {
    this.yearFilter = val;
    this.multiDataExperimentItems.selectable.unSelectAll();
    this.setRadarChartCollection(this.multiDataExperimentItems, val);
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
    this.manufacturers = this.multiDataExperimentItems.getManufacturers();
    this.minYear = this.multiDataExperimentItems.getMin('modelYear');
    this.maxYear = this.multiDataExperimentItems.getMax('modelYear');
    //this.yearFilter = this.minYear;

    this.setRadarChartCollection(this.multiDataExperimentItems, this.yearFilter);
    this.multiDataExperimentItems.selectable.on('change:add', () => {
      if (this.multiDataExperimentItems.selectable.getSelected().length > 0) {
        let selected: MultiDataExperimentItems = new MultiDataExperimentItems();
        selected.maxCache = this.multiDataExperimentItems.maxCache;
        selected.reset(this.multiDataExperimentItems.selectable.getSelected().toJSON());
        this.setRadarChartCollection(selected, this.yearFilter);
      } else {
        this.setRadarChartCollection(this.multiDataExperimentItems, this.yearFilter);
      }
    });
  }
}
