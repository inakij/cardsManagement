import { Estados } from './estados.enum';
import { IApiCard } from './api-card';
import { ICardStatus } from './card-status';

export interface ICarta {
  _id: string;
  idCompra: string;
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
  precioTotal: number;
  precionVenta: number;
  cantidad: number;
  observaciones: string;
  vendido: boolean;
  fechaVenta: Date;

  mapFromApiCard(card: IApiCard);
  mapFromStatus(status: ICardStatus);
}

export class Carta implements ICarta{
  public _id: string;
  public idCompra: string;
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
  public precioTotal: number;
  public precionVenta: number;
  public cantidad: number;
  public observaciones: string;
  public vendido: boolean;
  public fechaVenta: Date;

  constructor(){
    this.estadoCompra = Estados.Poor;
    this.estadoVenta = Estados.Poor;
    this.foil = false;
    this.firmado = false;
    this.alterado = false;
    this.precioCompra = 0;
    this.precioTotal = 0;
    this.precionVenta = 0;
    this.cantidad = 1;
    this.vendido = false;
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