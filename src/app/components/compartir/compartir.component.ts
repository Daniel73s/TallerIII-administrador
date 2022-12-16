import { VeterinariasService } from './../../servicios/veterinarias.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { veterinaria } from 'src/app/utils/interfaces/veterinaria.inteface';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent implements OnInit {



  private codvet:number;
  public veterinaria:veterinaria;
  public propietarios:any[];
  mapa:Mapboxgl.Map;
  constructor(private route:ActivatedRoute,private vet:VeterinariasService) {
  this.codvet=Number(route.snapshot.paramMap.get('codvet'));
  }

  ngOnInit(): void {
    this.getveterinaria(this.codvet);
    this.getpropietarios(this.codvet);
  
  }


getveterinaria(codvet:number){
   this.vet.getInfoVetById(codvet).then((data:veterinaria)=>{
     this.veterinaria=data[0];
     this.inizializarMapa(Number(this.veterinaria.lat),Number(this.veterinaria.lng),this.veterinaria.imagen,this.veterinaria.nombre);

   });
}

getpropietarios(codvet:number){
  this.vet.getDuenosVet(codvet).then((data:any[])=>{
  this.propietarios=data;

  
  
  })
}

inizializarMapa(lat:number,lng:number,img:string,nombre:string){
  Mapboxgl.accessToken = environment.mapboxkey;
  this.mapa = new Mapboxgl.Map({
  container: 'mapa-mapbox', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng,lat], // starting position
  zoom: 13// starting zoom
  });
  this.crearmarcador(lng,lat,img,nombre);
}


crearmarcador(lng:number,lat:number,img:string,nombre:string){
  const marker = new Mapboxgl.Marker({
    draggable: false
    })
    .setLngLat([lng, lat])
    .setPopup(new Mapboxgl.Popup()
     .setHTML(   
    '<div style="text-align:center;">'  +
    '<img src="'+img+ '" style="width:50px; height:50px; border-radius:100%; margin:auto; display:block;">'+
    '<small style="color: #a1a1a1;">VETERINARIA '+ nombre+'</small> '+
    '</div>'
    ))
    .addTo(this.mapa);
    marker.togglePopup();
}


}
