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
    nidPicture: String,
    profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model('Learner', newUser)
