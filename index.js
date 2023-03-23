const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const routes = require('./routes');
app.use(cors());
const port = process.env.PORT || 4004
require('dotenv').config();
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Hero Rider Server" })
});

require('./dbConnect')();
app.use('/api', routes.routes)
// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})



// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         next()
//     } else {
//         if(err.message){
//             res.status(500).send(err.message)
//         } else {
//             res.send('There was an error')
//         }
//     }
// })