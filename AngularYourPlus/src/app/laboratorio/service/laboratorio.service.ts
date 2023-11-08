import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from 'src/app/domain/laboratorio';



@Injectable({
    providedIn: 'root'
})
export class LaboratorioService {

  private urlMicroServiceYourPlus = '';
    constructor(private http: HttpClient) { }


    public saveLaboratorio(laboratorio: Laboratorio) {
      const url = `${this.urlMicroServiceYourPlus}/registerponer el de registro`;
      return this.http.post(url, laboratorio);


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
