import { Component, OnInit } from '@angular/core';
import { Producto } from '../domain/producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ProductoService } from './service/registrarproducto.service';
import { Categoria } from '../domain/categoria';
import { Laboratorio } from '../domain/laboratorio';
import { AuthService } from '../login/service/login.service';
import { CategoriaService } from '../categoria/service/categoria.service';
import { LaboratorioService } from '../laboratorio/service/laboratorio.service';
import { copyFileSync } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.css']
})
export class RegistrarproductoComponent implements OnInit {

  categorias: Categoria[];
  laboratorios: Laboratorio[];
  productos: Producto[] = [];
  DataProducto: Producto;
  DataCategoria: Categoria;
  editarproducto: FormGroup;
  registrarproducto: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private auth: AuthService,
    private categoriaService: CategoriaService,
    private laboratorioService: LaboratorioService,
    private router: Router) {
      // Initialize the edit form
    this.editarproducto = this.formBuilder.group({
        nombre: [''],
        precio: [''],
        descripcion: [''],
        imagen: [''],
        categoria: [''],
        laboratorio: [''],
        id: [''],
      });
    }

  ngOnInit(): void {
    this.DataProducto = new Producto();
    this.registrarproducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      laboratorio: ['', Validators.required],
    });

    this.getObjects();
    this.getProductos();
  }

  public getObjects(): void {
    this.getCategorias();
    this.getLaboratorios();
  }

  public getLaboratorios(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    this.laboratorioService.getLaboratorio(headers).subscribe(
      response => {
        if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
          this.laboratorios = response.body.data as Laboratorio[];
        } else {
          console.error(response.body.messageList[0].content);
          this.laboratorios = [];
        }
      }, error => {
        console.error("Error in the request: ", error);
        this.laboratorios = [];
      }
    );
  }

  public getCategorias(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    this.categoriaService.getCategoria(headers).subscribe(
      response => {
        if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
          this.categorias = response.body.data as Categoria[];
        } else {
          console.error(response.body.messageList[0].content);
          this.categorias = [];
        }
      }, error => {
        console.error("Error in the request: ", error);
        this.categorias = [];
      }
    );
  }

  public getProductos(): void {
    const producto = new Producto();
    this.productoService.getProductos(producto).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        const lista = response.body.data;
        for (let i = 0; i < lista.length; i++) {
          const element = lista[i];
          console.log(element);
        }
        this.productos = response.body.data as Producto[];
      } else {
        console.error("error");
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    // Assign form values to DataProducto object
    this.DataProducto.nombre = this.registrarproducto.get("nombre").value;
    this.DataProducto.precio = this.registrarproducto.get("precio").value;
    this.DataProducto.descripcion = this.registrarproducto.get("descripcion").value;
    this.DataProducto.imagen = this.registrarproducto.get("imagen").value;
    this.DataProducto.categoria.id = this.registrarproducto.get("categoria").value;
    this.DataProducto.laboratorio.id = this.registrarproducto.get("laboratorio").value;

    this.productoService.saveProducto(this.DataProducto, headers).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        alert(response.body.messageList[0].content);
        this.registrarproducto.reset();
        this.productos.push(this.DataProducto);
      } else {
        alert(response.body.messageList[0].content);
      }
    }, error => {
      alert("Service error: " + error);
      console.error("Error post: ", error);
    });
  }

  public Deleteproducto(producto: Producto): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    if (producto && producto.id) {
      this.productoService.Deleteproducto(producto.id, headers).subscribe(response => {
        if (response instanceof HttpResponse && response.status === 200) {
          alert(response.body.messageList[0].content);
          this.getProductos(); // Reload the list after deletion
        } else {
          alert(response.body.messageList[0].content);
        }
      }, error => {
        alert("Service delete error:" + error);
        console.log("Error delete", error);
      });
    }
  }

  public putInfoUpdateProducto(producto: Producto): void {
    this.editarproducto.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen
    });
  }

  public updateProducto(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });

    // Assign form values to DataProducto object
    this.DataProducto.id = this.editarproducto.get("id").value;
    this.DataProducto.nombre = this.editarproducto.get("nombre").value || this.DataProducto.nombre;
    this.DataProducto.precio = this.editarproducto.get("precio").value || this.DataProducto.precio;
    this.DataProducto.descripcion = this.editarproducto.get("descripcion").value || this.DataProducto.descripcion;
    this.DataProducto.imagen = this.editarproducto.get("imagen").value || this.DataProducto.imagen;
    this.DataProducto.categoria.id = this.editarproducto.get("categoria").value || this.DataProducto.categoria;
    this.DataProducto.laboratorio.id = this.editarproducto.get("laboratorio").value || this.DataProducto.laboratorio;

    this.productoService.updateProducto(this.DataProducto, headers).subscribe(response => {
      if (response instanceof HttpResponse && response.body.messageList[0].level === 'SUCCESS') {
        alert(response.body.messageList[0].content);
        this.getProductos();
      } else {
        alert(response.body.messageList[0].content);
      }
    }, error => {
      alert("Service update error:" + error);
      console.log("Error update {} ", error);
    });
  }
}
