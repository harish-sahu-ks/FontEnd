import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CmrtService } from '../cmrt.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth : CmrtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //  let myToken = this.auth.getToken();
  const token = localStorage.getItem('token');

  console.log(token)
    if(token){
      console.log("<><><>><><><><><><><><"+token.toString())
      console.log("jhjjhjhjhkjdfghjk");
        request = request.clone({
          setHeaders:{
            Authorization : `Bearer ${token}`
          }
        })
    }
    return next.handle(request);
  }
}
