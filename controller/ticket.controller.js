/**
 * Controller methods for creating tickets
 * 
 * 1. User is authenticated --- Taken care by authMiddleware
 * 2 . request body is valid
 * 3. Insert the ticket body
 */

const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model")

exports.createTicket = async (req,res)=>{
    try{
        /**
         * Create the ticket Object for the request body
         */
        const reqObj = {
            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            reporter: req.userId // will be retrieved from the access token
        }
        /**
         * I need to assign one Engineer to this ticket
         */
        const engineer = await userModel.findOne({
            userType: "ENGINEER",
            userStatus: "APPROVED"
        });
        if (engineer) {
            reqObj.assignee = engineer.userId;
        }

        const ticketCreated = await ticketModel.create(reqObj);

        if (ticketCreated) {
            /**
             * Need to update customer documents
             */
            const customer = await userModel.findOne({ userId: req.userId });

            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();
            /**
             * update the Engineer documents if assigned
             */

            if (engineer) {
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }

            res.status(201).send({ ticketCreated });

        }
    }catch(err){
        console.log("Error while createing the ticket : ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}