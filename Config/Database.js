const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = function () {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://dhruvik:Dhruvik@123@cluster0.2igwqig.mongodb.net/hrms?retryWrites=true&w=majority", { useNewUrlParser: true });
    // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    mongoose.connection.on("connected", () => {
        console.log("Database Successfully Connected");
    });
};