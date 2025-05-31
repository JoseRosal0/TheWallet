require ('dotenv').config()
const express = require('express');
const app = express();
const path= require("node:path")
const mongoose = require('mongoose');
const User = require('./models/user');
const usersRouter = require("./controllers/users");

(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("la conexion fue realizada con exito")
    } catch (error) {
        console.log(error,'catch');
    }
})();

app.use('/',express.static(path.resolve('views','home')));
app.use('/register',express.static(path.resolve("views","register")))
app.use(express.static("public"))

app.use(express.json());

app.use("/api/user",usersRouter)

module.exports = app