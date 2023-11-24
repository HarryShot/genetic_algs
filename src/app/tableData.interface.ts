import {IndividualInterface} from "./individual.interface";

export interface TableDataInterface{
  populationSize: number;
  bestIndividual: IndividualInterface | undefined;
  generations: Array<{
    number: number;
    bestInGen: IndividualInterface;
  }>
}
