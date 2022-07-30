/**
 * this file have the logic of routes the request of defferent Controllers
 */

const authController = require("../controller/auth.controller");


module.exports = (app)=>{
    /**
     * define the route the signUp
     * POST crm/api/v1/auth/signUp --> it should call the auth Controller signUp method..
     */

    app.post("/crm/api/v1/auth/signup", authController.signUp);
}