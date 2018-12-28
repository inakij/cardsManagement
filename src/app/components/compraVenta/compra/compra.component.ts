import { Component, OnInit, OnChanges } from '@angular/core';
import { CardStatus, ICardStatus } from '../../../models/card-status';
import { ApiCard, IApiCard } from '../../../models/api-card';
import { ICarta, Carta } from '../../../models/carta';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public cards: IApiCard[];
  public carta: ICarta;
  public cartasGuardadas: ICarta[];
  public compraForm: FormGroup;
  public addDisabled: boolean;
  public cardStatus: ICardStatus;
  public resetOptions: number;

  constructor(private fb: FormBuilder) {
    this.generarForm();
  }

  ngOnInit() {
    this.cards = [];
    this.carta = new Carta();
    this.cartasGuardadas = [];
    this.addDisabled = true;
    this.cardStatus = new CardStatus();
    this.resetOptions = 0;
  }

  onSubmit() {
    console.log('submit');
  }

  onStatusChange(cardStatus: ICardStatus) {
    this.cardStatus = cardStatus;
  }

  onSearchedCardChange(serchedCards: IApiCard[]) {
    this.cards = serchedCards;
    if (this.cards.length === 1) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  onStatusReset(event) {
    console.log('status reseted');
    console.log(event);
  }

  updateInfo() {
    this.compraForm.patchValue({
      //formControls actualizados
    });
  }

  generarForm() {
    this.compraForm = this.fb.group({
      datosBasicosGrp: this.fb.group({        
        numPedido: [''],
        vendedor: [''],
        numArticulos: ['']
      }),
      estadoGrp: this.fb.group({
        fechaCompra: ['', Validators.required],
        fechaLlegada: [''],
        estadoPedido: ['']
      }),
      costesGrp: this.fb.group({
        importeTotal: ['', Validators.required],
        valorArticulos: ['', Validators.required],
        gastosEnvio: [''],
        otrosGastos: [''],
        refund: [''],
        mkm: [''],
      }),
      observaciones: [''],
      cartasCompradasArray: this.fb.array([])
    });
  }

  initCarta(): FormGroup {
    return this.fb.group({
      cantidad: [1, Validators.required],
      precioCompra: ['']
    });
  }

  addCarta() {
    let carta: ICarta = new Carta();
    carta.mapFromApiCard(this.cards[0]);
    carta.mapFromStatus(this.cardStatus);
    this.cartasGuardadas.push(carta);

    const cartas = this.getCartasCompradas();
    cartas.push(this.initCarta());
    this.addDisabled = true;
    this.resetOptions++;
  }

  removeCarta(indexCarta: number) {
    this.cartasGuardadas.splice(indexCarta, 1);

    const cartas = this.getCartasCompradas();
    cartas.removeAt(indexCarta);
    console.log(this.cartasGuardadas);
  }

  splitCarta(indexCarta: number){
    console.log(this.getCartasCompradas());
    let cantidad: number = (<FormGroup>this.getCartasCompradas().controls[indexCarta]).controls.cantidad.value;
    for(let forIndex = 0; forIndex<cantidad; forIndex++){
      this.getCartasCompradas().push(this.initCarta());
      this.cartasGuardadas.push(this.cartasGuardadas[indexCarta]);
    }
    this.getCartasCompradas().removeAt(indexCarta);
    this.cartasGuardadas.splice(indexCarta, 1);
  }

  /**
   * @returns Array de cartas compradas
   */
  getCartasCompradas(): FormArray {
    return this.compraForm.get('cartasCompradasArray') as FormArray;
  }
}