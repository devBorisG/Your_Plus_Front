import { Component, OnInit } from "@angular/core";

import { CargarScriptsService } from "./../cargar-scripts.service";

@Component ({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],

})
export class checkinComponent implements OnInit{

  constructor(private _cargarScripts:CargarScriptsService){
    _cargarScripts.carga(["popup-checkin"]);
  }

  ngOnInit(){

  }



}
