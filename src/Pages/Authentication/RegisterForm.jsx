import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URLS from '../../ApIURLs';
import axios from 'axios';


const Register = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const generateCaptchaText = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const drawCaptchaOnCanvas = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 120;
    canvas.height = 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#333';
    ctx.setTransform(1, 0.1, 0.1, 1, 0, 0);
    ctx.fillText(text, 10, 28);
  };

  useEffect(() => {
    const newCaptcha = generateCaptchaText();
    setCaptcha(newCaptcha);
    drawCaptchaOnCanvas(newCaptcha);
  }, []);

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptchaText();
    setCaptcha(newCaptcha);
    drawCaptchaOnCanvas(newCaptcha);
    setCaptchaInput('');
  };

const handleContinue = async () => {
  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    alert('Enter a valid 10-digit phone number');
    return;
  }

  // Validate captcha
  if (captchaInput !== captcha) {
    alert('Incorrect captcha');
    return;
  }

  try {
    const response = await axios.post(API_URLS.USER_REGISTER, { phone });

    if (response.status === 200 && response.data.message) {
      console.log('Success:', response.data.message);
      setStep(2); // Move to OTP screen
    } else {
      alert('Unexpected response from server.');
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert('Error: ' + error.response.data.message);
      console.error('Server error:', error.response.data.message);
    } else {
      alert('Network or server error. Please try again later.');
      console.error('Request failed:', error.message);
    }
  }
};


const handleVerify = async () => {
 

  try {
    const response = await axios.post(API_URLS.USER_REGISTER_OTP,{
      phone,
      otp
    });

    console.log('Success:', response.data.message);
console.log('Token:', response.data.token);
localStorage.setItem('userToken', response.data.token); // Save token to local storage
     navigate('/user/dashboard');
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data.message);
    } else {
      console.error('Request failed:', error.message);
    }
  }

};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4B96]/5 via-white to-[#FF5722]/5 flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%233B4B96' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-md w-full bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 space-y-6">
        <div className="text-center animate-fade-down">
          <img src="/logo2-removebg-preview.png" alt="ANT" className="mx-auto h-20" />
          <h2 className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B4B96] to-[#FF5722]">
            {step === 1 ? 'Register' : 'Verify OTP'}
          </h2>
        </div>

        {step === 1 ? (
          <div className="space-y-4 animate-fade-up">
            <div className="flex gap-2">
              <input
                type="text"
                value="+91"
                readOnly
                className="w-20 py-2 px-3 border border-gray-300 rounded-lg bg-gray-100 text-center"
              />
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ''))}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Captcha</label>
              <div className="flex items-center gap-3">
                <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
                <button type="button" onClick={refreshCaptcha} className="text-sm text-[#3B4B96] hover:text-[#FF5722] underline">
                  Refresh
                </button>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg"
                placeholder="Enter captcha above"
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-2 px-4 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white rounded-lg hover:from-[#2C3A7D] hover:to-[#E64A19] transition"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-up">
            <div className="text-sm text-gray-600">
              OTP sent to <span className="font-medium text-black">+91-{phone}</span>
            </div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleVerify}
              className="w-full py-2 px-4 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white rounded-lg hover:from-[#2C3A7D] hover:to-[#E64A19] transition"
            >
              Verify & Continue
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 animate-fade-up-delay">
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate('/user-login')} className="font-medium text-[#3B4B96] hover:text-[#FF5722]">
              Login
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .animate-fade-down {
          animation: fade-down 0.8s ease-out forwards;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
        .animate-fade-up-delay {
          animation: fade-up-delay 1.2s ease-out forwards;
        }
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
      `}</style>
    </div>
  );
};

export default Register;
