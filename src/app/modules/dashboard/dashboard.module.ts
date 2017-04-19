import {NgModule}      from '@angular/core';
import {DashboardIndexComponent}     from './components/index/index.component';
import {DashboardRoutingModule}     from './dashboard.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BackboneModule} from '../backbone/backbone.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DashboardRoutingModule,
    BackboneModule
  ],
  declarations: [
    DashboardIndexComponent
  ]
})

export class DashboardModule {
}
