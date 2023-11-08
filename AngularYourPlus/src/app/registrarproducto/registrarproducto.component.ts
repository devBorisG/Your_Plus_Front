import { Component, OnInit } from '@angular/core';
import { Producto } from '../domain/producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ProductoService } from './service/registrarproducto.service';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.css']
})
export class RegistrarproductoComponent implements OnInit {
  DataProducto: Producto;
  registerproductoform: FormGroup;

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.DataProducto = new Producto();
    this.registerproductoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      categoria: [''], // Asegúrate de que coincida con el nombre en el HTML
      laboratorio: [''], // Asegúrate de que coincida con el nombre en el HTML
    });
  }

  public saveProducto(): void {
    if (this.registerproductoform.invalid) {
      return;
    }

    this.DataProducto = new Producto();
    this.DataProducto.nombre = this.registerproductoform.get("nombre").value;
    this.DataProducto.precio = this.registerproductoform.get("precio").value;
    this.DataProducto.descripcion = this.registerproductoform.get("descripcion").value;
    this.DataProducto.imagen = this.registerproductoform.get("imagen").value;
    this.DataProducto.categoria = this.registerproductoform.get("categoria").value; // Asegúrate de que coincida con el nombre en el HTML
    this.DataProducto.laboratorio = this.registerproductoform.get("laboratorio").value; // Asegúrate de que coincida con el nombre en el HTML

    this.productoService.saveProducto(this.DataProducto).subscribe(response => {
      if (response instanceof HttpResponse) {
        if (response.status === 200) {
          alert("Save success");
          this.registerproductoform.reset();
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
