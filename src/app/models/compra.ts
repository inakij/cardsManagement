import { Estados } from './estados.enum';
import { ICarta, Carta } from './carta';
import * as moment from 'moment';

export interface ICompra {
  _id: string;
  numCompra: string;
  vendedor: string;
  numArticulos: number;
  fechaCompra: string;
  fechaLlegada: string;
  estadoCompra: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasCompradasArray: ICarta[];
}

export class Compra implements ICompra {
  _id: string;
  numCompra: string;
  vendedor: string;
  numArticulos: number;
  fechaCompra: string;
  fechaLlegada: string;
  estadoCompra: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasCompradasArray: ICarta[];

  constructor() {
    this.vendedor = 'peterkrouch';
    this.numArticulos = 7;
    this.fechaCompra = moment(new Date()).format("YYYY-MM-DD");
    this.importeTotal = 100;
    this.gastosEnvio = 0;
    this.otrosGastos = 0;
    this.refund = 0;
    this.mkm = false;
    this.cartasCompradasArray = [];
  }
}