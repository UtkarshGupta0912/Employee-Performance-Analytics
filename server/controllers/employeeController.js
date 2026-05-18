const Employee = require('../models/Employee');

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      res.status(400);
      throw new Error('Employee with this email already exists');
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employees (with optional filters)
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res, next) => {
  try {
    const { department, minScore, maxScore, sortBy } = req.query;
    let filter = {};

    if (department) {
      filter.department = department;
    }

    if (minScore || maxScore) {
      filter.performanceScore = {};
      if (minScore) filter.performanceScore.$gte = Number(minScore);
      if (maxScore) filter.performanceScore.$lte = Number(maxScore);
    }

    let sortOption = { performanceScore: -1 }; // default: highest score first
    if (sortBy === 'name') sortOption = { name: 1 };
    if (sortBy === 'experience') sortOption = { experience: -1 };
    if (sortBy === 'newest') sortOption = { createdAt: -1 };

    const employees = await Employee.find(filter).sort(sortOption);
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }

    // Check for duplicate email if email is being changed
    if (req.body.email && req.body.email !== employee.email) {
      const emailExists = await Employee.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400);
        throw new Error('An employee with this email already exists');
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees by department
// @route   GET /api/employees/search?department=Development
// @access  Private
const searchEmployees = async (req, res, next) => {
  try {
    const { department, skill, name } = req.query;
    let filter = {};

    if (department) {
      filter.department = { $regex: department, $options: 'i' };
    }
    if (skill) {
      filter.skills = { $in: [new RegExp(skill, 'i')] };
    }
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const employees = await Employee.find(filter).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
};
