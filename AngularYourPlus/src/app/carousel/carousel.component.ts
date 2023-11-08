import { Component, OnInit } from "@angular/core";
import { CargarScriptsService } from "../cargar-scripts.service";
@Component ({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],

})
export class CarouselComponent implements OnInit{
  constructor(private _cargarScripts:CargarScriptsService){
    _cargarScripts.carga(["carousel"]);
  }
  ngOnInit(): void {}

}
