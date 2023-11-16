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

  private httpHeaders = new  HttpHeaders({'content-Type':'application/json'})
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

  public DeleteProducto(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${productourl}/${id}`, {headers: this.httpHeaders});
  }
}
