const usersRouter = require("express").Router();

const User= require("../models/user")

usersRouter.post("/register",async(req,res)=>{
    const {name,email,password}= req.body;
    
    if(!name || !email || !password){
        console.log(name,email,password,"in 404")
        return res.status(400).json({error:"Todos los campos son requeridos"})
    }

    try {
        const newUser=new User({name,email,password});
        await newUser.save();
        res.status(201).json({mensaje:"Usuario registrado correctamente", user:newUser})
    } catch (error) {  
        console.log(error)
    }

   

})

module.exports=usersRouter;
