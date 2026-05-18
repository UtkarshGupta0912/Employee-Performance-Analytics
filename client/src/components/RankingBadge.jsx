import { getRankInfo } from '../utils/helpers';

const RankingBadge = ({ rank, size = 'md' }) => {
  const { emoji, label, color } = getRankInfo(rank);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-full font-semibold border ${color}`}>
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
};

export default RankingBadge;
