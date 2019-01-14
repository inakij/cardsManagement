import { Injectable } from '@angular/core';
import { ICardsReturn, ISetsReturn, CardsReturn, SetsReturn } from '../models/return-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './http-resources.enum';
import { IApiCard } from '../models/api-card';

@Injectable()
export class CardApiSearchService {

  private endpoint: string = urls.mtgAPIURL;
  private version: string;
  private searchterm: string;
  private sets: ISetsReturn = null;
  private searchedTerms: Array<{ term: string, data: Array<IApiCard> }> = [];

  constructor(private http: HttpClient) { }

  getCardsByName(searchName: string, version?: number): Observable<ICardsReturn> {
    if (this.searchedTerms.some(search => search.term.toLowerCase() === searchName.toLowerCase())) {
      return Observable.create(observer => observer.next(new CardsReturn(this.searchedTerms.find(search => search.term.toLowerCase() === searchName.toLowerCase()).data)));
    }
    this.version = version ? 'v' + version.toString() : 'v1';
    this.searchterm = '/cards';
    const url = this.endpoint + this.version + this.searchterm + '?name=' + searchName;
    return this.http.get<{ cards }>(url).pipe(map(data => {
      const busqueda = { term: searchName, data: data.cards };
      this.searchedTerms.push(busqueda);
      return new CardsReturn(data.cards);
    }))
  }

  getCardById(id: number | string, version?: number): Observable<ICardsReturn> {
    this.version = version ? 'v' + version.toString() : 'v1';
    this.searchterm = '/cards/';
    const url = this.endpoint + this.version + this.searchterm + id;
    return this.http.get<{ card }>(url).pipe(map(data => new CardsReturn([data.card])));
  }

  getCardsByNameAndSet(searchName: string, searchSet: string, version?: number): Observable<ICardsReturn> {
    this.version = version ? 'v' + version.toString() : 'v1';
    this.searchterm = '/cards';
    const url = this.endpoint + this.version + this.searchterm + '?name=' + searchName + '&set=' + searchSet;
    return this.http.get<{ cards }>(url).pipe(map(data => new CardsReturn(data.cards.filter(card => card.name === searchName))));
  }

  getAllSets(): Observable<ISetsReturn> {
    if (this.sets) {
      return Observable.create(observer => observer.next(this.sets));
    } else {
      this.version = 'v1';
      this.searchterm = '/sets';
      const url = this.endpoint + this.version + this.searchterm;
      return this.http.get<{ sets }>(url).pipe(map(data => {
        this.sets = new SetsReturn(data.sets);
        return new SetsReturn(data.sets);
      }));
    }
  }

  getSetById(id: string, version?: number): Observable<ISetsReturn> {
    this.version = version ? 'v' + version.toString() : 'v1';
    this.searchterm = '/sets/';
    const url = this.endpoint + this.version + this.searchterm + id;
    return this.http.get<{ set }>(url).pipe(map(data => new SetsReturn([data.set])));
  }
}