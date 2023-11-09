import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/domain/producto';

const productourl = environment.urlproducto;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  public saveProducto(producto: Producto): Observable<Object> {
    return this.http.post(`${productourl}`, producto, { observe: 'response' });
  }

  public getProductos(params: any): Observable<Object> {
    return this.http.get(`${productourl}`, { params, observe: 'response' });
  }

  public updateProducto(productoId: string, producto: Producto): Observable<Object> {
    let params = { "productoId": productoId };
    return this.http.put(`${productourl}`, producto, { params, observe: 'response' });
  }

  public Deleteproducto(productonombre: string): Observable<any> {
    let params = { "productonombre": productonombre };
    return this.http.delete(`${productourl}`, { params, observe: 'response' });
  }
}
