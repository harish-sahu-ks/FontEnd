import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmrtService } from '../cmrt.service';

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
    private cmrtservice:CmrtService
    ){}

  loginUser(){
    // if(this.username=="hksm199@gmail.com" && this.password=="hksm199@gmail.com"){
    //   console.log("welcome")
    //   this.router.navigateByUrl('/home');
    // }
    let data:any = []
    data.push({
      username:this.username,
      password:this.password
    })
    this.cmrtservice.login(data);
  }
  
}
