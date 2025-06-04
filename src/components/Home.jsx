import React from 'react';
import ContactPopup from "../Pages/ContactPopup"; // if it's in src/Pages
import EnquiryForm from '../Pages/EnquiryForm';

const Home = ({ showContact, showForm, handleCloseContact, setShowForm }) => {
  return (
    <>
      <main className="relative h-[calc(90vh-88px)]">
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
          
            <h2 className="text-xl sm:text-xl md:text-3xl font-bold text-center mb-2 md:mb-4 px-2"> 
              India's Most Trusted Bus Rental Platform for Businesses.
            </h2>
            <h3 className="text-sm sm:text-lg md:text-xl text-center text-gray-900">
              Hassle-Free, Long-Term Staff Transport Contracts,
            </h3>
            <h3 className="text-sm sm:text-lg md:text-xl text-center text-gray-900 mb-4 sm:mb-2 md:mb-3">
              Outstation, Events, and More!
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-center text-[#FF5722] font-medium px-3 rounded-full inline-block mx-auto">
              Corporate • Group • Pilgrimage • Leisure Bus Services
            </p>
          </div>
      </main>

      {showContact && <ContactPopup onClose={handleCloseContact} />}
      {showForm && <EnquiryForm isOpen={showForm} onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Home;
