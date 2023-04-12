const express = require("express");
const router = express.Router();
const authorize = require('../middleware/auth');
const Role = require("../Helpers/role");
const DesignationController = require("../Controllers/DesignationController");

router.post("/addDesignation", authorize([Role.ADMIN, Role.SUPER_ADMIN]), DesignationController.addDesignation);
router.get("/getAllDesignation", authorize(), DesignationController.getAllDesignation);
router.get("/getDesignationById/:designation_id", DesignationController.getDesignationById);
router.put("/updateDesignation/:designation_id", DesignationController.updateDesignation);
router.put("/updateDesignationStatus/:designation_id/:status", DesignationController.updateDesignationStatus);
router.delete("/deleteDesignation/:designation_id", DesignationController.deleteDesignation);

module.exports = router;
