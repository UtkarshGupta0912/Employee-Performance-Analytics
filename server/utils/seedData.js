const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

// Sample employee data for testing and demo
const sampleEmployees = [
  {
    name: 'Aman Verma',
    email: 'aman@gmail.com',
    department: 'Development',
    skills: ['React', 'Node.js', 'MongoDB'],
    performanceScore: 85,
    experience: 3,
  },
  {
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    department: 'Design',
    skills: ['Figma', 'Adobe XD', 'CSS', 'Prototyping'],
    performanceScore: 92,
    experience: 5,
  },
  {
    name: 'Rahul Singh',
    email: 'rahul@gmail.com',
    department: 'Marketing',
    skills: ['SEO', 'Content Strategy', 'Google Analytics'],
    performanceScore: 78,
    experience: 4,
  },
  {
    name: 'Sneha Patel',
    email: 'sneha@gmail.com',
    department: 'Development',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    performanceScore: 88,
    experience: 6,
  },
  {
    name: 'Vikram Joshi',
    email: 'vikram@gmail.com',
    department: 'HR',
    skills: ['Recruitment', 'Employee Relations', 'HRIS'],
    performanceScore: 72,
    experience: 8,
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya@gmail.com',
    department: 'Finance',
    skills: ['Financial Modeling', 'Excel', 'SAP'],
    performanceScore: 95,
    experience: 7,
  },
  {
    name: 'Karan Mehta',
    email: 'karan@gmail.com',
    department: 'Sales',
    skills: ['CRM', 'Negotiation', 'Lead Generation'],
    performanceScore: 65,
    experience: 2,
  },
  {
    name: 'Neha Reddy',
    email: 'neha@gmail.com',
    department: 'Development',
    skills: ['Java', 'Spring Boot', 'AWS'],
    performanceScore: 45,
    experience: 1,
  },
  {
    name: 'Arjun Nair',
    email: 'arjun@gmail.com',
    department: 'Operations',
    skills: ['Process Optimization', 'Supply Chain', 'Lean Six Sigma'],
    performanceScore: 81,
    experience: 10,
  },
  {
    name: 'Divya Iyer',
    email: 'divya@gmail.com',
    department: 'Management',
    skills: ['Leadership', 'Strategic Planning', 'Team Building'],
    performanceScore: 90,
    experience: 12,
  },
  {
    name: 'Rohan Kapoor',
    email: 'rohan@gmail.com',
    department: 'Development',
    skills: ['React', 'TypeScript', 'GraphQL'],
    performanceScore: 55,
    experience: 2,
  },
  {
    name: 'Meera Desai',
    email: 'meera@gmail.com',
    department: 'Design',
    skills: ['UI Design', 'User Research', 'Sketch'],
    performanceScore: 38,
    experience: 1,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Employee.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create a demo admin user
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      password: 'admin123',
    });
    console.log(`👤 Created demo user: admin@demo.com / admin123`);

    // Insert sample employees
    const created = await Employee.insertMany(sampleEmployees);
    console.log(`✅ Seeded ${created.length} employees`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
