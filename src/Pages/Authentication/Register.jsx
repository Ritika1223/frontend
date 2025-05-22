import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    // Simulate OTP sending
    setOtpSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Submit the form to backend here
    console.log('Registering user:', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4B96]/5 via-white to-[#FF5722]/5 flex items-center justify-center py-12 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B4B96' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center animate-fade-down">
          <img src="/logo2-removebg-preview.png" alt="ANT" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B4B96] to-[#FF5722]">
            Create Account
          </h2>
          <p className="mt-2 text-gray-600">Register to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 space-y-6 animate-fade-up">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />

          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />

          <div className="flex gap-2">
            <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} className="flex-1 px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />
            <button type="button" onClick={sendOtp} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white hover:from-[#2C3A7D] hover:to-[#E64A19]">
              Send OTP
            </button>
          </div>

          {otpSent && (
            <input type="text" name="otp" placeholder="Enter OTP" required onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />
          )}

          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />

          <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[#3B4B96]" />

          <button type="submit" className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-[#3B4B96] to-[#FF5722] hover:from-[#2C3A7D] hover:to-[#E64A19]">
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 animate-fade-up-delay">
          <p>Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-[#3B4B96] hover:text-[#FF5722] font-medium">
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Animations (reuse from Login page) */}
      <style>{`
        @keyframes fade-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up-delay {
          0%, 50% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-down {
          animation: fade-down 0.8s ease-out forwards;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
        .animate-fade-up-delay {
          animation: fade-up-delay 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Register;
