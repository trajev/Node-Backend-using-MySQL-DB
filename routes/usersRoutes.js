const express = require("express");
const { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName } = require("../controllers/usersControllers");

const router = express.Router();


router.get("/users", getAllUsers)
router.get("/user/:name", getUserByName)
router.post("/users", createUser)
router.put("/user/:name", updateUserByName)
router.delete("/user/:name", deleteUserByName)

module.exports = router;