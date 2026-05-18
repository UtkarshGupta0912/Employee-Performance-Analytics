import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../services/employeeService';
import StatsCard from '../components/StatsCard';
import RankingBadge from '../components/RankingBadge';
import { DepartmentBarChart, PerformanceDoughnut } from '../components/PerformanceChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { getScoreColor, formatDate, getDeptColor } from '../utils/helpers';
import { HiOutlineUsers, HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineOfficeBuilding, HiOutlineEye, HiOutlineSparkles } from 'react-icons/hi';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  // Calculate stats
  const totalEmployees = employees.length;
  const avgScore = totalEmployees > 0
    ? Math.round(employees.reduce((sum, e) => sum + e.performanceScore, 0) / totalEmployees)
    : 0;
  const topPerformers = employees.filter((e) => e.performanceScore >= 80).length;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  // Sorted for ranking
  const ranked = [...employees].sort((a, b) => b.performanceScore - a.performanceScore);
  const topFive = ranked.slice(0, 5);
  const recentlyAdded = [...employees].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-100">Analytics Dashboard</h1>
          <p className="text-dark-400 mt-1">Overview of employee performance metrics</p>
        </div>
        <Link to="/ai-recommendations" className="btn-primary flex items-center gap-2 w-fit">
          <HiOutlineSparkles className="w-5 h-5" />
          AI Insights
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={<HiOutlineUsers />} label="Total Employees" value={totalEmployees} color="primary" />
        <StatsCard icon={<HiOutlineChartBar />} label="Avg Performance" value={`${avgScore}/100`} color="blue" />
        <StatsCard icon={<HiOutlineTrendingUp />} label="Top Performers" value={topPerformers} color="green" />
        <StatsCard icon={<HiOutlineOfficeBuilding />} label="Departments" value={departments} color="purple" />
      </div>

      {/* Charts */}
      {employees.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-dark-200 mb-4">Department-wise Avg Score</h2>
            <DepartmentBarChart employees={employees} />
          </div>
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-dark-200 mb-4">Performance Distribution</h2>
            <PerformanceDoughnut employees={employees} />
          </div>
        </div>
      )}

      {/* Top Performers & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-dark-200">🏆 Top Performers</h2>
            <Link to="/employees" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">View All →</Link>
          </div>
          <div className="space-y-3">
            {topFive.map((emp, i) => (
              <Link
                key={emp._id}
                to={`/employees/${emp._id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-800/50 transition-all group"
              >
                <RankingBadge rank={i + 1} size="sm" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/80 to-accent-500/80 flex items-center justify-center text-white font-bold text-sm">
                  {emp.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-200 truncate group-hover:text-primary-400 transition-colors">{emp.name}</p>
                  <p className="text-xs text-dark-500">{emp.department}</p>
                </div>
                <span className={`font-bold text-sm ${getScoreColor(emp.performanceScore)}`}>
                  {emp.performanceScore}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-dark-200">🕐 Recently Added</h2>
            <Link to="/add-employee" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">+ Add New</Link>
          </div>
          <div className="space-y-3">
            {recentlyAdded.map((emp) => (
              <Link
                key={emp._id}
                to={`/employees/${emp._id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-800/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center text-dark-300 font-bold text-sm border border-dark-600">
                  {emp.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-200 truncate group-hover:text-primary-400 transition-colors">{emp.name}</p>
                  <p className="text-xs text-dark-500">{emp.email}</p>
                </div>
                <div className="text-right">
                  <span className={`badge text-xs ${getDeptColor(emp.department)}`}>{emp.department}</span>
                  <p className="text-xs text-dark-500 mt-1">{formatDate(emp.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
