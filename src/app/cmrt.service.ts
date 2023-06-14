import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmrtService {

  constructor(private http : HttpClient) { }

  filesAndDetail(Data: any): Observable<any>{
    //alert("1")
    let var1 = this.http.post('http://localhost:4000/multifileupload', Data);
    //alert("2")
    return var1;
}


filesExternalDetail(Data: any) {
  return this.http.post('http://localhost:4000/postFileDetails', Data);
}

postConsolidatedFileNumber(Data: any) {
  return this.http.post(`http://localhost:4000/getConsolidatedFileNumber/${Data}`, "");
}
 
 getFilteredSmelterListAndConsolidatedFileUniqueNumber(SmelterId:any, ConsolidatedFileNumber:any){
  return this.http.get( `http://localhost:4000/getFilteredSmelterList/${SmelterId}`, ConsolidatedFileNumber);
 }

downloadResultFileinDasboard(resultUniqueNumber : String) {
  return this.http.get(`http://localhost:4000/download/${resultUniqueNumber}`,{responseType: 'blob' as 'json'});
}

downloadResultFile() {
  return this.http.get('http://localhost:4000/download',{responseType: 'blob' as 'json'});
}

downloadconsolidatedFile(consolidatedFilePath :String){
  return this.http.get(`http://localhost:4000/DownloadConsolidatedFile/${consolidatedFilePath}`,{responseType:'blob' as 'json'});
}

downloadUniqueResultFile(UniqueNumber :String){
  return this.http.get(`http://localhost:4000/DownLoadUniqueFileData/${UniqueNumber}`,{responseType:'blob' as 'json'});
}

postUserlistDetails(data:any){
  return this.http.post('http://localhost:4000/postUserListDetails', data);
}

getUserlistDetails(){
   return this.http.get('http://localhost:4000/getUserListDetails');  
}

deleteuser(data:any){
  console.log(data);
  return this.http.put('http://localhost:4000/deleteUserDetail', data);  
}

editUserEmail(data:any){
 return this.http.put('http://localhost:4000/updateEmail',data);
}

// UserrowChecked(data:any){
//   console.log(data)
//   return this.http.put('http://localhost:4000/CheckedOrNot',data)
// }

file_name : any = "";
Date : any = "";

objFileName_Date = {"file_name":this.file_name, "Date":this.Date};
saveFileNameAndDate(file_name :any, Date :any){
    this.file_name = file_name;
    // console.log(this.file_name + " h");
    this.Date = Date;
    // console.log(this.objFileName_Date);
}

getfileNameDate(){
  this.objFileName_Date = {"file_name":this.file_name, "Date":this.Date};
  return this.objFileName_Date;
 }
 preEmail : any = ""
 ChangeEmailData(preEmail:any){
     this.preEmail = preEmail;
    }
    getChangeEmailData(){
    // console.log(this.preEmail)
   return this.preEmail
 }
}
