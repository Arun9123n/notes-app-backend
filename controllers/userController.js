const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler (async(req,res) => {
    const{name,email,password} = req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("please fill all the fields")
    }
    const userExits = await User.findOne({email:email});
    if(userExits){
        res.status(400);
        throw new Error("user already exits")
    }
    const secret = parseInt(process.env.SALT);
    const salt = await bcrypt.genSalt(secret);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email
        })
    } else{
        res.status(400);
        throw new Error("Invalid user data")
    }

});
const loginUser = asyncHandler (async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } else{
        res.status(400);
        throw new Error("Inavalid Username & Password")
    }

});
const generateToken = (id) => {
    var token = jwt.sign({id},process.env.LOGIN_SECRET_KEY,{expiresIn:'30d'});
    return token
}





module.exports = {registerUser,loginUser}