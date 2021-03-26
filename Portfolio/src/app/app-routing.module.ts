import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "register" ,component:RegisterComponent},
  {path: "login" ,component:LoginComponent},
  {path: "portfolio/:id" ,component:PortfolioComponent},
  {path:"",redirectTo:"login",pathMatch:"full"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
