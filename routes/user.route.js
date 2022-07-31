/**
 * This will the routes for the userResources
 */
const userController = require("../controller/user.controller");
const auth = require("../middleWare/authJwt");
module.exports = (app)=>{
    /**
     * GET crm/api/v1/users ==>> user Controller findAll method wil called
     * 
     * We are going to patch the middleWare between the route and controller
     */

    app.get("/crm/api/v1/users",[auth.verifyToken,auth.isAdmin],userController.findAll);

    /**
     * EndPoint for user updating
     * 
     * PUT crm/api/v1/user/id ==> user Controller , update method is invoked
     */

    app.put("/crm/api/v1/users/:id",[auth.verifyToken,auth.isAdminOrOwner],userController.update);
}