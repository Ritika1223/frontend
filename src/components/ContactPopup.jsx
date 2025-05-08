import React from 'react';

function ContactPopup({ onClose }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-none">
      <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-5xl w-full flex flex-col md:flex-row gap-6 pointer-events-auto">
        {/* Close Button */}
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Left: Contact Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
          <div>
            <p className="text-sm text-gray-600 font-semibold">📞 Contact Numbers</p>
            <p>Toll Free: 18001027408</p>
            <p>WhatsApp: +91 98119 92203</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">📧 Email Address</p>
            <p><a href="mailto:booking@antbus.in" className="text-blue-600">booking@antbus.in</a></p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">⏰ Working Hours</p>
            <p>Open 24/7</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">📍 Our Location</p>
            <p>B-128, Transport Nagar, Sector 69, Noida, UP – 201301, India</p>
          </div>
        </div>

        {/* Right: Map */}
        <div className="flex-1">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14015.514163685793!2d77.38872731589588!3d28.610389482419698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4363000001f%3A0x173b4bedbe5d95a0!2sA%20N%20T%20TRAVELS%20PVT.%20LTD.%2C%20B-128%2C%20Transport%20Nagar%2C%20Sector%2069%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1715167200000!5m2!1sen!2sin"
    className="w-full h-64 rounded-lg border"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="ANT Travels Map"
  ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactPopup;
