import { HttpClient } from '@angular/common/http';
import { cuentaUser } from './../utils/interfaces/cuentaUser.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url='http://localhost:3000/autenticacion';

  constructor(private http:HttpClient) { }

  singIn(user:cuentaUser){
     return  this.http.post(`${this.url}/login`,user).toPromise()
  }

  isAuth():boolean{
    const token=localStorage.getItem('token');
    if(!localStorage.getItem('token')){
           return false;
    }
    return true;
  }
}
