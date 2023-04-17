const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/send-otp", AuthController.sendOtp);
router.post("/verify", AuthController.verify);
router.post("/change-password", AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);

module.exports = router;
