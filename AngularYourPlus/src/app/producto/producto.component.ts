import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from "../cargar-scripts.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private _cargarScripts:CargarScriptsService, private router: Router){
    _cargarScripts.carga(["headerProducto"]);
  }

  ngOnInit(): void {
    this._cargarScripts.carga(["headerProducto"]);
  }

  navegar(){
    this.router.navigate(['/list-productos'])

  }
}
