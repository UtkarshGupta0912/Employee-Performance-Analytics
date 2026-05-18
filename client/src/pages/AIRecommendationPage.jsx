import { useState, useEffect } from 'react';
import { getEmployees } from '../services/employeeService';
import { getAIRecommendation } from '../services/aiService';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { HiOutlineSparkles, HiOutlineUsers, HiOutlineCheckCircle } from 'react-icons/hi';

const AIRecommendationPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [analysisType, setAnalysisType] = useState('full');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === employees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(employees.map((e) => e._id));
    }
  };

  const handleGenerate = async () => {
    setAiLoading(true);
    setResult(null);
    try {
      const data = await getAIRecommendation(selectedIds, analysisType);
      setResult(data);
      toast.success('AI analysis generated!');
    } catch (error) {
      toast.error('Failed to generate analysis');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-100 flex items-center gap-3">
          <HiOutlineSparkles className="w-8 h-8 text-primary-400" />
          AI Recommendations
        </h1>
        <p className="text-dark-400 mt-1">Get AI-powered performance analysis and HR recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Employee Selection */}
        <div className="lg:col-span-1 space-y-4">
          {/* Analysis Type */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-dark-300 mb-3">Analysis Type</h3>
            <div className="space-y-2">
              {[
                { value: 'full', label: 'Full Analysis', desc: 'Complete HR assessment' },
                { value: 'promotion', label: 'Promotion Check', desc: 'Promotion readiness' },
                { value: 'training', label: 'Training Plan', desc: 'Training suggestions' },
                { value: 'ranking', label: 'Ranking', desc: 'Employee ranking' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnalysisType(opt.value)}
                  className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
                    analysisType === opt.value
                      ? 'bg-primary-500/15 border border-primary-500/30 text-primary-300'
                      : 'bg-dark-800/30 border border-dark-700 text-dark-400 hover:border-dark-600'
                  }`}
                >
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-xs opacity-70">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Employee Selection */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dark-300">
                Select Employees ({selectedIds.length}/{employees.length})
              </h3>
              <button onClick={selectAll} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                {selectedIds.length === employees.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              {employees.map((emp) => (
                <button
                  key={emp._id}
                  onClick={() => toggleSelect(emp._id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left text-sm ${
                    selectedIds.includes(emp._id)
                      ? 'bg-primary-500/10 border border-primary-500/30'
                      : 'bg-dark-800/20 border border-transparent hover:bg-dark-800/40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    selectedIds.includes(emp._id)
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-dark-500'
                  }`}>
                    {selectedIds.includes(emp._id) && (
                      <HiOutlineCheckCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-dark-200 truncate">{emp.name}</p>
                    <p className="text-xs text-dark-500">{emp.department} • Score: {emp.performanceScore}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={aiLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            {aiLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <HiOutlineSparkles className="w-5 h-5" />
            )}
            {aiLoading ? 'Generating Analysis...' : 'Generate AI Analysis'}
          </button>
          <p className="text-xs text-dark-500 text-center">
            {selectedIds.length === 0 ? 'All employees will be analyzed' : `${selectedIds.length} employee(s) selected`}
          </p>
        </div>

        {/* Right - Results */}
        <div className="lg:col-span-2">
          {aiLoading ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px]">
              <LoadingSpinner size="lg" text="AI is analyzing employee data..." />
              <p className="text-dark-500 text-sm mt-4">This may take a few seconds</p>
            </div>
          ) : result ? (
            <div className="glass-card p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-dark-200">Analysis Results</h2>
                <div className="flex items-center gap-3 text-xs text-dark-500">
                  <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    {result.source === 'ai' ? '🤖 AI Generated' : '📊 Rule-Based'}
                  </span>
                  <span>{result.employeeCount} employees</span>
                </div>
              </div>
              <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 whitespace-pre-wrap text-sm text-dark-300 leading-relaxed max-h-[600px] overflow-y-auto">
                {result.recommendation}
              </div>
              <p className="text-xs text-dark-500 mt-3">
                Model: {result.model} | Generated: {new Date(result.analyzedAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
              <HiOutlineSparkles className="w-16 h-16 text-dark-600 mb-4" />
              <h3 className="text-xl font-semibold text-dark-300 mb-2">Ready for AI Analysis</h3>
              <p className="text-dark-500 max-w-md">
                Select employees and an analysis type, then click "Generate AI Analysis" to get professional HR recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationPage;
