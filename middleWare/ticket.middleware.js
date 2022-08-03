/**
 * validations for tickets
 */

const validateTicketReqBody = (req,res,next)=>{
    if(!req.body.title){
        res.status(400).send({
            message : "Title is manditory field"
        });
    }
    if(!req.body.description){
        res.status(400).send({
            message : "discription is manditory field"
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

module.exports = {
    validateTicketReqBody : validateTicketReqBody
}