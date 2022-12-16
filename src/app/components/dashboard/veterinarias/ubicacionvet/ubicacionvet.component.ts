
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import {UbicacionService} from '../../../../servicios/ubicacion.service';
@Component({
  selector: 'app-ubicacionvet',
  templateUrl: './ubicacionvet.component.html',
  styleUrls: ['./ubicacionvet.component.css']
})
export class UbicacionvetComponent implements OnInit {
mapa:Mapboxgl.Map;
marcador:any;
lnglat={};
  constructor(private serUb:UbicacionService) { 
  }

  ngOnInit(){
    Mapboxgl.accessToken = environment.mapboxkey;
    
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-64.732201,-21.529409], // starting position
    zoom: 13// starting zoom
    });
    this.crearmarcador(-64.732201,-21.529409);
  }

  crearmarcador(lng:number,lat:number){
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

      marker.on('drag',()=>{
          //  console.log(marker.getLngLat());
            this.marcador=marker.getLngLat();
      });

  }

  enviarLgnLat(){
    this.serUb.setUbicacion(this.marcador.lat,this.marcador.lng); 
  }



}
