import { procesoInterface } from './../utils/interfaces/proceso.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
private url:string='http://localhost:3000/procesos';
  constructor(private http:HttpClient) { }


  getProcesos(){
     return this.http.get(`${this.url}/listarprocesos`).toPromise()
  }
  getProcesoById(codproc:number){
    return this.http.get(`${this.url}/procesoById/${codproc}`).toPromise()
  }
  addproceso(proceso:procesoInterface){
    return this.http.post(`${this.url}/addproceso`,proceso).toPromise()
  }

  estadoproceso(proceso:procesoInterface){
    return this.http.put(`${this.url}/estadoproceso`,proceso).toPromise()
  }
  updateproceso(proceso:procesoInterface){
    return this.http.put(`${this.url}/updateproceso`,proceso).toPromise()
  }
  getprocesosRol(){
    return this.http.get(`${this.url}/procesosrol`).toPromise()
  }
}
