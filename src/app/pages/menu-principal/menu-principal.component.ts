import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  public nombreUsuario: string;
  public ventana: number = 1;

  constructor(private modal: NgbModal) {}

  ngOnInit() {
    this.obtenerNombreUsuario();
  }

  private obtenerNombreUsuario(): void {
    const data = JSON.parse(sessionStorage.getItem('UsuarioLogin'));
    const nombre = data.nombre;
    const appPat = data.appPaterno;
    const appMat = data.appMaterno;

    this.nombreUsuario = nombre.toUpperCase() + " " + appPat.toUpperCase() + " " + appMat.toUpperCase();
  }

  public cambio(menu: number){
    this.ventana = menu;
  }

  open(content){
    this.modal.open(content, {size: 'lg'});
  }


}
