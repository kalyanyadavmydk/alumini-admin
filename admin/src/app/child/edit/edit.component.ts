import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  bool=0
  onSubmit(){
    this.bool=1
  }
  rollnum=""
  Success="success"
  name=""
  batch
  degree=""
  phonenum
  gmail=""
  rollno(){
    var person = {
      name:this.name,
     rollnum:this.rollnum,
      batch:this.batch,
    degree:this.degree,
    phonenum:this.phonenum,
    gmail:this.gmail
          };
    this.http.post<any>('http://localhost:3001/user/create',person).subscribe((data)=>{
      console.log(data)
    })
  }
}
