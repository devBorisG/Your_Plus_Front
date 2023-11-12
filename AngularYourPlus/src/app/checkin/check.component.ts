import { Component, OnInit } from "@angular/core";
import { Config } from 'protractor';
import { CargarScriptsService } from "../cargar-scripts.service";
import { AuthService } from "../login/service/login.service";
import { Persona } from "../domain/persona";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpResponse } from "@angular/common/http";
import { Rol } from "../domain/rol";

@Component ({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],


})
export class checkinComponent implements OnInit{
  rolPersona: Rol;
  Dataregistre: Persona;
  checkinForm: FormGroup;
  constructor(private _cargarScripts:CargarScriptsService,  private authService: AuthService, private formBuilder: FormBuilder){
    _cargarScripts.carga(["popup-checkin"]);
  }

  ngOnInit(): void {

    this.rolPersona = new Rol('');
    this.Dataregistre = new Persona('','','','',this.rolPersona);
        this.checkinForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          correo: ['', Validators.required],
          password: ['', Validators.required],
          rol: ['', Validators.required]
        });
  }
  public Registrar(): void {



    if (this.checkinForm.invalid) {
        alert("Por favor, rellene los campos requeridos");
    }
    this.Dataregistre.nombre = this.checkinForm.get("nombre").value;
    this.Dataregistre.apellido = this.checkinForm.get("apellido").value;
    this.Dataregistre.correo = this.checkinForm.get("correo").value;
    this.Dataregistre.password = this.checkinForm.get("password").value;
    this.rolPersona.descripcion = this.checkinForm.get("rol").value.toLowerCase();
    this.Dataregistre.rol = this.rolPersona;

    console.log("dataClient to save", this.Dataregistre);

    this.authService.Registrar(this.Dataregistre).subscribe(response => {

      if (response instanceof HttpResponse) {
          if (response.status === 200) {
              alert("Save success");
              this.checkinForm.reset();
          } else {
              alert("Save error");
          }
      } else {
          // Manejo de respuesta inesperada
          alert("Unexpected response");
      }
  }, error => {
      console.log("Error post: ", error);
  });

}



}
