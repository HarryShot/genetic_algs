import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {Component, Input} from "@angular/core";
import {TableDataInterface} from "../tableData.interface";

@Component({
  standalone: true,
  selector: 'chart-comp',
  templateUrl: './chart.component.html'
})
export class ChartComponent {

  private _tableData: Array<TableDataInterface> = [];
  private _chart: any

  private colors = ['red', 'green', 'blue', 'orange', 'purple'];

  @Input()
  public set tableData(val: Array<TableDataInterface>){
    if (val.length){
      this._tableData = val;
      const dataSets = val.map((val, index) => ({
        label: `experiment ${index + 1}`,
        data: val.generations.map(item => item.bestInGen.accordance),
        borderColor: this.colors[index]
      }));
      const data = {
        labels: val[0].generations.map(item => `Generation ${item.number}`),
        datasets: dataSets,
      }

      if(!this._chart){
        this._chart = new Chart("myChart", {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Genetic algorithms'
              }
            }
          },
        })
      } else {
        this._chart.data = data;
        this._chart.update();
      }


    }
  }
}
