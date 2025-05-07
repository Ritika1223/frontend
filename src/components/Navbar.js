import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import the icons
import { Link } from "react-router-dom"; // For navigation
import { Bus, Ticket, Globe } from "lucide-react"; // Import different icons

function Navbar({ setShowEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEnquiryOpen = () => {
    setShowEnquiry(true);
    setMobileMenuOpen(false); // Close menu on mobile
  };

  return (
    <header className="w-full px-4 py-1 flex justify-between h-20 items-center z-20 relative bg-white shadow">
      <img
        src="assets/logo2.png"
        alt="ANT Logo"
        className="h-12 sm:h-10 object-contain select-none"
        draggable="false"
      />

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 ml-8">
        {[
          { name: "Bus Hire", icon: <Bus size={20} /> },
          { name: "Bus Ticket", icon: <Ticket size={20} /> },
          { name: "Bus Tour", icon: <Globe size={20} /> }
        ].map((item) => (
          <button
            key={item.name}
            onClick={handleEnquiryOpen}
            className="text-black-700 hover:text-blue-600 font-medium text-lg flex items-center gap-2"
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Enquiry Button */}
      <button
        onClick={handleEnquiryOpen}
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-full shadow ml-auto md:ml-4"
      >
        Send Enquiry
      </button>

      {/* Mobile Toggle */}
      <button
        className="md:hidden ml-4"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col px-4 py-2 md:hidden z-30">
          {[
            { name: "Bus Hire", icon: <Bus size={20} /> },
            { name: "Bus Ticket", icon: <Ticket size={20} /> },
            { name: "Bus Tour", icon: <Globe size={20} /> }
          ].map((item) => (
            <button
              key={item.name}
              onClick={handleEnquiryOpen}
              className="text-gray-700 hover:text-blue-600 py-2 text-left border-b flex items-center gap-2"
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
