const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "please enter valid name"]
    },
    email: {
        type: String,
        required: [true , "please enter valid email"]
    },
    password: {
        type: String,
        required: [true , "please enter valid password"]
    }
})

module.exports = mongoose.model("User" , userSchema);