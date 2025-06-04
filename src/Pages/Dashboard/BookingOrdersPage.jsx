import React, { useState, useEffect} from 'react';
import { Plus, FileText, Calendar, MapPin, User, X, Clock } from 'lucide-react';
import API_URLS from '../../ApIURLs';


const BookingOrdersPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBooking, setEditBooking] = useState(null);

     // ✅ Get operator ID from localStorage
  const operatorData = JSON.parse(localStorage.getItem('userData'));
  const operatorId = operatorData?.id;


  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    fromLocation: '',
    toLocation: '',
    date: '',
    time: '',
    passengers: '',
    vehicleNumber: '',
    specialRequests: '',
    amount: '',
                operatorId: operatorId, // ✅ include it in form data

  });
    useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
      const res = await fetch(`${API_URLS.BOOKINGS_LIST}?operatorId=${operatorId}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (operatorId) {
    fetchBookings();
  }
}, [operatorId]);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      fromLocation: '',
      toLocation: '',
      date: '',
      time: '',
      passengers: '',
      vehicleNumber: '',
      specialRequests: '',
      amount: ''
    });
    setEditBooking(null);
    setShowCreateForm(false);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const sanitizedData = {
    ...formData,
    passengers: Number(formData.passengers) || 1,
    amount: Number(formData.amount) || 0,
      status: formData.status || 'Pending',

  };

  console.log("Submitting sanitized data:", sanitizedData);

  try {
    const res = await fetch(API_URLS.BOOKINGS_SAVED, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData),
    });

    if (!res.ok) {
      const errorBody = await res.text(); // Check if backend returns a specific error
      throw new Error(`Failed to add booking: ${errorBody}`);
    }

    const newBooking = await res.json();
    setBookings(prev => [...prev, newBooking]);
    resetForm();
  } catch (err) {
    console.error('Error adding booking:', err);
    alert(err.message);
  }
};

  // Update existing booking
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URLS.BOOKINGS_SAVED}/${editBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update booking');
      const updatedBooking = await res.json();
      setBookings(prev => prev.map(booking => (booking._id === updatedBooking._id ? updatedBooking : booking)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URLS.BOOKINGS_SAVED}/${id}`,
         { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booking');
      setBookings(prev => prev.filter(booking => booking._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Prepare form for editing existing booking
  const handleEditClick = (booking) => {
    setEditBooking(booking);
    setFormData({
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      customerEmail: booking.customerEmail,
      fromLocation: booking.fromLocation,
      toLocation: booking.toLocation,
      date: booking.date,
      time: booking.time,
      passengers: booking.passengers,
      vehicleNumber: booking.vehicleNumber,
      specialRequests: booking.specialRequests,
      amount: booking.amount,
    });
    setShowCreateForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const vehicles = ['BUS-001', 'BUS-002', 'BUS-003', 'BUS-004'];
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Orders</h1>
          <p className="text-gray-600">Manage customer bookings and reservations</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Order
        </button>
      </div>

      {/* Booking List */}
    <div className="overflow-auto">
  <table className="w-full text-sm border border-gray-300 bg-white rounded-lg overflow-hidden shadow-md">
    <thead className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white">
      <tr>
        <th className="px-4 py-2 text-left">#</th>
        <th className="px-4 py-2 text-left">Customer Name</th>
        <th className="px-4 py-2 text-left">Phone</th>
        <th className="px-4 py-2 text-left">Email</th>
        <th className="px-4 py-2 text-left">From</th>
        <th className="px-4 py-2 text-left">To</th>
        <th className="px-4 py-2 text-left">Date</th>
        <th className="px-4 py-2 text-left">Time</th>
        <th className="px-4 py-2 text-left">Passengers</th>
        <th className="px-4 py-2 text-left">Vehicle No.</th>
        <th className="px-4 py-2 text-left">Special Requests</th>
        <th className="px-4 py-2 text-left">Amount</th>
        <th className="px-4 py-2 text-left">Status</th>
        <th className="px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {bookings.length === 0 ? (
        <tr>
          <td colSpan="14" className="text-center py-4 text-gray-500">No bookings found</td>
        </tr>
      ) : (
        bookings.map((booking, index) => (
          <tr key={booking._id || index} className="border-t hover:bg-gray-50 transition">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{booking.customerName}</td>
            <td className="px-4 py-2">{booking.customerPhone}</td>
            <td className="px-4 py-2">{booking.customerEmail}</td>
            <td className="px-4 py-2">{booking.fromLocation}</td>
            <td className="px-4 py-2">{booking.toLocation}</td>
            <td className="px-4 py-2">{booking.date}</td>
            <td className="px-4 py-2">{booking.time}</td>
            <td className="px-4 py-2">{booking.passengers}</td>
            <td className="px-4 py-2">{booking.vehicleNumber}</td>
            <td className="px-4 py-2">{booking.specialRequests}</td>
            <td className="px-4 py-2">${booking.amount}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleEditClick(booking)}
                className="text-blue-600 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(booking._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      {/* Add/Edit Booking Modal */}
{(showCreateForm || editBooking) && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editBooking ? 'Edit Booking Order' : 'Create New Booking Order'}
        </h2>
        <button
          onClick={() => {
            setShowCreateForm(false);
            setEditBooking(null);
            resetForm();
          }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <form onSubmit={editBooking ? handleUpdate : handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">               
          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone *</label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                  <input
                    type="number"
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Location *</label>
                  <input
                    type="text"
                    value={formData.fromLocation}
                    onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Pickup location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Location *</label>
                  <input
                    type="text"
                    value={formData.toLocation}
                    onChange={(e) => handleInputChange('toLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Drop-off location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Vehicle</label>
                  <select
                    value={formData.vehicleNumber}
                    onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle} value={vehicle}>{vehicle}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Any special requirements or notes"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => {
              setShowCreateForm(false);
              setEditBooking(null);
              resetForm();
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
                 <button
            type="submit"
            className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {editBooking ? 'Update Booking' : 'Create Booking'}
          </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingOrdersPage;
