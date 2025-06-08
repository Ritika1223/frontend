import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, User, Lock } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const operatorId = storedUser?.id;

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [editData, setEditData] = useState({ ...profileData });

  useEffect(() => {
    if (operatorId) {
      axios.get(`http://localhost:8080/api/operator/${operatorId}/profile`)
        .then(response => {
          const { name, email, primaryPhoneNumber } = response.data;

          const updatedData = {
            name: name || '',
            email: email || '',
            phone: primaryPhoneNumber || '',
            password: '********'
          };

          setProfileData(updatedData);
          setEditData(updatedData);
        })
        .catch(error => {
          console.error('Failed to fetch operator profile:', error);
        });
    }
  }, [operatorId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8080/api/operator/update', {
        id: operatorId,
        name: editData.name,
        email: editData.email,
        primaryPhoneNumber: editData.phone,
        // password: editData.password !== '********' ? editData.password : undefined
      });

      setProfileData({ ...editData, password: '********' });
      setIsEditing(false);

      localStorage.setItem('userData', JSON.stringify({ ...storedUser, ...editData }));
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2.5 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profileData.name}
                </h3>
                <p className="text-gray-600">Operator</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border rounded-lg">{profileData.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border rounded-lg">{profileData.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border rounded-lg">{profileData.phone}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                {isEditing ? (
                  <input
                    type="password"
                    value={editData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter new password"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border rounded-lg flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-gray-500" />
                    {profileData.password}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
