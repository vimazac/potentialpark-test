const express = require('express');
const router = express.Router();
const carService = require('./car.service');

router.post('/car', (req,res) =>{
    console.log(req);
    carService.postCar(req, res);
});

router.get('/cars', (req,res)=>{
    carService.getCars(req, res);
})

router.post('/carStatus',(req,res)=>{
    carService.setCarStatus(req, res);
})

router.post('/carSettings',(req,res)=>{
    carService.setCarSettings(req, res);
})
router.delete('/car/:carPlate', (req, res) => {
    carService.deleteCar(req, res);
});

module.exports = router;