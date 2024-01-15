import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { environment } from './../../src/environment'


@Injectable({
  providedIn: 'root'
})
export class CmrtService {
  
  urls = environment.apiUrl
  constructor(private http : HttpClient, private router : Router) { }

  filesAndDetail(Data: any): Observable<any>{
    //alert("1")
    let var1 = this.http.post(`${this.urls}/multifileupload`, Data);
    //alert("2")
    return var1;
}
postUserDetail(Data:Object){
  //  console.log(Data);
   return this.http.post(`${this.urls}/postuserDetail`,Data);
}

mailReinitiate(data:any){
 return this.http.post(`${this.urls}/reinitiateEmali`,data);
}

sendEmail(){
  this.http.post(`${this.urls}/initiateEmail`, '').subscribe((response)=>{
       console.log(response);
  })
}

login(data:String){
  this.http.post(`${this.urls}/authenticate`,data).subscribe((result:any)=>{
    // localStorage.setItem("token",result)
    this.storeToken(result.token)
    console.log(result.token)
    this.router.navigate(['/home'])
  })
}

Logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  // this.userSubject.next(null);
  this.router.navigate(['/login']);
}
storeToken(tokenValue:string){
  // console.log(tokenValue)
  localStorage.setItem("token",tokenValue);
  
}

getToken(){
 let token = localStorage.getItem('token')
  console.log(token);
  return localStorage.getItem('token')
}

isLoggedIn():boolean{
  // console.log(!!localStorage.getItem('token')+" login")
  return !!localStorage.getItem('token')
}
// profile(){
//   // let headers = new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem('token')}`)
//   let header = localStorage.getItem('token');
//   this.http.post("http://localhost:4000/testUrl",header).subscribe((result:any)=>{
//     console.log(result)
//   })
// }


filesExternalDetail(Data: any) {
  return this.http.post(`${this.urls}/postFileDetails`, Data);
}

postConsolidatedFileNumber(Data: any) {
  return this.http.post(`${this.urls}/getConsolidatedFileNumber/${Data}`, "");
}

getTypeStatusCount():Observable<any>{   
     return this.http.get(`${this.urls}/getconsolidatedfiledataforcolumnchart`);
}
getmetalCountwithRmiStatus():Observable<any>{
  return this.http.get(`${this.urls}/getMetalcountwithRmiStatus`);
}
getRMIStatusCount():Observable<any>{
   return this.http.get(`${this.urls}/getconsolidatedfiledataforhorizontalchart`);
}
 
 getFilteredSmelterListAndConsolidatedFileUniqueNumber(SmelterId:any, ConsolidatedFileNumber:any){
  return this.http.get( `${this.urls}/getFilteredSmelterList/${SmelterId}`, ConsolidatedFileNumber);
 }

downloadResultFileinDasboard(resultUniqueNumber : String) {
  return this.http.get(`${this.urls}/download/${resultUniqueNumber}`,{responseType: 'blob' as 'json'});
}

downloadResultFile() {
  return this.http.get(`${this.urls}/download`,{responseType: 'blob' as 'json'});
}

downloadconsolidatedFile(consolidatedFilePath :String){
  return this.http.get(`${this.urls}/DownloadConsolidatedFile/${consolidatedFilePath}`,{responseType:'blob' as 'json'});
}

downloadUniqueResultFile(UniqueNumber :String){
  return this.http.get(`${this.urls}/DownLoadUniqueFileData/${UniqueNumber}`,{responseType:'blob' as 'json'});
}

postUserlistDetails(data:any){
  return this.http.post(`${this.urls}/postUserListDetails`, data);
}

getUserlistDetails(){
   return this.http.get(`${this.urls}/getUserListDetails`);  
}

deleteuser(data:any){
  console.log(data);
  return this.http.put(`${this.urls}/deleteUserDetail`, data);  
}
deleteRowAndGeneratedFile(data:any){
  return this.http.put(`${this.urls}/deleteGeneratefileanditsDetails`,data);   
}

postSmelterStatusAndConsolidatedNumber(data :any){
  console.log(data)
  let obj = this.http.post(`${this.urls}/statusAndConsolidatedfileNumber`,data);
  return obj; 
}

editUserEmail(data:any){
 return this.http.put(`${this.urls}/updateEmail`,data);
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
