import { Persona } from './../utils/interfaces/persona.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }
  //Trae una lista de usuarios
  getUsuarios() {
    return this.http.get(this.url + '/listarPersonas')
  }
  //Trae a un solo usuario
  getUsuario(codper: number) {
    return this.http.get(`${this.url}/listarPersonaById/${codper}`).toPromise()
  }

  //Listar personas de un mismo rol
  getUsuariosRol(codrol: number) {
    return this.http.get(`${this.url}/listarpersonasRol/${codrol}`).toPromise()
  }

  getlogins(username) {
    return this.http.get(this.url + '/logins/' + username)
  }

  crearPersona(per: any) {
    //  const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    //ssh key generator | open ssl
    return this.http.post(`${this.url}/crearPersona`, per).toPromise()
  }
  modPersona(Per: Persona, codper: number) {
    return this.http.put(`${this.url}/modPersona/${codper}`, Per).toPromise()
  }
  crearCuenta(cuenta: any) {
    //  const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    return this.http.post(`${this.url}/crearCuenta`, cuenta).toPromise()
  }

  actualizarClave(cuenta: any) {
    return this.http.put(`${this.url}/cambiarclave`, cuenta).toPromise()
  }
  actualizarRol(cuenta: any) {
    return this.http.put(`${this.url}/modRol`, cuenta).toPromise()
  }
  imprimirDatosPersona(codper: number) {
    return this.http.get(`${this.url}/imprimirPersona/${codper}`).toPromise()
  }
  contartipodepersona(codrol: number) {
    return this.http.get(`${this.url}/countpersona/${codrol}`).toPromise()
  }
  countusuarios() {
    return this.http.get(`${this.url}/countusuarios`).toPromise()
  }
  Getrolpro(codrol: number) {
    return this.http.get(`${this.url}/rolprocesos/${codrol}`).toPromise()
  }

  getPervet(codvet: number) {
    return this.http.get(`${this.url}/pervet/${codvet}`).toPromise()
  }
  getReporteUsuarios(consulta:any) {
      return this.http.post(`${this.url}/reporteusuarios`,consulta).toPromise();
  }
   cambiarEstadoUsuario(usuario:any){
      return this.http.put(`${this.url}/estadousuario`,usuario).toPromise();
   }
}
