import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CuentaUsuario} from "../models/cuenta-usuario";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class CuentaUsuarioService {

  url = environment.url + 'cuenta-usuario';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) { }

  agregarCuenta(cuentaUsuario: CuentaUsuario): Observable<CuentaUsuario>{
    return this.http.post<CuentaUsuario>(this.url + '/agregar-cuenta/', cuentaUsuario, this.httpOptions);
  }

  buscarCuenta(usuario: Usuario): Observable<CuentaUsuario>{
    return this.http.post<CuentaUsuario>(this.url + '/buscar-cuenta/', usuario, this.httpOptions);
  }

  modificarCuenta(cuentaUsuario: CuentaUsuario): Observable<CuentaUsuario>{
    return this.http.post<CuentaUsuario>(this.url + '/modificar-cuenta/', cuentaUsuario, this.httpOptions);
  }


}
