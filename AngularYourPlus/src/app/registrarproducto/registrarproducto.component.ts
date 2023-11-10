import { Component, OnInit } from '@angular/core';
import { Producto } from '../domain/producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ProductoService } from './service/registrarproducto.service';
import { resolve4 } from 'dns';
import { Categoria } from '../domain/categoria';
import { Laboratorio } from '../domain/laboratorio';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.css']
})
export class RegistrarproductoComponent implements OnInit {

  productos: Producto[] = [];
  DataProducto: Producto;
  editarproducto: FormGroup;
  registrarproducto: FormGroup;

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.DataProducto = new Producto();
    this.registrarproducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      categoria: [''],
      laboratorio: [''],
    });

    // Initialize the edit form
    this.editarproducto = this.formBuilder.group({
      nombre: [''],
      precio: [''],
      descripcion: [''],
      imagen: [''],
      categoria: [''],
      laboratorio: [''],
    });

    this.getProductos();
  }

  public getProductos(): void {
    this.productoService.getProductos(this.registrarproducto.value).subscribe(response => {
      console.log(response);
      if (response['messageList'][0].level === 'SUCCESS') {
        this.productos = response['data'] as Producto[];
      } else {
        console.log("Error obtaining products");
        this.productos = [];
      }
    }, error => {
      console.error("Error in the request: ", error);
      this.productos = [];
    });
  }

  public saveProducto(): void {
    if (this.registrarproducto.invalid) {
      return;
    }
    const categoria = new Categoria("e1b9e203-ebca-4b92-af74-39ab5054fc6b","creatina","");
    // Assign form values to DataProducto object
    this.DataProducto.nombre = this.registrarproducto.get("nombre").value;
    this.DataProducto.precio = this.registrarproducto.get("precio").value;
    this.DataProducto.descripcion = this.registrarproducto.get("descripcion").value;
    this.DataProducto.imagen = this.registrarproducto.get("imagen").value;
    this.DataProducto.categoria = categoria;
    this.DataProducto.laboratorio = this.registrarproducto.get("laboratorio").value;

    // Save or update depending on whether DataProducto has an ID
    if (this.DataProducto.id) {
      this.updateProducto();
    } else {
      this.productoService.saveProducto(this.DataProducto).subscribe(response => {
        if (response instanceof HttpResponse && response.status === 200) {
          alert("Save success");
          this.registrarproducto.reset();
          this.getProductos();
        } else {
          alert("Save error");
        }
      }, error => {
        alert("Service error: " + error);
        console.log("Error post: ", error);
      });
    }
  }

  public Deleteproducto(producto: Producto): void {
    if (producto && producto.nombre) {
      this.productoService.Deleteproducto(producto.nombre).subscribe(response => {
        if (response instanceof HttpResponse && response.status === 200) {
          alert("Delete success");
          this.getProductos(); // Reload the list after deletion
        } else {
          alert("Delete error");
        }
      }, error => {
        alert("Service delete error:" + error);
        console.log("Error delete {} ", error);
      });
    }
  }

  public updateProducto(): void {
    if (this.DataProducto.nombre) {
      let productoId = this.DataProducto.nombre;

      // Update only fields that have a value in the edit form
      this.DataProducto.nombre = this.editarproducto.get("nombre").value || this.DataProducto.nombre;
      this.DataProducto.precio = this.editarproducto.get("precio").value || this.DataProducto.precio;
      this.DataProducto.descripcion = this.editarproducto.get("descripcion").value || this.DataProducto.descripcion;
      this.DataProducto.imagen = this.editarproducto.get("imagen").value || this.DataProducto.imagen;
      this.DataProducto.categoria = this.editarproducto.get("categoria").value || this.DataProducto.categoria;
      this.DataProducto.laboratorio = this.editarproducto.get("laboratorio").value || this.DataProducto.laboratorio;

      this.productoService.updateProducto(productoId, this.DataProducto).subscribe(response => {
        if (response instanceof HttpResponse && response.status === 200) {
          alert("Update success");
          this.getProductos();
        } else {
          alert("Update error");
        }
      }, error => {
        alert("Service update error:" + error);
        console.log("Error update {} ", error);
      });
    }
  }
}
