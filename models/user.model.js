/**
 * this file contains the Schema of the user model
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 15,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER"
    },
    userStatus : {
        type : String,
        required : true,
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
    },
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"

    },
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }
});

module.exports = mongoose.model("User",userSchema);