import { Estados } from './estados.enum';
import { ICarta, Carta } from './carta';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

export interface IPedido {
  id: string;
  numPedido: string;
  vendedor: string;
  numArticulos: number;
  fechaCompra: Date;
  fechaLlegada: Date;
  estadoPedido: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasCompradasArray: ICarta[];
}

export class Pedido implements IPedido{
  id: string;
  numPedido: string;
  vendedor: string;
  numArticulos: number;
  fechaCompra: Date;
  fechaLlegada: Date;
  estadoPedido: string;
  importeTotal: number;
  gastosEnvio: number;
  otrosGastos: number;
  refund: number;
  mkm: boolean;
  observaciones: string;
  cartasCompradasArray: ICarta[];

  constructor() {
    this.id='';
    this.numPedido='';
    this.vendedor='';
    this.numArticulos=0;
    this.fechaCompra=null;
    this.fechaLlegada=null;
    this.estadoPedido='';
    this.importeTotal=0;
    this.gastosEnvio=0;
    this.otrosGastos=0;
    this.refund=0;
    this.mkm=false;
    this.observaciones='';
    this.cartasCompradasArray =[];
  }
}