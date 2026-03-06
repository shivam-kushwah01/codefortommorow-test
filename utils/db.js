const mongoose = require("mongoose");

const connection = async () => {
    await mongoose.connect('mongodb://localhost:27017/notes-app');
    console.log('connected to db');
};

module.exports = connection;