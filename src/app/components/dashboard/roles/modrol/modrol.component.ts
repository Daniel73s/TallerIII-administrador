import { MatSnackBar } from '@angular/material/snack-bar';
import { rolInterface } from './../../../../utils/interfaces/role.interface';
import { RolesService } from './../../../../servicios/roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-modrol',
  templateUrl: './modrol.component.html',
  styleUrls: ['./modrol.component.css']
})
export class ModrolComponent implements OnInit {
private codrol:number;
public rol:rolInterface;
public bandera:boolean=false; 
iconos:any[]=[
  {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fadmin.jpg?alt=media&token=ec95a12f-1b97-489f-90c0-5498e6c52758'},
  {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fuser.png?alt=media&token=4cebe799-c7b7-41fc-8977-6027c2742f43'},
  {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fveterinario.jpg?alt=media&token=670c0068-cb52-41d9-b629-58f64142e21d'},
];
  constructor(private route:ActivatedRoute,private rs:RolesService,private router:Router) { 
    this.codrol=Number(this.route.snapshot.paramMap.get('codrol'));
    this.rolinfo(this.codrol);  
  }

  ngOnInit(): void {
  }

  rolinfo(codrol:number){
    this.rs.inforolById(codrol).then(data=>{
      this.rol=data[0];
      this.bandera=true;
    });
  }
  modificar(){
   this.rs.updateRol(this.rol).then(data=>{
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: data['mensaje'],
      showConfirmButton: false,
      timer: 2000
       })
     this.router.navigate(['/dashboard/roles']);
   }).catch(()=>{
    Swal.fire(
      'Error!!!',
      'Ocurrio un error inesperado intentelo nuevamente',
      'error'
    )
   })
    
  }

  selecticono(icono:string){
   this.rol.imagen=icono;
  }
}
