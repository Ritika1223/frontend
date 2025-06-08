import React, { useState, useEffect } from 'react';
import { Plus, User, Phone, Mail, Calendar, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';


const EmployeePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  


  // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
const operatorId = operatorData?.id;

 const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.phone.includes(searchTerm)
);

  const [formData, setFormData] = useState({

    name: '',
    employeeFatherName:'',
    gender:'',
    position: '',
    email: '',
    phone: '',
    joinDate: '',
    salary: '',
    temporaryAddress: '',
    permanentAddress:'',
        operatorId: '', // ✅ include it in form data

  });

  const positions = ['Driver', 'Conductor', 'Mechanic', 'Supervisor', 'Cleaner', 'Security'];

  const gender =['Male', 'Female', 'Other']

  // Fetch operatorId from localStorage
  useEffect(() => {
    const operatorData = JSON.parse(localStorage.getItem('userData'));
    const operatorId = operatorData?.id;

    if (!operatorId) {
      console.warn("Operator ID missing in localStorage.");
      return;
    }

    setFormData(prev => ({ ...prev, operatorId }));

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

    fetchEmployees();
  }, []);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!operatorId) {
    alert('Operator ID is missing!');
    return;
  }

  const payload = {
    ...formData,
    operatorId // ✅ Make sure this is added
  };

  console.log('Submitting payload:', payload); // 🔍 Debug log

    try {
      const res = await fetch(API_URLS.EMPLOYEES_SAVED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload),
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
      employeeFatherName:employee.employeeFatherName,
      gender:employee.gender,
      position: employee.position,
      email: employee.email,
      phone: employee.phone,
      joinDate: employee.joinDate,
      salary: employee.salary,
      temporaryAddress: employee.temporaryAddress,
      permanentAddress: employee.permanentAddress,
    });
    setShowAddForm(true);
  };

   const resetForm = () => {
    setFormData(prev => ({
      name: '',
      employeeFatherName: '',
      gender: '',
      position: '',
      email: '',
      phone: '',
      joinDate: '',
      salary: '',
      temporaryAddress: '',
      permanentAddress: '',
      operatorId: prev.operatorId, // keep operator ID
    }));
    setEditEmployee(null);
    setShowAddForm(false);
  };
  const toggleStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const res = await fetch(`${API_URLS.EMPLOYEES_SAVED}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) throw new Error('Failed to update status');

    const updated = await res.json();
    setEmployees(prev =>
      prev.map(emp => (emp._id === id ? { ...emp, status: updated.status } : emp))
    );
  } catch (err) {
    console.error(err);
    alert('Error updating employee status');
  }
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
    employeeFatherName:'',
    gender:'',
    position: '',
    email: '',
    phone: '',
    joinDate: '',
    salary: '',
    temporaryAddress: '',
    permanentAddress:''
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
  <div className="mb-4">
  <input
    type="text"
    placeholder="Search by name, position or phone..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="px-4 py-2 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  {loading ? (
    <p className="text-gray-500">Loading employees...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Father's Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temporary Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permanent Address</th>
   
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
{filteredEmployees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{employee.empId}</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{employee.employeeFatherName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{employee.gender}</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.salary ? `$${employee.salary}` : '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.temporaryAddress || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.permanentAddress || '-'}</td>
       
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
               <td className="px-4 py-4 text-sm font-semibold text-gray-900">
<button
  onClick={() => toggleStatus(employee._id, employee.status === 'Active' ? 'Inactive' : 'Active')}
  className="text-indigo-600 hover:underline"
>
  {employee.status === 'Active' ? 'Mark Inactive' : 'Mark Active'}
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
                  { label: 'Employee Father Name *', type: 'text', field: 'employeeFatherName', required: true },
                  { label: 'Gender *', type: 'select', field: 'gender', required: true },

                  { label: 'Position *', type: 'select', field: 'position', required: true },
                  { label: 'Email *', type: 'email', field: 'email', required: true },
                  { label: 'Phone *', type: 'tel', field: 'phone', required: true },
                  { label: 'Join Date', type: 'date', field: 'joinDate' },
                  { label: 'Salary', type: 'number', field: 'salary', placeholder: 'Monthly salary' },
                  { label: 'Temprorary Address', type: 'text', field: 'temporaryAddress', span: true, placeholder: 'Temporary address' },
                  { label: 'Permanent Address', type: 'text', field: 'permanentAddress', span: true, placeholder: 'Permanent address' },
           
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
            <option value="">Select {field === 'gender' ? 'Gender' : 'Position'}</option>
                       {(field === 'gender' ? gender : positions).map(option => (
              <option key={option} value={option}>{option}</option>
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
