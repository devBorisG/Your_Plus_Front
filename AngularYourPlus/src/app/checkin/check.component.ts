import { Component, OnInit } from "@angular/core";
import { Config } from 'protractor';
import { CargarScriptsService } from "../cargar-scripts.service";
import { AuthService } from "../login/service/login.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Rol } from "../domain/rol";
import Swal from "sweetalert2";
import { Persona } from "../domain/persona";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],


})
export class checkinComponent implements OnInit{
  rols: Rol[];
  Dataregistre: Persona;
  Datarol: Rol;
  checkinForm: FormGroup;
  constructor(private _cargarScripts:CargarScriptsService,  private authService: AuthService, private formBuilder: FormBuilder){
    _cargarScripts.carga(["popup-checkin"]);
  }

  ngOnInit(): void {

    this.Dataregistre = new Persona();
    this.checkinForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          correo: ['', Validators.required],
          password: ['', Validators.required],
          rol: [''],
        });
  }
  public Registrar(): void {
    if (this.checkinForm.invalid) {
        Swal.fire("Required ", "Por favor, rellene los campos requeridos", "warning")
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    this.Dataregistre.nombre = this.checkinForm.get("nombre").value;
    this.Dataregistre.apellido = this.checkinForm.get("apellido").value;
    this.Dataregistre.correo = this.checkinForm.get("correo").value;
    this.Dataregistre.password = this.checkinForm.get("password").value;
    this.Dataregistre.rol.id = this.checkinForm.get("rol").value;

    console.log("dataClient to save", this.Dataregistre);

    this.authService.savePersona(this.Dataregistre, headers).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        alert(response.body.messageList[0].content);
        this.checkinForm.reset();
        Swal.fire('Usuario Creado', `${this.Dataregistre.rol} creado con exito `, "success")
      } else {
        alert(response.body.messageList[0].content);
      }
    }, error => {
      alert("Service error: " + error);
      console.error("Error post: ", error);
      Swal.fire("Error post", "Service error", "error")
    });
  }






public getroles(): void {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`
  });
  this.authService.getRol(headers).subscribe(
    response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        this.rols = response.body.data as Rol[];
      } else {
        console.error(response.body.messageList[0].content);
        this.rols = [];
      }
    }, error => {
      console.error("Error in the request: ", error);
      this.rols = [];
    }
  );
}


}
