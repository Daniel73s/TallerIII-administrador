import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RolesService } from './../../../../servicios/roles.service';
import { rolInterface } from './../../../../utils/interfaces/role.interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-addrol',
  templateUrl: './addrol.component.html',
  styleUrls: ['./addrol.component.css']
})
export class AddrolComponent implements OnInit {
  public Rol:rolInterface={
    nombre:'',
    imagen:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fuser.png?alt=media&token=4cebe799-c7b7-41fc-8977-6027c2742f43'
  }
  iconos:any[]=[
    {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fadmin.jpg?alt=media&token=ec95a12f-1b97-489f-90c0-5498e6c52758'},
    {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fuser.png?alt=media&token=4cebe799-c7b7-41fc-8977-6027c2742f43'},
    {ruta:'https://firebasestorage.googleapis.com/v0/b/talleriii-4de86.appspot.com/o/roles%2Fveterinario.jpg?alt=media&token=670c0068-cb52-41d9-b629-58f64142e21d'},
  ];
  constructor(private rolservice:RolesService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  IconoRol(ruta:string){
    this.Rol.imagen=ruta; 
  }


  submit(){
    this.rolservice.addrol(this.Rol).then(data=>{
       this.router.navigate(['/dashboard/roles']);
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
        })
    }).catch(()=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
  }
}
