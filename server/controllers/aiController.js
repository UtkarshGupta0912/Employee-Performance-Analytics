const Employee = require('../models/Employee');
const { getAIRecommendation } = require('../services/aiService');

// @desc    Get AI recommendation for employee(s)
// @route   POST /api/ai/recommend
// @access  Private
const getRecommendation = async (req, res, next) => {
  try {
    const { employeeIds, type } = req.body;

    let employees;

    if (employeeIds && employeeIds.length > 0) {
      // Get specific employees
      employees = await Employee.find({ _id: { $in: employeeIds } });
    } else {
      // Get all employees for analysis
      employees = await Employee.find().sort({ performanceScore: -1 });
    }

    if (!employees || employees.length === 0) {
      res.status(404);
      throw new Error('No employees found for analysis');
    }

    const result = await getAIRecommendation(employees, type || 'full');

    res.json({
      success: result.success,
      recommendation: result.recommendation,
      model: result.model,
      source: result.source,
      employeeCount: employees.length,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecommendation };
