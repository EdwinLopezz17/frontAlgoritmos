import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import {map, Observable, startWith, timeout} from "rxjs";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";

@Component({
  selector: 'app-respald',
  templateUrl: './respald.component.html',
  styleUrls: ['./respald.component.css']
})
export class RespaldComponent implements OnInit {
  result: any;
  ciudades: string[] = [];
  inicio = new FormControl('');
  fin = new FormControl('');
  evitar = new FormControl('');

  filteredInicio!: Observable<string[]>;
  filteredFin!: Observable<string[]>;
  filteredEvitar!: Observable<string[]>;

  @ViewChild('autoInicio', { read: MatAutocompleteTrigger }) autoInicio!: MatAutocompleteTrigger;
  @ViewChild('autoFin', { read: MatAutocompleteTrigger }) autoFin!: MatAutocompleteTrigger;
  @ViewChild('autoEvitar', { read: MatAutocompleteTrigger }) autoEvitar!: MatAutocompleteTrigger;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:5000/ciudades').subscribe({
      next: (val: any) => {
        this.ciudades = val;
        console.log(this.ciudades);
      }
    });

    this.filteredInicio = this.inicio.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredFin = this.fin.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
    this.filteredEvitar = this.evitar.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.ciudades.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.ciudades.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  calculateShortestPath() {
    const url = 'http://localhost:5000/dijkstra';
    const payload = { inicio: this.inicio.value, fin: this.fin.value, evitar: this.evitar.value };
    console.log("Hola 1");
    this.http.post<any>(url, payload).pipe(
      timeout(5000)).subscribe((response) => {
      this.result = response;
      console.log(response);
      console.log("Hola 2");
    },
      (error) => {
        let errorMessage = 'No se obtuvo respuesta del servidor. El error ya fue se trabajará en la solucion. Por favor siga probando con otras coudades.';
        console.log(errorMessage)
      });
  }


  resert(){
    this.result=null;
    this.inicio.setValue("")
    this.fin.setValue("")
    this.evitar.setValue("")
  }
}
