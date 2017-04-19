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
    CircleExperimentResultComponent,
    CircleExperimentResultsComponent,
    RandomSizeDirective
  ]
})

export class ExperimentModule {
}
