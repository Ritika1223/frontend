import React from 'react';
import RegisterForm from './RegisterForm';
import ImageCarousel from '../../components/ImageCarousel';

const Register = () => {
  return (
    <div className="flex min-h-screen bg-[#f6f6fa]">
      {/* Left - Carousel (wider now) */}
      <div className="hidden lg:flex w-3/5 items-center justify-center bg-white">
          <ImageCarousel />
        </div>

      {/* Right - Register Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md space-y-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
