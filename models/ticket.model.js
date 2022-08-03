const moongose = require("mongoose");

const ticketSchema = new moongose.Schema({
    title : {
        type : String,
        required : true
    },
    ticketPriority :{
        type : Number,
        require : true,
        default : 4
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : "OPEN",
        enum : ["OPEN","IN_PROGRESS", "CLOSED"]
    },
    reporter : {
        type : String,
        required : true
    },
    assignee : {
        type : String,
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

module.exports = moongose.model("Ticket",ticketSchema);