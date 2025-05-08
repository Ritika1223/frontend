import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from './EnquiryForm';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  
  

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#3B4B96]/5 to-[#FF5722]/5 py-2 px-4 text-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
         {/* Location */}
<a
  href="https://www.google.com/maps/dir//A+N+T+TRAVELS+PVT.+LTD.,+B-128,+Transport+Nagar,+Sector+69,+Noida,+Uttar+Pradesh+201301/@28.6103895,77.3906763,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x390ce4363000001f:0x173b4bedbe5d95a0!2m2!1d77.3932512!2d28.6103895!3e0?entry=ttu"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center space-x-2 text-gray-600 hover:text-[#3B4B96] transition-colors group"
>
  <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
  <span>B-128 Transport Nagar, Sector-69, Noida, 201301</span>
</a>

          {/* Toll Free */}
<a
  href="tel:18001027408"
  className="hidden md:flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors group cursor-pointer"
>
  <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  </div>
  <span>Toll Free 24x7 - 1800 1027 408</span>
</a>


          {/* Right Menu */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="hidden md:flex items-center text-gray-600 hover:text-[#FF5722] transition-colors cursor-pointer group">
              <div className="p-1 rounded-full bg-[#FF5722]/10 group-hover:bg-[#FF5722]/20 transition-colors mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="relative">
                Offer
                <span className="absolute -top-2 -right-4 bg-[#FF5722] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">10</span>
              </span>
            </div>
            <div className="hidden md:flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors cursor-pointer group">
              <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              Live Tracking
            </div>
            <div className="hidden md:flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors cursor-pointer group">
              <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              FAQ
            </div>
            <div className="hidden md:flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors cursor-pointer group">
              <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Support
            </div>
            <div className="hidden md:flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors cursor-pointer group">
              <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              Wallet
            </div>
            
              {/* Language Selector */}
              <div className="relative hidden md:block">
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center text-gray-600 hover:text-[#3B4B96] transition-colors group"
              >
                <div className="p-1 rounded-full bg-[#3B4B96]/10 group-hover:bg-[#3B4B96]/20 transition-colors mr-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <span>English</span>
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100 animate-dropdown-fade">
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#3B4B96]/5 hover:text-[#3B4B96] transition-colors text-left">English</button>
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#3B4B96]/5 hover:text-[#3B4B96] transition-colors text-left">Hindi</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main Navbar */}
      <nav className="bg-white ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="transform hover:scale-105 transition-transform duration-200">
                <img className="h-12 w-auto" src="/logo2-removebg-preview.png" alt="ANT" />
              </Link>
            </div>

          {/* Desktop Navigation */}
<div className="hidden md:flex items-center justify-center flex-1">
  <div className="flex space-x-1">
    
    <div
      onClick={() => setShowEnquiryForm(true)}
      className="group relative px-3 py-2 cursor-pointer"
    >
      <div className="flex items-center space-x-2 text-gray-600 group-hover:text-[#3B4B96] transition-colors">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 0l8 6 8-6M4 14h16M4 10h16" />
        </svg>
        <span className="font-medium">Bus Hire</span>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#3B4B96] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>

    <div
      onClick={() => setShowEnquiryForm(true)}
      className="group relative px-3 py-2 cursor-pointer"
    >
      <div className="flex items-center space-x-2 text-gray-600 group-hover:text-[#3B4B96] transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <span className="font-medium">Bus Ticket</span>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#3B4B96] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>

    <div
      onClick={() => setShowEnquiryForm(true)}
      className="group relative px-3 py-2 cursor-pointer"
    >
      <div className="flex items-center space-x-2 text-gray-600 group-hover:text-[#3B4B96] transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
        <span className="font-medium">Bus Tour</span>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#3B4B96] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>

  </div>
</div>


            {/* Right Buttons */}
           {/* Send Enquiry Button - visible on all screens */}
<div className="flex items-center space-x-4">
  <button
    onClick={() => setShowEnquiryForm(true)}
    className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-xl hover:bg-[#3B4B96] hover:text-white transition-all duration-300 flex items-center group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
  >
    <span>Send Enquiry</span>
    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </button>
</div>

{/* Operator Registration - hidden on mobile, shown on md+ */}
<div className="hidden md:flex items-center ml-3">
  <Link
    to="/operator-registration"
    className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
  >
    <span>Operator Registration</span>
    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  

              </Link>
             
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <a
  href="tel:18001027408"
  className="flex md:hidden items-center px-4 py-2 text-gray-700 hover:text-[#3B4B96] hover:bg-[#3B4B96]/10 transition-colors"
>
  <svg className="w-5 h-5 mr-2 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
  <span>Call Us</span>
</a>
       {/* Mobile menu */}
{isOpen && (
  <div className="md:hidden bg-white border-t border-gray-100">
    <div className="px-2 pt-2 pb-3 space-y-1">

      <div
        onClick={() => setShowEnquiryForm(true)}
        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 0l8 6 8-6M4 14h16M4 10h16" />
        </svg>
        <span>Bus Hire</span>
      </div>

      <div
        onClick={() => setShowEnquiryForm(true)}
        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <span>Bus Ticket</span>
      </div>

      <div
        onClick={() => setShowEnquiryForm(true)}
        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
        <span>Bus Tour</span>
      </div>

        <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#FF5722] hover:bg-[#FF5722]/5 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="relative">
                    Offer
                    <span className="absolute -top-2 -right-4 bg-[#FF5722] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">10</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Live Tracking</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FAQ</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Support</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-[#3B4B96] hover:bg-[#3B4B96]/5 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Wallet</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col space-y-3">
             
                <Link
                  to="/operator-registration"
                  className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-3 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 text-center flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Operator Registration</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              
              </div>
            </div>
          </div>
        )}
      </nav>
      <EnquiryForm isOpen={showEnquiryForm} onClose={() => setShowEnquiryForm(false)} />

    
    </div>
  );
};

export default Navbar; 