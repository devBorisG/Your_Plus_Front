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
private httpHeaders = new  HttpHeaders({'content-Type':'application/json'})
    constructor(private http: HttpClient) { }

    public getLaboratorio(headers: HttpHeaders): Observable<any> {
      const options = {
        headers: headers,
        observe: 'response' as const,
      };
      return this.http.get(`${laboratorioUrl}`, options);
    }

    public saveLaboratorio(laboratorio: Laboratorio, headers: HttpHeaders): Observable<Object>  {
      const options = {
        headers: headers,
        observe: 'response' as const,
      };
      return this.http.post(`${laboratorioUrl}`, laboratorio, options);
    }

    public updateboratorio(laboratoriotId: string, laboratorio: Laboratorio): Observable<Object> {
        let params = {
            "laboratoriotId": laboratoriotId
        }
        return this.http.put(`${laboratorioUrl}`, laboratorio , { params, observe: 'response' });
    }

    public DeleteLaboratorio(id: string): Observable<Laboratorio> {
      return this.http.delete<Laboratorio>(`${laboratorioUrl}/${id}`, {headers: this.httpHeaders});
    }
}
