import {Component, OnInit} from '@angular/core';
import {MultiDataExperimentItems} from '../../collections/multi-data-experiment-items.collection';
import {RadarChartCollection} from '../../../shared/collections/radar-chart.collection';
import {VisualisationCollection} from '../../../main/collections/visualisation.collection';
import {VisualisationModel} from '../../../main/models/visualisation.model';
import {RadarChartModel} from '../../../shared/models/radar-chart.model';
import {MultiDataExperimentItemModel} from '../../models/multi-data-experiment-item.model';

@Component({
  selector: 'multi-data-dimension-experiment',
  styles: [require('./multi-data-dimension-experiment.style.scss')],
  template: require('./multi-data-dimension-experiment.template.html'),
  providers: [MultiDataExperimentItems, RadarChartCollection]
})

export class MultiDataDimensionExperimentComponent implements OnInit {
  constructor(public multiDataExperimentItems: MultiDataExperimentItems, public radarChartCollection: RadarChartCollection) {
  }

  public viewModel = {
    yearFilter: 70
  };

  public radarChartLabels: Array<String> = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration'];

  private setRadarChartCollection(collection: MultiDataExperimentItems, yearFilter: number) {
    this.radarChartCollection.reset();
    collection.where({modelYear: yearFilter}).forEach((item: MultiDataExperimentItemModel) => {
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
    this.setRadarChartCollection(this.multiDataExperimentItems, val);
  }

  public getColorForOrigin(origin: string){
    let originRes = <MultiDataExperimentItemModel>this.multiDataExperimentItems.findWhere({origin: origin});
    if(originRes){
      return originRes.getColor();
    }
  }

  ngOnInit(): void {
    this.setRadarChartCollection(this.multiDataExperimentItems, this.viewModel.yearFilter);

    this.multiDataExperimentItems.selectable.on('change:add', () => {
      if(this.multiDataExperimentItems.selectable.getSelected().length>0){
        let selected: MultiDataExperimentItems = new MultiDataExperimentItems();
        selected.reset(this.multiDataExperimentItems.selectable.getSelected().toJSON());
        this.setRadarChartCollection(selected, this.viewModel.yearFilter);
      } else {
        this.setRadarChartCollection(this.multiDataExperimentItems, this.viewModel.yearFilter);
      }
    });
  }

}
