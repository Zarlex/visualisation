import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {RangeSliderComponent} from './components/range-slider/range-slider.component';
import {WizardComponent} from './components/wizard/wizard.component';
import {WizardEntryComponent} from './components/wizard/wizard-entry/wizard-entry.component';
import {DeviationChartComponent} from './components/deviation-chart/deviation-chart.component';
import {RandomElementPlacingComponent} from './components/random-element-placing/random-element-placing.component';
import {PerceptionChartComponent} from './components/perception-chart/perception-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    DeviationChartComponent,
    PerceptionChartComponent,
    RangeSliderComponent,
    WizardComponent,
    WizardEntryComponent,
    RandomElementPlacingComponent
  ],
  exports: [
    DeviationChartComponent,
    PerceptionChartComponent,
    RangeSliderComponent,
    WizardComponent,
    WizardEntryComponent,
    RandomElementPlacingComponent
  ]
})
export class SharedModule {
}
