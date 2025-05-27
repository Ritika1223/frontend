import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, CreditCard, CheckCircle, AlertCircle, Download, Filter } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings'); // Update URL if needed
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'from-green-500 to-emerald-500';
      case 'pending': return 'from-yellow-500 to-orange-500';
      case 'completed': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading bookings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header and stats code remains same */}
{/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-1">Track and manage your travel bookings</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">Filter</span>
          </button>
          <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            New Booking
          </button>
        </div>
      </div>
      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl p-8 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
              <p className="text-gray-500 mb-6">Start your journey by booking your first trip</p>
              <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Book Now
              </button>
            </div>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id || booking.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                {/* Left Section */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(booking.status)} text-white rounded-full text-sm font-medium flex items-center space-x-1`}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </div>
                    <span className="text-sm text-gray-500">Booking #{booking._id || booking.id}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[#3B4B96]" />
                    <h3 className="text-xl font-bold text-gray-800">{booking.route}</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.time}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Bus: </span>
                      <span className="font-medium text-gray-800">{booking.busNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Seat: </span>
                      <span className="font-medium text-gray-800">{booking.seat}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-2xl font-bold text-[#3B4B96]">{booking.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
