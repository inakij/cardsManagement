import { Estados } from './estados.enum';
import { ICarta, Carta } from './carta';

export interface IVenta {
  _id: string;
  numVenta: string;
  comprador: string;
  numArticulos: number;
  fechaVenta: Date;
  fechaLlegada: Date;
  estadoVenta: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasVendidas: ICarta[];
}

export class Venta {
  public _id: string;
  public numVenta: string;
  public comprador: string;
  public numArticulos: number;
  public fechaVenta: Date;
  public fechaLlegada: Date;
  public estadoVenta: string;
  public importeTotal: number;
  public gastosEnvio: number;
  public otrosGastos: number;
  public refund: number;
  public mkm: boolean;
  public observaciones: string;
  public cartasVendidas: ICarta[];

  constructor(){
    this.numVenta = '';
    this.comprador = '';
    this.numArticulos = 0;
    this.fechaVenta = null;
    this.fechaLlegada = null;
    this.estadoVenta = '';
    this.importeTotal = 0;
    this.gastosEnvio = 0;
    this.otrosGastos = 0;
    this.refund = 0;
    this.mkm = false;
    this.observaciones = '';
    this.cartasVendidas = [];
  }
}