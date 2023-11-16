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
}
