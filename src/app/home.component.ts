import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CmrtService } from './cmrt.service';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
  })

  export class HomeComponent implements OnInit {

    FileDataAndName:any = {"name":"", "date":""};
    ngOnInit(): void {
      
    }

    inProgress: boolean = false ;
    isdownload:boolean = false;
    // isuploadtoknowactive = false;
    showLabel:boolean=false;
    isrun : boolean = false;
    isDasboard : boolean = false;
    

    constructor(private route:ActivatedRoute, private http:HttpClient, private cmrtservice:CmrtService, public datepipe: DatePipe){this.inProgress=false}
    formdata:FormData = new FormData();
    changeactivesupplierFile(event:any) {
     let  files1 = event.target.files;
      //  console.log(files1.length);
      
       if(event.target.files.length > 0) 
       {
         console.log(event.target.files[0].name);
       }
       
    }
    
  changeMultipleFile(event:any) {
      
      let files = event.target.files;
      console.log(files.length);

      if(event.target.files.length > 0) 
      {
        this.isrun = true;
        console.log(files[0]);
        let currentDateTime =this.datepipe.transform((new Date), 'dd/MM/yyyy');
        // console.log(currentDateTime)
        this.FileDataAndName.name = event.target.files[0].name;
        this.FileDataAndName.date = currentDateTime

        // this.cmrtservice.saveFileNameAndDate(event.target.files[0].name, currentDateTime);
      }

      // console.log(this.FileDataAndName);
      
      const list = []
      this.formdata = new FormData();
      
      for(let index=0; index<files.length; index++){
        const element = files[index];
        this.formdata.append('files', element);
      }     
    }

    // uploadfile1(){
    //   this.isdownload = true; 
    // }
    
    uploadfile(){
      this.inProgress=true; 
      // this.isuploadtoknowactive = true;
      this.isdownload = true; 
     
      this.cmrtservice.filesAndDetail(this.formdata).subscribe(
        (response) => 
        { 
          console.log("Success Response" + response);
          this.inProgress=false; 
          this.showLabel = true;
          
        },
    (error) => 
    { 
      console.log("Error happened" + error)
      this.inProgress=false; 
      this.showLabel = true;
      
    },
    function() {      
      console.log("the subscription is completed")
    })
      const ZipfileName :String = this.FileDataAndName.name;
      const Dateofupload = this.FileDataAndName.date;
      this.cmrtservice.saveFileNameAndDate( this.FileDataAndName.name,this.FileDataAndName.date);
      let url = 'http://localhost:4000/postdateandNameofZipFile/' + this.FileDataAndName.name;
      this.http.post<any>(url,"").subscribe((response)=>{
             console.log(response);
      }),
      (error:any)=>{
        alert(error)
      }
           
    }
    
    saveFiledetails(){
      this.cmrtservice.filesExternalDetail(this.formdata).subscribe(()=>{
        alert("saved successfully")

      })
    }

    DownloadbarandFile(){
      this.isDasboard = true;
      this.cmrtservice.downloadResultFile().subscribe((response: any)=>{
        const filename ="ResultFile.xlsx"; 
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        //alert("Downloaded Successfully")
        // this.isuploadtoknowactive = false;
        this.isdownload = false; 
      
      })
    } 
}