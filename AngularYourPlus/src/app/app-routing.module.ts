import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { ProductoComponent } from './producto/producto.component';
import { HomeproductoComponent } from './homeproducto/homeproducto.component';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';

const routes: Routes = [


  {path: 'producto', component: ProductoComponent},
  {path: 'homeproducto', component: HomeproductoComponent},
  {path: 'list-productos', component: ListProductosComponent},
  {path: 'laboratorio', component: LaboratorioComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
