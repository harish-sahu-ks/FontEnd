import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmrtService } from '../cmrt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit{

  constructor(private router: Router,
    private cmrtservice:CmrtService){}
  ngOnInit(): void {
  
  }
  registrationform = new FormGroup({
    EmailId : new FormControl('',[Validators.required,Validators.email]),
    supplier_name : new FormControl('',[Validators.required]),
    supplier_company : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.maxLength(6)]),
    confirm_password : new FormControl('',[Validators.required])
  })
  
  registrationUser(){
         console.log(this.registrationform.value);
  }
}
