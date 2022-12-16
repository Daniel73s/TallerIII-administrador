import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { rolInterface } from './../../../utils/interfaces/role.interface';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from './../../../servicios/roles.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  estadoinput:boolean=false;
  displayedColumns: string[] = ['Nombre','estado','acciones'];
  dataSource = new MatTableDataSource();
  constructor(private rs:RolesService,private router:Router) { }
  ngOnInit(): void {
    this.cargarRoles()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //aparecer o desaparecer el input de buscar
  cambiarestado(){
    this.estadoinput=!this.estadoinput;
  }

  cargarRoles(){
    this.rs.getroles().subscribe((data:rolInterface[])=>{
      this.dataSource.data=data
    });
  }

  buscarRol(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   modrol(codrol:number){
      this.router.navigate([`/dashboard/modrol/${codrol}`]);
   }

   //Asignando procesos
   asignarProc(codrol:number){
     this.router.navigate([`/dashboard/asignarprocesos/${codrol}`]);     
   }

   //Eliminarlo o habilitarlo
  CambiarEstado(estado:boolean,codrol:number){
    if(estado){
      const titulo='Habilitar Rol';
      const texto='este rol esta apunto de Habilitarse';
      const icono='warning';
      const btn='Habilitar!';
      const color='#008f39';
       this.mensaje(titulo,texto,icono,btn,color,estado,codrol);
    }else{
       const titulo='Deshabilitar Rol';
       const texto='este rol esta apunto de Dehabilitarse';
       const icono='warning';
       const btn='Deshabilitar!';
       const color='#d33';
       this.mensaje(titulo,texto,icono,btn,color,estado,codrol);
    }
  
  }


  mensaje(titulo:string,texto:string,icono:any,btn:string,color:string,estado:boolean,codrol:number){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: ' #e7e7e7 ',
      confirmButtonText: btn
    }).then((result) => {

      if (result.isConfirmed){
        this.rs.cambiarEstadoRol({estado:estado,codrol:codrol}).then(()=>{
                //  this.mensajeConfirmacion('Se realizo la accion con exito');
                   if(estado){
                    Swal.fire(
                      'Habilitado!',
                      'Se habilito satisfactoriamente.',
                      'success'
                    )
                   }else{
                    Swal.fire(
                      'Deshabilitado!',
                      'Se deshabilito satisfactoriamente.',
                      'success'
                    )
                   }
                 this.cargarRoles();
        }).catch(e=>{
          Swal.fire(
            'Error!!!',
            'Ocurrio un error inesperado intentelo nuevamente',
            'error'
          )
        })
      }
    })
  }
}
