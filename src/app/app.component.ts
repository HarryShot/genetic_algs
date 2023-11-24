import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndividualInterface} from "./individual.interface";
import {TableDataInterface} from "./tableData.interface";
import {ChartComponent} from "./chart/chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public tableData: Array<TableDataInterface> = [];
  public run() {
    this.tableData = [];
    let populationSize = 40
    for (let i = 0; i < 5; i++){
      this.geneticAlgorithm(populationSize, 10)
      populationSize *=2
    }

  }

  private condition = (x: number, y: number, z: number) => x + (Math.round(y) / (64 * x)) + (Math.round(z) / y) + 2 / z;
  private generateRandom() {
    return Math.round(Math.random() * (64 - 2) + 2);
  }
  private createPopulation(populationSize: number) {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
      const individual = {
        x: this.generateRandom(),
        y: this.generateRandom(),
        z: this.generateRandom()
      };
      population.push(individual);
    }
    return population;
  }
  private evaluatePopulation(population: Array<IndividualInterface>) {
    return population.map(individual => {
      return {
        ...individual,
        accordance: this.condition(individual.x, individual.y, individual.z)
      };

    });
  }
  private findBestIndividual(population: Array<IndividualInterface>) {
    let best = population[0];
    for (let i = 1; i < population.length; i++) {
      if (population[i].accordance! > best.accordance!) {
        best = population[i];
      }
    }
    return best;
  }
  private mutation(individual: IndividualInterface) {
    const keyToMutate = Math.floor(Math.random() * 3);

    if (keyToMutate === 0) {
      individual.x = Math.max(0, individual.x << 1);
    } else if (keyToMutate === 1) {
      individual.y = Math.max(0, individual.y << 1);
    } else {
      individual.z = Math.max(0, individual.z << 1);
    }

    return individual;
  }
  private geneticAlgorithm(populationSize: number, generations: number) {
    let population = this.createPopulation(populationSize);
    let tabData: TableDataInterface = {
      populationSize: population.length,
      generations: [],
      bestIndividual: undefined,
    }

    for (let i = 0; i < generations; i++) {
      population = this.evaluatePopulation(population);
      const bestIndividualInGen = this.findBestIndividual(population);
      tabData.generations.push({
        number: i + 1,
        bestInGen: bestIndividualInGen,
      })
      population = population.map(individual => this.mutation(individual));
    }
    tabData.bestIndividual = this.findBestIndividual(population);
    this.tableData.push(tabData)
  }
}
