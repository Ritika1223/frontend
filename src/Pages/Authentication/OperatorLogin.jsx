import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URLS from '../../ApIURLs';

const OperatorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryPhoneNumber: '',
    password: '',
    otp: ''
  });

  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// --- Send OTP ---
const handleSendOtp = async () => {
  setError('');
  setLoading(true);
  try {
    const response = await fetch(API_URLS.OPERATOR_SEND_OTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formData.primaryPhoneNumber })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

    setOtpSent(true);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// --- Verify OTP ---
const handleVerifyOtp = async () => {
  setError('');
  setLoading(true);
  try {
    const response = await fetch(API_URLS.OPERATOR_VERIFY_OTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: formData.primaryPhoneNumber,
        otp: formData.otp
      })
    });

    const data = await response.json();
    console.log('OTP verify response:', data);

    if (!response.ok) throw new Error(data.message || 'OTP verification failed');

    if (data.role === 'OPERATOR') {
      localStorage.setItem('O_token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.operator));
      navigate('/operator/dashboard');
    } else {
      setError('Access denied: not an operator.');
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// --- Password Login ---
const handlePasswordLogin = async () => {
  setError('');
  setLoading(true);
  try {
    const response = await fetch(API_URLS.OPERATOR_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: formData.primaryPhoneNumber,
        password: formData.password
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    if (data.role === 'OPERATOR') {
      localStorage.setItem('O_token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.operator));
      navigate('/operator/dashboard');
    } else {
      setError('Access denied: not an operator.');
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
// --- Unified Submit ---
const handleSubmit = (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (useOtp) {
    otpSent ? handleVerifyOtp() : handleSendOtp();
  } else {
    handlePasswordLogin();
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3B4B96]/5 to-[#FF5722]/5 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/logo2-removebg-preview.png" alt="Logo" className="mx-auto h-20" />
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#3B4B96] to-[#FF5722]">
            Operator Login
          </h2>
          <p className="mt-2 text-gray-600">Sign in to your operator dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-lg">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="primaryPhoneNumber"
              value={formData.primaryPhoneNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B4B96]"
              placeholder="Enter phone number"
            />
          </div>

          {useOtp ? (
            otpSent ? (
              <div>
                <label className="block text-sm font-medium">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B4B96]"
                  placeholder="Enter the OTP"
                />
              </div>
            ) : null
          ) : (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B4B96]"
                placeholder="Enter your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? useOtp
                ? otpSent
                  ? 'Verifying OTP...'
                  : 'Sending OTP...'
                : 'Logging in...'
              : useOtp
              ? otpSent
                ? 'Verify OTP'
                : 'Send OTP'
              : 'Sign In'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setUseOtp(!useOtp);
                setOtpSent(false);
                setFormData({ ...formData, otp: '', password: '' });
              }}
              className="text-sm text-[#3B4B96] hover:text-[#FF5722]"
            >
              {useOtp ? 'Login with password' : 'Login with OTP'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/operator-registration')}
              className="font-medium text-[#3B4B96] hover:text-[#FF5722]"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorLogin;
