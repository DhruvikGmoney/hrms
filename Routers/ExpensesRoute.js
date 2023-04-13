const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const ExpensesController = require("../Controllers/ExpensesController");

router.post("/addExpenses", authorize([Role.ADMIN, Role.SUPER_ADMIN]), ExpensesController.addExpenses);
router.get("/getAllExpenses", authorize(), ExpensesController.getAllExpenses);
router.get("/getExpensesById/:expenses_id", ExpensesController.getExpensesById);
router.put("/updateExpenses/:expenses_id", ExpensesController.updateExpenses);
router.put("/updateExpensesStatus/:expenses_id/:status", ExpensesController.updateExpensesStatus);
router.delete("/deleteExpenses/:expenses_id", ExpensesController.deleteExpenses);

module.exports = router;
