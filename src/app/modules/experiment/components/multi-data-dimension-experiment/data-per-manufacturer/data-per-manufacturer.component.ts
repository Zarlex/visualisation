import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RadarChartCollection} from '../../../../shared/collections/radar-chart.collection';
import {VisualisationCollection} from '../../../../main/collections/visualisation.collection';
import {MultiDataExperimentItems} from '../../../collections/multi-data-experiment-items.collection';
import {MultiDataExperimentItemModel} from '../../../models/multi-data-experiment-item.model';
import {RadarChartModel} from '../../../../shared/models/radar-chart.model';
import {VisualisationModel} from '../../../../main/models/visualisation.model';

@Component({
  selector: 'data-per-manufacturer',
  styles: [require('./data-per-manufacturer.style.scss')],
  template: require('./data-per-manufacturer.template.html'),
  providers: [RadarChartCollection]
})

export class DataPerManufacturerComponent implements OnInit, OnChanges {
  private elIsVisible: boolean = false;

  constructor(public radarChartCollection: RadarChartCollection, private el: ElementRef) {
  }

  @Input()
  manufacturers: VisualisationCollection;

  @Input()
  multiDataDimensionItems: MultiDataExperimentItems;

  @Input()
  filterByYear: number;

  private setRadarChartCollectionPerManufacturer() {
    this.getManufacturers().each((manufacturer: VisualisationModel) => {
      let radarChartData = this.getRadarChartCollection(this.filterByYear, manufacturer.get('id'));
      if(manufacturer.get('radarChartData')){
        manufacturer.get('radarChartData').reset(radarChartData.toJSON());
      } else {
        manufacturer.set('radarChartData', radarChartData);
      }
    })
  }

  private getRadarChartCollection(yearFilter: number, manufacturer: string) {
    let collection = this.multiDataDimensionItems;
    let radarChartCollection: RadarChartCollection = new RadarChartCollection();
    let items: Array<MultiDataExperimentItemModel>;
    if(yearFilter){
      items = <Array<MultiDataExperimentItemModel>>collection.where({
        modelYear: yearFilter,
        manufacturer: manufacturer
      });
    } else {
      items = <Array<MultiDataExperimentItemModel>>collection.where({
        manufacturer: manufacturer
      });
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
      radarChartCollection.add(radarChartModel);
    });
    return radarChartCollection;
  }

  getPanelWidth(): string {
    let manuSize = this.getManufacturers().length;
    if (manuSize < 3) {
      return 'col-md-6'
    } else {
      return 'col-md-4'
    }
  }

  getManufacturers() {
    if (this.manufacturers.selectable.getSelected().length > 0) {
      return this.manufacturers.selectable.getSelected();
    } else {
      return this.manufacturers;
    }
  }

  ngOnInit(): void {
      this.setRadarChartCollectionPerManufacturer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.filterByYear){
      this.setRadarChartCollectionPerManufacturer();
    }
  }

  ngAfterViewChecked(): void {
    // let wasVisible = this.elIsVisible;
    // this.elIsVisible = !!this.el.nativeElement.offsetParent;
    // if (!wasVisible && this.elIsVisible) {
    //   this.ngOnInit();
    // }
  }
}
