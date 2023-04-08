const express = require('express');
const router = express.Router();
const DesignationController = require('../Controllers/DesignationController');

router.post('/addDesignation', DesignationController.addDesignation);
router.get('/getAllDesignation', DesignationController.getAllDesignation);
router.get('/getDesignationById?:designation_id', DesignationController.getDesignationById); // Query Params
router.put('/updateDesignation?:designation_id', DesignationController.updateDesignation); // Query Params
router.delete('/deleteDesignation?:designation_id', DesignationController.deleteDesignation); // Query Params

module.exports = router;