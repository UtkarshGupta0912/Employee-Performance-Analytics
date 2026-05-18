import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/employeeService';
import { DEPARTMENTS } from '../utils/helpers';
import toast from 'react-hot-toast';
import { HiOutlineUserAdd, HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.department || !formData.skills || !formData.performanceScore || !formData.experience) {
      toast.error('Please fill in all fields');
      return;
    }

    const score = Number(formData.performanceScore);
    if (score < 0 || score > 100) {
      toast.error('Performance score must be between 0 and 100');
      return;
    }

    const exp = Number(formData.experience);
    if (exp < 0) {
      toast.error('Experience cannot be negative');
      return;
    }

    const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter((s) => s);
    if (skillsArray.length === 0) {
      toast.error('Please enter at least one skill');
      return;
    }

    setLoading(true);
    try {
      await createEmployee({
        ...formData,
        skills: skillsArray,
        performanceScore: score,
        experience: exp,
      });
      toast.success('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Link to="/employees" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors text-sm">
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to Employees
      </Link>

      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <HiOutlineUserAdd className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark-100">Add Employee</h1>
            <p className="text-dark-400 text-sm">Register a new employee in the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Aman Verma" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="aman@gmail.com" className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Department *</label>
            <select name="department" value={formData.department} onChange={handleChange} className="input-field">
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Skills * <span className="text-dark-500">(comma separated)</span></label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="input-field" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Performance Score * <span className="text-dark-500">(0-100)</span></label>
              <input type="number" name="performanceScore" value={formData.performanceScore} onChange={handleChange} placeholder="85" min="0" max="100" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Years of Experience *</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="3" min="0" className="input-field" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiOutlineUserAdd className="w-5 h-5" />}
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
            <Link to="/employees" className="btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
