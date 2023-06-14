import { Component,OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as XLSX from "xlsx";
import { CmrtService } from '../cmrt.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { database } from 'ngx-bootstrap-icons';
@Component({
  selector: 'app-user_detail',
  templateUrl: './user_detail.component.html',
  styleUrls: ['./user_detail.component.css']
})
export class UserDetailComponent implements OnInit {
  formData : FormData = new FormData();
  files1 : any = " ";
  userList:any = []
  data: any;
  userlistFromdbs :any = [];
  userpreviousData :any = [];
  DisplayUserList : any = [];
  index:any="";
  isChecked:boolean=true;
  isSelectAll:boolean=false;
  isFileSelect:boolean=true;
  constructor( private cmrtservice:CmrtService,private route:ActivatedRoute, private dialog:MatDialog, private http:HttpClient, ){

  }

  ngOnInit(): void {
    // this.cmrtservice.getUserlistDetails().subscribe((userDetails:any)=>{
    //   console.log(userDetails.length + "h")
    // })

    let url = 'http://localhost:4000/getuserDetailList';
    this.http.get<any>(url).subscribe({
      next:data=>{
        while(this.userlistFromdbs.length>0){
          this.userlistFromdbs.pop();
        }
        for(let i=0; i<data.length;i++){
          this.userlistFromdbs.push({
            Id : i+1,
            Name : data[i].Name,
            Company : data[i].Company,
            Email : data[i].Email,
            Status : data[i].Status,
            Select : data[i].isSelect
          })
        }
        // console.log(this.userlistFromdbs.length)
      }
    })
  }
  displayUserList(){}
  changeUserDetailFile(event:any) {
      this.isFileSelect=false;
      this.files1 = event.target.files;
     //  console.log(files1.length);
     
      if(event.target.files.length > 0) 
      {
        console.log(event.target.files[0].name);
      }
      
      this.formData = new FormData();
      for(let index = 0; index<this.files1.length;index++){
        const element = this.files1[index];
        this.formData.append('files',element)
      }  
   }

   uploadfile(){
        console.log(this.files1[0])
        while(this.userList.length>0){
          this.userList.pop()
        }

        const SelectFile = this.files1[0];
        const fileReader  = new FileReader();

        fileReader.readAsBinaryString(SelectFile);
        fileReader.onload = (event : any)=>{
          console.log(event);
        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData,{type:'binary'});
        let wsname = workbook.SheetNames[0];
        let ws : XLSX.WorkSheet = workbook.Sheets[wsname];
        this.data = XLSX.utils.sheet_to_json(ws);
        // console.log(this.data)
        for(let i=0; i<this.data.length;i++){
          this.userList.push(this.data[i])
        }

        if(this.userpreviousData.length>0){
              for(let i=0; i<this.userList.length;i++){
                    for(let j=0; j<this.userpreviousData.length;j++){
                        if(this.userList[i].Name==this.userpreviousData[j].Name){
                             if(this.userList[i].Email != this.userpreviousData[j].Email){
                                   this.DisplayUserList.push(
                                    {
                                      Id : i+1,
                                      Compare : "Matched",
                                      Name : this.userList[i].Name,
                                      Company : this.userList[i].Company,
                                      Email : this.userList[i].Email,
                                      Status : this.userList[i].Status
    
                                    }
                                   )
                             }
                        }else{
                          this.DisplayUserList.push(
                            {
                              Id : i+1,
                              Compare : "Not_Matched",
                              Name : this.userList[i].Name,
                              Company : this.userList[i].Company,
                              Email : this.userList[i].Email,
                              Status : this.userList[i].Status
    
                            }
                           )
                        }
                    }
              }
           }else{
            for(let i=0; i<this.userList.length;i++){
              this.DisplayUserList.push(
                {
                  Id : i+1,
                  Compare : "Not_Matched",
                  Name : this.userList[i].Name,
                  Company : this.userList[i].Company,
                  Email : this.userList[i].Email,
                  Status : this.userList[i].Status
    
                }
                )
              }
           }
        console.log(this.userList[0].Name)
       this.cmrtservice.postUserlistDetails(this.userList).subscribe({
            next:(data:any)=>{
              window.location.reload();
              // Don't Delete
              // console.log(data)
              // while(this.userList.length>0){
              //   this.userList.pop()
              // }
              // for(let i=0; i<data.length;i++){
              //   this.userlistFromdbs.push({
              //     Id : i+1,
              //     Name : data[i].Name,
              //     Company : data[i].Company,
              //     Email : data[i].Email,
              //     Status : data[i].Status
              //   })
              // }
              
            }
       })
      }
     
          console.log(this.DisplayUserList)
          console.log(this.userpreviousData)
         this.isFileSelect=false;
        //  window.location.reload();
      }
   

 checkedRowList:any = []
 deleteCheckedRow(){
  for(let i=0; i<this.userlistFromdbs.length;i++){
    if(this.userlistFromdbs[i].Select==true){
         this.checkedRowList.push(this.userlistFromdbs[i].Email);
    }
  }

  console.log(this.checkedRowList)
  
  this.cmrtservice.deleteuser(this.checkedRowList).subscribe((response)=>{
//     //  Checked Row Deleted
    window.location.reload();
  })
 }

 openDialog(index : any){
  this.index = index
  this.TransfferData()
  let dialogref = this.dialog.open(DialogComponent,{enterAnimationDuration :'1000ms',  exitAnimationDuration : '1000ms' });
 }
 Email:any=""
 TransfferData(){
   this.Email=this.userlistFromdbs[this.index].Email;
  //  console.log(this.Email);
  this.cmrtservice.ChangeEmailData(this.Email);
 }

 
 onChangeCheck($event:any){
   const Email = $event.target.value;
   const check = $event.target.checked;
      if(check){
        this.isChecked=false
      }else{
        this.isChecked=true
      }
   this.userlistFromdbs = this.userlistFromdbs.map((d:any)=>{
       if(d.Email==Email){
        d.Select = check;
        this.isSelectAll = false;
        if(check){
          this.isChecked=false
        }else{
          for(let i=0; i<this.userlistFromdbs.length;i++){
            if(this.userlistFromdbs[i].Select == true){
               this.isChecked=false
               break
            }
            this.isChecked=true;
          }
        }
        return d;
       }
       if(Email==-1){
        d.Select = this.isSelectAll
        return d
       }
       return d;
   });
   console.log(this.userlistFromdbs)

   console.log(Email +" "+ check);
  //  const data ={Email:Email, isSelect:check}
  //  this.cmrtservice.UserrowChecked(data).subscribe((response)=>{
  //     //  Row checked in database
  //  })
 }

}
