import { IApiCard, ApiCard } from '../models/api-card';
import { IApiSet, ApiSet } from '../models/api-set';

export interface ICardsReturn {
  cards: IApiCard[];
  getCards(): IApiCard[];
  getCardNames(): string[];
}

export class CardsReturn implements ICardsReturn {
  public cards: IApiCard[];

  constructor(cards :IApiCard[]) {
    this.cards = [];
    this.cards.push(...cards);
  }

  public getCards(): IApiCard[] {
    return this.cards;
  }
  public getCardNames(): string[] {
    return this.cards.reduce((cartasNombres, carta) => {
      if (!cartasNombres.some(name => name === carta.name)) {
        cartasNombres.push(carta.name);
      }
      return cartasNombres;
    }, []);
  }
}

export interface ISetsReturn {
  sets: IApiSet[];
  getSets(): IApiSet[];
}

export class SetsReturn implements ISetsReturn {
  public sets: IApiSet[];

  constructor(sets: IApiSet[]) {
    this.sets = [];
    this.sets.push(...sets);
  }

  public getSets(): IApiSet[] {
    return this.sets;
  }
}