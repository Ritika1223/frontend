import React from 'react';
import ContactPopup from './ContactPopup';
import EnquiryForm from './EnquiryForm';

const Home = ({ showContact, showForm, handleCloseContact, setShowForm }) => {
  return (
    <>
      <main className="relative h-[calc(100vh-88px)]">
        {/* Background Image with overlay for larger screens */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <img
            src="/intro-bg.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/70 via-[#fff]/10 to-[#3B4B96]/80 mix-blend-multiply"></div>
        </div>

        {/* Background White for Mobile */}
        <div className="block sm:hidden absolute inset-0 -z-10 bg-white" />

        {/* Mobile Group Image */}
        <div className="sm:hidden w-full max-h-[30vh] mb-2">
          <img
            src="/intro-bg.png"
            alt="ANT Bus Team"
            className="w-full h-full object-contain rounded-md shadow"
            draggable="false"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-black px-4" style={{ paddingTop: '5vh' }}>
          <div className="bg-[#FF5722] px-3 sm:px-5 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-lg mb-2 md:mb-2 shadow-lg w-fit">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center leading-tight">Coming Soon!</h2>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4 px-2">  
            Our new website is on its way.
          </h1>
          <div className="max-w-[90%] sm:max-w-2xl md:max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-3">
            <h2 className="text-base sm:text-lg md:text-xl text-center font-semibold">
              India's Most Trusted Bus Rental Platform for Businesses.
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg text-center text-gray-700">
              Hassle-Free, Long-Term Staff Transport Contracts,
            </h3>
            <h3 className="text-sm sm:text-base md:text-lg text-center text-gray-700 mb-4 sm:mb-2 md:mb-3">
              Outstation, Events, and More!
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-center text-[#FF5722] font-medium px-3 rounded-full inline-block mx-auto">
              Corporate • Group • Pilgrimage • Leisure Bus Services
            </p>
          </div>
        </div>
      </main>

      {showContact && <ContactPopup onClose={handleCloseContact} />}
      {showForm && <EnquiryForm isOpen={showForm} onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Home;
