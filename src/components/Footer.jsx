import React from 'react';
import { Link } from 'react-router-dom';
import BusAnimation from '../bus/BusAnimation';

const Footer = () => {
  return (
    <footer className="w-full bg-white/90 backdrop-blur-sm text-center shadow-top z-[50] sm:relative sm:bottom-auto sm:left-auto sm:w-auto fixed bottom-0 left-0 py-2">
      <BusAnimation />
      <div className="flex items-center justify-center gap-2 text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">All Rights Reserved.</span>
          <span className="text-sm md:text-base hidden sm:inline">•</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">Designed by</span>
          <a
            href="#"
            className="text-[#3B4B96] font-medium hover:text-[#2C3A7D] transition-colors text-sm md:text-base"
          >
            A N T Soft Solution.
          </a>
        </div>
        <Link to="/contact-us">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded-full shadow ml-auto md:ml-4">
            Contact Us
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
