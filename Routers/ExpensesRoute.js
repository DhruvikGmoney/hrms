const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const ExpensesController = require("../Controllers/ExpensesController");

router.post("/expenses", authorize([Role.ADMIN, Role.SUPER_ADMIN]), ExpensesController.addExpenses);
router.get("/expenses", authorize(), ExpensesController.getAllExpenses);
router.get("/expenses/:expenses_id", ExpensesController.getExpensesById);
router.get("/expenses/:status", ExpensesController.getExpensesByStatus);
router.put("/expenses/:expenses_id", ExpensesController.updateExpenses);
router.put("/expenses/:expenses_id/:status", ExpensesController.updateExpensesStatus);
router.delete("/expenses/:expenses_id", ExpensesController.deleteExpenses);

module.exports = router;
