import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home.component';
import {DasboardComponent} from './dasboard/dasboard.component'
import { UserDetailComponent } from './user_detail/user_detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
},
// { path: '', component: AppComponent, canActivate: [AuthGuard] },

{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path : 'dashboard',
  component : DasboardComponent
},
{
  path : 'user_details',
  component : UserDetailComponent
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
