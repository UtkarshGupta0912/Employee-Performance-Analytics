import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../services/employeeService';
import { getAIRecommendation } from '../services/aiService';
import LoadingSpinner from '../components/LoadingSpinner';
import RankingBadge from '../components/RankingBadge';
import { getScoreColor, getScoreBg, getPerformanceLabel, getDeptColor, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineArrowLeft, HiOutlineSparkles, HiOutlineBriefcase, HiOutlineMail, HiOutlineCalendar } from 'react-icons/hi';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      toast.error('Employee not found');
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      toast.success('Employee deleted');
      navigate('/employees');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleAIAnalysis = async () => {
    setAiLoading(true);
    try {
      const data = await getAIRecommendation([id], 'full');
      setAiResult(data);
      toast.success('AI analysis complete');
    } catch (error) {
      toast.error('AI analysis failed');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading employee..." />
      </div>
    );
  }

  if (!employee) return null;

  const { name, email, department, skills, performanceScore, experience, createdAt, updatedAt } = employee;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back */}
      <Link to="/employees" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors text-sm">
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to Employees
      </Link>

      {/* Header Card */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-primary-500/25 shrink-0">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-dark-100">{name}</h1>
              <span className={`badge ${getDeptColor(department)}`}>{department}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-dark-400">
              <span className="flex items-center gap-1.5"><HiOutlineMail className="w-4 h-4" />{email}</span>
              <span className="flex items-center gap-1.5"><HiOutlineBriefcase className="w-4 h-4" />{experience} years</span>
              <span className="flex items-center gap-1.5"><HiOutlineCalendar className="w-4 h-4" />Added {formatDate(createdAt)}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link to={`/edit-employee/${id}`} className="btn-secondary flex items-center gap-1.5 text-sm py-2 px-4">
              <HiOutlinePencil className="w-4 h-4" /> Edit
            </Link>
            <button onClick={handleDelete} className="btn-danger flex items-center gap-1.5 text-sm py-2 px-4">
              <HiOutlineTrash className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-200 mb-4">Performance Score</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="rgba(51,65,85,0.5)" strokeWidth="10" fill="none" />
                <circle cx="60" cy="60" r="50" stroke={performanceScore >= 80 ? '#10b981' : performanceScore >= 60 ? '#eab308' : '#ef4444'}
                  strokeWidth="10" fill="none" strokeLinecap="round"
                  strokeDasharray={`${(performanceScore / 100) * 314} 314`}
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>{performanceScore}</span>
              </div>
            </div>
            <div>
              <span className={`badge text-sm border ${getScoreBg(performanceScore)} ${getScoreColor(performanceScore)}`}>
                {getPerformanceLabel(performanceScore)}
              </span>
              <p className="text-dark-400 text-sm mt-2">
                {performanceScore >= 80 ? 'Eligible for promotion' : performanceScore >= 60 ? 'Meeting expectations' : 'Needs improvement plan'}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-200 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-300 text-sm border border-primary-500/20 hover:bg-primary-500/20 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark-200 flex items-center gap-2">
            <HiOutlineSparkles className="w-5 h-5 text-primary-400" /> AI Analysis
          </h2>
          <button onClick={handleAIAnalysis} disabled={aiLoading} className="btn-primary flex items-center gap-2 text-sm">
            {aiLoading ? <LoadingSpinner size="sm" /> : <HiOutlineSparkles className="w-4 h-4" />}
            {aiLoading ? 'Analyzing...' : 'Generate Analysis'}
          </button>
        </div>
        {aiResult ? (
          <div className="prose prose-invert max-w-none">
            <div className="bg-dark-800/50 rounded-xl p-5 border border-dark-700 whitespace-pre-wrap text-sm text-dark-300 leading-relaxed">
              {aiResult.recommendation}
            </div>
            <p className="text-xs text-dark-500 mt-3">Model: {aiResult.model} | Source: {aiResult.source} | Generated: {new Date(aiResult.analyzedAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-dark-500 text-sm">Click "Generate Analysis" to get AI-powered insights for this employee.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
