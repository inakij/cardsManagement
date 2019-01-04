import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardSearchComponent } from './components/shared/card-search/card-search.component';
import { CardStatusComponent } from './components/shared/card-status/card-status.component';
import { CardApiSearchService } from './services/card-api-search.service';
import { CompraComponent } from './components/compraVenta/compra/compra.component';
import { EnumPipe } from './pipes/enum.pipe';
import { CartaCompradaComponent } from './components/compraVenta/carta-comprada/carta-comprada.component';
import { ComprasComponent } from './components/compraVenta/compras/compras.component';
import { ComprasService } from './services/compras.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot(), HttpClientModule ],
  declarations: [ AppComponent, HomeComponent, CardSearchComponent, CardStatusComponent, CompraComponent, EnumPipe, CartaCompradaComponent, ComprasComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ CardApiSearchService, ComprasService ]
})
export class AppModule { }
