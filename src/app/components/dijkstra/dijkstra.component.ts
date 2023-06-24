import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, startWith, timeout} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dijkstra',
  templateUrl: './dijkstra.component.html',
  styleUrls: ['./dijkstra.component.css']
})
export class DijkstraComponent implements OnInit{


  result !: any;
  errorMessage:string=""

  constructor(private http: HttpClient) {}
  //ciudades:string[]=[]

  inicioControl = new FormControl('');
  finControl = new FormControl('');
  evitarControl = new FormControl('');

  ciudades: string[] = [];
  filtedInicio !: Observable<string[]>;
  filtedFin !: Observable<string[]>;
  filtedEvitar !: Observable<string[]>;


  ngOnInit(): void {
      this.http.get('http://localhost:5000/ciudades').subscribe({
        next:(val:any)=>{
          this.ciudades=val;

          this.filtedInicio = this.inicioControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          this.filtedFin = this.finControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          this.filtedEvitar = this.evitarControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );

          console.log(this.ciudades)
        }
      })

  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.ciudades.filter(ciudad => this._normalizeValue(ciudad).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  calculateShortestPath() {
    const url = 'http://localhost:5000/dijkstra';
    console.log(this.inicioControl.value)
    console.log(this.finControl.value)

    const payload = { inicio: this.inicioControl.value,
                                                fin: this.finControl.value,
                                                evitar:this.evitarControl.value };

    console.log("Hola 1")
    this.http.post<any>(url, payload).pipe(
      timeout(8000)
    ).subscribe(
      (response) => {
        this.result = response;
        console.log("Hola 2");
        console.log(this.result);

        if (this.result.mensaje) {
          this.errorMessage = this.result.mensaje;
        } else {
          this.errorMessage = '';
        }
      },
      (error) => {
        this.errorMessage = 'No se obtuvo respuesta del servidor. El error ya fue se trabajará en la solucion. Por favor siga probando con otras coudades.';
        console.log(this.errorMessage)
      }
    );
  }

}
