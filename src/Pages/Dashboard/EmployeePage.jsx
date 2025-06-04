import React, { useState, useEffect } from 'react';
import { Plus, User, Phone, Mail, Calendar, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';


const EmployeePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEmployee, setEditEmployee] = useState(null);

  // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;

 

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    joinDate: '',
    address: '',
    salary: '',
    emergencyContact: '',
        operatorId: operatorId, // ✅ include it in form data

  });

  const positions = ['Driver', 'Conductor', 'Mechanic', 'Supervisor', 'Cleaner', 'Security'];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
      const res = await fetch(`${API_URLS.EMPLOYEES_LIST}?operatorId=${operatorId}`);
        if (!res.ok) throw new Error('Failed to fetch employees');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

   if (operatorId) {
    fetchEmployees();
  }
}, [operatorId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URLS.EMPLOYEES_SAVED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to add employee');
      const newEmployee = await res.json();
      setEmployees(prev => [...prev, newEmployee]);

      resetForm();
    } catch (err) {
      console.error('Error adding employee:', err);
      alert('Error adding employee');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URLS.EMPLOYEES_SAVED}/${editEmployee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update employee');
      const updatedEmployee = await res.json();
      setEmployees(prev =>
        prev.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
      );

      resetForm();
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Error updating employee');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URLS.EMPLOYEES_SAVED}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      setEmployees(prev => prev.filter(emp => emp._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting employee');
    }
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      email: employee.email,
      phone: employee.phone,
      joinDate: employee.joinDate,
      address: employee.address,
      salary: employee.salary,
      emergencyContact: employee.emergencyContact,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      email: '',
      phone: '',
      joinDate: '',
      address: '',
      salary: '',
      emergencyContact: ''
    });
    setEditEmployee(null);
    setShowAddForm(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h1>
          <p className="text-gray-600">Manage your team members and their information</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditEmployee(null);
            setFormData({
              name: '',
              position: '',
              email: '',
              phone: '',
              joinDate: '',
              address: '',
              salary: '',
              emergencyContact: ''
            });
          }}
          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-6">Employee List</h2>

  {loading ? (
    <p className="text-gray-500">Loading employees...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.address || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.salary ? `$${employee.salary}` : '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.emergencyContact || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button
                  onClick={() => handleEditClick(employee)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      {/* Add/Edit Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={editEmployee ? handleUpdate : handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name *', type: 'text', field: 'name', required: true },
                  { label: 'Position *', type: 'select', field: 'position', required: true },
                  { label: 'Email *', type: 'email', field: 'email', required: true },
                  { label: 'Phone *', type: 'tel', field: 'phone', required: true },
                  { label: 'Join Date', type: 'date', field: 'joinDate' },
                  { label: 'Salary', type: 'number', field: 'salary', placeholder: 'Monthly salary' },
                  { label: 'Address', type: 'text', field: 'address', span: true, placeholder: 'Complete address' },
                  { label: 'Emergency Contact', type: 'text', field: 'emergencyContact', span: true, placeholder: 'Emergency contact number' }
                ].map(({ label, type, field, required, span, placeholder }) => (
                  <div key={field} className={span ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    {type === 'select' ? (
                      <select
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        required={required}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Position</option>
                        {positions.map(pos => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        required={required}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {editEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
