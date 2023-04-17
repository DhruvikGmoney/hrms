const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const DesignationController = require("../Controllers/DesignationController");

router.post("/designation", authorize([Role.ADMIN, Role.SUPER_ADMIN]), DesignationController.addDesignation);
router.get("/designation", authorize(), DesignationController.getAllDesignation);
router.get("/designation/:designation_id", DesignationController.getDesignationById);
router.put("/designation/:designation_id", DesignationController.updateDesignation);
router.put("/designation/:designation_id/:status", DesignationController.updateDesignationStatus);
router.delete("/designation/:designation_id", DesignationController.deleteDesignation);

module.exports = router;
