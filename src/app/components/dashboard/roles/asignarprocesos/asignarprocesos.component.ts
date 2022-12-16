import { rolInterface } from './../../../../utils/interfaces/role.interface';
import { procesoInterface } from './../../../../utils/interfaces/proceso.interface';
import { RolesService } from './../../../../servicios/roles.service';
import { ProcesosService } from './../../../../servicios/procesos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-asignarprocesos',
  templateUrl: './asignarprocesos.component.html',
  styleUrls: ['./asignarprocesos.component.css']
})
export class AsignarprocesosComponent implements OnInit {
  procesos:any[];
  codrol:number;
  codproc:number;
  rol:rolInterface;
  public cssdisplay:boolean;
  constructor(private route:ActivatedRoute,private prs:ProcesosService,private rs:RolesService) { 
   this.codrol=Number(this.route.snapshot.paramMap.get('codrol'))
  }

  ngOnInit(): void {
    this.getProcesosRol(this.codrol);
    this.inforol(this.codrol);
  }
   

  getProcesosRol(codrol:number){
    this.rs.listarRolPro(codrol).then((data:procesoInterface[])=>{
      return this.prs.getProcesos().then((data2:procesoInterface[])=>{
          this.procesos=this.concatenar(data2,data);
      })
    })
  }
  inforol(codrol:number){
   this.rs.inforolById(codrol).then((data:rolInterface)=>{
     this.rol=data[0];
   })
  }

  concatenar(arr1,arr2){
    const arr3=arr1.concat(arr2)
    return this.removeDuplicates(arr3)
  }

  addprocesorol(event){
      if(event.option._selected){
        this.rs.addrolpro({codrol:this.codrol,codproc:event.option._value}).then(data=>{
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
            'Error al guardar proceso ',
            'error'
          )
          
        })
      }else{
        this.rs.removerolpro({codrol:this.codrol,codproc:event.option._value}).then(data=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data['mensaje'],
            showConfirmButton: false,
            timer: 2000
            })
        }).catch((e)=>{
          Swal.fire(
            'Error!!!',
            'Error eliminar proceso ',
            'error'
          )
          
        })
      }
    
  }
  

  removeDuplicates(inArray:any){
    var arr = inArray// create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for(var i=0; i<arr.length; ++i) { 
        //create the second cycle of the loop from element n+1
        arr.select='';
        for(var j=i+1; j<arr.length; ++j) { 
            //if the two elements are equal , then they are duplicate
            if(arr[i].codproc === arr[j].codproc) {
                arr.splice(j, 1); //remove the duplicated element 
                arr[i].select='selected'
            }
        }
    }
    return arr;
   }
}
