import React, { useState, useRef, useEffect } from 'react';

const OperatorDropdown = ({ options, value, onChange, placeholder, isOpen, onOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(240);

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
    if (isOpen && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight || 240);
    }
  }, [isOpen, options]);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = buttonRef.current.parentElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const canOpenDown = spaceBelow >= dropdownHeight + 4;
      const canOpenUp = spaceAbove >= dropdownHeight + 4;
      let openUp = false;
      if (!canOpenDown && canOpenUp) {
        openUp = true;
      }
      setOpenUpwards(openUp);
    }
  }, [isOpen, dropdownHeight]);

  const handleSelect = (option) => {
    onChange(option);
    onClose();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onOpen}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-gray-900 hover:border-[#3B4B96] transition-colors duration-200 focus:outline-none focus:border-[#3B4B96] focus:ring-2 focus:ring-[#3B4B96]/10 flex justify-between items-center"
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
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            zIndex: 9999,
            top: openUpwards ? undefined : 'calc(100% + 4px)',
            bottom: openUpwards ? 'calc(100% + 4px)' : undefined
          }}
          className="bg-white rounded-xl shadow-lg max-h-60 overflow-auto border border-gray-100 animate-dropdown-fade"
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onMouseDown={() => handleSelect(option)}
              className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 hover:text-[#3B4B96] transition-colors duration-200 ${
                value === option ? 'bg-gray-50 text-[#3B4B96]' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperatorDropdown; 