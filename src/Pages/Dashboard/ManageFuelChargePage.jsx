import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';

const FuelChargeManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [fuelCharges, setFuelCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFuel, setEditFuel] = useState(null);

   // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;


  const [formData, setFormData] = useState({
    maintenance: '',
    vehicleNo: '',
    from: '',
    to: '',
    orderNo: '',
    date: '',
    litresMeter: '',
    amount: '',
    remark: '',
            operatorId: operatorId, // ✅ include it in form data

  });

  
  useEffect(() => {

  const fetchFuelCharges = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URLS.FUEL_LIST}?operatorId=${operatorId}`);
      if (!res.ok) throw new Error('Failed to fetch fuel charges');
      const data = await res.json();
      setFuelCharges(data);
    } catch (err) {
      console.error('Error fetching fuel charges:', err);
    } finally {
      setLoading(false);
    }
  };
   if (operatorId) {
    fetchFuelCharges();
  }
}, [operatorId]);



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editFuel ? `${API_URLS.FUEL_SAVED}/${editFuel._id}` : API_URLS.FUEL_SAVED, {
        method: editFuel ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save fuel charge');
      const updated = await res.json();

      setFuelCharges(prev =>
        editFuel
          ? prev.map(item => (item._id === updated._id ? updated : item))
          : [...prev, updated]
      );

      resetForm();
    } catch (err) {
      console.error('Error saving fuel charge:', err);
      alert('Error saving fuel charge');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`${API_URLS.FUEL_SAVED}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setFuelCharges(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting fuel charge');
    }
  };

  const handleEditClick = (item) => {
    setEditFuel(item);
    setFormData({
      maintenance: item.maintenance,
      vehicleNo: item.vehicleNo,
      from: item.from,
      to: item.to,
      orderNo: item.orderNo,
      date: item.date?.split('T')[0],
      litresMeter: item.litresMeter,
      amount: item.amount,
      remark: item.remark
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      maintenance: '',
      vehicleNo: '',
      from: '',
      to: '',
      orderNo: '',
      date: '',
      litresMeter: '',
      amount: '',
      remark: ''
      
    });
    setEditFuel(null);
    setShowAddForm(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fuel Charge Management</h1>
          <p className="text-gray-600">Manage all fuel-related entries</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Fuel Charge
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editFuel ? 'Edit Fuel Charge' : 'Add New Fuel Charge'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Maintenance', field: 'maintenance' },
                  { label: 'Vehicle No *', field: 'vehicleNo', required: true },
                  { label: 'From', field: 'from' },
                  { label: 'To', field: 'to' },
                  { label: 'Order No', field: 'orderNo' },
                  { label: 'Date', field: 'date', type: 'date' },
                  { label: 'Litres/Meter', field: 'litresMeter' },
                  { label: 'Amount', field: 'amount', type: 'number' },
                  { label: 'Remark', field: 'remark', span: true }
                ].map(({ label, field, type = 'text', required, span }) => (
                  <div key={field} className={span ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <input
                      type={type}
                      required={required}
                      placeholder={label.replace('*', '').trim()}
                      value={formData[field]}
                      onChange={e => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                  {editFuel ? 'Update Fuel Charge' : 'Save Fuel Charge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Fuel Charge List</h2>

        {loading ? (
          <p className="text-gray-500">Loading fuel charges...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Maintenance', 'Vehicle No', 'From', 'To', 'Order No', 'Date', 'Litres/Meter', 'Amount', 'Remark', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fuelCharges.length > 0 ? fuelCharges.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-2 whitespace-nowrap">{item.maintenance}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.vehicleNo}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.from}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.to}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.orderNo}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.litresMeter}</td>
                    <td className="px-6 py-2 whitespace-nowrap">₹{item.amount}</td>
                    <td className="px-6 py-2 whitespace-nowrap">{item.remark}</td>
                    <td className="px-6 py-2 whitespace-nowrap space-x-2">
                      <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-gray-400">No fuel charge records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuelChargeManagement;
