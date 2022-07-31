/**
 * this file will contains to fetch all the data in DB
 */
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");
exports.findAll = async (req,res)=>{
    try{
        const users = await User.find({});

        res.status(200).send(objectConverter.userResponse(users));
    }catch(err){
        console.log("Error while fetching the users", err.message);
        res.status(500).send({
            message : "Internal sever error while fecting the users"
        });
    }
}