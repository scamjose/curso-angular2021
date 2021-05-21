import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RopaComponent } from './ropa/ropa.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'contacto',
    component:ContactoComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'ropa',
    component:RopaComponent
  },
  {
    path:'ropa/:id',
    component:RopaComponent
  },
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
