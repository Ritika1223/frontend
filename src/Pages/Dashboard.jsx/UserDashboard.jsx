import React from 'react';
import { Calendar, Gift, Map, ArrowRight, Sparkles } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      

      {/* Main Dashboard Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-4 border-white shadow-lg">
              <Map className="w-full h-48 text-blue-400 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent mb-3">
                Explore Your Destination with AntBus!
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover amazing destinations and create unforgettable memories with our premium travel services.
              </p>
            </div>

            <button className="inline-flex items-center space-x-2 text-[#3B4B96] font-semibold hover:text-[#FF5722] transition-colors duration-300 group">
              <span>Explore the map</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Ready for your next adventure?</p>
                  <p className="text-sm text-gray-600">Book your journey with exclusive offers</p>
                </div>
                <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group transform hover:-translate-y-1">
                  <span className="font-semibold">Book your trip</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default UserDashboard;
