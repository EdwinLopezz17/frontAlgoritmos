import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-respald',
  templateUrl: './respald.component.html',
  styleUrls: ['./respald.component.css']
})
export class RespaldComponent implements OnInit {

  inicio !: string;
  fin !: string;
  result !: any;
  ciudades:string[]=[]

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get('http://localhost:5000/ciudades').subscribe({
      next:(val:any)=>{
        this.ciudades=val;
        console.log(this.ciudades)
      }
    })
  }


  calculateShortestPath() {
    const url = 'http://localhost:5000/dijkstra';
    const payload = { inicio: this.inicio, fin: this.fin };
    console.log("Hola 1")
    this.http.post<any>(url, payload).subscribe((response) => {
      this.result = response;
      console.log(response);
      console.log("Hola 2")
    });
  }
}



