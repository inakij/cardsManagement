import { Component, OnInit } from '@angular/core';
import { CardStatus, ICardStatus } from '../../../models/card-status';
import { IApiCard } from '../../../models/api-card';
import { ICarta, Carta } from '../../../models/carta';
import { ICompra, Compra } from '../../../models/compra';
import { Regex } from '../../../models/regex.enum'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Estados } from '../../../models/estados.enum';
import { ComprasService } from '../../../services/compras.service';
import { CardApiSearchService } from '../../../services/card-api-search.service';
import { ValidatorService } from '../../../services/validator.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public cards: IApiCard[];
  public carta: ICarta;
  public compraForm: FormGroup;
  public cartaForm: FormGroup;
  public addDisabled: boolean;
  public cardStatus: ICardStatus;
  public resetOptions: number;
  private compra: ICompra;
  private id: string;

  constructor(
    private fb: FormBuilder, 
    private comprasService: ComprasService, 
    private route: ActivatedRoute, 
    private validatorService: ValidatorService,
    private stockService: StockService) {
    this.compra = new Compra();
    this.generarForm();
  }

  ngOnInit() {
    this.cards = [];
    this.carta = new Carta();
    this.addDisabled = true;
    this.cardStatus = new CardStatus();
    this.resetOptions = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (!this.id) {
        this.populateForm();
      } else {
        this.comprasService.getCompra(this.id).subscribe(compra => {
          if (compra) {
            this.compra = compra;
          }
          this.populateForm();
        });
      }
    });
  }

  onSubmit({ value, valid }: { value: ICompra, valid: boolean }) {
    console.log('submit');
    if (!this.id) {
      console.log('new');
      this.comprasService.createCompra(value).subscribe(compra => {
        console.log(compra);
        if (compra) {
          //TODO mensaje guardado OK
          console.log('Guardado OK');
          this.compra = compra;
          this.generarForm();
          this.populateForm();          
        }
      });
    } else {
      console.log('update');
      this.comprasService.updateCompra(value).subscribe(compra => {
        console.log(compra);
        if (compra) {
          //TODO mensaje guardado OK
          console.log('Modificado OK');
          this.compra = compra;
          this.generarForm();
          this.populateForm();
        }
      });      
    }
    this.stockService.getStock().subscribe();
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

  generarForm() {
    this.compraForm = this.fb.group({
      _id: [''],
      numCompra: [''],
      vendedor: ['', Validators.required],
      numArticulos: [0, [Validators.required, Validators.pattern(Regex.numeroEntero)]],
      fechaCompra: ['', Validators.required],
      fechaLlegada: [''],
      estadoCompra: [''],
      importeTotal: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      valorArticulos: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      gastosEnvio: [0, Validators.pattern(Regex.numeroConDecimales)],
      otrosGastos: [0, Validators.pattern(Regex.numeroConDecimales)],
      refund: [0, Validators.pattern(Regex.numeroConDecimales)],
      mkm: [false],
      observaciones: [''],
      cartasCompradasArray: this.fb.array([], this.validatorService.minLengthArray(1))
    });
  }

  populateForm() {
    this.compraForm.patchValue({
      _id: this.compra._id,
      numCompra: this.compra.numCompra,
      vendedor: this.compra.vendedor,
      numArticulos: this.compra.numArticulos,
      fechaCompra: this.compra.fechaCompra,
      fechaLlegada: this.compra.fechaLlegada,
      estadoCompra: this.compra.estadoCompra,
      importeTotal: this.compra.importeTotal,
      valorArticulos: 0,
      gastosEnvio: this.compra.gastosEnvio,
      otrosGastos: this.compra.otrosGastos,
      refund: this.compra.refund,
      mkm: this.compra.mkm,
      observaciones: this.compra.observaciones,
      cartasCompradasArray: []
    });
    this.compra.cartasCompradasArray.forEach(carta => {
      this.generarCarta(carta);
    });
  }

  initCarta() {
    return this.fb.group({
      _id: [''],
      idCompra: [''],
      idVenta: [''],
      cantidad: [0, [Validators.required, Validators.pattern(Regex.numeroEntero)]],
      precioCompra: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      precioVenta: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      observaciones: [''],
      estadoVenta: [Estados.Poor],
      apiId: [''],
      imagen: [''],
      nombre: ['', Validators.required],
      edicion: ['', Validators.required],
      idioma: ['', Validators.required],
      estadoCompra: [Estados.Poor, Validators.required],
      foil: [false],
      firmado: [false],
      alterado: [false],
      precioTotal: [0, {disabled: true}],
      vendido: [false],
      fechaVenta: ['']
    });
  }

  populateCarta(carta: ICarta) {
    this.cartaForm.patchValue({
      _id: carta._id,
      idCompra: carta.idCompra,
      idVenta: carta.idVenta,
      cantidad: carta.cantidad,
      precioCompra: carta.precioCompra,
      precioVenta: carta.precioVenta,
      observaciones: carta.observaciones,
      estadoVenta: Estados.Poor,
      apiId: carta.apiId,
      imagen: carta.imagen,
      nombre: carta.nombre,
      edicion: carta.edicion,
      idioma: carta.idioma,
      estadoCompra: carta.estadoCompra,
      foil: carta.foil,
      firmado: carta.firmado,
      alterado: carta.alterado,
      precioTotal: carta.precioTotal,
      vendido: carta.vendido,
      fechaVenta: carta.fechaVenta
    });
  }

  crearFormCarta(carta: ICarta) {
    this.cartaForm = this.initCarta();
    this.populateCarta(carta);
  }

  addCarta() {
    let carta: ICarta = new Carta();
    carta.mapFromApiCard(this.cards[0]);
    carta.mapFromStatus(this.cardStatus);
    this.generarCarta(carta);
  }

  generarCarta(carta: ICarta) {
    const cartas = this.getCartasCompradas();
    this.crearFormCarta(carta);
    cartas.push(this.cartaForm);
    this.addDisabled = true;
    this.resetOptions++;
  }

  removeCarta(indexCarta: number) {
    this.getCartasCompradas().removeAt(indexCarta);
  }

  /**
   * Divide una compra en unidades
   */
  splitCarta(indexCarta: number) {
    let cantidad: number = (<FormGroup>this.getCartasCompradas().controls[indexCarta]).controls.cantidad.value;
    let carta: ICarta = new Carta();
    Object.assign(carta, <FormGroup>this.getCartasCompradas().controls[indexCarta].value);
    carta.precioCompra = carta.precioCompra / cantidad;
    carta.cantidad = 1;
    for (let forIndex = 0; forIndex < cantidad; forIndex++) {
      //this.getCartasCompradas().push(this.initCarta(this.cartasGuardadas[indexCarta]));
      this.crearFormCarta(carta);
      this.getCartasCompradas().push(this.cartaForm);
    }
    this.getCartasCompradas().removeAt(indexCarta);
  }

  /**
   * Calcula los precios reales de las cartas basandose se los gastos
   */
  calcularTotales({ value, valid }: { value: ICompra, valid: boolean }){
    //gastosEnvio + otrosGastos - refund
    const gatosTotales: number = Number(value.gastosEnvio) + Number(value.otrosGastos) - Number(value.refund);
    const cartas = value.cartasCompradasArray;
    const ctdCartas = cartas.reduce((prev, carta, index)=>prev+=carta.cantidad, 0)
    const ctdAdd = gatosTotales/ctdCartas;
    cartas.map(carta=>carta.precioTotal = carta.precioCompra + (ctdAdd*carta.cantidad));
    this.getCartasCompradas().controls.forEach((fg, index)=>fg.patchValue(cartas[index]));
  }

  /**
   * @returns Array de cartas compradas
   */
  getCartasCompradas(): FormArray {
    return this.compraForm.get('cartasCompradasArray') as FormArray;
  }
}