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

  public saveProducto(producto: Producto, headers: HttpHeaders): Observable<any> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.post(`${productourl}`, producto, options);
  }

  public getProductos(params: any): Observable<any> {
    const options = {
      observe: 'response' as const,
    };
    return this.http.get(`${productourl}`/*, { params, observe: 'response' }*/, options);
  }

  public updateProducto(producto: Producto, headers: HttpHeaders): Observable<any> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.put(`${productourl}`, producto, options);
  }

  public Deleteproducto(id: string, headers: HttpHeaders): Observable<any> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    let params = { "id": id };
    return this.http.delete(`${productourl}`, { params, observe: 'response' });
  }
}
