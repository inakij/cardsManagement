import { Estados } from './estados.enum';

export interface ICardStatus {
  idioma: string;
  estado: Estados;
  foil: boolean;
  firmado: boolean;
  alterado: boolean;
}

export class CardStatus implements ICardStatus {  
  public idioma: string;
  public estado: Estados;
  public foil: boolean;
  public firmado: boolean;
  public alterado: boolean;

  constructor() {
    this.idioma = 'English';
    this.estado = Estados.Poor;
    this.foil = false;
    this.firmado = false;
    this.alterado = false;
  }
}