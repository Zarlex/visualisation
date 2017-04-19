import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {isNumber, findWhere} from 'underscore';

@Component({
  selector: 'deviation-chart',
  styles: [ require('./deviation-chart.style.scss') ],
  template: require('./deviation-chart.template.html')
})

export class DeviationChartComponent implements OnInit{
  @Input()
  public values: Array<number>;

  @Input()
  public highlight: number;

  @Input()
  public xLabel: string;

  @Input()
  public yLabel: string;

  public results:Array<any> = [];

  public bars = [0,10,20,30,40,50,60,70,80,90,100];

  public average: number = 0;

  public getPercentageVal(key:string): number {
    let existing = findWhere(this.results,{key: key});
    if(existing && this.values.length > 0){
      return ( (existing.amount/this.values.length)*10 );
    } else {
      return 1;
    }
  }

  public hasHighlight(){
    return isNumber(this.highlight);
  }

  private setResults(): void{
    if(this.values.length>0){
      this.results = [];
      let total: number = 0;
      this.values.forEach((value)=>{
        let existing = findWhere(this.results,{key: value});
        if(existing){
          existing.amount++;
        } else {
          this.results.push({
            key: value,
            amount: 1
          })
        }
        total+=value;
      });
      this.average = Math.round(total/this.values.length*100)/100;
    }
  }

  ngOnInit(): void {
    this.setResults();
  }

  ngOnChanges() {
    this.setResults();
  }
}
