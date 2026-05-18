const StatsCard = ({ icon, label, value, trend, color = 'primary' }) => {
  const colorMap = {
    primary: 'from-primary-500/20 to-primary-600/10 border-primary-500/20',
    green: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20',
    red: 'from-red-500/20 to-red-600/10 border-red-500/20',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
  };

  const iconColorMap = {
    primary: 'text-primary-400',
    green: 'text-emerald-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-dark-100">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from avg
            </p>
          )}
        </div>
        <div className={`text-2xl ${iconColorMap[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
