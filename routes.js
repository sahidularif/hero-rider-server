const express = require("express");
const { getAllUsers } = require("./controller");
const router = express.Router();
const multer  = require('multer');
const userController = require("./controller");
const upload = multer()
// Auth Routes
router.get("/users", getAllUsers)
router.get("/allUser", userController.allUser)
router.post('/register', upload.none(), userController.register)
router.post('/login', userController.login)

module.exports = {
    routes: router,
}