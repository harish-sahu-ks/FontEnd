import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CmrtService } from './cmrt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CMRT Application';

  ngOnInit(): void {
    
  }
  inProgress: boolean = false ;
  isdownload:boolean = false;
  showLabel:boolean=false;
constructor(private route: ActivatedRoute, private http : HttpClient, private cmrtservice :CmrtService){this.inProgress=false};
formdata:FormData = new FormData();
  changeMultipleFile(event:any) {
    
      let files = event.target.files;
      console.log(files.length);
      const list = []
      this.formdata = new FormData();
      
      for(let index=0; index<files.length; index++){
        const element = files[index];
        this.formdata.append('files', element);
      }     
    }
    
    uploadfile(){
      this.inProgress=true; 
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
      console.log("the subscription is completed")})
    
      //this.inProgress=false      
    }
    
    saveFiledetails(){
      this.cmrtservice.filesExternalDetail(this.formdata).subscribe(()=>{
        alert("saved successfully")

      })
    }
    DownloadbarandFile(){
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
        this.isdownload = false;
      
      })
    }    
  }