import { veterinaria } from './../../../../utils/interfaces/veterinaria.inteface';
import { VeterinariasService } from './../../../../servicios/veterinarias.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa:Mapboxgl.Map;
  marcador:any;
  codvet:number;
  datosvet:veterinaria;
  bandera:boolean=false;
  constructor(private route:ActivatedRoute,private vet:VeterinariasService) { 
    this.codvet=Number(this.route.snapshot.paramMap.get('codvet'));
  }

  ngOnInit(): void {
    this.getveterinaria(this.codvet);
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

   getveterinaria(codvet:number){
     this.vet.getInfoVetById(codvet).then((data:veterinaria)=>{
       this.datosvet=data[0];
       this.bandera=true;
       this.inizializarMapa(Number(this.datosvet.lat),Number(this.datosvet.lng),this.datosvet.imagen,this.datosvet.nombre);
     });
   }



}
