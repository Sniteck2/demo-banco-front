import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.url + 'usuario/';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) { }

  buscarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + 'buscar-usuario/', usuario, this.httpOptions);
  }

  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + 'agregar-usuario/', usuario, this.httpOptions);
  }

  buscarPorRut(codUsuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + 'buscar-usuario-rut/' + codUsuario);
  }
}
