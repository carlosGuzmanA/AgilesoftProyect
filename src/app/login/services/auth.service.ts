import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login } from '../models/logins';
import { map, pluck } from 'rxjs/operators';
import { AuthData, Data } from '../models/payloadUser';
import { DataUser } from '../models/userData';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiAuth = environment.apiAuth;
  public apiUser = environment.apiUser;

  public userToken: string = '';

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  public iniciarSesion(login: Login): Observable<AuthData> {
    return this.http.post(`${this.apiAuth}login`, login).pipe(
      map( (resp: any ) => {
        this.guardarToken( resp.data.payload.token );
        return resp;
      })
    );
  }
  public getUserData(): Observable<DataUser> {
    return this.http.get(`${this.apiUser}me`).pipe(pluck('data'));
  }

  public guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token')?? '';
    } else {
      this.userToken = '';
    }
    return this.userToken;

  }

  exiteToken(): boolean {

    return this.userToken.length > 2;
    
    // const expira = Number(localStorage.getItem('expira'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);

    // if ( expiraDate > new Date() ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

}
