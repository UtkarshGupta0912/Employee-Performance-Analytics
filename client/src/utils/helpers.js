// Department options
export const DEPARTMENTS = [
  'Development',
  'Design',
  'Marketing',
  'HR',
  'Finance',
  'Sales',
  'Operations',
  'Management',
];

// Get score color class based on performance score
export const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
};

// Get score background class
export const getScoreBg = (score) => {
  if (score >= 90) return 'bg-emerald-500/20 border-emerald-500/30';
  if (score >= 80) return 'bg-green-500/20 border-green-500/30';
  if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
  if (score >= 40) return 'bg-orange-500/20 border-orange-500/30';
  return 'bg-red-500/20 border-red-500/30';
};

// Get performance label
export const getPerformanceLabel = (score) => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Improvement';
  return 'Critical';
};

// Format date
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get rank badge info
export const getRankInfo = (rank) => {
  if (rank === 1) return { emoji: '🥇', label: 'Gold', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' };
  if (rank === 2) return { emoji: '🥈', label: 'Silver', color: 'text-gray-300 bg-gray-500/20 border-gray-500/30' };
  if (rank === 3) return { emoji: '🥉', label: 'Bronze', color: 'text-orange-400 bg-orange-500/20 border-orange-500/30' };
  return { emoji: `#${rank}`, label: 'Standard', color: 'text-dark-300 bg-dark-700 border-dark-600' };
};

// Department icon colors
export const getDeptColor = (dept) => {
  const colors = {
    Development: 'bg-blue-500/20 text-blue-400',
    Design: 'bg-pink-500/20 text-pink-400',
    Marketing: 'bg-purple-500/20 text-purple-400',
    HR: 'bg-teal-500/20 text-teal-400',
    Finance: 'bg-emerald-500/20 text-emerald-400',
    Sales: 'bg-orange-500/20 text-orange-400',
    Operations: 'bg-cyan-500/20 text-cyan-400',
    Management: 'bg-indigo-500/20 text-indigo-400',
  };
  return colors[dept] || 'bg-dark-600 text-dark-300';
};
