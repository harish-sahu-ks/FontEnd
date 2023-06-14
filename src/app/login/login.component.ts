import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 username: any;
 password: any; 
  

  ngOnInit(): void {
  
    
  }

  constructor(  
    private router: Router,
    ){}

  loginUser(){
    if(this.username=="hksm199@gmail.com" && this.password=="hksm199@gmail.com"){
      console.log("welcome")
      this.router.navigateByUrl('/home');
    }
  }
  
}
