import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PeliculasEstreno, DataPeli, PeliculasReparto } from '../models/PeliculasEstreno';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public apiMovies = environment.apiMovies;
  @Output() dataPelicula: EventEmitter<DataPeli> = new EventEmitter();
  public userToken: string = '';
  constructor(private http: HttpClient) { 
    
  }
  
    public getPeliculasEstreno(page: number): Observable<PeliculasEstreno> {
      return this.http.get<PeliculasEstreno>(`${this.apiMovies}now_playing?page=${page}`).pipe(
        map( (resp: PeliculasEstreno ) => {
            resp.data.forEach(async (element) => {
              element.imagenUrl = await resp.imageBaseUrl + element.backdrop_path;
              element.imagenUrlPoster = await resp.imageBaseUrl + element.poster_path;
            });
          return resp;
        })
      );
    }
    public getPeliculasPopular(page: number): Observable<PeliculasEstreno> {
      return this.http.get<PeliculasEstreno>(`${this.apiMovies}popular?page=${page}`).pipe(
        map( (resp: PeliculasEstreno ) => {
            resp.data.forEach(async (element) => {
              element.imagenUrl = await resp.imageBaseUrl + element.backdrop_path;
              element.imagenUrlPoster = await resp.imageBaseUrl + element.poster_path;
            });
          return resp;
        })
      );
    }
    public getPeliculasIdActors(id: number): Observable<PeliculasReparto> {
      return this.http.get<PeliculasReparto>(`${this.apiMovies}${id}/actors`).pipe(
        map( (resp: PeliculasReparto ) => {
            resp.data.forEach(async (element: any) => {
              element.imagenUrlProfile = await resp.imageBaseUrl + element.profile_path;
            });
          return resp;
        })
      );
    }
    
  }
