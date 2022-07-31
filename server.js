/**
 * This shoudle be the starting point of the application
 */

 const dbConfig = require("./configs/db.config");
 const express = require("express");
 const serverConfig = require("./configs/server.config");
 const app = express();
 const mongoose  = require("mongoose");
 const bodyParser = require("body-parser");
 const User = require("./models/user.model");
 const bcrypt = require("bcryptjs");

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended : true}));


 /**
  * I need to connec to the database
 */
 
 mongoose.connect(dbConfig.DB_URL);
 
 const db = mongoose.connection ;
 
 db.on('error' ,() => {
     console.log("Error while connecting to DB");
 });
 
 db.once("open", ()=>{
     console.log("Connected to database");

     /**
      * when server I should clear the Db data and initilize the db
      */
    init();

 });

 async function init(){
    /**
     * deleting the collection if it is already present
     */
    await User.collection.drop();

    /**
     * we should create the one admin user for backEnd
     */
    const user = await User.create({
        name : "sandeep",
        userId : "admin",
        password : bcrypt.hashSync("HelloWorld",8),
        email : "sandeep01@gmail.com",
        userType : "ADMIN"
    });
    console.log(user);
 }
 
 /**
  * Here we plugIn the server and app...(routes)
  */
 require("./routes/auth.route")(app);
 require("./routes/user.route")(app);
 
 app.listen(serverConfig.PORT , () => {
     console.log("Server started on the port no : ",serverConfig.PORT );
 })