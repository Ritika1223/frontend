import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const CustomDropdown = ({ options, value, onChange, placeholder, isOpen, onOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [menuStyles, setMenuStyles] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!buttonRef.current || !buttonRef.current.contains(event.target))
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 240;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpwards(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
      setMenuStyles({
        position: 'absolute',
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
        ...(spaceBelow < dropdownHeight && spaceAbove > spaceBelow
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 })
      });
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-gray-900 hover:border-[#FF5722] transition-colors duration-200 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 flex justify-between items-center"
        ref={buttonRef}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          style={menuStyles}
          className={`bg-white rounded-xl shadow-lg max-h-60 overflow-auto border border-gray-100 animate-dropdown-fade ${openUpwards ? '' : ''}`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onMouseDown={() => handleSelect(option)}
              className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 hover:text-[#FF5722] transition-colors duration-200 ${
                value === option ? 'bg-gray-50 text-[#FF5722]' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default CustomDropdown;

<style>{`
@keyframes dropdown-fade {
  0% { opacity: 0; transform: scaleY(0.95); }
  100% { opacity: 1; transform: scaleY(1); }
}
.animate-dropdown-fade {
  animation: dropdown-fade 0.18s cubic-bezier(0.4,0,0.2,1);
  transform-origin: top;
  z-index: 99999 !important;
}
`}</style> 