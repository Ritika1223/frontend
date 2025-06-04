import React, { useState,useEffect } from 'react';
import { Plus, Car, Calendar, Settings, X, User } from 'lucide-react';
import API_URLS from '../../ApIURLs';
import axios from 'axios';



const VehiclePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
    const [editVehicle, setEditVehicle] = useState(null);

     // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;


  const [formData, setFormData] = useState({
    vehicleNumber: '',
    model: '',
    capacity: '',
    driver: '',
    route: '',
    registrationDate: '',
    insuranceExpiry: '',
    fuelType: '',
    engineNumber: '',
    chassisNumber: '',
            operatorId: operatorId, // ✅ include it in form data

  });

   useEffect(() => {
      const fetchVehicle = async () => {
        try {
          setLoading(true);
      const res = await fetch(`${API_URLS.VEHICLES_LIST}?operatorId=${operatorId}`);
          if (!res.ok) throw new Error('Failed to fetch  vehicle');
          const data = await res.json();
          setVehicles(data);
        } catch (err) {
          console.error('Error fetching vehicle:', err);
        } finally {
          setLoading(false);
        }
      };
     if (operatorId) {
    fetchVehicle();
  }
}, [operatorId]);

  
    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(API_URLS.VEHICLES_SAVED, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (!res.ok) throw new Error('Failed to add vehicle');
        const newVehicle = await res.json();
        setVehicles(prev => [...prev, newVehicle]);
  
        resetForm();
      } catch (err) {
        console.error('Error adding vehicle:', err);
        alert('Error adding vehicle');
      }
    };

     const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URLS.VEHICLES_SAVED}/${editVehicle._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update vehicle');
      const updatedVehicle = await res.json();
      setVehicles(prev =>
        prev.map(vehicle => (vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle))
      );

      resetForm();
    } catch (err) {
      console.error('Error updating vehicle:', err);
      alert('Error updating vehicle');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URLS.VEHICLES_SAVED}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      setVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting vehicle');
    }
  };

  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle);
    setFormData({
       vehicleNumber: vehicle.vehicleNumber,
    model: vehicle.model,
    capacity: vehicle.capacity,
    driver: vehicle.driver,
    route: vehicle.route,
    registrationDate: vehicle.registrationDate,
    insuranceExpiry: vehicle.insuranceExpiry,
    fuelType: vehicle.fuelType,
    engineNumber: vehicle.engineNumber,
    chassisNumber: vehicle.chassisNumber,
  });
  setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
       vehicleNumber: '',
    model: '',
    capacity: '',
    driver: '',
    route: '',
    registrationDate: '',
    insuranceExpiry: '',
    fuelType: '',
    engineNumber: '',
    chassisNumber: ''
  });
  setEditVehicle(null);
    setShowAddForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const fuelTypes = ['Diesel', 'CNG', 'Electric', 'Petrol'];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h1>
          <p className="text-gray-600">Manage your fleet and vehicle information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

     <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle List</h2>

  {loading ? (
    <p className="text-gray-500">Loading vehicles...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance Expiry</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engine Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chassis Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id || vehicle._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{vehicle.vehicleNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.model}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.capacity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.driver}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.route}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.registrationDate || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.insuranceExpiry || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.fuelType || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.engineNumber || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vehicle.chassisNumber || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status || 'Unknown'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button
                  onClick={() => handleEditClick(vehicle)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id || vehicle._id)}
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

      {/* Add Vehicle Modal */}
      
       {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
      

            <form onSubmit={editVehicle ? handleUpdate : handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number *</label>
                  <input
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., BUS-003"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Volvo B7R"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of passengers"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Driver</label>
                  <input
                    type="text"
                    value={formData.driver}
                    onChange={(e) => handleInputChange('driver', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Driver name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., City Center - Airport"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((fuel) => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                  <input
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry</label>
                  <input
                    type="date"
                    value={formData.insuranceExpiry}
                    onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number</label>
                  <input
                    type="text"
                    value={formData.engineNumber}
                    onChange={(e) => handleInputChange('engineNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Engine number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                  <input
                    type="text"
                    value={formData.chassisNumber}
                    onChange={(e) => handleInputChange('chassisNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Chassis number"
                  />
                </div>
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
                  {editVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePage;
