import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from 'src/app/domain/laboratorio';

const laboratorioUrl = environment.urllaboratorio;

@Injectable({
    providedIn: 'root'
})
export class LaboratorioService {


    constructor(private http: HttpClient) { }

    public getLaboratorio(headers: HttpHeaders): Observable<Object> {
      const options = {
        headers: headers,
        observe: 'response' as const,
      };
      return this.http.get(`${laboratorioUrl}`, options);
    }

    public saveLaboratorio(laboratorio: Laboratorio): Observable<Object>  {

      return this.http.post(`${laboratorioUrl}`, laboratorio, { observe: 'response' });


    }

    public updateboratorio(laboratoriotId: string, laboratorio: Laboratorio): Observable<Object> {

        let params = {
            "laboratoriotId": laboratoriotId
        }
        return this.http.put(`${laboratorioUrl}`, laboratorio , { params, observe: 'response' });

    }

    public DeleLaboratorio(laboratoriotId: string): Observable<any> {

        let params = {
            "laboratoriotId": laboratoriotId
        }

        return this.http.delete(`${laboratorioUrl}`, { params, observe: 'response' });

    }
}
