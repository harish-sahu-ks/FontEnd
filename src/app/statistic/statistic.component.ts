import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js'
import { CmrtService } from '../cmrt.service';
Chart.register(...registerables)
declare var google: any;
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(private cmrtservice : CmrtService){

  }
  ngOnInit(): void {
    this.cmrtservice.getmetalCountwithRmiStatus().subscribe((response:any)=>{
      this.RenderChart2(response);
    })

    this.cmrtservice.getTypeStatusCount().subscribe((response:any)=>{
      // console.log(response);
      this.RenderChart1(response);  
    }) 
    
    this.cmrtservice.getRMIStatusCount().subscribe((response:any)=>{
      // console.log(response);
      this.RenderChart3(response);
    })
  }
  
  RenderChart1(data:any){
     const mychart = new Chart("ColumnBar1", {
      type: 'bar',
      data: {
        labels: [['High','Risk'], ['Low', 'Risk'], ['Medium','Risk'], ['Not Found', 'in RMI', 'active','/conformant'], ['Smelter', 'Not Listed', 'In RMI File']],
        datasets: [{
          label: 'RMI Type',
          data: [data["High Risk"],data["Low Risk"] , data["Medium Risk"],  data["Not Found in RMI active /Conformant"],  data["Smelter Not Listed In RMI file"]],
          backgroundColor:[
            'Red',
            'green',
            'orange',
            'grey',
            '#C06067',
          ],
          borderWidth: 1,
          maxBarThickness:70
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          
        },
          
      }
    }
  )}

  RenderChart2(data:any){
    console.log(data);
    const mychart = new Chart("ColumnBar2", {
     type: 'bar',
     data: {
      labels: ['Active', 'Conformant' ,['Non', 'Conformant'],['In','Communication'],['Outreach','Required'], ['Communication', 'Suspended','-Not Intrested'], ['Not Sure'], ['RMI Due', 'Diligence', 'Review', '-Unable', 'to Proceed'], ['Smelter','Not Listed', 'In RMI file'],],
       datasets: [
        {
         label: 'Tantalum',
         data: [data.ActiveObj.Tantalum, data.ConformantObj.Tantalum, data.Non_Cnfo_Obj.Tantalum, data.In_Comm_Obj.Tantalum, data.Outreach_Req_Obj.Tantalum, data.Comm_Sus_Obj.Tantalum, data.Not_Sure_Obj.Tantalum, data.Due_Dili_Req_unab_pro_Obj.Tantalum, data.Smel_Not_Listed_Obj.Tantalum],
         backgroundColor:[
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)',
           'rgb(115,215,255)'

         ],
         
         borderWidth: 1,
         maxBarThickness:20
       },
       {
        label: 'Tin',
        data: [data.ActiveObj.Tin, data.ConformantObj.Tin, data.Non_Cnfo_Obj.Tin, data.In_Comm_Obj.Tin, data.Outreach_Req_Obj.Tin, data.Comm_Sus_Obj.Tin, data.Not_Sure_Obj.Tin, data.Due_Dili_Req_unab_pro_Obj.Tin, data.Smel_Not_Listed_Obj.Tin],
        backgroundColor:[
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)',
          'rgb(145,145,145)'

        ],
        
        borderWidth: 1,
        // maxBarThickness:50
      },
      {
        label: 'Tungustan',
        data: [data.ActiveObj.Tungsten, data.ConformantObj.Tungsten, data.Non_Cnfo_Obj.Tungsten, data.In_Comm_Obj.Tungsten, data.Outreach_Req_Obj.Tungsten, data.Comm_Sus_Obj.Tungsten, data.Not_Sure_Obj.Tungsten, data.Due_Dili_Req_unab_pro_Obj.Tungsten, data.Smel_Not_Listed_Obj.Tungsten],
        backgroundColor:[
          'green',
          'green',
          'green',
          'green',
          'green',
          'green',
          'green',
          'green',
          'green'

        ],
        
        borderWidth: 1,
        // maxBarThickness:50
      },
      {
        label: 'Gold',
        data: [data.ActiveObj.Gold, data.ConformantObj.Gold, data.Non_Cnfo_Obj.Gold, data.In_Comm_Obj.Gold, data.Outreach_Req_Obj.Gold, data.Comm_Sus_Obj.Gold, data.Not_Sure_Obj.Gold, data.Due_Dili_Req_unab_pro_Obj.Gold, data.Smel_Not_Listed_Obj.Gold],
        backgroundColor:[
          'gold',
          'gold',
          'gold',
          'gold',
          'gold',
          'gold',
          'gold',
          'gold',
          'gold'

        ],
        
        borderWidth: 1,
        // maxBarThickness:50
      }
      
      ]
     },
     options: {
      // indexAxis : 'y',
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   }
 )
}

 RenderChart3(data : any){
  const mychart = new Chart("ColumnBar3", {
   type: 'bar',
   data: {
     labels: ['Active', 'Conformant' ,['Non', 'Conformant'],['In','Communication'],['Outreach','Required'], ['Communication Suspended - Not Intrested'], ['Not Sure'], ['RMI Due Diligence Review - Unable to Proceed'], ['Smelter','Not Listed', 'In RMI file'],],
     datasets: [{
       label: 'RMI Status',
       data: [data["Active"], data["Conformant"], data["Non Conformant"],data["In Communication"],data["Outreach Required"], data["Communication Suspended - Not Interested"],data["Not Sure"], data["RMI Due Diligence Review - Unable to Proceed"], data["Smelter Not Listed In RMI file"]],
       backgroundColor:[
         'green',
         'green',
         'Red',
         'yellow',
         'purple',
         'orange',
         'grey',
         'blue',
         '#C06067'
       ],
       borderWidth: 1,
       maxBarThickness:70,
     }]
   },
   options: {
    indexAxis : 'y',
     scales: {
       y: {
         beginAtZero: true
       }
     }
   }
 }
)}  
 
}
