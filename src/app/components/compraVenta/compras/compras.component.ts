import { Component, OnInit } from '@angular/core';
import { ICompra, Compra } from '../../../models/compra';
import { ComprasService } from '../../../services/compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public compras: ICompra[];
  public expandido: boolean[];
  constructor(private comprasService: ComprasService, private router: Router) { 
  }

  ngOnInit() {
    this.compras = [];
    this.expandido = [];
    this.comprasService.getCompras().subscribe(compras=>{
      this.compras.push(...compras);
      this.expandido.length = compras.length;
      this.expandido.fill(false, 0);
    });

  }

  expandirCompra(id: number){
    this.expandido[id] = !this.expandido[id];
  }

  editarCompra(id: string){
    this.router.navigate(['/compras', id, 'edit']);
  }

  nuevaCompra(){
    this.router.navigate(['/compras/new']);
  }

  borrarCompra(id: string){
    //TODO msg de confirmacion
    alert('borrar registro');
    //this.comprasService.deleteCompra(id).subscribe(data=>console.log(data));
    let idBorrar: number = this.compras.findIndex(compra=>compra._id === id);
    this.compras.splice(idBorrar,1);
    this.expandido.splice(idBorrar,1);
  }
}