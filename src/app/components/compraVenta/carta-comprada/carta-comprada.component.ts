import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICarta, Carta } from '../../../models/carta';

@Component({
  selector: 'app-carta-comprada',
  templateUrl: './carta-comprada.component.html',
  styleUrls: ['./carta-comprada.component.css']
})
export class CartaCompradaComponent implements OnInit {
  
  @Input('group') group: FormGroup;
  
  @Input('carta') carta: ICarta;

  constructor() { 
  }

  ngAfterViewInit(){
    console.log(this.carta);
  }
  
  ngOnInit() {
    this.group.controls.precioCompra.valueChanges.subscribe(value=>this.carta.precioCompra = value);
  }

}