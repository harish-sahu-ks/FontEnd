import { Component } from '@angular/core';
import { CmrtService } from '../cmrt.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  email = ""
  preEmail = ""
  constructor(private cmrtsevice:CmrtService){
  this.preEmail = cmrtsevice.getChangeEmailData();
  console.log(this.preEmail);
 }
  SendEmail(){
    //  console.log(this.email)
    let data = {Email : this.preEmail, new_Email : this.email};
    if(this.email!=""){
      this.cmrtsevice.editUserEmail(data).subscribe((response)=>{
        // confirm("Would You Like To Edit")
        window.location.reload();
      })
    }
  }
}
