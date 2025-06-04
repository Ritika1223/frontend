import React, { useEffect, useState } from 'react';
import { Plus, Calendar, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';

const TollTaxManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [tollTaxes, setTollTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editToll, setEditToll] = useState(null);
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
    taxType: '',
    amount: '',
    remark: '',
            operatorId: operatorId, // ✅ include it in form data

  });

  
  useEffect(() => {

  const fetchTollTaxes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URLS.TOLL_LIST}?operatorId=${operatorId}`);
      if (!res.ok) throw new Error('Failed to fetch toll taxes');
      const data = await res.json();
      setTollTaxes(data);
    } catch (err) {
      console.error('Error fetching toll taxes:', err);
    } finally {
      setLoading(false);
    }
  };
   if (operatorId) {
    fetchTollTaxes();
  }
}, [operatorId]);



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editToll ? `${API_URLS.TOLL_SAVED}/${editToll._id}` : API_URLS.TOLL_SAVED, {
        method: editToll ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save toll tax');
      const updated = await res.json();

      setTollTaxes(prev =>
        editToll
          ? prev.map(tax => (tax._id === updated._id ? updated : tax))
          : [...prev, updated]
      );

      resetForm();
    } catch (err) {
      console.error('Error saving toll tax:', err);
      alert('Error saving toll tax');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`${API_URLS.TOLL_SAVED}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTollTaxes(prev => prev.filter(tax => tax._id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting toll tax');
    }
  };

  const handleEditClick = (tax) => {
    setEditToll(tax);
    setFormData({
      maintenance: tax.maintenance,
      vehicleNo: tax.vehicleNo,
      from: tax.from,
      to: tax.to,
      orderNo: tax.orderNo,
      date: tax.date?.split('T')[0],
      taxType: tax.taxType,
      amount: tax.amount,
      remark: tax.remark
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
      taxType: '',
      amount: '',
      remark: ''
    });
    setEditToll(null);
    setShowAddForm(false);
  };

 return (
  <div className="p-8">
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Toll Tax Management</h1>
        <p className="text-gray-600">Manage all toll-related tax entries</p>
      </div>
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Toll Tax
      </button>
    </div>

    {/* Modal Form */}
    {showAddForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editToll ? 'Edit Toll Tax' : 'Add New Toll Tax'}
            </h2>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

      <form onSubmit={editToll ? handleSubmit : handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      { label: 'Maintenance', field: 'maintenance' },
      { label: 'Vehicle No *', field: 'vehicleNo', required: true },
      { label: 'From', field: 'from' },
      { label: 'To', field: 'to' },
      { label: 'Order No', field: 'orderNo' },
      { label: 'Date', field: 'date', type: 'date' },
      { label: 'Tax Type', field: 'taxType' },
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
      {editToll ? 'Update Toll Tax' : 'Save Toll Tax'}
    </button>
  </div>
</form>
  </div>
      </div>
    )}

    {/* Toll Tax Table */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Toll Tax List</h2>

      {loading ? (
        <p className="text-gray-500">Loading toll taxes...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Maintenance','Vehicle No', 'From', 'To', 'Order No', 'Date', 'Tax Type', 'Amount', 'Remark', 'Actions'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tollTaxes.length > 0 ? tollTaxes.map(tax => (
                <tr key={tax._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-2 whitespace-nowrap">{tax.maintenance}</td>

                  <td className="px-6 py-2 whitespace-nowrap">{tax.vehicleNo}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{tax.from}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{tax.to}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{tax.orderNo}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{new Date(tax.date).toLocaleDateString()}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{tax.taxType}</td>
                  <td className="px-6 py-2 whitespace-nowrap">₹{tax.amount}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{tax.remark}</td>
                  <td className="px-6 py-2 whitespace-nowrap space-x-2">
                    <button onClick={() => handleEditClick(tax)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(tax._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-400">No toll tax records found.</td>
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

export default TollTaxManagement;
