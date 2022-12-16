import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { UsuariosService } from './../../../../servicios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.css']
})
export class InfouserComponent implements OnInit {

  usuario:any;
  veterinaria:any[]=[];
  private codper:number;
  constructor(private route:ActivatedRoute,private usu:UsuariosService,private vet:VeterinariasService) { 
    this.codper=Number(this.route.snapshot.paramMap.get('codper'));
  }

  ngOnInit(): void {
   this.getInfoUsu();
   this.getVetUsu();
  }

getInfoUsu(){
  this.usu.imprimirDatosPersona(this.codper).then(data=>{
    this.usuario=data[0];
 })
}
  getVetUsu(){
  this.vet.listarVetUsu(this.codper).then((data:any[])=>{
    this.veterinaria=data;
   })
  }
}
