import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { HomeService } from '../../services/home.service';
import { PeliculasEstreno, DataPeli } from '../../models/PeliculasEstreno';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public peliculasEstrenos: PeliculasEstreno =
    {
      data: [
        {
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

        },
      ],
      imageBaseUrl: ''
    }
  public peliculasPopular: PeliculasEstreno =
    {
      data: [
        {
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

        },
      ],
      imageBaseUrl: ''
    }

  public fila: any;
  public spinner: boolean = false;
  public notscrolly: boolean = false;
  public notEmptyPost: boolean = false;
  public pageNumberEstrenos: number = 1;
  public pageNumberPopular: number = 1;
  constructor(
      private homeService: HomeService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.fila = document.querySelector('.wrapper');
    this.cargarImagenes();
  }
  async cargarImagenes() {
    await this.getPeliculasEstrenos(this.pageNumberEstrenos);
    await this.getPeliculasPopular(this.pageNumberPopular);

  }
  flechaDerecha() {
    this.fila.scrollLeft = this.fila.scrollLeft + this.fila.offsetWidth;
    console.log(this.fila.scrollLeft);
  }
  flechaIzquierda() {
    this.fila.scrollLeft = this.fila.scrollLeft - this.fila.offsetWidth;
  }
  async getPeliculasEstrenos(pageNumber: number) {
    this.homeService.getPeliculasEstreno(pageNumber).subscribe(async (peliculasEstrenos: PeliculasEstreno) => {
      this.peliculasEstrenos = await peliculasEstrenos;
    }, (error) => {
      console.log(error);
    });
  }
  async getPeliculasPopular(pageNumber: number) {
    if (pageNumber == 1) {
      this.peliculasPopular.data = [];
    }
    this.spinner = true;
    this.homeService.getPeliculasPopular(pageNumber).subscribe(async (peliculasEstrenos: PeliculasEstreno) => {
      peliculasEstrenos.data.forEach(async (peliPopular) => {
        this.peliculasPopular.data.push(await peliPopular);
        this.spinner = false;
      });
    }, (error) => {
      console.log(error);
      this.spinner = false;
    });
  }
  onScroll(): void {
    this.spinner = true;
    this.spinner = true;
    this.cargarListadoSiguientePopular();

  }
  cargarListadoSiguientePopular(): void {
    let VL_pagina = 0;
    VL_pagina = this.pageNumberPopular + 1;
    this.pageNumberPopular = VL_pagina;
    this.getPeliculasPopular(this.pageNumberPopular);
  }
  mostrarData(peliculasPopular: DataPeli) {
    this.homeService.dataPelicula.emit(peliculasPopular);
    let extras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(peliculasPopular),
      },
    };
    this.router.navigate(["/detail"], extras);
  }
}
