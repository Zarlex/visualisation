import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {isNumber, findWhere} from 'underscore';

@Component({
  selector: 'perception-chart',
  styles: [ require('./perception-chart.style.scss') ],
  template: require('./perception-chart.template.html')
})

export class PerceptionChartComponent implements OnInit{
  @Input()
  public values: Array<number>;

  @Input()
  public highlight: number;

  @Input()
  public xLabel: string;

  @Input()
  public yLabel: string;

  public results:Array<any> = [];

  public xBars: Array<number> = [];
  public yBars: Array<number> = [0,10,20,30,40,50,60,70,80,90,100];

  public getPercentageValue(value: number){
    return (value/1000)*100;
  }

  private setResults(): void{
    if(this.values.length>0){
      this.results = [];
      let total: number = 0;
      console.log(this.values);
      this.values.forEach((value: any)=>{
        this.xBars.push(value.amount);
        this.results.push({key: value.amount, value: value.time});
      });
    }
  }

  ngOnInit(): void {
    this.setResults();
  }

  ngOnChanges() {
    this.setResults();
  }
}
