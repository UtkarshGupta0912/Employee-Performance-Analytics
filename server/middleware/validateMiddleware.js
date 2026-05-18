const { body, validationResult } = require('express-validator');

// Return validation errors as JSON
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

// Validation rules for employee creation / update
const employeeValidation = [
  body('name').trim().notEmpty().withMessage('Employee name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('skills')
    .isArray({ min: 1 })
    .withMessage('Skills must be an array with at least one skill'),
  body('performanceScore')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Performance score must be between 0 and 100'),
  body('experience')
    .isFloat({ min: 0 })
    .withMessage('Experience cannot be negative'),
  handleValidationErrors,
];

// Validation rules for signup
const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

// Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

module.exports = { employeeValidation, signupValidation, loginValidation };
