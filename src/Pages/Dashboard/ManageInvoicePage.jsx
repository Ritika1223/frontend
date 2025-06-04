import React, { useState, useEffect } from 'react';
import { Plus, Calendar, DollarSign, FileText, User, X } from 'lucide-react';
import API_URLS from '../../ApIURLs';
import axios from 'axios';


const ManageInvoicePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
     const [editInvoice, setEditInvoice] = useState(null);

     
  // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;
  

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    clientName: '',
    date: '',
    amount: '',
    description: '',
    status: 'Unpaid',
            operatorId: operatorId, // ✅ include it in form data

  });

 // Fetch debit from backend
   useEffect(() => {
     const fetchInvoice = async () => {
       try {
      const res = await fetch(`${API_URLS.INVOICES_LIST}?operatorId=${operatorId}`);
         setInvoices(res.data);
       } catch (error) {
         console.error('Error fetching invoice:', error);
       } finally {
         setLoading(false);
       }
     };
 
     if (operatorId) {
    fetchInvoice();
  }
}, [operatorId]);
 
   const handleInputChange = (field, value) => {
     setFormData(prev => ({ ...prev, [field]: value }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch(API_URLS.INVOICES_SAVED, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
 
       if (!res.ok) throw new Error('Failed to add invoice');
       const newInvoices= await res.json();
       setInvoices(prev => [...prev, newInvoices]);
 
       resetForm();
     } catch (err) {
       console.error('Error adding invoices:', err);
       alert('Error adding invoices');
     }
   }; 

   const resetForm = () => {
    setFormData({
      invoiceNumber: '',
    clientName: '',
    date: '',
    amount: '',
    description: '',
    status: 'Unpaid'
     });
     setEditInvoice(null);
    setShowAddForm(false);
  };
 const handleUpdate = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch(`${API_URLS.INVOICES_SAVED}/${editInvoice._id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
 
       if (!res.ok) throw new Error('Failed to update invoice');
       const updatedInvoice = await res.json();
       setInvoices(prev =>
         prev.map(invoice => (invoice._id === updatedInvoice._id ? updatedInvoice : invoice))
       );
 
       resetForm();
     } catch (err) {
       console.error('Error updating invoice:', err);
       alert('Error updating invoice');
     }
   };
 
const handleEditClick = (invoice) => {
      setEditInvoice(invoice);
       setFormData({
      invoiceNumber: invoice.invoiceNumber,
    clientName: invoice. clientName,
    date: invoice.date,
    amount: invoice.amount,
    description: invoice.description,
    status: invoice.status ||''
     });
      setShowAddForm(true);
};
const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URLS.INVOICES_SAVED}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete debit');
setInvoices(prev => prev.filter(invoice => invoice.id !== id)); // ✅ correct
    } catch (err) {
      console.error(err);
      alert('Error deleting invoice');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Invoices</h1>
          <p className="text-gray-600">Create and track client invoices with status updates</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl flex items-center group hover:from-[#2C3A7D] hover:to-[#E64A19] transition shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Invoice
        </button>
      </div>

       {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {editInvoice ? 'Edit Invoice' : 'Add New Invoice'}
                          </h2>
                          <button
                            onClick={resetForm}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-6 h-6 text-gray-500" />
                          </button>
                        </div>
            <form onSubmit={editInvoice ? handleUpdate : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number *</label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="INV123"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Client Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Details of the invoice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
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
                  {editInvoice ? 'Update Invoice' : 'Add Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
<div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-6">Invoice List</h2>
  {invoices.length === 0 ? (
    <p className="text-gray-500">No invoices available.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id || invoice._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{invoice.invoiceNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{invoice.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-blue-700">${invoice.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    invoice.status === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-4">
                <button
                  onClick={() => handleEditClick(invoice)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(invoice.id || invoice._id)}
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
      </div>
  );
};

export default ManageInvoicePage;
