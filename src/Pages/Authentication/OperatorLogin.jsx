import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URLS from '../../ApIURLs';

const OperatorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ primaryPhoneNumber: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.role === 'OPERATOR') {
      // ✅ Store full operator data
        localStorage.setItem('O_token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.operator));

        navigate('/operator/dashboard'); // ✅ Redirect to personalized dashboard
      } else {
        setError('Access denied: not an operator.');
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3B4B96]/5 to-[#FF5722]/5 relative">
      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center animate-fade-down">
          <img src="/logo2-removebg-preview.png" alt="Logo" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B4B96] to-[#FF5722]">
            Operator Login
          </h2>
          <p className="mt-3 text-gray-600 text-lg">Sign in to your operator dashboard</p>
        </div>

        <div className="mt-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 space-y-6 animate-fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-sm text-red-700 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-3 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B4B96] bg-white/50"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-3 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B4B96] bg-white/50"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-[#3B4B96] to-[#FF5722] hover:from-[#2C3A7D] hover:to-[#E64A19] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600 animate-fade-up-delay">
          <p>Don't have an account?{' '}
            <button onClick={() => navigate('/operator-registration')} className="font-medium text-[#3B4B96] hover:text-[#FF5722]">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorLogin;
