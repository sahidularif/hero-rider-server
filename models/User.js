const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
    uid: String,
    fullname: String,
    email: String,
    password: String,
    age: String,
    phone: String,
    address: String,
    vehicleType: String,
    area: String,
    carName: String,
    carModel: String,
    namePalate: String,
    licencePicture: String,
    nidPicture: String,
    profilePicture: String,
    userType: String,
    status: {
        type: String,
        default: 'Active'
    }
},
    { timestamps: true });

module.exports = mongoose.model('User', newUser)
