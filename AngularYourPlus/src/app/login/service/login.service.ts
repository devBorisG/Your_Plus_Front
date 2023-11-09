import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CredentialPersona } from 'src/app/domain/credentialpersona';
import { Persona } from 'src/app/domain/persona';

import { environment } from 'src/environments/environment';
import { jwtDecode} from 'jwt-decode';
const autenticateurl = environment.urlautentication;
const urlpersona = environment.urlpersona;
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(public http: HttpClient) {

  }

  authenticate(persona: CredentialPersona){

    return this.http.post(`${autenticateurl}`, persona);
  }

  Registrar(persona: Persona){

    return this.http.post(`${urlpersona}`, persona);
  }

  saveToken(token: string){
    sessionStorage.setItem('currentUser', token);
  }

  getToken(){
    return sessionStorage.getItem('currentUser');
  }

  removeToken(){
    sessionStorage.removeItem('currentUser');
  }

  getDataUser(){
    let token: any = sessionStorage.getItem('currentUser' ) == null ? null : sessionStorage.getItem('currentUser');
    let userData: any = token == null || token.length < 35? null : jwtDecode(token);
    return userData;
  }
}
