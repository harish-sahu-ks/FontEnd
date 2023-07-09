import { Component, OnInit } from '@angular/core';
import { CmrtService } from './cmrt.service';


@Component({
    selector: 'nav-root',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
  })

  export class NavComponent {
      
    constructor(private cmrtservice:CmrtService){

    }
    logout(){
      this.cmrtservice.Logout();
    }
  }
  
  


  
