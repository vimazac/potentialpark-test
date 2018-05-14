import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CarSettings } from './car';
import { CarService } from './car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  addingCar = false;
  cars: any = [];
  selectedCar: Car;
  selectedCarF: Car;
  engineOn = false;
  normalLightsOn = false;
  highLightsOn = false;
  rightSignOn = false;
  leftSignOn = false;
  showCar = false;
  readonly statusOff = 0;
  readonly statusOn = 1;
  readonly statusNormalLights = 1;
  readonly statusHighLights = 2;

  constructor(private carService : CarService) {}

  ngOnInit() {
   this.selectedCarF = new Car();
   this.selectedCarF.settings = new CarSettings();
   this.getCars();
  }

  cancel() {
    this.addingCar = false;
    this.selectedCar = null;
  }

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(res=>{
      this.cars = this.cars.filter(h => h !== car);
      if(this.selectedCarF === car){
        this.selectedCarF = new Car();
        this.selectedCarF.settings = new CarSettings();
        this.showCar = false;
      }
    }, err => {
      console.log(err);
    });
  }

  getCars(){
    return this.carService.getCar().subscribe(cars=>{
      this.cars = cars;
    })
  }

  enableAddMode() {
    this.addingCar = true;
    this.selectedCar = new Car();
  }

  onSelect(car: Car) {
    this.addingCar = false;
    this.selectedCarF = car;
    this.showCar = true;
  }

  /** ENGINE */
  turnEngineOn(){ 
    this.setEngineStatus(this.statusOn);
  }

  turnEngineOff(){
    this.setEngineStatus(this.statusOff);
  }

  setEngineStatus(status: Number){
    let carStatus = {
      license_plate : this.selectedCarF.license_plate,
      engineStatus : status
    };
    this.carService.setCarStatus(carStatus).subscribe(res => {
      this.selectedCarF.engineStatus = status;
    }, err =>{
      console.log(err);
    });
  }
  
  /** TURN SIGNS **/
  turnRightSignOn(){
    let settings = Object.assign({},this.selectedCarF.settings,{right_signal: this.statusOn});
    this.setSettingStatus(settings);
  }
  turnRightSignOff(){
    let settings = Object.assign({},this.selectedCarF.settings,{right_signal: this.statusOff});
    this.setSettingStatus(settings);
  }
  turnLeftSignOn(){
    let settings = Object.assign({},this.selectedCarF.settings,{left_signal: this.statusOn});
    this.setSettingStatus(settings);
  }
  turnLeftSignOff(){
    let settings = Object.assign({},this.selectedCarF.settings,{left_signal: this.statusOff});
    this.setSettingStatus(settings);
  }

  /** LIGHTS */ 

  setlightsOff(){
    let settings = Object.assign({},this.selectedCarF.settings,{lights: this.statusOff});
    this.setSettingStatus(settings);
  }
  setNormalLigthsOn(){
    let settings = Object.assign({},this.selectedCarF.settings,{lights: this.statusNormalLights});
    this.setSettingStatus(settings);
  }
  setHighLightsOn(){
    let settings = Object.assign({},this.selectedCarF.settings,{lights: this.statusHighLights});
    this.setSettingStatus(settings);
  }

  setSettingStatus(settings: CarSettings){
    let req = {
      license_plate : this.selectedCarF.license_plate,
      settings : settings
    }
    this.carService.setCarSettings(req).subscribe(rsp=>{
      this.selectedCarF.settings = Object.assign({}, settings);
    }, err => {
      console.log("error: " + err);      
    })
  }

  /** CREATE CAR */
  saveCar(){
    if (this.addingCar) {
      this.carService.addCar(this.selectedCar).subscribe(car => {
        this.addingCar = false;
        this.selectedCar = null;
        this.cars.push(car);
      });
    } 
  }

}
