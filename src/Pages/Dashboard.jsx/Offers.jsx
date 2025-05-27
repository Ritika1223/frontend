import React from 'react';
import { Gift, Percent, Clock, Star, Tag, ArrowRight, Sparkles, Calendar, MapPin } from 'lucide-react';

const Offers = () => {
  const offers = [
    {
      id: '1',
      title: 'Weekend Getaway Special',
      description: 'Book your weekend trips and save big! Perfect for short vacations.',
      discount: '25%',
      code: 'WEEKEND25',
      validUntil: '2024-02-15',
      type: 'percentage',
      minAmount: '$50',
      category: 'Weekend',
      gradient: 'from-purple-500 to-pink-600',
      routes: ['New York → Boston', 'Miami → Orlando'],
      icon: Calendar,
    },
    {
      id: '2',
      title: 'First Ride Bonus',
      description: 'New to AntBus? Get $15 off your first booking with us!',
      discount: '$15',
      code: 'NEWRIDER15',
      validUntil: '2024-03-01',
      type: 'amount',
      minAmount: '$30',
      category: 'New User',
      gradient: 'from-green-500 to-emerald-600',
      routes: ['All Routes Available'],
      icon: Star,
    },
    {
      id: '3',
      title: 'Early Bird Special',
      description: 'Book 7 days in advance and enjoy exclusive discounts.',
      discount: '20%',
      code: 'EARLY20',
      validUntil: '2024-02-28',
      type: 'percentage',
      minAmount: '$40',
      category: 'Early Bird',
      gradient: 'from-blue-500 to-indigo-600',
      routes: ['Boston → Washington', 'Chicago → Detroit'],
      icon: Clock,
    },
    {
      id: '4',
      title: 'Group Travel Discount',
      description: 'Traveling with friends? Get amazing discounts for group bookings.',
      discount: '30%',
      code: 'GROUP30',
      validUntil: '2024-04-01',
      type: 'percentage',
      minAmount: '$100',
      category: 'Group',
      gradient: 'from-orange-500 to-red-600',
      routes: ['All Major Routes'],
      icon: Gift,
    },
    {
      id: '5',
      title: 'Student Special',
      description: 'Students get exclusive discounts on all routes. Valid student ID required.',
      discount: '$12',
      code: 'STUDENT12',
      validUntil: '2024-12-31',
      type: 'amount',
      minAmount: '$25',
      category: 'Student',
      gradient: 'from-teal-500 to-cyan-600',
      routes: ['All University Routes'],
      icon: Sparkles,
    },
    {
      id: '6',
      title: 'Holiday Express',
      description: 'Special holiday pricing for your festive travels.',
      discount: '35%',
      code: 'HOLIDAY35',
      validUntil: '2024-02-20',
      type: 'percentage',
      minAmount: '$60',
      category: 'Holiday',
      gradient: 'from-rose-500 to-pink-600',
      routes: ['Holiday Special Routes'],
      icon: Gift,
    },
  ];

 

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent">
            Special Offers
          </h1>
          <p className="text-gray-600 mt-1">Discover amazing deals and save on your next journey</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">All Categories</span>
          </button>
          <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Redeem Code
          </button>
        </div>
      </div>

     
      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <div key={offer.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-br ${offer.gradient} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {offer.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold">{offer.discount}</span>
                    <span className="text-sm opacity-90">OFF</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{offer.description}</p>

                {/* Offer Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Promo Code:</span>
                    <span className="font-mono font-bold text-[#3B4B96] bg-blue-50 px-2 py-1 rounded">
                      {offer.code}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Min. Amount:</span>
                    <span className="font-semibold text-gray-800">{offer.minAmount}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">Valid until:</span>
                    <span className="font-semibold text-gray-800">{offer.validUntil}</span>
                  </div>
                </div>

                {/* Routes */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Available Routes:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {offer.routes.map((route, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full bg-gradient-to-r ${offer.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl transform group-hover:-translate-y-0.5`}>
                  <span>Use This Offer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

     

      {/* Empty State (if no offers) */}
      {offers.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl p-8 max-w-md mx-auto">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No offers available</h3>
            <p className="text-gray-500 mb-6">Check back soon for amazing deals and discounts!</p>
            <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Browse Routes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
