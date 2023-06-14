import { Component, AfterViewInit, ViewChild, ElementRef,OnInit } from '@angular/core';

import {CmrtService} from '../cmrt.service';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
// import * as Excel from "exceljs";
import { Workbook } from 'exceljs'
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'





@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})

export class DasboardComponent implements OnInit {
  smelter_id : any = "";
  type : any = "";
  smelter_ref : any = "";
  metal : any = "";
  country : any = "";
  RMI_Status : any = "";

  keyword = 'smeleterId';
  radiosValue : any = "";

  users : String[] = [];
  resultExcelData : String[] = [];
  smelterref = '';
  isgetdata : boolean = false;
  

  doSearchFieldVacant(abc :any){
    this.sendConsolidatedNumber(abc)
    //  console.log(abc)
     this.isgetdata = true;
     this.onClick(this.smelterref); 
  }
  selectEvent(item:any) {
    // do something with selected item
    this.smelterref=item.SmelterRef;
    console.log(this.smelterref)
    if(this.isgetdata){
      this.onClick(this.smelterref);
    }
  }
  
  onChangeSearch(search: string) {
    // this.keyword =  'smeleterId';
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("on change search");
  }

  onFocused(e:any) {
    // do something

  }
  
  Date : any = " ";
  Name : any = " ";
  user : any = [];
  userFilePath :any = [];
  ConsolidatedFileName : String = "";
  ResultFileName : String = "";
  consolidatedFileArray :String[] = [];
  resultUniqueArray :String[] = [];

  
  dataSource = new MatTableDataSource(this.user);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  sendConsolidatedNumber(abc : any){
    let consolidatedUniqueNumber = this.consolidatedFileArray[abc]
    this.cmrtservice.postConsolidatedFileNumber(consolidatedUniqueNumber).subscribe((response)=>{
        console.log(consolidatedUniqueNumber)
    })
  }
  ngOnInit():void{
    this.dataSource.paginator = this.paginator

    this.cmrtservice.getfileNameDate();
    let url1 = 'http://localhost:4000/detailOfUploadedFileConsolidatedFileResultFile';
    this.http.get<any>(url1).subscribe({
      next:data=>{
        while(this.user.length>0){
          this.user.pop();
        }
        for(let i=0; i<data.length; i++){  
          this.ConsolidatedFileName = data[i].ConsolidatedFileName;
          this.ResultFileName = data[i].ResultFileName;
         let obj = {"id":i+1,"Date":data[i].Date, "ZipFileName":data[i].ZipFileName, "FileCount" : data[i].FileCount, "RowCount" : data[i].RowCount}
          this.user.push(obj);
          this.consolidatedFileArray.push(data[i].ConsolidatedFileName);
          this.resultUniqueArray.push(data[i].ResultFileName);
          // console.log(obj);
        }
          //   console.log(this.user.length);

        }
      })
    // console.log(this.Date + this.Name);
    // console.log(this.array_Date_Name[0].file_name)


    let urlNew = 'http://localhost:4000/getCIDNumberAndDetails';
    
   this.http.get<any>(urlNew).subscribe({
      next:Allfiledata=>{
        while(this.users.length>0){
          this.users.pop();
        }

        for(let i=0; i<Allfiledata.length;i++){
          let data :any = {};

          data['smeleterId'] = Allfiledata[i].SmelterId,
          data['type'] = Allfiledata[i].Type,
          data['RmiStatus'] = Allfiledata[i].RmiStatus,
          data['SmelterRef'] = Allfiledata[i].SmelterRef,
          data['Country'] = Allfiledata[i].Country,
          data['Metal'] = Allfiledata[i].Metal
      
          this.users.push(
            data
            )
        }
      },
       error: error => {
      alert(JSON.stringify(error));
    }  
    })  
 }
constructor(private dialog:MatDialog, private cmrtservice:CmrtService,private route:ActivatedRoute, private http:HttpClient, ){

}


getResultFileData(){
  let urlNew = 'http://localhost:4000/getResultFileData'
  this.http.get<any>(urlNew).subscribe({
     next:AllfileData=>{
      while(this.resultExcelData.length>0){
        this.resultExcelData.pop();
      }
      for(let index=0; index<AllfileData.length; index++){
        let data :any = {};

        data['Smelter_Name'] = AllfileData[index].Smelter_Name,
        data['Smelter_Id_Number'] = AllfileData[index].Smelter_Id_Number,
        data['Metal'] = AllfileData[index].Metal,
        data['Smelter_LookUp'] = AllfileData[index].Smelter_LookUp,
        data['Smelter_Name'] = AllfileData[index].Smelter_Name,
        data['SmelterCountry'] = AllfileData[index].SmelterCountry,
        data['Smelter_Identification'] = AllfileData[index].Smelter_Identification,
        data['Source_Of_Smelter_ID_Number'] = AllfileData[index].Source_Of_Smelter_ID_Number,
        data['Smelter_Street'] = AllfileData[index].Smelter_Street,
        data['Smelter_City'] = AllfileData[index].Smelter_City,
        data['Smelter_Fecility_Location'] = AllfileData[index].Smelter_Fecility_Location,
        data['Smelter_ContactName'] = AllfileData[index].Smelter_ContactName,
        data['Smelter_Contact_Email'] = AllfileData[index].Smelter_Contact_Email,
        data['Proposed_Next_steps'] = AllfileData[index].Proposed_Next_steps,
        data['Name_of_Mines'] = AllfileData[index].Name_of_Mines,
        data['Location_Of_Mine'] = AllfileData[index].Location_Of_Mine,
        data['Smelters_FeedStack'] = AllfileData[index].Smelters_FeedStack,
        data['Comments'] = AllfileData[index].Comments

        this.resultExcelData.push(
          data
          )
      }
     },
     error: error => {
      alert(JSON.stringify(error));
    }  
  })
 
}

 DownLoadUniqueFile(id:any){
  let resultUniqueNumber = this.resultUniqueArray[id];
  this.cmrtservice.downloadUniqueResultFile(resultUniqueNumber).subscribe((response: any)=>{
    const filename ="ResultUniqueFile.xlsx"; 
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    console.log(binaryData)
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (filename)
        downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();

  })
}

  DownloadFile(id:any){
    let resultUniqueNumber = this.resultUniqueArray[id];
  this.cmrtservice.downloadResultFileinDasboard(resultUniqueNumber).subscribe((response: any)=>{
    const filename ="ResultFile.xlsx"; 
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    console.log(binaryData)
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (filename)
        downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
  })
 }

 DownLoadConsolidateFile(id:any){
 let consolidatedFilePath = this.consolidatedFileArray[id]
  this.cmrtservice.downloadconsolidatedFile(consolidatedFilePath).subscribe((Response:any)=>{
    const filename="ConsolidatedFile.xlsx";
    let dataType = Response.type;
    let binaryData:any[] = [];
    binaryData.push(Response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (filename)
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  })
 }


onClick(Smelter_ref:any){
  let urlNew = `http://localhost:4000/getDetailsBySmelterRef/${Smelter_ref}`;
  this.http.get<any>(urlNew).subscribe({
    next: Allfiledata =>{
      this.smelter_id   = Allfiledata[0].SmelterId;
      this.type         = Allfiledata[0].Type;
      this.smelter_ref  = Allfiledata[0].SmelterRef;
      this.metal        = Allfiledata[0].Metal;
      this.country      = Allfiledata[0].Country;
      this.RMI_Status   = Allfiledata[0].RmiStatus;
      console.log(this.RMI_Status)
      this.getSupplier( this.smelter_id);
    }    
});
  
}
 supplierList : any[] = []
getSupplier(SmelterId : any){
//  this.sendConsolidatedNumber()
  let consolidatedUniqueNumber = this.consolidatedFileArray[this.radiosValue]
  console.log(consolidatedUniqueNumber);
  this.cmrtservice.getFilteredSmelterListAndConsolidatedFileUniqueNumber(SmelterId, consolidatedUniqueNumber).subscribe(( Allfiledata :any )=>{
    
      while(this.supplierList.length>0){
        this.supplierList.pop();
      }
       for(let i=0; i<Allfiledata.length; i++){
        console.log(Allfiledata.length)
        let data :any = {};
        data['Sr_No'] = i+1,
        data['Smelter_Name'] = Allfiledata[i].Smelter_Name,
        data['Smelter_Id_Number'] = Allfiledata[i].Smelter_Id_Number,
        data['Metal'] = Allfiledata[i].Metal;
        this.supplierList.push(data);
        console.log(Allfiledata[i].Smelter_Name);
        console.log(Allfiledata[i].Smelter_Id_Number);
        console.log(JSON.stringify(Allfiledata[i]));
       }
    } 
  )}
  // let urlNew = `http://localhost:4000/getFilteredSmelterList/${SmelterId}`;
  // console.log(SmelterId)
  // console.log(urlNew)
  // this.http.get<any>(urlNew).subscribe({
  //   next : Allfiledata =>{
  //     while(this.supplierList.length>0){
  //       this.supplierList.pop();
  //     }
  //      for(let i=0; i<Allfiledata.length; i++){
  //       console.log(Allfiledata.length)
  //       let data :any = {};
  //       data['Sr_No'] = i+1,
  //       data['Smelter_Name'] = Allfiledata[i].Smelter_Name,
  //       data['Smelter_Id_Number'] = Allfiledata[i].Smelter_Id_Number,
  //       data['Metal'] = Allfiledata[i].Metal;
  //       this.supplierList.push(data);
  //       console.log(Allfiledata[i].Smelter_Name);
  //       console.log(Allfiledata[i].Smelter_Id_Number);
  //       console.log(JSON.stringify(Allfiledata[i]));
  //      }
  //   },
  //   error: error => {
  //     alert(JSON.stringify(error));
  //   }  
  // })


fileName = 'ExcelSheet.xlsx';
export_excel():void {
  
  let element = document.getElementById('excel-table');
  // const ws = XLSX.utils.json_to_sheet(this.smelterList);
  const ws = XLSX.utils.table_to_sheet(element);

  // Generate WorkBook and add the WorkBook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws,'Sheet1');

  // Save to file
  XLSX.writeFile(wb, this.fileName)

}

}
