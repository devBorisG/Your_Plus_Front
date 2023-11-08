import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CredentialPersona } from 'src/app/domain/credentialpersona';
import { Persona } from 'src/app/domain/persona';

import { environment } from 'src/environments/environment';
import { jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlMicroServiceYourPlus = '';

  constructor(public http: HttpClient) {
    this.urlMicroServiceYourPlus = environment.urlMicroServiceYourPlus;
  }

  authenticate(persona: CredentialPersona){
    const url = `${this.urlMicroServiceYourPlus}/authenticateponerelauntenticacion`;
    return this.http.post(url, persona);
  }

  Registrar(persona: Persona){
    const url = `${this.urlMicroServiceYourPlus}/registerponer el de registro`;
    return this.http.post(url, persona);
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
