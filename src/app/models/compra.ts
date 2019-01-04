import { Estados } from './estados.enum';
import { ICarta, Carta } from './carta';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

export interface ICompra {
  _id: string;
  numCompra: string;
  vendedor: string;
  numArticulos: number;
  fechaCompra: Date;
  fechaLlegada: Date;
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
  fechaCompra: Date;
  fechaLlegada: Date;
  estadoCompra: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasCompradasArray: ICarta[];

  constructor() {
    this.numCompra = '';
    this.vendedor = '';
    this.numArticulos = 0;
    this.fechaCompra = null;
    this.fechaLlegada = null;
    this.estadoCompra = '';
    this.importeTotal = 0;
    this.gastosEnvio = 0;
    this.otrosGastos = 0;
    this.refund = 0;
    this.mkm = false;
    this.observaciones = '';
    this.cartasCompradasArray = [];
  }
}