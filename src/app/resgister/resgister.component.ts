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
  EmailId :string = "";
  supplier_name : string = "";
  supplier_company : string = "";
  password : string = "";
  confirm_password : string = "";
  constructor(private router: Router,
    private cmrtservice:CmrtService){}
  ngOnInit(): void {
  
  }
  
  Registered_User :any = []
  registrationUser(){
   if(this.EmailId !="" && this.supplier_name !="" && this.supplier_company !=""){
     if(this.password.length>=6){
       if(this.password == this.confirm_password){
         let data = {"EmailId":this.EmailId,
       "supplier_name":this.supplier_name,
       "supplier_company":this.supplier_company,
       "password":this.password 
     }
        this.Registered_User.push(data)
        this.cmrtservice.postUserDetail(data).subscribe((response:any)=>{
             alert(response)
        });
        //  window.location.reload()
       }
       else{
         alert("Repeat Password is Incorrect");
       }
     }else{
       alert("password should be atleat six character")
     }  
   }else{
    alert("Field should not be empty")
   } 
    console.log(this.Registered_User);
  }
}
