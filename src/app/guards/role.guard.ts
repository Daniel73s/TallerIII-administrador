
import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private auth:AuthService,public router:Router){}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    const expectedRole=route.data.expectedRole;
    const token = localStorage.getItem('token');
    const codrol=decode(token)['codrol'];
    if(!this.auth.isAuth() || codrol !== expectedRole){
      Swal.fire(
        'Error!!!',
        'Funcion Solamente para administradores',
        'error'
      )
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  
}
