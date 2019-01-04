import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './http-resources.enum';
import { ICarta, Carta } from '../models/carta';
import { ICompra, Compra } from '../models/compra';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ComprasService {

  private endpoint: string = urls.clou9ServerURL;
  private headers : HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getCompras(): Observable<Array<ICompra>> {
    let url = this.endpoint + 'compras';
    return this.http.get<Array<ICompra>>(url);
      // .pipe(map((data: ICompra[]) => {
      //   console.log(data);
      //   return data;
      // }));
  }

  getCompra(id: string): Observable<ICompra> {
    let url = this.endpoint + 'compra/' + id;
    return this.http.get<ICompra>(url);
    // .pipe(map((data: ICompra) => {
    //   console.log(data);
    //   return data;
    // }));
  }

  createCompra(compra: ICompra): Observable<any> {
    console.dir(compra);
    let url = this.endpoint + 'compra';
    return this.http.post(url, compra);
    // .subscribe(data => {
    //   console.log(data);
    // });
  }

  updateCompra(compra: ICompra): Observable<any> {
    let url = this.endpoint + 'compra/' + compra._id;
    return this.http.patch(url, compra);
    // .subscribe(data => {
    //   console.log(data);
    // });
  }

  deleteCompra(id: string): Observable<any> {
    let url = this.endpoint + 'compra/' + id;
    return this.http.delete(url);
    // .subscribe(data => {
    //   console.log(data);
    // });
  }
}