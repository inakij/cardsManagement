import { Component, OnInit, OnChanges } from '@angular/core';
import { CardStatus, ICardStatus } from '../../../models/card-status';
import { ApiCard, IApiCard } from '../../../models/api-card';
import { ICarta, Carta } from '../../../models/carta';
import { ICompra, Compra } from '../../../models/compra';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Estados } from '../../../models/estados.enum';
import { ComprasService } from '../../../services/compras.service';


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

  constructor(private fb: FormBuilder, private comprasService: ComprasService) {
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

  onSubmit({ value, valid }: { value: ICompra, valid: boolean }) {
    console.log('submit');
    
    // this.comprasService.createCompra(value).subscribe(compraId => {
    //   console.log(compraId);
    //   if(compraId){
    //     //TODO mensaje guardado OK
    //   }
    // });
    
    //this.comprasService.getCompra('5c2f53240612980a100f2dab').subscribe(data=>console.log(data));
    //this.comprasService.getCompras().subscribe(data=>console.log(data));
    this.comprasService.deleteCompra("5c2f58398383e00acd653a42").subscribe(data=>console.log(data));
    this.generarForm();
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
      numCompra: [''],
      vendedor: [''],
      numArticulos: [0],
      fechaCompra: [''],
      fechaLlegada: [''],
      estadoCompra: [''],
      importeTotal: [0],
      valorArticulos: [0],
      gastosEnvio: [0],
      otrosGastos: [0],
      refund: [0],
      mkm: [false],
      observaciones: [''],
      cartasCompradasArray: this.fb.array([])
    });
  }

  initCarta(carta: ICarta): FormGroup {
    return this.fb.group({      
      cantidad: [1, Validators.required],
      precioCompra: [0],
      precioVenta: [0],
      observaciones: [''],
      estadoVenta: [Estados.Poor],
      apiId:[carta.apiId],
      imagen:[carta.imagen],
      nombre:[carta.nombre],
      edicion:[carta.edicion],
      idioma:[carta.idioma],
      estadoCompra:[carta.estadoCompra],
      foil:[carta.foil],
      firmado:[carta.firmado],
      alterado:[carta.alterado],
      precioTotal:[],
      vendido: [false],
      fechaVenta: [null]
    });    
  }

  addCarta() {
    let carta: ICarta = new Carta();
    carta.mapFromApiCard(this.cards[0]);
    carta.mapFromStatus(this.cardStatus);
    this.cartasGuardadas.push(carta);

    const cartas = this.getCartasCompradas();
    cartas.push(this.initCarta(carta));
    this.addDisabled = true;
    this.resetOptions++;
  }

  removeCarta(indexCarta: number) {
    this.cartasGuardadas.splice(indexCarta, 1);
    this.getCartasCompradas().removeAt(indexCarta);
  }

  /**
   * Divide una compra en unidades
   */
  splitCarta(indexCarta: number) {
    let cantidad: number = (<FormGroup>this.getCartasCompradas().controls[indexCarta]).controls.cantidad.value;
    let carta: ICarta = new Carta();
    Object.assign(carta, <FormGroup>this.getCartasCompradas().controls[indexCarta].value);
    for (let forIndex = 0; forIndex < cantidad; forIndex++) {
      //this.getCartasCompradas().push(this.initCarta(this.cartasGuardadas[indexCarta]));
      this.getCartasCompradas().push(this.initCarta(carta));
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