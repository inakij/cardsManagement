import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICarta, Carta } from '../../../models/carta';
import { Estados } from '../../../models/estados.enum';

@Component({
  selector: 'app-carta-vendida',
  templateUrl: './carta-vendida.component.html',
  styleUrls: ['./carta-vendida.component.css']
})
export class CartaVendidaComponent implements OnInit {

  @Input('group') group: FormGroup;  

  public estados = Estados;
  public carta: ICarta;

  constructor() { }

  ngOnInit() {
    this.group.controls.precioCompra.valueChanges.subscribe(value=>this.carta.precioCompra = value);
    this.carta = this.group.value;
  }

}