import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, Calendar, DollarSign, User, FileText, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';
import axios from 'axios';


const DebitAmountPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [debits, setDebits] = useState([]);
  const [loading, setLoading] = useState(true);
   const [editDebit, setEditDebit] = useState(null);
    // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;


  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: '',
    reference: '',
    notes: '',
            operatorId: operatorId, // ✅ include it in form data

  });

 useEffect(() => {
  const fetchDebits = async () => {
    try {
      const res = await fetch(`${API_URLS.DEBITS_LIST}?operatorId=${operatorId}`);
      const data = await res.json(); // ✅ Parse the response correctly
      setDebits(data || []);         // ✅ Default to empty array if null
    } catch (error) {
      console.error('Error fetching debits:', error);
      setDebits([]); // ✅ Avoid undefined state on error
    } finally {
      setLoading(false);
    }
  };

  if (operatorId) {
    fetchDebits();
  }
}, [operatorId]);

 
   const handleInputChange = (field, value) => {
     setFormData(prev => ({ ...prev, [field]: value }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch(API_URLS.DEBITS_SAVED, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
 
       if (!res.ok) throw new Error('Failed to add debits');
       const newDebits= await res.json();
       setDebits(prev => [...prev, newDebits]);
 
       resetForm();
     } catch (err) {
       console.error('Error adding debits:', err);
       alert('Error adding debits');
     }
   };
 const resetForm = () => {
    setFormData({
        amount: '',
        description: '',
        date: '',
        category: '',
        reference: '',
        notes: ''
      });
    setEditDebit(null);
    setShowAddForm(false);
  };

 const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URLS.DEBITS_SAVED}/${editDebit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update debit');
      const updatedDebit = await res.json();
      setDebits(prev =>
        prev.map(debit => (debit._id === updatedDebit._id ? updatedDebit : debit))
      );

      resetForm();
    } catch (err) {
      console.error('Error updating debit:', err);
      alert('Error updating debit');
    }
  };


const handleEditClick = (debit) => {
      setEditDebit(debit);

  setFormData({
    amount: debit.amount,
    description: debit.description,
    date: debit.date,
    category: debit.category,
    reference: debit.reference,
    notes: debit.notes || ''
  });
  setShowAddForm(true);
};

const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URLS.DEBITS_SAVED}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete debit');
setDebits(prev => prev.filter(debit => debit.id !== id)); // ✅ correct
    } catch (err) {
      console.error(err);
      alert('Error deleting debit');
    }
  };



  const categories = ['Maintenance', 'Fuel', 'Salary', 'Purchase', 'Other'];

  const totalDebit = debits.reduce((sum, debit) => sum + debit.amount, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Debit Amount Management</h1>
          <p className="text-gray-600">Track and manage outgoing payments and expenses</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#C62828] to-[#FF7043] text-white px-6 py-2.5 rounded-xl hover:from-[#B71C1C] hover:to-[#F4511E] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Debit
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Debit Amount</h2>
            <p className="text-3xl font-bold">{totalDebit.toFixed(2)}</p>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Add Debit Form */}
      {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editDebit ? 'Edit Debit' : 'Add New Debit'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
            <form onSubmit={editDebit ? handleUpdate : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="DEB123"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of the debit"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Additional notes or details"
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
                  {editDebit ? 'Update Debit' : 'Add Debit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Debit List in Table Format */}
<div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-6">Debit History</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {debits.map((debit) => (
          <tr key={debit.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{debit.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{debit.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{debit.category || '-'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{debit.reference || '-'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{debit.notes || '-'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">
              -{debit.amount.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
              <button
                onClick={() => handleEditClick(debit)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(debit.id)}
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
</div>
  </div>
  );
};

export default DebitAmountPage;
