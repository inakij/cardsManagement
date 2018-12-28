import { Estados } from './estados.enum';
import { IApiCard } from './api-card';
import { ICardStatus } from './card-status';

export interface ICarta {
  id: string;
  apiId: string;
  imagen: string;
  nombre: string;
  edicion: string;
  idioma: string;
  estadoCompra: Estados;
  estadoVenta: Estados;
  foil: boolean;
  firmado: boolean;
  alterado: boolean;
  precioCompra: number;
  precionVenta: number;

  mapFromApiCard(card: IApiCard);
  mapFromStatus(status: ICardStatus);
}

export class Carta implements ICarta{
  public id: string;
  public apiId: string;
  public imagen: string;
  public nombre: string;
  public edicion: string;
  public idioma: string;
  public estadoCompra: Estados;
  public estadoVenta: Estados;
  public foil: boolean;
  public firmado: boolean;
  public alterado: boolean;
  public precioCompra: number;
  public precionVenta: number;

  constructor(){
    this.id = '';
    this.apiId = '';
    this.imagen = '';    
    this.nombre = '';
    this.edicion = '';
    this.idioma = '';
    this.estadoCompra = Estados.Poor;
    this.estadoVenta = Estados.Poor;
    this.foil = false;
    this.firmado = false;
    this.alterado = false;
    this.precioCompra = 0;
    this.precionVenta = 0;
  }

  mapFromApiCard(card: IApiCard){
    this.apiId = card.id;
    this.imagen = card.imageUrl;    
    this.nombre = card.name;
    this.edicion = card.set;
  }

  mapFromStatus(status: ICardStatus){
    this.idioma = status.idioma;
    this.estadoCompra = status.estado;
    this.foil = status.foil;
    this.firmado = status.firmado;
    this.alterado = status.alterado;
  }
}