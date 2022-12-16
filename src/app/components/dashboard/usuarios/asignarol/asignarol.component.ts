import { UsuariosService } from './../../../../servicios/usuarios.service';
import { RolesService } from './../../../../servicios/roles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-asignarol',
  templateUrl: './asignarol.component.html',
  styleUrls: ['./asignarol.component.css']
})
export class AsignarolComponent implements OnInit {
  roles:any;
  public rolUsuario:number;
  public login:string;
  constructor(private rol:RolesService,private route:ActivatedRoute,private usu:UsuariosService,private router:Router) { 
    this.rolUsuario=Number(this.route.snapshot.paramMap.get('rol'));
    this.login=this.route.snapshot.paramMap.get('login')
  }

  ngOnInit(): void {
    this.MostrarRoles();
  }

  MostrarRoles(){
    this.rol.getrolesByestado(true).then(data=>{
      this.roles=data
     });
  }

  estadorol(e){
      this.rolUsuario=e.value;
  }

  cambiaRol(){
      this.usu.actualizarRol({
        'username':this.login,
        'rol':this.rolUsuario
      }).then(data=>{
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: data['mensaje'],
             showConfirmButton: false,
             timer: 2000
           })
           this.router.navigate(['/dashboard/usuarios']);
      })
  }
}
