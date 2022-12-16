
import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){

  }
  canActivate():boolean{
   if(!this.auth.isAuth()){
    //  console.log('Token no valido o ya expiro');
    this.router.navigate(['/login']);
    // this.mensaje('Usuario no inicio sesion');
    this.mensaje2();
     return false;
   }
    return true;
  }

  mensaje2(){
    Swal.fire({
      title: 'Solicitud Denegada',
      text: "Usuario Debe iniciar sesion primero",
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
      cancelButtonColor: ' #e7e7e7 ',
      confirmButtonText: 'Aceptar'
    });
  }
 
  
}
