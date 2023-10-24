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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestimoniesComponent,
    CarouselComponent,
    checkinComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
