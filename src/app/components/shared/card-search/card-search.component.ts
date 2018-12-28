import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { IApiCard, ApiCard } from '../../../models/api-card';
import { IApiSet, ApiSet } from '../../../models/api-set';
import { ICardsReturn, ISetsReturn, CardsReturn, SetsReturn } from '../../../models/return-types';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CardApiSearchService } from '../../../services/card-api-search.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  @Input() reset: number;
  @Output() searchedCardsOutput = new EventEmitter<IApiCard[]>()

  public apiCards: ApiCard[];
  public cartaABuscar: string;
  public expansionABuscar: string;
  public versionABuscar: string;
  public cartasBuscadas: IApiCard[];
  public expansiones: { code: string, name: string }[];
  public versiones: string[];
  public sets: IApiSet[];

  constructor(private cardApiSearch: CardApiSearchService) {

  }

  ngOnInit() {
    this.resetFields();
    this.sets = [];
    this.cardApiSearch.getAllSets().subscribe(sets => {
      this.sets = sets.getSets();
    });
  }

  private resetFields() {
    this.apiCards = [];
    this.cartaABuscar = '';
    this.expansionABuscar = '';
    this.versionABuscar = '';
    this.cartasBuscadas = [];
    this.expansiones = [];
    this.versiones = [];
  }

  ngOnChanges(changes: SimpleChanges) {   
    const reset: SimpleChange = changes.reset;
    if (reset.currentValue>reset.previousValue) {
      this.resetFields();
    }
  }
  
  /**
   * Typeahead para buscar por nombre
   */
  public search = (text$?: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.cardApiSearch.getCardsByName(term)
        .pipe(map(cards => {
          this.cartasBuscadas = cards.getCards();
          this.apiCards = cards.getCards();
          this.emitSearchedCards();
          return cards.getCardNames();
        })
        )));


  autocompletarExpansion() {
    this.expansionABuscar = '';
    this.versionABuscar = '';
    this.versiones = [];
    if (this.cartasBuscadas.some(carta => carta.name === this.cartaABuscar)) {
      this.expansiones = this.cartasBuscadas.find(carta => carta.name === this.cartaABuscar).printings.map(code => {
        return {
          code: code,
          name: this.sets.find(set => set.code == code).name
        };
      });
      this.apiCards = this.cartasBuscadas.filter(carta => carta.name === this.cartaABuscar);
      this.emitSearchedCards();
    } else {
      this.expansiones = [];
    }
  }

  autocompletarVersion() {
    if (this.expansionABuscar !== "") {
      this.versiones.length = 0;
      this.cardApiSearch.getCardsByNameAndSet(this.cartaABuscar, this.expansionABuscar)
        .subscribe((cartas: ICardsReturn) => {
          cartas.getCards().forEach((carta: IApiCard) => this.versiones.push(carta.id));
          this.apiCards = cartas.getCards();
          this.emitSearchedCards();          
        });
    } else {
      this.versionABuscar = '';
    }
  }

  buscarCartaConVersion(){
    if(this.versionABuscar !== ''){
      this.cardApiSearch.getCardById(this.versionABuscar).subscribe(data=>{
        this.apiCards=data.getCards();
        this.emitSearchedCards();
        });
    }
  }

  emitSearchedCards() {
    this.searchedCardsOutput.emit(this.apiCards);
  }
}