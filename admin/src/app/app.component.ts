import { Component } from '@angular/core';
//import { ThrowStmt } from '@angular/compiler';
import {HttpClient} from '@angular/common/http'
export class NgxQrCode {
  text: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  roll:string=""
  rollnum=""
  Batch=""
  Institution=""
  create=0
  update=0
  rollnumber
  batch_=[]
  batch_data
  Degree=""
  degree_data
  public qrdata: string = null;
  constructor(private http:HttpClient){
    // console.log('AppComponent running');
    // this.qrdata = 'Initial QR code data string';
  }
  //filter:string=""
createuser(){
  this.create=1
  this.update=0
  this.qrdata=""
}
getuser(){
this.update=1
this.create=0
this.qrdata=""

}
  rollno(){
    //console.log(this.roll)
    var rollnumber=this.rollnum
    const params = { 'rollnumber':rollnumber }
    if(this.roll=="Rollno"){
      this.http.get<any>('http://localhost:3001/rollnum',{params}).subscribe((data)=>{
        this.rollnumber=data[0]
        console.log(data[0])
      })
    }
  }
  batch(){
    
    var Batchyear=this.Batch
    const params = { 'batch':Batchyear }
    
      this.http.get<any>('http://localhost:3001/batch',{params}).subscribe((data)=>{
        this.batch_data=data.status
        console.log(this.batch_data)
      })
      this.degree_data=" "
     
  }
  degree()
  {
    //var Batchyear=this.Batch
    const params = { 'degree':this.Degree,'batch':this.Batch}
    
      this.http.get<any>('http://localhost:3001/degree&batch',{params}).subscribe((data)=>{
        this.degree_data=data.status
        console.log(this.degree_data)
      })
      this.batch_data=""
      this.qrdata=""
  }
  issubmit(data){
    if(data){
      this.roll=data;
    }
     this.qrdata=""
    
  }
  
  generate() {
    this.qrdata=""
    this.qrdata = "Username:"+this.rollnumber.name+",\n"+
                  "Roll Number:"+this.rollnumber.rollnum+",\n"+
                  "Phone Number:"+this.rollnumber.phonenum+",\n"+
                  "Degree:"+this.rollnumber.degree+",\n"+
                  "Batch:"+this.rollnumber.batch+",\n"+
                  "Gmail:"+this.rollnumber.gmail+",\n"
  } 
}
