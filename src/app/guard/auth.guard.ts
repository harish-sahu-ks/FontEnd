import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CmrtService } from '../cmrt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:CmrtService, private router:Router){

  }
  canActivate():boolean {
    if(this.auth.isLoggedIn()){
      console.log("activate")
      return true;
    }else{
      this.router.navigate(['/login'])
      console.log("Deactivate")
      return false;
    }
  }
}
