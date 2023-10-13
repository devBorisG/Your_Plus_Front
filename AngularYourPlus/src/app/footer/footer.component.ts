import { Component, OnInit } from "@angular/core";

@Component ({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],

})
export class FooterComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {}

  informacion= "Acceso exclusivo InstaFit Originals con los mejores coaches en español además de programas de los coaches más reconocidos de América Latina.";
  telefono="+1 (123) 456-7890";
  correo="Elmerp1193090526@gmail.com";
  direccion="CL 41B #65-65 Rionegro Antioquia"
}
