const express = require('express');
const router = express.Router();
const ExpensesController = require('../Controllers/ExpensesController');

router.post('/addExpenses', ExpensesController.addExpenses);
router.get('/getAllExpenses', ExpensesController.getAllExpenses);
router.get('/getExpensesById?:expenses_id', ExpensesController.getExpensesById); // Query Params
router.put('/updateExpenses?:expenses_id', ExpensesController.updateExpenses); // Query Params
router.delete('/deleteExpenses?:expenses_id', ExpensesController.deleteExpenses); // Query Params

module.exports = router;

