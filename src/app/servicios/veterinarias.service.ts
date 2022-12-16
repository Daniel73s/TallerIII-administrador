import { personaVeterinaria } from './../utils/interfaces/pervet.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { veterinaria } from '../utils/interfaces/veterinaria.inteface';

@Injectable({
  providedIn: 'root'
})
export class VeterinariasService {

  url='http://localhost:3000/veterinarias';

  constructor(private http:HttpClient) { }
 
  getVeterinarias(){
    return this.http.get(`${this.url}/listarvet`).toPromise()
  }
  addveterinaria(vet:veterinaria){
    return this.http.post(`${this.url}/adicionarvet`,vet).toPromise()
  }
  deleteVeterinaria(codvet:number){
    return this.http.delete(`${this.url}/delvet/${codvet}`).toPromise()
  }
  habilitarVeterinaria(codvet:number){
     return this.http.delete(`${this.url}/habvet/${codvet}`).toPromise()
  }
  asignarpervet(pervet:personaVeterinaria){
       return this.http.post(`${this.url}/addpervet`,pervet).toPromise()
  }
  getInfoVetById(codvet:number){
       return this.http.get(`${this.url}/vetByid/${codvet}`).toPromise()
  }
  getDuenosVet(codvet:number){
    return this.http.get(`${this.url}/duenosvet/${codvet}`).toPromise()
  }
  countVeterinarias(estado:boolean){
    return this.http.get(`${this.url}/countvet/${estado}`).toPromise()
  }
  updateVet(codvet:number,vet:veterinaria){
    return this.http.put(`${this.url}/updatevet/${codvet}`,vet).toPromise()
  }
  delpervet(pervet:any){
      return this.http.post(`${this.url}/delpervet`,pervet).toPromise()
  }

  listarVetUsu(codper:number){
    return this.http.get(`${this.url}/listarvetusu/${codper}`).toPromise()
  }
  reporteVeterinarias(consulta:any){
    return this.http.post(`${this.url}/reporteveterinarias`,consulta).toPromise();
  }
}
