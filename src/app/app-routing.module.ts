import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailComponent } from './detail/components/detail/detail.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'detail', component: DetailComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }