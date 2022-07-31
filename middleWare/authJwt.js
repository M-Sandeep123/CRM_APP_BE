/**
 * 
 *  middlware to validate access token
 */
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const userModel = require("../models/user.model");

const verifyToken =(req,res,next)=>{
    /**
     * if the token is present
     */
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message : "to token is provided"
        })
    }

    /**
     * if token is valid
     */
    jwt.verify(token,config.secert,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Invaid token"
            });
        }
        console.log("token is valid");
        
        /**
        * Fetch the userID from the token and set it to the request object
        */
       req.userId = decoded.id; // decode the userId from the token
       next();

    });

    
}

/**
 * MiddlWare to check if the user is Admin
 */

const isAdmin =async (req,res,next)=>{
    const user = await userModel.findOne({userId : req.userId});
    if(user && user.userType == "ADMIN"){
        return next();
    }else{
        return res.status(403).send({
            message : "only admin users are allowed"
        })
    }
}

/**
 * MiddleWare to check admin or owener of the account
 */

const isAdminOrOwner = async (req,res,next)=>{
    const user =await userModel.findOne({userId : req.userId});

    if(user.userType == "ADMIN" || user.userId == req.params.id){

        if(req.body.userStatus && user.userType != 'ADMIN'){
            return res.status(403).send({
                message : "Only ADMIN is allowed to change the status"
            });
        }
        
        next()
    }else{
        return res.status(403).send({
            message : "Only admin or owner of the resource allowed to update"
        });
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner
    
}