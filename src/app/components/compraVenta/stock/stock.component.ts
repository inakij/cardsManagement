import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { VentasService } from '../../../services/ventas.service';
import { ICarta, Carta } from '../../../models/carta';
import { IVenta, Venta } from '../../../models/venta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  private stock: ICarta[];
  private venta: IVenta;
  public carritoDisabled: boolean;

  constructor(private stockService: StockService, private ventasService: VentasService, private router: Router) { }

  ngOnInit() {
    this.stockService.getCartas().subscribe(stock=>this.stock = stock);
    this.venta = this.ventasService.getVenta();
    this.carritoDisabled = this.venta.cartasVendidas.length === 0;
  }

  addToCart(carta: ICarta){
    console.log(carta);    
    this.venta.cartasVendidas.push(carta);
    this.stock.splice(this.stock.findIndex(cartaStock => cartaStock._id === carta._id), 1);
    this.carritoDisabled = false;
    console.log(this.venta);
  }

  verCarrito(){
    //TODO go to venta
    this.ventasService.setVenta(this.venta);
    this.router.navigate(['ventas/new']);
  }

}