const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.get("/", (req, res) => {
  res.send("Welcome To Hrms");
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/changePassword", AuthController.changePassword);
router.post("/forgotPassword", AuthController.forgotPassword);

module.exports = router;
