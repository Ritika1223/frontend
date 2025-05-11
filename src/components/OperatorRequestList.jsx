import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URLS from '../ApIURLs';

export default function OperatorRequestList() {
  const navigate = useNavigate();
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const token = localStorage.getItem('userToken');
        console.log('Token from localStorage:', token);

        if (!token) {
          throw new Error('No auth token found');
        }
        
        console.log('Making API call with token...');
        const response = await fetch(API_URLS.OPERATORS_REQUESTS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized - redirecting to login');
            navigate('/login');
            throw new Error('Please login again');
          }
          throw new Error('Failed to fetch operators');
        }
        
        const data = await response.json();
        console.log('Operators data received:', data);
        setOperators(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, [navigate]);

  const filteredOperators = operators.filter(operator => 
    operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    operator.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div className="text-[#3B4B96] text-lg font-medium">Loading operators...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-red-800 text-lg font-semibold text-center mb-2">Error Loading Operators</h3>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Search and Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search operators by name, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300"
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-r from-[#3B4B96]/5 to-[#3B4B96]/10 px-6 py-3 rounded-xl">
                <p className="text-sm text-[#3B4B96]/70 mb-1">Total Operators</p>
                <p className="text-2xl font-bold text-[#3B4B96]">{operators.length}</p>
              </div>
              <div className="bg-gradient-to-r from-[#FF5722]/5 to-[#FF5722]/10 px-6 py-3 rounded-xl">
                <p className="text-sm text-[#FF5722]/70 mb-1">Total Buses</p>
                <p className="text-2xl font-bold text-[#FF5722]">
                  {operators.reduce((total, op) => total + op.buses.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperators.map((operator) => (
            <div 
              key={operator._id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
            >
              <div className="bg-gradient-to-r from-[#3B4B96]/5 to-[#FF5722]/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{operator.name}</h2>
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    {new Date(operator.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="font-medium">{operator.companyName}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {operator.city}, {operator.state}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {operator.emails[0]?.email}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {operator.phoneNumbers[0]?.primary}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </div>
                    <span>{operator.buses.length} {operator.buses.length === 1 ? 'Bus' : 'Buses'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/operator/${operator._id}`)}
                    className="w-full bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white py-3 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    View Details
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOperators.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-[#3B4B96]/10 to-[#FF5722]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No operators found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or add a new operator.</p>
            <button
              onClick={() => navigate('/operator-registration')}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#3B4B96] to-[#FF5722] hover:from-[#2C3A7D] hover:to-[#E64A19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B4B96] transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Operator
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

