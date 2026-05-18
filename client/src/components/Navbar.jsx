import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineUserAdd, HiOutlineSparkles, HiOutlineLogout, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: HiOutlineChartBar },
    { path: '/employees', label: 'Employees', icon: HiOutlineUsers },
    { path: '/add-employee', label: 'Add Employee', icon: HiOutlineUserAdd },
    { path: '/ai-recommendations', label: 'AI Insights', icon: HiOutlineSparkles },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <span className="text-white font-bold text-sm">EP</span>
            </div>
            <span className="hidden sm:block font-bold text-lg gradient-text">PerformanceAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-primary-500/15 text-primary-400 shadow-sm'
                    : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* User & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <span className="text-sm text-dark-300">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <HiOutlineLogout className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 transition-all"
          >
            {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col gap-1 pt-2 border-t border-dark-700/50">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(path)
                      ? 'bg-primary-500/15 text-primary-400'
                      : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
              <div className="border-t border-dark-700/50 mt-2 pt-2 flex items-center justify-between px-4 py-3">
                <span className="text-sm text-dark-400">{user?.name}</span>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
