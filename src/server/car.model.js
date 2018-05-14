const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carSchema = new Schema({
    license_plate: {type: String, required: true, unique: true},
    name: String,
    created: Date,
    engineStatus: Number,
    settings:{
        lights :{
            type: Number,
            default: 0
        },
        left_signal:{
            type: Number,
            default: 0
        },
        right_signal:{
            type: Number,
            default: 0
        }
    }
});


const Car = mongoose.model('Car', carSchema);
module.exports = Car;