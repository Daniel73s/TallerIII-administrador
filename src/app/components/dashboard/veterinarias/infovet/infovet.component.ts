
import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-infovet',
  templateUrl: './infovet.component.html',
  styleUrls: ['./infovet.component.css']
})
export class InfovetComponent implements OnInit {
codvet:number;
veterinaria:any;
propietarios:any[]=[];
panelOpenState = false;
  constructor(private route:ActivatedRoute,private vet:VeterinariasService) { 
    this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
  }

  ngOnInit(): void {
    this.getVeterinaria();
    this.getUsuariosVet();
  }


  getVeterinaria(){
    this.vet.getInfoVetById(this.codvet).then(data=>{
       this.veterinaria=data[0];
    }).catch(()=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error al traer los datos de la veterinaria',
        'error'
      )
    })
  }

  getUsuariosVet(){
    this.vet.getDuenosVet(this.codvet).then((data:any[])=>{
      this.propietarios=data;
    }).catch(()=>{
      Swal.fire(
        'Error!!!',
        'Ocurrio un error al cargar los datos del dueño',
        'error'
      )
    })
  }

}
