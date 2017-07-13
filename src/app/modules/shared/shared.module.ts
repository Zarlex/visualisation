import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {RangeSliderComponent} from './components/range-slider/range-slider.component';
import {WizardComponent} from './components/wizard/wizard.component';
import {WizardEntryComponent} from './components/wizard/wizard-entry/wizard-entry.component';
import {DeviationChartComponent} from './components/deviation-chart/deviation-chart.component';
import {RandomElementPlacingComponent} from './components/random-element-placing/random-element-placing.component';
import {PerceptionChartComponent} from './components/perception-chart/perception-chart.component';
import {RadarChartComponent} from './components/radar-chart/radar-chart.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tabs/tab/tab.component';
import {ScatterPlotD3Component} from './components/scatter-plot-d3/scatter-plot-d3.component';
import {DirectedGraphD3Component} from './components/directed-graph-d3/directed-graph-d3.component';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    DeviationChartComponent,
    PerceptionChartComponent,
    RadarChartComponent,
    ScatterPlotD3Component,
    DirectedGraphD3Component,
    RangeSliderComponent,
    WizardComponent,
    WizardEntryComponent,
    TabsComponent,
    TabComponent,
    ModalComponent,
    RandomElementPlacingComponent
  ],
  exports: [
    DeviationChartComponent,
    PerceptionChartComponent,
    RadarChartComponent,
    ScatterPlotD3Component,
    DirectedGraphD3Component,
    RangeSliderComponent,
    WizardComponent,
    WizardEntryComponent,
    TabsComponent,
    TabComponent,
    ModalComponent,
    RandomElementPlacingComponent
  ]
})
export class SharedModule {
}
