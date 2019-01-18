import { Estados } from './estados.enum';
import { ICarta, Carta } from './carta';
import moment from 'moment';

export interface IVenta {
  _id: string;
  numVenta: string;
  comprador: string;
  numArticulos: number;
  fechaVenta: string;
  fechaLlegada: string;
  estadoVenta: string;
  importeTotal: number;
  gastosEnvio: number;
  costeEnvio: number;
  otrosCostes: number;
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
  public fechaVenta: string;
  public fechaLlegada: string;
  public estadoVenta: string;
  public importeTotal: number;
  public gastosEnvio: number;
  public costeEnvio: number;
  public otrosCostes: number;
  public refund: number;
  public mkm: boolean;
  public observaciones: string;
  public cartasVendidas: ICarta[];

  constructor(){
    this.numVenta = '';
    this.comprador = '';
    this.numArticulos = 0;
    this.fechaVenta = moment(new Date()).format("YYYY-MM-DD");
    this.fechaLlegada = null;
    this.estadoVenta = '';
    this.importeTotal = 0;
    this.gastosEnvio = 0;
    this.costeEnvio = 0;
    this.otrosCostes = 0;
    this.refund = 0;
    this.mkm = false;
    this.observaciones = '';
    this.cartasVendidas = [];
  }
}