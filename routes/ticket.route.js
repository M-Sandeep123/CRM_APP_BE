/**
 * It contains the apis of tickets controller
 */

const ticketValidator = require("../middleWare/ticket.middleware");
const auth = require("../middleWare/authJwt");
const ticketController = require("../controller/ticket.controller");

module.exports = (app)=>{
    /**
     * creating a ticket
     * POST /crm/api/v1/tickets
     */
    app.post("/crm/api/v1/tickets",[auth.verifyToken,ticketValidator.validateTicketReqBody],ticketController.createTicket);
}