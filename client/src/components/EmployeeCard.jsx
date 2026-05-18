import { Link } from 'react-router-dom';
import { getScoreColor, getScoreBg, getPerformanceLabel, getDeptColor } from '../utils/helpers';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const EmployeeCard = ({ employee, rank, onDelete }) => {
  const { _id, name, email, department, skills, performanceScore, experience } = employee;

  return (
    <div className="glass-card p-5 flex flex-col gap-4 animate-fade-in group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">{name}</h3>
            <p className="text-xs text-dark-400">{email}</p>
          </div>
        </div>
        {/* Rank */}
        {rank && (
          <span className="text-lg">
            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
          </span>
        )}
      </div>

      {/* Department & Experience */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`badge ${getDeptColor(department)}`}>{department}</span>
        <span className="badge bg-dark-700 text-dark-300">{experience} yrs exp</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <span key={i} className="px-2.5 py-0.5 rounded-lg bg-dark-800 text-dark-300 text-xs border border-dark-700 hover:border-primary-500/30 transition-colors">
            {skill}
          </span>
        ))}
      </div>

      {/* Performance Score */}
      <div className="flex items-center gap-3 mt-auto">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-dark-400">Performance</span>
            <span className={`text-sm font-bold ${getScoreColor(performanceScore)}`}>
              {performanceScore}/100
            </span>
          </div>
          <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                performanceScore >= 80
                  ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                  : performanceScore >= 60
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                  : performanceScore >= 40
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400'
                  : 'bg-gradient-to-r from-red-500 to-red-400'
              }`}
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>
        <span className={`badge text-xs border ${getScoreBg(performanceScore)} ${getScoreColor(performanceScore)}`}>
          {getPerformanceLabel(performanceScore)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-dark-700/50">
        <Link
          to={`/employees/${_id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm text-dark-300 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
        >
          <HiOutlineEye className="w-4 h-4" /> View
        </Link>
        <Link
          to={`/edit-employee/${_id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm text-dark-300 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
        >
          <HiOutlinePencil className="w-4 h-4" /> Edit
        </Link>
        <button
          onClick={() => onDelete(_id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm text-dark-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <HiOutlineTrash className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
