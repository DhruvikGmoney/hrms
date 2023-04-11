const express = require("express");
const router = express.Router();
const DesignationController = require("../Controllers/DesignationController");

router.post("/addDesignation", DesignationController.addDesignation);
router.get("/getAllDesignation", DesignationController.getAllDesignation);
router.get("/getDesignationById/:designation_id", DesignationController.getDesignationById);
router.put("/updateDesignation/:designation_id", DesignationController.updateDesignation);
router.put("/updateDesignationStatus/:designation_id/:status", DesignationController.updateDesignationStatus);
router.delete("/deleteDesignation/:designation_id", DesignationController.deleteDesignation);

module.exports = router;
