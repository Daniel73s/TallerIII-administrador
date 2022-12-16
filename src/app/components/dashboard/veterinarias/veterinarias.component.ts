import { MatPaginator } from '@angular/material/paginator';
import {  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeterinariasService } from './../../../servicios/veterinarias.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { veterinaria } from 'src/app/utils/interfaces/veterinaria.inteface';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
  styleUrls: ['./veterinarias.component.css']
})
export class VeterinariasComponent implements OnInit {
  displayedColumns: string[] = ['Id','Nombre', 'Estado','Telefono','Acciones'];
  dataSource = new MatTableDataSource();
  bandera:Boolean=false;
  @ViewChild('buscador') buscar:ElementRef;
  @ViewChild('input') input:ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private vet:VeterinariasService,private renderer2:Renderer2,private _snack:MatSnackBar,private router:Router) {
   }

  ngOnInit(): void {
   this.listarVeterinarias();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

listarVeterinarias(){
  this.vet.getVeterinarias().then((data:veterinaria[])=>{
    this.dataSource.data=data;
  }).catch(e=>{
 
  })
}


  buscarPersona(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

cambiar():void{
    const buscador=this.buscar.nativeElement;
    this.bandera=!this.bandera;
    if(this.bandera){
      this.renderer2.setStyle(buscador,'display','inline');
    }else{
      this.renderer2.setStyle(buscador,'display','none');
    }
  }

  eliminar(codvet){
    Swal.fire({
      title: 'Dar de baja?',
      text: "Esta Veterinaria esta a punto de darse de baja!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: ' #e7e7e7 ',
      confirmButtonText: 'Aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vet.deleteVeterinaria(codvet).then(data=>{
        Swal.fire(
          'Deshabilitado!',
          'esta veterinaria de deshabilito.',
          'success'
        )
        this.listarVeterinarias()
        }).catch(()=>{
          Swal.fire(
            'Error!!!',
            'Ocurrio un error inesperado intentelo nuevamente',
            'error'
          )
        })
                
      }
    });
  }


  habilitar(codvet){
    Swal.fire({
      title: 'Habilitar?',
      text: "Esta Veterinaria esta a punto de Habilitarse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008f39',
      cancelButtonColor: ' #e7e7e7 ',
      confirmButtonText: 'Habilitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vet.habilitarVeterinaria(codvet).then(data=>{
          Swal.fire(
            'Habilitado!',
            'Se habilito satisfactoriamente.',
            'success'
          )
        this.listarVeterinarias();
        }).catch(()=>{
          Swal.fire(
            'Error!!!',
            'Ocurrio un error inesperado intentelo nuevamente',
            'error'
          )
        })  
      }      
    });
  }

  addVeterinariovet(codvet:number){
      this.router.navigate([`/dashboard/addpervet/${codvet}`]);  
   }

   imprimirvet(codvet:number){
     this.router.navigate([`/dashboard/infovet/${codvet}`]);
   }

   modvet(codvet:number){
       this.router.navigate([`/dashboard/modvet/${codvet}`]);
   }
   ubicacion(codvet:number){
       this.router.navigate([`/dashboard/mapa/${codvet}`]);
       
   }
}
