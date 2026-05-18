const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const { employeeValidation } = require('../middleware/validateMiddleware');

// All routes are protected
router.use(protect);

// GET /api/employees/search?department=Development
router.get('/search', searchEmployees);

// POST /api/employees  — Create employee
// GET  /api/employees  — Get all employees
router.route('/').post(employeeValidation, createEmployee).get(getEmployees);

// GET    /api/employees/:id  — Get single employee
// PUT    /api/employees/:id  — Update employee
// DELETE /api/employees/:id  — Delete employee
router.route('/:id').get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

module.exports = router;
