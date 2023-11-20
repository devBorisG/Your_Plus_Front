import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Laboratorio } from '../domain/laboratorio';
import { LaboratorioService } from './service/laboratorio.service';
import { Config } from 'protractor';
import { AuthService } from '../login/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {

  laboratorios: Laboratorio[] = [];
  DataLaboratorio: Laboratorio;
  laboratorioform: FormGroup;
  ediform: FormGroup;

  constructor(private auth: AuthService,private formBuilder: FormBuilder, private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.DataLaboratorio = new Laboratorio();
    this.laboratorioform = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.getLaboratorios();
  }
   /* Esta parte se define la consulta de los  laboratorio */
  public getLaboratorios(): void {
    const laboratorio = new Laboratorio();
    this.laboratorioService.getLaboratorios(laboratorio).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        const lista = response.body.data;
        for (let i = 0; i < lista.length; i++) {
          const element = lista[i];
          console.log(element);
        }
        this.laboratorios = response.body.data as Laboratorio[];
      } else {
        console.error("error");
        this.laboratorios = [];
      }
    }, error => {
      console.error("Error in the request: ", error);
      this.laboratorios = [];
    });
  }

 /* Esta parte se define la creacion de un nuevo laboratorio */

  public saveLaboratorio(): void {
    if (this.laboratorioform.invalid) {
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    this.DataLaboratorio.nombre = this.laboratorioform.get("nombre").value;
    this.DataLaboratorio.descripcion = this.laboratorioform.get("descripcion").value;

    this.laboratorioService.saveLaboratorio(this.DataLaboratorio, headers).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        alert(response.body.messageList[0].content);
        this.laboratorioform.reset();
        this.laboratorios.push(this.DataLaboratorio);
      } else {
        alert(response.body.messageList[0].content);
      }
    }, error => {
      alert("Service error: " + error);
      console.error("Error post: ", error);
    });
  }

 /* Esta parte se define la eliminacion de el laboratorio */
  delete(laboratorio:Laboratorio):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: `Sefuro que deseas eliminar el laboratorio ${laboratorio.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "si eliminar!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth.getToken()}`
        });
        this.laboratorioService.DeleteLaboratorio(laboratorio.id).subscribe(
          response=>{
            this.laboratorios= this.laboratorios.filter(cli=> cli !== laboratorio)
            Swal.fire( 'laboratorio eliminado', `laboratorio eliminado con exito ${laboratorio.nombre} `, "success")
          }
        )
      }
    });
  }

 /* Esta parte se define la actualizacion de el laboratorio */
  public putInfoUpdateProducto(laboratorio: Laboratorio): void {
    this.ediform.patchValue({
      id: laboratorio.id,
      nombre: laboratorio.nombre,
      descripcion: laboratorio.descripcion,

    });
  }

  public updateProducto(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
    this.DataLaboratorio.id = this.ediform.get("id").value;
    this.DataLaboratorio.nombre = this.ediform.get("nombre").value || this.DataLaboratorio.nombre;
    this.DataLaboratorio.descripcion = this.ediform.get("descripcion").value || this.DataLaboratorio.descripcion;
    this.laboratorioService.updateboratorio(this.DataLaboratorio, headers).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        alert(response.body.messageList[0].content);
        this.getLaboratorios();
      } else {
        alert(response.body.messageList[0].content);
      }
    }, error => {
      alert("Service update error:" + error);
      console.log("Error update {} ", error);
    });
  }

}
