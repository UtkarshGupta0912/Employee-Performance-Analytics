const mongoose = require('mongoose');

// Employee Schema for performance tracking
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      enum: {
        values: [
          'Development',
          'Design',
          'Marketing',
          'HR',
          'Finance',
          'Sales',
          'Operations',
          'Management',
        ],
        message: '{VALUE} is not a valid department',
      },
    },
    skills: {
      type: [String],
      required: [true, 'At least one skill is required'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Employee must have at least one skill',
      },
    },
    performanceScore: {
      type: Number,
      required: [true, 'Performance score is required'],
      min: [0, 'Performance score cannot be less than 0'],
      max: [100, 'Performance score cannot be more than 100'],
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience cannot be negative'],
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
employeeSchema.index({ department: 1 });
employeeSchema.index({ performanceScore: -1 });

module.exports = mongoose.model('Employee', employeeSchema);
