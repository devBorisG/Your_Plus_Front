import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarproductoComponent } from './registrarproducto/registrarproducto.component';
import { ProductoComponent } from './producto/producto.component';
import { HomeproductoComponent } from './homeproducto/homeproducto.component';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'homeproducto', component: HomeproductoComponent },
  { path: 'registrarproducto', component: RegistrarproductoComponent }, // Corregí el nombre aquí
  { path: 'laboratorio', component: LaboratorioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
