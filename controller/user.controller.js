/**
 * this file will contains to fetch all the data in DB
 */
const { compareSync } = require("bcryptjs");
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");


exports.findAll = async (req, res) => {
    try {

        /**
         * read the query params
         */
        const queryObj = {};
        const userTypeQ = req.query.userType;
        if (userTypeQ) {
            queryObj.userType = userTypeQ
        }
        const userStatusQ = req.query.userStatus;
        if (userStatusQ) {
            queryObj.userStatus = userStatusQ;
        }
        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.userResponse(users));
    } catch (err) {
        console.log("Error while fetching the users", err.message);
        res.status(500).send({
            message: "Internal sever error while fecting the users"
        });
    }
}

/**
 * controller method to update the userAccount
 * 1 : only admin and owner of the account is allowed the update the profile
 * 
 * -- the logic ie only admin and owner authentication is done in middleWare
 */

exports.update = async (req, res) => {
    try {
        /**
         * Fetch the user object if it is present
         */
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            res.status(404).send({
                message: "User  update with the given id is not found"
            })
        }

        /**
         * update the user object based on request body 
         */

        user.name = req.body.name != undefined ? req.body.name : user.name;

        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;

        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;

        /**
         * Save the user object and update the user object
         */
        const updatedUser = await user.save();
        res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus
        })

    } catch (err) {
        console.log("Error while updating the user record", err.message);
        res.status(500).send({
            message: "Internal server error while updating the record"
        })
    }

}