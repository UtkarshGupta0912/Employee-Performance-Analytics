import { useState } from 'react';
import { DEPARTMENTS } from '../utils/helpers';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX } from 'react-icons/hi';

const SearchFilter = ({ onSearch, onFilter, onClear }) => {
  const [department, setDepartment] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({ department });
  };

  const handleFilter = () => {
    onFilter({ minScore, maxScore, department });
  };

  const handleClear = () => {
    setDepartment('');
    setMinScore('');
    setMaxScore('');
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4">
      {/* Search Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-field pl-12"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch} className="btn-primary flex items-center justify-center gap-2">
          <HiOutlineSearch className="w-4 h-4" />
          Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <HiOutlineFilter className="w-4 h-4" />
          Filters
        </button>
        {(department || minScore || maxScore) && (
          <button onClick={handleClear} className="btn-secondary flex items-center justify-center gap-2 text-red-400 hover:text-red-300">
            <HiOutlineX className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="animate-slide-down pt-4 border-t border-dark-700/50">
          <p className="text-sm text-dark-400 mb-3 font-medium">Filter by Performance Score</p>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="text-xs text-dark-500 mb-1 block">Min Score</label>
              <input
                type="number"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="input-field"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-dark-500 mb-1 block">Max Score</label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
                placeholder="100"
                min="0"
                max="100"
                className="input-field"
              />
            </div>
            <button onClick={handleFilter} className="btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
