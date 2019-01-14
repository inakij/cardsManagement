import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompraComponent } from './components/compraVenta/compra/compra.component';
import { ComprasComponent } from './components/compraVenta/compras/compras.component';
import { StockComponent } from './components/compraVenta/stock/stock.component';
import { VentaComponent } from './components/compraVenta/venta/venta.component';
import { VentasComponent } from './components/compraVenta/ventas/ventas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full'},  
  { path: 'home', component: HomeComponent},
  { path: 'compras', component: ComprasComponent},  
  { path: 'compras/:id/edit', component: CompraComponent},
  { path: 'compras/new', component: CompraComponent},
  { path: 'stock', component: StockComponent},
  { path: 'ventas', component: VentasComponent},
  { path: 'ventas/new', component: VentaComponent},
  { path: 'ventas/:id/edit', component: VentaComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent, 
  VentaComponent, 
  VentasComponent,
  StockComponent, 
  CompraComponent, 
  ComprasComponent,
  PageNotFoundComponent
  ]