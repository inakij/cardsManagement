import { Component, OnInit } from '@angular/core';
import { CardStatus, ICardStatus } from '../../../models/card-status';
import { ICarta, Carta } from '../../../models/carta';
import { IVenta, Venta } from '../../../models/venta';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Estados } from '../../../models/estados.enum';
import { VentasService } from '../../../services/ventas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  public ventaForm: FormGroup;
  public venta: IVenta;
  public cartaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.venta = this.ventasService.getVenta();
    
    this.generateForm();
    this.populateForm();
  }

  generateForm(){
    this.ventaForm = this.fb.group({
      _id: [''],
      numVenta: [''],
      comprador: [''],
      numArticulos: [0],
      fechaVenta: [''],
      fechaLlegada: [''],
      estadoVenta: [''],
      importeTotal: [0],
      gastosEnvio: [0],
      otrosGastos: [0],
      refund: [0],
      mkm: [false],
      observaciones: [''],
      cartasVendidas: this.fb.array([])
    });
  }

  populateForm(){
    this.ventaForm.patchValue({
      _id: this.venta._id,
      numVenta: this.venta.numVenta,
      comprador: this.venta.comprador,
      numArticulos:  this.venta.numArticulos,
      fechaVenta:  this.venta.fechaVenta,
      fechaLlegada:  this.venta.fechaLlegada,
      estadoVenta:  this.venta.estadoVenta,
      importeTotal:  this.venta.importeTotal,
      gastosEnvio:  this.venta.gastosEnvio,
      otrosGastos:  this.venta.otrosGastos,
      refund:  this.venta.refund,
      mkm:  this.venta.mkm,
      observaciones:  this.venta.observaciones,
      cartasVendidas: []
    });

    this.venta.cartasVendidas.forEach(carta=>{
      this.generateCarta(carta);
    });
  }

  generateCarta(carta: ICarta){    
    this.cartaForm = this.initCarta();
    this.populateCartaForm(carta);
    this.getCartasVendidas().push(this.cartaForm);
  }

  initCarta(){
    return this.fb.group({
      _id: [''],
      cantidad: [0, Validators.required],
      precioCompra: [0],
      precioVenta: [0],
      observaciones: [''],
      estadoVenta: [Estados.Poor],
      apiId: [''],
      imagen: [''],
      nombre: [''],
      edicion: [''],
      idioma: [''],
      estadoCompra: [Estados.Poor],
      foil: [false],
      firmado: [false],
      alterado: [false],
      precioTotal: [0],
      vendido: [false],
      fechaVenta: ['']
    });
  }

  populateCartaForm(carta: ICarta) {
    this.cartaForm.patchValue({
      _id: carta._id,
      cantidad: carta.cantidad,
      precioCompra: carta.precioCompra,
      precioVenta: carta.precionVenta,
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

  /**
   * @returns Array de cartas vendidas
   */
  getCartasVendidas(): FormArray {
    return this.ventaForm.get('cartasVendidas') as FormArray;
  }
}