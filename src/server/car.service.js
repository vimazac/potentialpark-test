const Car = require('./car.model');

require('./mongo').connect();

function getCars(req, res){
    const docquery = Car.find({}); //this is the query for get all the cars
    docquery
        .exec()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        })
}

function setCarStatus(req, res){
    const license_plate = req.body.license_plate;
    Car.update({license_plate: license_plate}, {$set: {engineStatus: req.body.engineStatus}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Successful Update'});
    })
    .catch(error =>{
        reportError(res, error);
    })
}

function setCarSettings(req, res){
    const license_plate = req.body.license_plate;
    Car.update({license_plate: license_plate}, {$set: {settings: req.body.settings}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Successful Update'});
    })
    .catch(error =>{
        reportError(res, error);
    })
}

function postCar(req, res){
    const originalCar = { license_plate: req.body.license_plate, 
                          name: req.body.name, 
                          created: new Date(),
                          engineStatus: 0,
                          settings: {
                              lights: 0,
                              left_signal: 0,
                              right_signal: 0
                          }
                        };

    const car = new Car(originalCar);

    car.save()
        .then(result =>{
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            reportError(res, err);
        });
}

function deleteCar(req, res){
    const license_plate = req.params.carPlate
    Car.remove({license_plate: license_plate})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        reportError(res, err);
    });
}

function reportError(res, error){
    console.log("error: " + error);
    res.status(500).json({
        error: error
    });
}

module.exports = {
    getCars,
    postCar,
    setCarStatus,
    setCarSettings,
    deleteCar
};