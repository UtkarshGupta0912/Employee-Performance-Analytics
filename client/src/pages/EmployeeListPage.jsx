import { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import EmployeeCard from '../components/EmployeeCard';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { HiOutlineUserAdd, HiOutlineUsers } from 'react-icons/hi';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (params = {}) => {
    setLoading(true);
    try {
      const data = await getEmployees(params);
      setEmployees(data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = ({ department }) => {
    fetchEmployees(department ? { department } : {});
  };

  const handleFilter = ({ minScore, maxScore, department }) => {
    const params = {};
    if (department) params.department = department;
    if (minScore) params.minScore = minScore;
    if (maxScore) params.maxScore = maxScore;
    fetchEmployees(params);
  };

  const handleClear = () => {
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      toast.success('Employee deleted successfully');
      setEmployees(employees.filter((e) => e._id !== id));
    } catch (error) {
      toast.error('Failed to delete employee');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HiOutlineUsers className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-100">Employees</h1>
            <p className="text-dark-400 text-sm">{employees.length} employees found</p>
          </div>
        </div>
        <Link to="/add-employee" className="btn-primary flex items-center gap-2 w-fit">
          <HiOutlineUserAdd className="w-5 h-5" />
          Add Employee
        </Link>
      </div>

      {/* Search & Filter */}
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} onClear={handleClear} />

      {/* Employee Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <LoadingSpinner size="lg" text="Loading employees..." />
        </div>
      ) : employees.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <HiOutlineUsers className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">No employees found</h3>
          <p className="text-dark-500 mb-6">Try adjusting your search or add a new employee.</p>
          <Link to="/add-employee" className="btn-primary inline-flex items-center gap-2">
            <HiOutlineUserAdd className="w-5 h-5" />
            Add First Employee
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {employees.map((emp, i) => (
            <EmployeeCard key={emp._id} employee={emp} rank={i + 1} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeListPage;
