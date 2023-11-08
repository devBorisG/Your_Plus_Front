import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Laboratorio } from '../domain/laboratorio';
import { LaboratorioService } from './service/laboratorio.service';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent {

  DataLaboratorio: Laboratorio;
  laboratorioform: FormGroup;

  constructor(private formBuilder: FormBuilder, private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.DataLaboratorio = new Laboratorio();
    this.laboratorioform = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  public saveLaboratorio(): void {
    if (this.laboratorioform.invalid) {
      return;
    }

    this.DataLaboratorio = new Laboratorio();
    this.DataLaboratorio.nombre = this.laboratorioform.get("nombre").value;
    this.DataLaboratorio.descripcion = this.laboratorioform.get("descripcion").value;

    this.laboratorioService.saveLaboratorio(this.DataLaboratorio).subscribe(response => {
      if (response instanceof HttpResponse) {
        if (response.status === 200) {
          alert("Save success");
          this.laboratorioform.reset();
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
