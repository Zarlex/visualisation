import './rxjs-extensions';
import {NgModule, OnInit}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BackboneModule} from '../backbone/backbone.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MainComponent}     from './components/main/main.component';
import {MainRoutingModule}     from './main.routes';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {ExperimentModule} from '../experiment/experiment.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BackboneModule,
    SharedModule,
    DashboardModule,
    ExperimentModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    NavComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [ MainComponent ]
})
export class MainModule {
}
