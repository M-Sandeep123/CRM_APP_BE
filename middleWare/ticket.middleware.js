/**
 * validations for tickets
 */

const userModel = require("../models/user.model");
const Ticket = require("../models/ticket.model");

const validateTicketReqBody = (req,res,next)=>{
    if(!req.body.title){
        res.status(400).send({
            message : "Title is manditory field"
        });
    }
    if(!req.body.description){
        res.status(400).send({
            message : "description is manditory field"
        });
    }
    if(req.body.status !== undefined){
        if(!["OPEN","IN_PROGRESS","CLOSED"].includes(req.body.status)){
            return res.status(400).send({
                message : "Not a valid Status"
            });
        }
    }
    next();
}

const isEligibleToUpdate = async (req,res,next)=>{
    /**
     * Check the user is eligible for update the ticket or not
     */
    const callingUser = await userModel.find({userId : req.userId});

    const ticket = await Ticket.findOne({_id : req.params.id});

    if(!ticket){
        res.status(400).send({
            message : "Ticket id is incorrect"
        });
    }
    if(callingUser.userType == "CUSTOMER"){
        if(ticket.reporter != callingUser.userId){
            return res.status(403).send({
                message : "User is not allowed to update the ticket"
            });
        }
    }else if(callingUser.userType == "ENGINEER"){
        if(ticket.reporter != callingUser.userId && ticket.assignee != callingUser.userId){
            return res.status(403).send({
                message : "User is not allowed to update the ticket"
            });
        }
    }
    next();

}

module.exports = {
    validateTicketReqBody : validateTicketReqBody
}