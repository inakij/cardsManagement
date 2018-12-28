export interface IApiCard {
  name: string;
  multiverseid: number;
  layout: any;
  names: any;
  manaCost: any;
  cmc: any;
  colors: any;
  type: any;
  types: any;
  subtypes: any;
  rarity: any;
  text: any;
  flavor: any;
  artist: any;
  number: any;
  power: any;
  toughness: any;
  reserved: any;
  rulings: any;
  printings: any;
  originalText: any;
  originalType: any;
  legalities: any;
  source: any;
  imageUrl: any;
  set: any;
  id: any;
  foreignNames: any[];
}
export class ApiCard implements IApiCard {
  public name: string;
  public multiverseid: number;
  public layout: any;
  public names: any;
  public manaCost: any;
  public cmc: any;
  public colors: any;
  public type: any;
  public types: any;
  public subtypes: any;
  public rarity: any;
  public text: any;
  public flavor: any;
  public artist: any;
  public number: any;
  public power: any;
  public toughness: any;
  public reserved: any;
  public rulings: any;
  public printings: any;
  public originalText: any;
  public originalType: any;
  public legalities: any;
  public source: any;
  public imageUrl: any;
  public set: any;
  public id: any;
  public foreignNames: any[];

  constructor(){
    this.name= null;
    this.multiverseid= null;
    this.layout= null;
    this.names= null;
    this.manaCost= null;
    this.cmc= null;
    this.colors= null;
    this.type= null;
    this.types= null;
    this.subtypes= null;
    this.rarity= null;
    this.text= null;
    this.flavor= null;
    this.artist= null;
    this.number= null;
    this.power= null;
    this.toughness= null;
    this.reserved= null;
    this.rulings= null;
    this.printings= null;
    this.originalText= null;
    this.originalType= null;
    this.legalities= null;
    this.source= null;
    this.imageUrl= null;
    this.set= null;
    this.id= null;
    this.foreignNames = [];
  }
}