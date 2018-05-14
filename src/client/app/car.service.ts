import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './Car';
import { CarSettings } from './Car';

//const api = 'https://vz-ppark-test.azurewebsites.net/api';
const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCar(){
    return this.http.get<Array<Car>>(`${api}/cars`);
  }

  addCar(car: Car){
    return this.http.post<Car>(`${api}/car`,car);
  }
  
  setCarStatus(carStatus: any){
    return this.http.post<any>(`${api}/carStatus`, carStatus)
  }

  setCarSettings(carSettings: any){
    return this.http.post<any>(`${api}/carSettings`, carSettings)
  }

  deleteCar(car: Car) {
    return this.http.delete(`${api}/car/${car.license_plate}`);
  }

}
