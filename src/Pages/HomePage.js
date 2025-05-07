import React, { useState } from "react";
import Footer from "../components/footer";
import EnquiryForm from "../components/EnquiryForm";
import BusAnimation from "../components/bus/BusAnimation";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"; // For navigation
import TopHeader from "../components/TopHeader"; // Import this




export default function HomePage() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <div className="min-h-[100dvh] h-[100dvh] flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Image for Desktop */}
      <div className="hidden sm:block absolute inset-0 -z-10">
        <img
          src="assets/background.png"
          alt="ANT Bus Team Background"
          className="w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute inset-0 bg-white bg-opacity-70" />
      </div>

      {/* Background White for Mobile */}
      <div className="block sm:hidden absolute inset-0 -z-10 bg-white" />
      <TopHeader />     {/* ✅ Added here */}

      <Navbar setShowEnquiry={setShowEnquiry} />


      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 z-10 flex-1">
        
        {/* Mobile Group Image */}
        <div className="sm:hidden w-full max-h-[30vh] mb-2">
          <img
            src="assets/background.png"
            alt="ANT Bus Team"
            className="w-full h-full object-contain rounded-md shadow"
            draggable="false"
          />
        </div>

       {/* Updated Coming Soon Label */}
       <div className="bg-[#FF5722] px-3 sm:px-5 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-lg mt-4 mb-2 shadow-lg w-fit mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center leading-tight">
            Coming Soon!
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl font-extrabold text-black mb-2 leading-tight">
          Our new website is on its way.
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-black/90 font-medium max-w-md sm:max-w-3xl">
          India's Most Trusted Bus Rental Platform for Businesses. Hassle-Free, Long-Term Staff Transport Contracts, Outstation, Events, and More!
          <br />
          <span className="text-orange-600 font-semibold">
            Corporate, Group, Pilgrimage, and Leisure Bus Services
          </span>
        </p>
      </main>

      {/* Bus Animation */}
      <div className="w-full z-10">
        <BusAnimation />
      </div>


      {/* Footer */}
      <footer className="text-center py-1 text-[10px] sm:text-sm text-black z-10 bg-white font-medium">
        All Rights Reserved. Designed by A N T Soft Solution.
        {/* Contact Us Button */}
        <Link to="/contact-us">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded-full shadow ml-auto md:ml-4"
>
            Contact Us
          </button>
        </Link>
      </footer>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative w-[90vw] max-w-2xl">
            <span
              className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-400 hover:text-orange-500 z-10"
              onClick={() => setShowEnquiry(false)}
            >
              &times;
            </span>
            <EnquiryForm setShowEnquiry={setShowEnquiry} />
          </div>
        </div>
        
      )}
      
      
    </div>
  );
}
