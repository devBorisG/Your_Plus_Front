import { Component, OnInit} from "@angular/core";
import { CargarScriptsService } from "../cargar-scripts.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']

})
export  class HeaderComponent implements OnInit{
  constructor(private _cargarScripts:CargarScriptsService){
    _cargarScripts.carga(["menu-sroll"]);
  }

  ngOnInit(): any {
  }

}
