import { rolInterface } from './../utils/interfaces/role.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

url="http://localhost:3000/roles";

  constructor(private http:HttpClient) { }

  getroles(){
    return this.http.get(`${this.url}/listarRoles`)
  }
  getrolesByestado(estado:boolean){
    return this.http.get(`${this.url}/listarRolesestado/${estado}`).toPromise()
  }
  addrol(rol:rolInterface){
     return this.http.post(`${this.url}/addrol`,rol).toPromise()
  }
  cambiarEstadoRol(rol:rolInterface){
    return this.http.put(`${this.url}/estadorol`,rol).toPromise()
  }
  inforolById(codrol:number){
    return this.http.get(`${this.url}/listarrolbyid/${codrol}`).toPromise()
  }
  updateRol(rol:rolInterface){
    return this.http.put(`${this.url}/updaterol`,rol).toPromise()
  }
  listarRolPro(codrol:number){
    return this.http.get(`${this.url}/rolpro/${codrol}`).toPromise()
  }
  addrolpro(rolproc:any){
     return this.http.post(`${this.url}/addrolpro`,rolproc).toPromise()
  }
  removerolpro(rolproc:any){
    return this.http.post(`${this.url}/removerolpro`,rolproc).toPromise()
 }
}
