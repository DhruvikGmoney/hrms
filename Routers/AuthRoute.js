const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.get("/", (req, res) => {
  console.log(">>>>>>", req.app.get('env'));
  res.send(`Welcome To Hrms ${req.app.get('env')}`);
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/sendOtp", AuthController.sendOtp);
router.post("/verify", AuthController.verify);
router.post("/changePassword", AuthController.changePassword);
router.post("/forgotPassword", AuthController.forgotPassword);

module.exports = router;
