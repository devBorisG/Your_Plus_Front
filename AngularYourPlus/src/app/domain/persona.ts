import { Rol } from "./rol";

export class Persona{
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  rol: Rol;

  constructor(nombre?: string, apellido?: string, correo?: string, password?: string, rol?: Rol) {
    this.id = '';
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.password = password;
    this.rol = rol;
  }
}
