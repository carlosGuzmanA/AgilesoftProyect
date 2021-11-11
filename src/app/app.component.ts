import { Component, OnChanges } from '@angular/core';
import { AuthService } from './login/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DataUser } from './login/models/userData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'AgileMovies';

  public userData: DataUser = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: new Date()
  }
  public canActBool:boolean = false;  
  constructor(
    private authService: AuthService,
    private canAct: AuthGuard,

  ){

    this.canAct.guardActivate.subscribe((resp)=>{
      console.log('cantActivate',resp); 
      if (resp) {
        this.canActBool = true;
        this.authService.getUserData().subscribe((resp: DataUser)=>{
          this.userData = resp;
          },(error)=>{
          console.log(error);

          });
      }
      },(error)=>{
       
      console.log(error);
      this.userData = {
          id: 0,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          createdAt: new Date()
        }
      });
    // console.log('CANT ACTIVATE',this.canAct.canActivate());
    
  }
  ngOnChanges(){
    
    
  }
}
