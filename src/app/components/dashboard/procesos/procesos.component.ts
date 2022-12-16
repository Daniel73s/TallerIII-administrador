import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { procesoInterface } from './../../../utils/interfaces/proceso.interface';
import { ProcesosService } from './../../../servicios/procesos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns: string[] = ['Nombre','estado','acciones'];
dataSource = new MatTableDataSource();
public estadoinput:boolean=false;
  constructor(private prs:ProcesosService,private router:Router) { }

  ngOnInit(): void {
    this.cargarprocesos();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  cargarprocesos(){
    this.prs.getProcesos().then((data:procesoInterface[])=>{
      this.dataSource.data=data;
    });
  }

  Input(){
    this.estadoinput=!this.estadoinput;
  }

  buscarProceso(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  modproc(codproc:number){
     this.router.navigate([`/dashboard/modproceso/${codproc}`]);
  }

  CambiarEstado(estado:boolean,codproc:number){
    if(estado){
      const titulo='Habilitar Proceso';
      const texto='este Proceso esta apunto de Habilitarse';
      const icono='warning';
      const btn='Habilitar!';
      const color='#008f39';
       this.mensaje(titulo,texto,icono,btn,color,estado,codproc);
    }else{
       const titulo='Dehabilitar Proceso';
       const texto='este Proceso esta apunto de deshabilitarse';
       const icono='warning';
       const btn='Deshabilitar!';
       const color='#d33';
       this.mensaje(titulo,texto,icono,btn,color,estado,codproc);
    }
  }

  mensaje(titulo:string,texto:string,icono:any,btn:string,color:string,estado:boolean,codproc:number){
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
        this.prs.estadoproceso({estado:estado,codproc:codproc}).then(()=>{
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
                 this.cargarprocesos();
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
