import React from 'react';
import LoginForm from './LoginForm';
import ImageCarousel from '../../components/ImageCarousel'

const Login = () => {
  return (
    <div className="flex min-h-screen bg-[#f6f6fa]">
      {/* Left - Carousel (wider) */}
      <div className="hidden lg:flex w-3/5 items-center justify-center bg-white">
          <ImageCarousel />
        </div>

      {/* Right - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md space-y-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
