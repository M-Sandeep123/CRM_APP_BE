/**
 * this File contains the authentication,
 * 
 * It will have the SignUp and SignIn of the user
 */

/**
 * create a funtion that allows the user to signUp
 * 
 * when ever the user call the end point 
 * 
 * POST crm/api/v1/signUp , Router should call the signUp function...
 * 
 */

const user = require("../models/user.model");

//For the Encryption of the password we the module "bcryptjs"
const bcrypt = require("bcryptjs");

exports.signUp = async(req,res)=>{
    /**
     * Here we handdle the logic of SignUp
     */

    /**
     * 1 : read the request body and create the Js Object
     * 2 : insert in the DB
     */
    try{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8)
    }

    /**
     * need to set the userStatus
     */
    if(!userObj.userType || userObj.userType == "CUSTOMER"){
        userObj.userStatus = "APPROVED";
    }else{
        userObj.userStatus = "PENDING";
    }

    /**
     * insert the data in to dataBase
     */

    const savedUser =await user.create(userObj);

    const postResponse = {
        name : savedUser.name,
        userId : savedUser.userId,
        email : savedUser.email,
        userType : savedUser.userType,
        userStatus : savedUser.userStatus,
        createdAt : savedUser.createdAt,
        updateAt : savedUser.updateAt
    }

    /**
     * return the success response to the user
     */
    res.status(201).send(postResponse);
}catch(err){
    console.log("Error while creating the user :",err.message);
    res.status(500).send({
        message : "Some Internal server Error"
    });
}
}

/**
 * this is for login api...
 */
