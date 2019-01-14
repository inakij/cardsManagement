import { Injectable } from '@angular/core';
import { Venta, IVenta } from '../models/venta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './http-resources.enum';
import { ICarta, Carta } from '../models/carta';
import { ICompra, Compra } from '../models/compra';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VentasService {

  private endpoit: string = urls.clou9ServerURL;
  private venta: IVenta = null;

  constructor(private http: HttpClient) { }

  getVenta(): IVenta {    
    if(!this.venta){
      this.venta = new Venta();
    }
    return this.venta;
  }

  setVenta(venta: IVenta){
    this.venta = venta;
  }
}