import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetImagesComponent } from './get-images/get-images.component';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:GetImagesComponent},
  {path:'**',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
