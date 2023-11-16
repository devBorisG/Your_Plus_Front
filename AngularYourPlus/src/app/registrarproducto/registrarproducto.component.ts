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
import Swal from 'sweetalert2';


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
    private laboratorioService: LaboratorioService) { }

  ngOnInit(): void {
    this.getObjects();
    this.DataProducto = new Producto();
    this.registrarproducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      laboratorio: ['', Validators.required],
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

  public getObjects(): void {
    this.getCategorias();
    this.getLaboratorios();
  }

  public getLaboratorios(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    this.laboratorioService.getLaboratorio(headers).subscribe(
      (response) => {
        if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
          this.laboratorios = response['data'] as Laboratorio[];
        } else {
          console.error(response['messageList'][0].content);
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
      (response) => {
        if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
          this.categorias = response['data'] as Categoria[];
        } else {
          console.error(response['messageList'][0].content);
          this.categorias = [];
        }
      }, error => {
        console.error("Error in the request: ", error);
        this.categorias = [];
      }
    );
  }

  public getProductos(): void {
    this.productoService.getProductos(this.registrarproducto.value).subscribe(response => {
      if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
        this.productos = response['data'] as Producto[];
      } else {
        console.error(response['messageList'][0].content);
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
      if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
        alert(response['messageList'][0].content);
        this.registrarproducto.reset();
        this.getProductos();
      } else {
        alert(response['messageList'][0].content);
      }
    }, error => {
      alert("Service error: " + error);
      console.error("Error post: ", error);
    });
  }
  delete(producto:Producto):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: `Sefuro que deseas eliminar el producto ${producto.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "si eliminar!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.DeleteProducto(producto.id).subscribe(
          response=>{
            this.productos= this.productos.filter(cli=> cli !== producto)
            Swal.fire( 'producto eliminado', `producto eliminado con exito ${producto.nombre} `, "success")
          }
        )
      }
    });
  }
  public putInfoUpdateProducto(producto: Producto): void {
    this.editarproducto.patchValue({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      categoria: producto.categoria,
      laboratorio: producto.laboratorio,
    });
  }

  public updateProducto(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });

    // Assign form values to DataProducto object
    this.DataProducto.nombre = this.editarproducto.get("nombre").value || this.DataProducto.nombre;
    this.DataProducto.precio = this.editarproducto.get("precio").value || this.DataProducto.precio;
    this.DataProducto.descripcion = this.editarproducto.get("descripcion").value || this.DataProducto.descripcion;
    this.DataProducto.imagen = this.editarproducto.get("imagen").value || this.DataProducto.imagen;
    this.DataProducto.categoria.id = this.editarproducto.get("categoria").value || this.DataProducto.categoria;
    this.DataProducto.laboratorio.id = this.editarproducto.get("laboratorio").value || this.DataProducto.laboratorio;

    this.productoService.updateProducto(this.DataProducto, headers).subscribe(response => {
      if (response instanceof HttpResponse && response['messageList'][0].level === 'SUCCESS') {
        alert(response['messageList'][0].content);
        this.getProductos();
      } else {
        alert(response['messageList'][0].content);
      }
    }, error => {
      alert("Service update error:" + error);
      console.log("Error update {} ", error);
    });
  }
}
