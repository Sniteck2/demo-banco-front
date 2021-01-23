import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CuentaUsuario} from "../models/cuenta-usuario";
import {Observable} from "rxjs";
import {CuentaMovimiento} from "../models/cuenta-movimiento";

@Injectable({
  providedIn: 'root'
})
export class CuentaMovimientoService {

  url = environment.url + 'cuenta-movimiento/';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) { }

  listarMovimiento(cuentaUsuario: CuentaUsuario): Observable<CuentaMovimiento[]>{
    return this.http.post<CuentaMovimiento[]>(this.url + 'listar-movimiento/', cuentaUsuario, this.httpOptions);
  }
}
