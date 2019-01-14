import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';

//ROUTING
import { AppRoutingModule, routingComponents } from './app-routing.module';

//SERVICES
import { CardApiSearchService } from './services/card-api-search.service';
import { ComprasService } from './services/compras.service';
import { StockService } from './services/stock.service';
import { VentasService } from './services/ventas.service';

//COMPONENTS
import { AppComponent } from './app.component';
import { CardSearchComponent } from './components/shared/card-search/card-search.component';
import { CardStatusComponent } from './components/shared/card-status/card-status.component';
import { CartaCompradaComponent } from './components/compraVenta/carta-comprada/carta-comprada.component';

//PIPES
import { EnumPipe } from './pipes/enum.pipe';

@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgbModule.forRoot(), 
    HttpClientModule 
    ],
  declarations: [ 
    AppComponent, 
    routingComponents, 
    CardSearchComponent, 
    CardStatusComponent, 
    EnumPipe, 
    CartaCompradaComponent
    ],
  bootstrap:    [ AppComponent ],
  providers: [ 
    CardApiSearchService, 
    ComprasService, 
    StockService, 
    VentasService 
    ]
})
export class AppModule { }
