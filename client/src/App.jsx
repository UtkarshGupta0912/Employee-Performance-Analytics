import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import AIRecommendationPage from './pages/AIRecommendationPage';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark-900 bg-pattern">
      {/* Show Navbar only when authenticated */}
      {isAuthenticated && <Navbar />}

      {/* Main Content */}
      <main className={isAuthenticated ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeeListPage /></ProtectedRoute>} />
          <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><AddEmployeePage /></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployeePage /></ProtectedRoute>} />
          <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendationPage /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
