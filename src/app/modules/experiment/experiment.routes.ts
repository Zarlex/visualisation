import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CircleExperimentComponent} from './components/circle-experiment/circle-experiment.component';
import {CircleExperimentResultComponent} from './components/results/circle-experiment-result/circle-experiment-result.component';
import {CircleExperimentResultsComponent} from './components/results/circle-experiment-results/circle-experiment-results.component';

const routes: Routes = [
    {path: 'experiments/circle', component: CircleExperimentComponent},
    {path: 'experiments/results/circle', component: CircleExperimentResultsComponent},
    {path: 'experiments/results/circle/:id', component: CircleExperimentResultComponent},
  {path: 'experiments/results/circle/:id/all', component: CircleExperimentResultsComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CircleExperimentRoutingModule {
}
