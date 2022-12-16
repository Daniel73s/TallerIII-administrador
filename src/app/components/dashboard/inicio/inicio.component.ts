import { VeterinariasService } from './../../../servicios/veterinarias.service';
import { UsuariosService } from './../../../servicios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public admins:number;
  public usuarios:number;
  public veterinarias:number;
  public codrol:number;
  constructor(private usu:UsuariosService,private vet:VeterinariasService) {
    const datos=decode(localStorage.getItem('token')) ;
    this.codrol=datos['codrol'];
   }

  ngOnInit(): void {
    this.usu.contartipodepersona(1).then(data =>{
      this.admins=data[0].count;
    });
    this.usu.countusuarios().then(data=>{
      this.usuarios=data[0].count;
    });
    this.vet.countVeterinarias(true).then(data=>{
       this.veterinarias=data[0].count;
    });
  }

}
