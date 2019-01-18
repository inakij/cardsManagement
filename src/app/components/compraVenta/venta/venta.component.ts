import { Component, OnInit } from '@angular/core';
import { ICarta } from '../../../models/carta';
import { IVenta } from '../../../models/venta';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Estados } from '../../../models/estados.enum';
import { Regex } from '../../../models/regex.enum';
import { VentasService } from '../../../services/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { ValidatorService } from '../../../services/validator.service'

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
    private validatorService: ValidatorService) {

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
      comprador: ['', Validators.required],
      numArticulos: [0, [Validators.required, Validators.pattern(Regex.numeroEntero)]],
      fechaVenta: [''],
      fechaLlegada: [''],
      estadoVenta: [''],
      importeTotal: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      gastosEnvio: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      costeEnvio: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      otrosCostes: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      refund: [0, [Validators.required, Validators.pattern(Regex.numeroConDecimales)]],
      mkm: [false],
      observaciones: [''],
      cartasVendidas: this.fb.array([], this.validatorService.minLengthArray(1))
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
      otrosCostes:  this.venta.otrosCostes,
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
      cantidad: [0, [Validators.required, Validators.pattern(Regex.numeroEntero)]],
      precioCompra: [0, Validators.pattern(Regex.numeroConDecimales)],
      precioVenta: [0, Validators.pattern(Regex.numeroConDecimales)],
      precioVentaFinal: [0, Validators.pattern(Regex.numeroConDecimales)],
      observaciones: [''],
      estadoVenta: [Estados.Poor],
      apiId: [''],
      imagen: [''],
      nombre: [''],
      edicion: [''],
      idioma: ['', Validators.required],
      estadoCompra: [Estados.Poor],
      foil: [false],
      firmado: [false],
      alterado: [false],
      precioTotal: [0, Validators.pattern(Regex.numeroConDecimales)],
      vendido: [false],
      fechaVenta: ['']
    });
  }

  populateCartaForm(carta: ICarta) {
    this.cartaForm.patchValue({
      _id: carta._id,
      cantidad: carta.cantidad,
      precioCompra: carta.precioCompra,
      precioVenta: carta.precioVenta,
      precioVentaFinal: carta.precioVentaFinal,
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