import { Component, OnInit } from "@angular/core";
import { Config } from 'protractor';
import { CargarScriptsService } from "../cargar-scripts.service";
import { AuthService } from "../login/service/login.service";
import { Persona } from "../domain/persona";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpResponse } from "@angular/common/http";

@Component ({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],


})
export class checkinComponent implements OnInit{
  Dataregistre: Persona;
  checkinForm: FormGroup;
  constructor(private _cargarScripts:CargarScriptsService,  private authService: AuthService, private formBuilder: FormBuilder){
    _cargarScripts.carga(["popup-checkin"]);
  }

  ngOnInit(): void {

    this.Dataregistre = new Persona();

        this.checkinForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: [''],
          correo: ['', Validators.required],
          password: [''],
          rol: ['']

        });
  }
  public Registrar(): void {



    if (this.checkinForm.invalid) {
        return;
    }

    this.Dataregistre = new Persona();
    this.Dataregistre.nombre = this.checkinForm.get("nombre").value;
    this.Dataregistre.apellido = this.checkinForm.get("apellido").value;
    this.Dataregistre.correo = this.checkinForm.get("correo").value;
    this.Dataregistre.password = this.checkinForm.get("password").value;


    console.log("dataClient to save {} ", this.Dataregistre);

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
      alert("Service error: " + error);
      console.log("Error post: ", error);
  });

}



}
