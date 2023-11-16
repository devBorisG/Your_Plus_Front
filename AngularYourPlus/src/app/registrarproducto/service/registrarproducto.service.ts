import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/domain/producto';

const productourl = environment.urlproducto;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  public saveProducto(producto: Producto, headers: HttpHeaders): Observable<Object> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.post(`${productourl}`, producto, options);
  }

  public getProductos(params: any): Observable<Object> {
    return this.http.get(`${productourl}`/*, { params, observe: 'response' }*/);
  }

  public updateProducto(producto: Producto, headers: HttpHeaders): Observable<Object> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.put(`${productourl}/${producto.id}`, producto, options);
  }

  public Deleteproducto(productonombre: string): Observable<any> {
    let params = { "productonombre": productonombre };
    return this.http.delete(`${productourl}`, { params, observe: 'response' });
  }
}
