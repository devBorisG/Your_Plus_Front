import { Component, OnInit } from "@angular/core";
import { CargarScriptsService } from "../cargar-scripts.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "./service/login.service";
import { Router } from '@angular/router'; // Asegúrate de importar AuthService desde el lugar correcto
import { CredentialPersona } from "../domain/credentialpersona";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private _cargarScripts: CargarScriptsService,
    private auth: AuthService, // Asegúrate de inyectar AuthService correctamente
    private router: Router, // Asegúrate de inyectar Router correctamente

  ) {
    _cargarScripts.carga(["popup-login"]);
  }



    persona: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  loading: boolean = false;

// ...

signIn(from: CredentialPersona) {
  this.loading = true; // Habilita el botón
  this.auth.authenticate(from).subscribe(
    (res) => {
      this.auth.saveToken(res['data']['token']);
      this.router.navigate(['home']);
    },
    (error) => {
    },
    () => {
      this.loading = false; // Restablece el estado del botón
    }
  );
  }
}
