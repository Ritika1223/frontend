import React from 'react';
import { Mail, Phone, MapPin, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function ContactUsPage() {
    const navigate = useNavigate();
  
    const handleClose = () => {
      navigate('/'); // Redirect to Home
    };  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Contact Information Panel */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="text-red-500" size={20} /> Contact Numbers
                </h3>
                <p className="text-sm text-gray-600 ml-6">Toll Free: 18001027408</p>
                <p className="text-sm text-gray-600 ml-6">WhatsApp: +91 98119 92203</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="text-red-500" size={20} /> Email Address
                </h3>
                <p className="text-sm text-gray-600 ml-6">
                  <a href="mailto:booking@antbus.in" className="text-blue-600 hover:underline">
                    booking@antbus.in
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="text-red-500" size={20} /> Working Hours
                </h3>
                <p className="text-sm text-gray-600 ml-6">Open 24/7</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="text-red-500" size={20} /> Our Location
              </h3>
              <p className="text-sm text-gray-600 ml-6">
                B-128, Transport Nagar, Sector 69,<br />
                Noida, Uttar Pradesh - 201301, India
              </p>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-center mb-4">Find Us on Map</h2>
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1752.2627601300386!2d77.3911394582691!3d28.61021072034757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4363000001f%3A0x173b4bedbe5d95a0!2sA%20N%20T%20TRAVELS%20PVT.%20LTD.%2C%20B-128%2C%20Transport%20Nagar%2C%20Sector%2069%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1714652090564!5m2!1sen!2sin"
  width="100%"
  height="400"
  className="rounded-lg shadow-md w-full"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Map Location"
/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
