import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home.component';
import {DasboardComponent} from './dasboard/dasboard.component'
import { UserDetailComponent } from './user_detail/user_detail.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
},
// { path: '', component: AppComponent, canActivate: [AuthGuard] },

{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent,
  // canActivate:[AuthGuard]
},
{
  path: 'login/:randomNumber',
  component: LoginComponent,
  // canActivate:[AuthGuard]
},
{
  path : 'dashboard',
  component : DasboardComponent,
  canActivate:[AuthGuard]
},
{
  path : 'user_details',
  component : UserDetailComponent,
  canActivate:[AuthGuard]
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
