import { Component, OnInit } from '@angular/core';
import { Login } from './models/logins';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2'
import { AuthData } from './models/payloadUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  public login: Login = {
    username: '',
    password: ''
  }

  constructor(
      private authService: AuthService,
      private router: Router
      ) { }


  ngOnInit(): void {
    localStorage.clear();
  }
  iniciarSesion() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Ingresando',
      icon: 'info'
    });
    Swal.showLoading();
    this.authService.iniciarSesion(this.login).subscribe(async (resp: AuthData) => {
      if (resp.data) {
        Swal.close();
        this.router.navigateByUrl('/home');
      }
    }, (error) => {
      console.log(error);
      if (error) {
        Swal.fire({
          title: 'Error al autenticar',
          text: error.error.message,
          icon: 'error'
        });
      }
    });
  }
}
