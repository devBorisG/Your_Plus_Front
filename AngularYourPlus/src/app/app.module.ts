import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Inicio service
import { CargarScriptsService } from './cargar-scripts.service';
//FIN SERVIS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { TestimoniesComponent } from './testomonies/testimonies.component';
import { CarouselComponent } from './carousel/carousel.component';
import { checkinComponent } from './checkin/check.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './producto/producto.component';
import { HomeproductoComponent} from './homeproducto/homeproducto.component';
import { RegistrarproductoComponent } from './registrarproducto/registrarproducto.component';
import { HttpClientModule } from '@angular/common/http';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestimoniesComponent,
    CarouselComponent,
    checkinComponent,
    LoginComponent,
    ProductoComponent,
    HomeproductoComponent,
    RegistrarproductoComponent,
    LaboratorioComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [
    CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
