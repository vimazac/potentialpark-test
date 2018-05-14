class CarSettings { 
    lights: Number;
    left_signal: Number;
    right_signal: Number;
}
class Car {
    license_plate: String;
    name: String;
    created: Date;
    engineStatus: Number;
    settings: CarSettings;
}

export { Car, CarSettings }
