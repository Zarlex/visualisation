import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CircleExperimentComponent} from './components/circle-experiment/circle-experiment.component';
import {CircleExperimentResultComponent} from './components/results/circle-experiment-result/circle-experiment-result.component';
import {CircleExperimentResultsComponent} from './components/results/circle-experiment-results/circle-experiment-results.component';
import {PerceptionExperimentComponent} from './components/perception-experiment/perception-experiment.component';
import {PerceptionExperimentResultsComponent} from './components/results/perception-experiment-results/perception-experiment-results.component';
import {MultiDataDimensionExperimentComponent} from './components/multi-data-dimension-experiment/multi-data-dimension-experiment.component';

const routes: Routes = [
  {path: 'experiments/circle', component: CircleExperimentComponent},
  {path: 'experiments/perception', component: PerceptionExperimentComponent},
  {path: 'experiments/results/circle', component: CircleExperimentResultsComponent},
  {path: 'experiments/results/circle/:id', component: CircleExperimentResultComponent},
  {path: 'experiments/results/circle/:id/all', component: CircleExperimentResultsComponent},
  {path: 'experiments/results/perception', component: PerceptionExperimentResultsComponent},
  {path: 'experiments/multi-data-dimension', component: MultiDataDimensionExperimentComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CircleExperimentRoutingModule {
}
