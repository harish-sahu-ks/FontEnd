import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmrtService } from '../cmrt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  Email:string='';
  oneTimePassword : any = '';
  NewPassword : string = '';
  ConfirmNewPassword : string = '';

  constructor( private router: Router,
    private cmrtservice:CmrtService){

  }

  ngOnInit(): void {

  }

  userregistration = new FormGroup({
   
  })

}
