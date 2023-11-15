import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Laboratorio } from '../domain/laboratorio';
import { LaboratorioService } from './service/laboratorio.service';
import { AuthService } from '../login/service/login.service';

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
    this.getLaboratorio();
  }

  public getLaboratorio(): void {
    this.laboratorioService.getLaboratorio(this.laboratorioform.value).subscribe(response => {
      if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
        this.laboratorios = response.body as Laboratorio[];
      } else {
        console.log("Error obtaining products");
        this.laboratorios = [];
      }
    }, error => {
      console.error("Error in the request: ", error);
      this.laboratorios = [];
    });
  }

  public saveLaboratorio(): void {
    if (this.laboratorioform.invalid) {
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    this.DataLaboratorio = new Laboratorio();
    this.DataLaboratorio.nombre = this.laboratorioform.get("nombre").value;
    this.DataLaboratorio.descripcion = this.laboratorioform.get("descripcion").value;

    this.laboratorioService.saveLaboratorio(this.DataLaboratorio, headers).subscribe(response => {
      if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
        alert(response['messageList'][0].content);
        this.laboratorioform.reset();
        this.getLaboratorio()
      }
      else {
        alert("Save error");
      }
    }, error => {
      alert("Service error: " + error);
      console.error("Error post: ", error);
    });
  }

  public DeleLaboratorio(laboratorio: Laboratorio): void {
    if (laboratorio.nombre) {
      this.laboratorioService.DeleLaboratorio(laboratorio.nombre).subscribe(response => {
        if (response instanceof HttpResponse) {
          if (response.status === 200) {
            alert("Delete success");
            this.laboratorioform.reset();
            this.getLaboratorio(); // Actualiza la lista después de eliminar un laboratorio
          } else {
            alert("Delete error");
          }
        } else {
          // Manejo de respuesta inesperada
          alert("Unexpected response");
        }
      }, error => {
        alert("Service delete error:" + error);
        console.log("Error delete {} ", error);
      });
    }
  }

  public updateboratorio(): void {
    if (this.DataLaboratorio.nombre) {
      let laboratorioId = this.DataLaboratorio.nombre;
      this.DataLaboratorio.nombre = this.ediform.get("documentType").value ? this.ediform.get("nombre").value : this.DataLaboratorio.nombre;
      this.DataLaboratorio.descripcion = this.ediform.get("documentNumber").value ? this.ediform.get("descripcion").value : this.DataLaboratorio.descripcion;

      this.laboratorioService.updateboratorio(laboratorioId, this.DataLaboratorio).subscribe(response => {
        if (response instanceof HttpResponse) {
          if (response.status === 200) {
            alert("Update success");
          } else {
            alert("Update error");
          }
        } else {
          // Manejo de respuesta inesperada
          alert("Unexpected response");
        }
      }, error => {
        alert("Service update error:" + error);
        console.log("Error update {} ", error);
      });
    }
  }
}
