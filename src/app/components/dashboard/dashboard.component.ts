import { UsuariosService } from './../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  panelOpenState = false;
  nombreCompleto='';
  foto='';
  codrol:number;
  enlaces:any[];
  codper:number;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router,private usu:UsuariosService) {
    const datos=decode(localStorage.getItem('token')) ;
    this.foto=datos['foto'];
    this.nombreCompleto=datos['ap']+" "+datos['am']+" "+datos['nombre'];
    this.codrol=datos['codrol'];
    this.codper=datos['codper'];
    this.getEnlaces(datos['codrol']);
  }

  logout(){
    // console.log('cerrar sesion');
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('_grecaptcha');
    this.router.navigate(['/login']);
  }


  getEnlaces(codrol:number){
   this.usu.Getrolpro(codrol).then((data:any)=>{
     this.enlaces=data;     
   })
 }

 miperfil(){
   this.router.navigate([`/dashboard/miperfil/${this.codper}`])
 }
}
