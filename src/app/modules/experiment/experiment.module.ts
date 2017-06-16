import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BackboneModule} from '../backbone/backbone.module';
import {CircleExperimentRoutingModule} from './experiment.routes';
import {CircleExperimentComponent} from './components/circle-experiment/circle-experiment.component';
import {RandomSizeDirective} from './directives/random-size.directive';
import {SharedModule} from '../shared/shared.module';
import {CircleExperimentResultComponent} from './components/results/circle-experiment-result/circle-experiment-result.component';
import {CircleExperimentResultsComponent} from './components/results/circle-experiment-results/circle-experiment-results.component';
import {PerceptionExperimentComponent} from './components/perception-experiment/perception-experiment.component';
import {HideAfterTimeComponent} from './components/perception-experiment/hide-after-time/hide-after-time.component';
import {TargetFinderAreasComponent} from './components/perception-experiment/target-finder-areas/target-finder-areas.component';
import {PerceptionExperimentResultsComponent} from './components/results/perception-experiment-results/perception-experiment-results.component';
import {MultiDataDimensionExperimentComponent} from './components/multi-data-dimension-experiment/multi-data-dimension-experiment.component';
import {DataPerManufacturerComponent} from './components/multi-data-dimension-experiment/data-per-manufacturer/data-per-manufacturer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    CircleExperimentRoutingModule,
    BackboneModule
  ],
  declarations: [
    CircleExperimentComponent,
    PerceptionExperimentComponent,
    TargetFinderAreasComponent,
    HideAfterTimeComponent,
    CircleExperimentResultComponent,
    CircleExperimentResultsComponent,
    PerceptionExperimentResultsComponent,
    DataPerManufacturerComponent,
    MultiDataDimensionExperimentComponent,
    RandomSizeDirective
  ]
})

export class ExperimentModule {
}
