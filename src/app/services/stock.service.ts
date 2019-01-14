import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './http-resources.enum';
import { ICarta, Carta } from '../models/carta';
import { ICompra, Compra } from '../models/compra';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StockService {

  private endpoint: string = urls.clou9ServerURL;
  private headers: HttpHeaders = new HttpHeaders();
  private stock: ICarta[] = null;

  constructor(private http: HttpClient) { }

  getCartas(): Observable<Array<ICarta>> {
    let url = this.endpoint + 'cartas';
    if (this.stock) {
      return Observable.create(observer => observer.next(this.stock));
    }
    return this.http.get<Array<ICarta>>(url).pipe(map(stock => {
      this.stock = [];
      this.stock.push(...stock);
      return stock;
    }));
  }

}