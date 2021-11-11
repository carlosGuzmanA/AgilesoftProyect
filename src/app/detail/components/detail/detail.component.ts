import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../home/services/home.service';
import { Route } from '@angular/compiler/src/core';
import { DataPeli, PeliculasReparto } from '../../../home/models/PeliculasEstreno';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public dataPeli2: DataPeli[]=[];
  public dataPeli3: any;

  public dataPeli: DataPeli = {
        adult: false,
        backdrop_path: '',
        id: 0,
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        release_date: new Date(),
        title: '',
        video: false,
        vote_average: 0,
        vote_count: 0,
        imagenUrl: '',
        imagenUrlPoster:''
  }
  imagen: string = '';
  listadoReparto:PeliculasReparto = 
    {
      data: [{
        adult: false,
        id: 0,
        popularity: 0,
        cast_id:0,
        character: '',
        credit_id:'',
        gender:0,
        imagenUrlProfile:'',
        known_for_department:'',
        name:'',
        order:0,
        original_name:'',
        profile_path:''
      }],
      imageBaseUrl:''
  }
    
    
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
  ) {
    // this.homeService.dataPelicula.subscribe(async (resp: any)=>{
    //   // console.log('RESP',resp);
      
    //   this.dataPeli3 = resp;
    //   this.imagen = this.dataPeli.imagenUrl;
    //   this.dataPeli2.push(resp);
    //   console.log('DATA PELI 2',this.dataPeli2);
      
    //   // console.log(this.dataPeli);
    //   },(error)=>{
    //   console.log(error);
    //   });
  }
  
  leerParametro() {
  // private route: ActivatedRoute,
  this.route.queryParams.subscribe((params) => {
  
  this.dataPeli = JSON.parse(params.item);
  console.log(this.dataPeli3);
  });
  }
  ngOnInit(): void {
    this.leerParametro();
    this.obtenerReparto();
  }
  obtenerReparto(){
    this.homeService.getPeliculasIdActors(this.dataPeli.id).subscribe((resp)=>{
    console.log(resp);
    this.listadoReparto = resp;
    },(error)=>{
    console.log(error);
    });
  }
}
