const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {

    const { name, gmail, password } = req.body;

    const hashedPassword = (await bcrypt.hash(password, 10)).toString();

    const user = await User.create({
        name,
        gmail,
        password : hashedPassword
    });

    const token = jwt.sign({ id : user._id }, 'secretkey');

    return res.status(200).json({ 
        message : "User Created Successfully",
        token : token 
    });

}

module.exports.login = async (req, res) => {

    const { gmail, password } = req.body;

    const user = await User.findOne({ gmail });

    if(!user) {
        return res.status(400).json("User not found");
    }
    
    const isPasswordValid = bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json("Invalid password");
    }

    const token = jwt.sign({ id : user._id }, 'secretkey');

    return res.status(200).json({ 
        message : "Login successful",
        token : token 
    });
}

module.exports.refreshtoken = async (req, res) => {

    const userId = req.userId;

    const token = jwt.sign({ id : userId }, 'secretkey');

    return res.status(200).json({
        message : "Token refreshed successfully",
        token : token
    });

}