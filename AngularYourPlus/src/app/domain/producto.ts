import { Categoria } from "./categoria";
import { Laboratorio } from "./laboratorio";

export class Producto{
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  categoria: Categoria;
  laboratorio: Laboratorio;

  constructor(id?: string, nombre?: string, precio?:number,
    descripcion?:string, imagen?:string, categoria?: Categoria, laboratorio?: Laboratorio){
      this.id = id || '';
      this.nombre = nombre || '';
      this.precio = precio || 0;
      this.descripcion = descripcion || '';
      this.imagen = imagen || '';
      this.categoria = categoria || new Categoria();
      this.laboratorio = laboratorio || new Laboratorio();
    }
}
