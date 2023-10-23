import { Component, OnInit} from "@angular/core";
import { CargarScriptsService } from "./../cargar-scripts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']

})
export  class LoginComponent implements OnInit{
  constructor(private _cargarScripts:CargarScriptsService){
    _cargarScripts.carga(["popup-login"]);
  }

  ngOnInit(): void {
  }

}
