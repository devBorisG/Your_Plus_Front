import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/domain/producto';



@Injectable({
    providedIn: 'root'
})
export class ProductoService {

  private urlMicroServiceYourPlus = '';
    constructor(private http: HttpClient) { }


    public saveProducto(producto: Producto) {
      const url = `${this.urlMicroServiceYourPlus}/registerponer el de registro`;
      return this.http.post(url, producto);


    }
/*
    public updateClient(clientId: string, producto: Producto): Observable<Object> {

        let params = {
            "clientId": clientId
        }
        return this.http.put(`${clientUrl}`, producto , { params, observe: 'response' });

    }

    public deleteClient(clientId: string): Observable<any> {

        let params = {
            "clientId": clientId
        }

        return this.http.delete(`${clientUrl}`, { params, observe: 'response' });

    }*/
}
