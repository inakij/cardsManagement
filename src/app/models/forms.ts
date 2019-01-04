import { ICarta, Carta } from './carta';
import { Estados } from './estados.enum';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

export interface ICompraForm {
  
  numPedido: FormControl,  
  vendedor: FormControl,
  numArticulos: FormControl,
  fechaCompra: FormControl,
  fechaLlegada: FormControl,
  estadoPedido: FormControl,
  importeTotal: FormControl,
  valorArticulos: FormControl,
  gastosEnvio: FormControl,
  otrosGastos: FormControl,
  refund: FormControl,
  mkm: FormControl,
  observaciones: FormControl,
  cartasCompradasArray: FormArray;
  
}

export interface ICartaForm {
  cantidad: number;
  precioCompra: number;
  precioVenta: number;
  observacionesCarta: string;
  estadoVenta: Estados;
}