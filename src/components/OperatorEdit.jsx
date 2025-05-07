import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OperatorDropdown from './OperatorDropdown';

const OperatorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [openBusTypeDropdown, setOpenBusTypeDropdown] = useState([]);
  const [openBusModelDropdown, setOpenBusModelDropdown] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/operators/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch operator details');
        }
        const data = await response.json();
        setOperator(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperatorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (index, type, value) => {
    const newPhoneNumbers = [...operator.phoneNumbers];
    newPhoneNumbers[index] = {
      ...newPhoneNumbers[index],
      [type]: value
    };
    setOperator(prev => ({
      ...prev,
      phoneNumbers: newPhoneNumbers
    }));
  };

  const handleEmailChange = (index, type, value) => {
    const newEmails = [...operator.emails];
    newEmails[index] = {
      ...newEmails[index],
      [type]: value
    };
    setOperator(prev => ({
      ...prev,
      emails: newEmails
    }));
  };

  const handleBusChange = (index, field, value) => {
    const newBuses = [...operator.buses];
    newBuses[index] = {
      ...newBuses[index],
      [field]: value
    };
    setOperator(prev => ({
      ...prev,
      buses: newBuses
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/operators/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operator),
      });

      if (!response.ok) {
        throw new Error('Failed to update operator');
      }

      navigate(`/operator/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-[#3B4B96]/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-[#3B4B96]/40 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div className="text-[#3B4B96] text-lg font-medium">Loading operator details...</div>
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
          <h3 className="text-red-800 text-lg font-semibold text-center mb-2">Error Loading Operator</h3>
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={() => navigate('/operators')}
            className="mt-6 w-full bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Operators List
          </button>
        </div>
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-600">Operator not found</h2>
          <button
            onClick={() => navigate('/operators')}
            className="mt-4 bg-[#3B4B96] text-white px-6 py-2 rounded-lg hover:bg-[#2C3A7D] transition-colors"
          >
            Back to Operators List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/operator/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#3B4B96] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Details
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Edit Operator Details</h1>
            <p className="text-white/80">{operator.name}</p>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operator Name</label>
                  <input
                    type="text"
                    name="name"
                    value={operator.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={operator.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Phone Numbers */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Phone Numbers</h3>
                  <div className="space-y-4">
                    {operator.phoneNumbers.map((phone, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Primary</label>
                          <input
                            type="tel"
                            value={phone.primary}
                            onChange={(e) => handlePhoneChange(index, 'primary', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Alternate</label>
                          <input
                            type="tel"
                            value={phone.alternate || ''}
                            onChange={(e) => handlePhoneChange(index, 'alternate', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emails */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Email Addresses</h3>
                  <div className="space-y-4">
                    {operator.emails.map((email, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Primary</label>
                          <input
                            type="email"
                            value={email.email}
                            onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Alternate</label>
                          <input
                            type="email"
                            value={email.alternate || ''}
                            onChange={(e) => handleEmailChange(index, 'alternate', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <OperatorDropdown
                    options={Object.keys(statesData)}
                    value={operator.state}
                    onChange={(value) => setOperator(prev => ({ ...prev, state: value, city: '' }))}
                    placeholder="Select State"
                    isOpen={showStateDropdown}
                    onOpen={() => setShowStateDropdown(true)}
                    onClose={() => setShowStateDropdown(false)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <OperatorDropdown
                    options={operator.state ? statesData[operator.state] : []}
                    value={operator.city}
                    onChange={(value) => setOperator(prev => ({ ...prev, city: value }))}
                    placeholder="Select City"
                    isOpen={showCityDropdown}
                    onOpen={() => setShowCityDropdown(true)}
                    onClose={() => setShowCityDropdown(false)}
                    disabled={!operator.state}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <textarea
                  name="address"
                  value={operator.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                  required
                ></textarea>
              </div>
            </div>

            {/* Bus Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                Bus Information
              </h2>

              <div className="space-y-6">
                {operator.buses.map((bus, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Bus {index + 1}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                        <OperatorDropdown
                          options={busTypeOptions}
                          value={bus.busType}
                          onChange={(value) => handleBusChange(index, 'busType', value)}
                          placeholder="Select Bus Type"
                          isOpen={!!openBusTypeDropdown[index]}
                          onOpen={() => setOpenBusTypeDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = true;
                            return arr;
                          })}
                          onClose={() => setOpenBusTypeDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = false;
                            return arr;
                          })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bus Model</label>
                        <OperatorDropdown
                          options={bus.busType ? busModelOptions[bus.busType] : []}
                          value={bus.busModel}
                          onChange={(value) => handleBusChange(index, 'busModel', value)}
                          placeholder="Select Bus Model"
                          isOpen={!!openBusModelDropdown[index]}
                          onOpen={() => setOpenBusModelDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = true;
                            return arr;
                          })}
                          onClose={() => setOpenBusModelDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = false;
                            return arr;
                          })}
                          disabled={!bus.busType}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="checkbox"
                  id="confirmDetails"
                  checked={isConfirmed}
                  onChange={e => setIsConfirmed(e.target.checked)}
                  className="h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96] rounded"
                />
                <label htmlFor="confirmDetails" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  I confirm that the above details are correct
                </label>
              </div>
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg flex items-center gap-2 justify-center font-semibold transition-all duration-300 ${
                  isConfirmed
                    ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white hover:from-[#2C3A7D] hover:to-[#E64A19]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isConfirmed}
              >
                Save Changes
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OperatorEdit; 