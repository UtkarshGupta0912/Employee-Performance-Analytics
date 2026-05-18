import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/employeeService';
import { DEPARTMENTS } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineArrowLeft } from 'react-icons/hi';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: '',
  });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setFormData({
        name: data.name,
        email: data.email,
        department: data.department,
        skills: data.skills.join(', '),
        performanceScore: data.performanceScore,
        experience: data.experience,
      });
    } catch (error) {
      toast.error('Employee not found');
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department || !formData.skills) {
      toast.error('Please fill in all fields');
      return;
    }

    const score = Number(formData.performanceScore);
    if (score < 0 || score > 100) {
      toast.error('Performance score must be between 0 and 100');
      return;
    }

    const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter((s) => s);

    setSaving(true);
    try {
      await updateEmployee(id, {
        ...formData,
        skills: skillsArray,
        performanceScore: score,
        experience: Number(formData.experience),
      });
      toast.success('Employee updated successfully!');
      navigate(`/employees/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading employee..." />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Link to={`/employees/${id}`} className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors text-sm">
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to Employee
      </Link>

      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <HiOutlinePencil className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark-100">Edit Employee</h1>
            <p className="text-dark-400 text-sm">Update employee information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
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
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="input-field" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Performance Score * <span className="text-dark-500">(0-100)</span></label>
              <input type="number" name="performanceScore" value={formData.performanceScore} onChange={handleChange} min="0" max="100" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Years of Experience *</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" className="input-field" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <HiOutlinePencil className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Update Employee'}
            </button>
            <Link to={`/employees/${id}`} className="btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
