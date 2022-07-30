/**
 * this file contains the Schema of the user model
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    userId : {
        type : String,
        unique : true,
        require : true
    },
    email : {
        type : String,
        unique : true,
        require : true,
        minLength : 15,
        lowercase : true
    },
    password : {
        type : String,
        require : true
    },
    userType : {
        type : String,
        require : true,
        default : "CUSTOMER"
    },
    userStatus : {
        type : String,
        require : true,
        default : "APPROVED"
    },
    createdAt : {
        type : Date,
        default :()=>{
            return  Date.now();
        },
        immutable : true
    },
    updateAt : {
        type : Date,
        default :()=>{
            return  Date.now();
        },
    }
});

module.exports = mongoose.model("User",userSchema);