import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const categoriaUrl = environment.urlcategoria

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  constructor(private http: HttpClient){}

  public getCategoria(headers: HttpHeaders): Observable<Object> {
    const options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.get(`${categoriaUrl}`, options);
  }
}
