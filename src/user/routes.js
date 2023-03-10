const express = require("express");
const router = express.Router();
const { UserController } = require("./controller");
const { UserService } = require("./service");
const { UserRepository } = require("./repository");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/user", (req, res) => userController.register(req, res));
router.get("/user/:id", (req, res) => userController.getUser(req, res));

module.exports = router;