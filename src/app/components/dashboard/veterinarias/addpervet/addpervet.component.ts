import { veterinaria } from './../../../../utils/interfaces/veterinaria.inteface';
import { MatPaginator } from '@angular/material/paginator';
import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from './../../../../servicios/usuarios.service';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-addpervet',
  templateUrl: './addpervet.component.html',
  styleUrls: ['./addpervet.component.css']
})
export class AddpervetComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
veterinarios:any;
displayedColumns: string[] = ['codigo','nombre','Acciones'];
codveterinaria:number;
vete:veterinaria;
@ViewChild('icono') ico:ElementRef;
  dataSource = new MatTableDataSource();
  constructor(private usu:UsuariosService,private route:ActivatedRoute,private vet:VeterinariasService) {
    this.codveterinaria=Number(this.route.snapshot.paramMap.get('codvet'))
  }

  ngOnInit(): void {
    this.getveterinarios();
    this.infovet(this.codveterinaria);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getveterinarios(){
    this.usu.getUsuariosRol(2).then((data:any)=>{
      return this.usu.getPervet(this.codveterinaria).then(data2=>{
              this.dataSource.data=this.concatenar(data,data2)

      }).catch(()=>{
        Swal.fire(
          'Error!!!',
          'Error al cargar los datos',
          'error'
        )
      })
    })
  }

  buscarPersona(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  asignar(codper:number){
    // console.log(`Se registraran ${ codper}   y   ${this.codveterinaria}`);
    this.vet.asignarpervet({
      codper:codper,
      codvet:this.codveterinaria
    }).then(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
        })
        this.getveterinarios();
    }).catch(e=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
  }



  eliminar(codper:number){
    // console.log(`Se registraran ${ codper}   y   ${this.codveterinaria}`);
    this.vet.delpervet({
      codper:codper,
      codvet:this.codveterinaria
    }).then(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data['mensaje'],
        showConfirmButton: false,
        timer: 2000
       })
       this.getveterinarios();
    }).catch(e=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error inesperado intentelo nuevamente',
        'error'
      )
    })
  }


  concatenar(arr1,arr2){
    const arr3=arr1.concat(arr2)
    return this.removeDuplicates(arr3)
  }

  removeDuplicates(inArray:any){
    var arr = inArray// create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for(var i=0; i<arr.length; ++i) { 
        //create the second cycle of the loop from element n+1
        for(var j=i+1; j<arr.length; ++j) { 
            //if the two elements are equal , then they are duplicate
            if(arr[i].codper === arr[j].codper) {
                arr.splice(j, 1); //remove the duplicated element 
                arr[i].pv=true
            }
        }
    }
    return arr;
   }

   infovet(codvet:number){
    this.vet.getInfoVetById(codvet).then((data:veterinaria[])=>{
      this.vete=data[0];
    })
   }

}
