import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OperatorDropdown from './OperatorDropdown';
import jsPDF from 'jspdf';
import API_URLS from '../ApIURLs';
import { uploadFileToFirebase } from "../firebase/firebaseUpload";
import Navbar from './Navbar';

const statesData = {
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Almora", "Haldwani"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Noida", "Ghaziabad", "Meerut"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Navi Mumbai"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota", "Bikaner", "Pushkar"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Mohali"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Dalhousie", "McLeodganj"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak"]
};

const busTypeOptions = [
  "AC Deluxe",
  "AC Luxury",
  "AC Sleeper"
];

const busModelOptions = {
  "AC Deluxe": [
    "AC Deluxe Bus 21 Seater (2+1)",
    "AC Deluxe Bus 27 Seater (2+2)",
    "AC Deluxe Bus 35 Seater (2+2)",
    "AC Deluxe Bus 41 Seater (2+2)",
    "AC Deluxe Bus 45 Seater (2+2)",
    "AC Deluxe Bus 49 Seater (2+2)",
    "AC Deluxe Bus 60 Seater (3+2)"
  ],
  "AC Luxury": [
    "AC Luxury Bus 25 Seater (2+1)",
    "AC Luxury Bus 31 Seater (2+2)",
    "AC Luxury Bus 41 Seater (2+2)",
    "AC Luxury Bus 45 Seater (2+2)",
    "AC Luxury Bus 49 Seater (2+2)",
    "AC Luxury Bus 55 Seater (2+2)"
  ],
  "AC Sleeper": [
    "AC Seater Sleeper Bus (2+2)",
    "AC Sleeper Bus (2+1)"
  ]
};

const OperatorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    emails: [{ email: '', alternate: '' }],
    phoneNumbers: [{ primary: '', alternate: '' }],
    state: '',
    city: '',
    address: '',
    buses: [{ busType: '', busModel: '' }],
    hasGSTIN: 'no',
    gstinNumber: '',
    gstinFile: null,
    gstCertificates: [null],
    bankDetails: [null],
    panCards: [null],
    aadharCards: [null],
    photo1: null,
    photo2: null,
    officeLocation: '',
    officePhotos: [null]
  });

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [openBusTypeDropdown, setOpenBusTypeDropdown] = useState([]);
  const [openBusModelDropdown, setOpenBusModelDropdown] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (index, type, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = {
      ...newPhoneNumbers[index],
      [type]: value
    };
    setFormData(prev => ({
      ...prev,
      phoneNumbers: newPhoneNumbers
    }));
  };

 
  const handleEmailChange = (index, type, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = {
      ...newEmails[index],
      [type]: value
    };
    setFormData(prev => ({
      ...prev,
      emails: newEmails
    }));
  };

 
  const handleStateSelect = (state) => {
    setFormData(prev => ({
      ...prev,
      state,
      city: ''
    }));
    setShowStateDropdown(false);
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({
      ...prev,
      city
    }));
    setShowCityDropdown(false);
  };

  const handleBusTypeSelect = (busType, index) => {
    setFormData(prev => {
      const newBuses = [...prev.buses];
      newBuses[index] = {
        ...newBuses[index],
        busType,
        busModel: ''
      };
      return { ...prev, buses: newBuses };
    });
    setOpenBusTypeDropdown(prev => prev.map((v, i) => (i === index ? false : v)));
  };

  const handleBusModelSelect = (busModel, index) => {
    setFormData(prev => {
      const newBuses = [...prev.buses];
      newBuses[index] = {
        ...newBuses[index],
        busModel
      };
      return { ...prev, buses: newBuses };
    });
    setOpenBusModelDropdown(prev => prev.map((v, i) => (i === index ? false : v)));
  };

  const addBus = () => {
    setFormData(prev => ({
      ...prev,
      buses: [...prev.buses, { busType: '', busModel: '' }]
    }));
  };

  const removeBus = (index) => {
    if (formData.buses.length > 1) {
      setFormData(prev => {
        const newBuses = prev.buses.filter((_, i) => i !== index);
        return { ...prev, buses: newBuses };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Copy formData to prevent mutating original state
      const dataToSend = { ...formData };

      // Helper to upload one file
      const uploadFile = async (file) => {
        if (!file) return null;
        if (typeof file === 'string') return file;
        return await uploadFileToFirebase(file);
      };

      // Helper to upload array of files
      const uploadFilesArray = async (arr) => {
        if (!Array.isArray(arr)) return [];
        const results = await Promise.all(arr.map(file => uploadFile(file)));
        return results.filter(Boolean);
      };

      // Upload all relevant files and replace in dataToSend
      // Single files
      dataToSend.gstinFile = await uploadFile(formData.gstinFile);
      dataToSend.addressProof = await uploadFile(formData.addressProof);
      dataToSend.cancelCheque = await uploadFile(formData.cancelCheque);
      dataToSend.photo1 = await uploadFile(formData.photo1);
      dataToSend.photo2 = await uploadFile(formData.photo2);
      dataToSend.digitalSignature = await uploadFile(formData.digitalSignature);

      // Arrays of files
      dataToSend.officePhotos = await uploadFilesArray(formData.officePhotos);
      dataToSend.aadharCards = await uploadFilesArray(formData.aadharCards);
      dataToSend.panCards = await uploadFilesArray(formData.panCards);
      if (formData.gstCertificates) dataToSend.gstCertificates = await uploadFilesArray(formData.gstCertificates);
      if (formData.bankDetails) dataToSend.bankDetails = await uploadFilesArray(formData.bankDetails);

      // Send to webhook
      const response = await fetch(API_URLS.OPERATORS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      // Try to read JSON, otherwise fallback
      let data = null;
      try { data = await response.json(); } catch (err) {}
      console.log('Form submitted successfully:', data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleFileChange = (field, idx, file) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      arr[idx] = file;
      return { ...prev, [field]: arr };
    });
  };

  const addFile = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], null]
    }));
  };

  const removeFile = (field, idx) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  // PDF generation function
  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  let y = 20;

  const sectionSpacing = 10;
  const lineSpacing = 6;

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Operator Registration Details', 14, y);
  y += sectionSpacing;

  // Section: Personal Details
  doc.setFontSize(14);
  doc.text('Personal Details', 14, y);
  y += lineSpacing;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Operator Name:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.name || '-', 60, y);
  y += lineSpacing;

  doc.setFont('helvetica', 'bold');
  doc.text('Business Name:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.companyName || '-', 60, y);
  y += lineSpacing;

  doc.setFont('helvetica', 'bold');
  doc.text('Office Location:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.officeLocation || '-', 60, y);
  y += sectionSpacing;

  // Section: Contact Numbers
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Numbers:', 14, y);
  doc.setFont('helvetica', 'normal');
  (formData.phoneNumbers || []).forEach((p, i) => {
    doc.text(`• ${p.primary || '-'}${p.alternate ? ', Alt: ' + p.alternate : ''}`, 20, y + (i + 1) * lineSpacing);
  });
  y += (formData.phoneNumbers?.length || 1) * lineSpacing + 4;

  // Section: Emails
  doc.setFont('helvetica', 'bold');
  doc.text('Email Addresses:', 14, y);
  doc.setFont('helvetica', 'normal');
  (formData.emails || []).forEach((e, i) => {
    doc.text(`• ${e.email || '-'}${e.alternate ? ', Alt: ' + e.alternate : ''}`, 20, y + (i + 1) * lineSpacing);
  });
  y += (formData.emails?.length || 1) * lineSpacing + 4;

  // Section: KYC
  doc.setFont('helvetica', 'bold');
  doc.text('KYC Documents:', 14, y);
  y += lineSpacing;
  doc.setFont('helvetica', 'normal');
  doc.text(`• Aadhar: ${formData.aadharCards?.length ? 'Attached' : 'Not attached'}`, 20, y);
  y += lineSpacing;
  doc.text(`• PAN: ${formData.panCards?.length ? 'Attached' : 'Not attached'}`, 20, y);
  y += lineSpacing;
  doc.text(`• Address Proof: ${formData.addressProof ? 'Attached' : 'Not attached'}`, 20, y);
  y += lineSpacing;
  doc.text(`• Bank Account No: ${formData.accountNumber || '-'}`, 20, y);
  y += lineSpacing;
  doc.text(`• IFSC: ${formData.ifscCode || '-'}`, 20, y);
  y += lineSpacing;
  doc.text(`• Cancelled Cheque: ${formData.cancelCheque ? 'Attached' : 'Not attached'}`, 20, y);
  y += lineSpacing;
  doc.text(`• Digital Signature: ${formData.digitalSignature ? 'Attached' : 'Not attached'}`, 20, y);
  y += sectionSpacing;

  // Section: Buses
  doc.setFont('helvetica', 'bold');
  doc.text('Buses:', 14, y);
  doc.setFont('helvetica', 'normal');
  (formData.buses || []).forEach((b, i) => {
    doc.text(`• ${b.busType || '-'}${b.busModel ? ' (' + b.busModel + ')' : ''}`, 20, y + (i + 1) * lineSpacing);
  });
  y += (formData.buses?.length || 1) * lineSpacing;

  // Save
  doc.save('Operator-Registration-Details.pdf');
};

  // Ensure dropdown state arrays grow with buses
  useEffect(() => {
    setOpenBusTypeDropdown(arr => {
      const copy = [...arr];
      while (copy.length < formData.buses.length) copy.push(false);
      return copy.slice(0, formData.buses.length);
    });
    setOpenBusModelDropdown(arr => {
      const copy = [...arr];
      while (copy.length < formData.buses.length) copy.push(false);
      return copy.slice(0, formData.buses.length);
    });
  }, [formData.buses.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <hr></hr>

      <div className="max-w-4xl mx-auto pt-5 ">
       
         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
         {/* Form Heading */}
        <h2 className="text-2xl font-bold text-center text-[#3B4B96]">Operator Registration Form</h2>

          {/* Modal Loader Overlay */}
          {isSubmitting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
                <svg className="w-14 h-14 animate-spin text-[#3B4B96] mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="text-[#3B4B96] font-bold text-lg">Processing, please wait…</div>
              </div>
            </div>
          )}

          {/* Personal Details Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Operator Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Business name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Office Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Office Location</label>
                <input
                  type="text"
                  name="officeLocation"
                  value={formData.officeLocation || ''}
                  onChange={handleChange}
                  placeholder="Enter office location"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                />
              </div>

              {/* Office Photos (multiple) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Office Photo(s)</label>
                {formData.officePhotos.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const newFiles = [...formData.officePhotos];
                          newFiles[idx] = e.target.files[0];
                          setFormData(prev => ({ ...prev, officePhotos: newFiles }));
                        }}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Upload Office Photo'}
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {formData.officePhotos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newFiles = formData.officePhotos.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, officePhotos: newFiles }));
                          }}
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.officePhotos.length - 1 && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, officePhotos: [...prev.officePhotos, null] }))}
                          className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-xl hover:bg-[#3B4B96] hover:text-white transition-all duration-300 flex items-center group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="hidden sm:inline">Add More</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emails */}
            <div className="mt-4 sm:mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
              {formData.emails.map((emails, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={emails.email}
                      onChange={e => handleEmailChange(index, 'email', e.target.value)}
                      placeholder={index === 0 ? "Enter your email address" : "Enter alternate email address"}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={emails.alternate}
                      onChange={e => handleEmailChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                    />
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Phone Numbers */}
            <div className="mt-4 sm:mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Numbers</label>
              {formData.phoneNumbers.map((phones, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={phones.primary}
                      onChange={(e) => handlePhoneChange(index, 'primary', e.target.value)}
                      placeholder={index === 0 ? "Enter phone number" : "Enter alternate number"}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={phones.alternate}
                      onChange={(e) => handlePhoneChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                 
                </div>
              ))}
            </div>
          </div>

          {/* State and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <OperatorDropdown
                options={Object.keys(statesData)}
                value={formData.state}
                onChange={handleStateSelect}
                placeholder="Select State"
                isOpen={showStateDropdown}
                onOpen={() => setShowStateDropdown(true)}
                onClose={() => setShowStateDropdown(false)}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <OperatorDropdown
                options={formData.state ? statesData[formData.state] : []}
                value={formData.city}
                onChange={handleCitySelect}
                placeholder="Select City"
                isOpen={showCityDropdown}
                onOpen={() => setShowCityDropdown(true)}
                onClose={() => setShowCityDropdown(false)}
                disabled={!formData.state}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your full office address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* Vehicle Details Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Vehicle Details
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700">
                Please add all the bus types and models you own
              </p>
              <div className="space-y-6">
                {formData.buses.map((bus, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Bus {index + 1}</h3>
                      {formData.buses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBus(index)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1.5 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bus Type</label>
                        <OperatorDropdown
                          options={busTypeOptions}
                          value={bus.busType}
                          onChange={(value) => handleBusTypeSelect(value, index)}
                          placeholder="Select Bus Type"
                          isOpen={!!openBusTypeDropdown[index]}
                          onOpen={() => setOpenBusTypeDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = true;
                            return arr;
                          })}
                          onClose={() => setOpenBusTypeDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = false;
                            return arr;
                          })}
                          className="w-full text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bus Model</label>
                        <OperatorDropdown
                          options={bus.busType ? busModelOptions[bus.busType] : []}
                          value={bus.busModel}
                          onChange={(value) => handleBusModelSelect(value, index)}
                          placeholder="Select Bus Model"
                          isOpen={!!openBusModelDropdown[index]}
                          onOpen={() => setOpenBusModelDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = true;
                            return arr;
                          })}
                          onClose={() => setOpenBusModelDropdown(prev => {
                            const arr = [...prev];
                            arr[index] = false;
                            return arr;
                          })}
                          disabled={!bus.busType}
                          className="w-full text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBus}
                  className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-xl hover:bg-[#3B4B96] hover:text-white transition-all duration-300 flex items-center group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Bus
                </button>
              </div>
            </div>
          </div>

          {/* GSTIN Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B4B96] mb-4 sm:mb-6 flex items-center gap-3 tracking-tight">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              GSTIN Details
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <label className="block text-base sm:text-lg font-bold text-[#3B4B96] mb-2">Do you have GSTIN?</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-base sm:text-lg font-medium text-gray-700 hover:text-[#3B4B96] transition-colors">
                    <input
                      type="radio"
                      name="hasGSTIN"
                      value="yes"
                      checked={formData.hasGSTIN === 'yes'}
                      onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'yes' }))}
                      className="form-radio h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-base sm:text-lg font-medium text-gray-700 hover:text-[#3B4B96] transition-colors">
                    <input
                      type="radio"
                      name="hasGSTIN"
                      value="no"
                      checked={formData.hasGSTIN === 'no'}
                      onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'no', gstinNumber: '', gstinFile: null }))}
                      className="form-radio h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              {formData.hasGSTIN === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">GSTIN Number</label>
                    <input
                      type="text"
                      name="gstinNumber"
                      value={formData.gstinNumber}
                      onChange={handleChange}
                      placeholder="Enter your GSTIN number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">GSTIN Document</label>
                    <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => setFormData(prev => ({ ...prev, gstinFile: e.target.files[0] }))}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium">
                        {formData.gstinFile ? formData.gstinFile.name : '+ Attach GSTIN document'}
                      </span>
                      <span className="text-xs text-gray-500">(image/pdf)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* KYC Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              KYC Documents
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-8">
              {/* Aadhar Card FIRST */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Aadhar Card</label>
                {formData.aadharCards.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('aadharCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach Aadhar card'}
                      </span>
                    </label>
                    
                  </div>
                ))}
              </div>

              {/* PAN Card SECOND */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">PAN Card</label>
                {formData.panCards.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('panCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach PAN card'}
                      </span>
                    </label>
                    
                  </div>
                ))}
              </div>

              {/* Electricity Bill / Rent Agreement */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Electricity Bill / Rent Agreement</label>
                <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={e => setFormData(prev => ({ ...prev, addressProof: e.target.files[0] }))}
                    className="hidden"
                  />
                  <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                    {formData.addressProof ? formData.addressProof.name : '+ Upload Electricity Bill / Rent Agreement'}
                  </span>
                </label>
              </div>

              {/* Bank Details THIRD - with fields */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Bank Details</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber || ''}
                    onChange={handleChange}
                    placeholder="Account Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode || ''}
                    onChange={handleChange}
                    placeholder="IFSC Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-sm sm:text-base"
                  />
                  <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 hover:bg-[#f3f4f6] transition-colors">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={e => setFormData(prev => ({ ...prev, cancelCheque: e.target.files[0] }))}
                      className="hidden"
                    />
                    <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                      {formData.cancelCheque ? formData.cancelCheque.name : '+ Cancelled Cheque'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Photos FOURTH */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Photos</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setFormData(prev => ({ ...prev, photo1: e.target.files[0] }))}
                      className="hidden"
                    />
                    <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                      {formData.photo1 ? formData.photo1.name : '+ Attach Photo 1'}
                    </span>
                  </label>
                 
                </div>
              </div>

              {/* Digital Signature FIFTH */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900"> Signature</label>
                <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 hover:bg-[#f3f4f6] transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={e => setFormData(prev => ({ ...prev, digitalSignature: e.target.files[0] }))}
                    className="hidden"
                  />
                  <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                    {formData.digitalSignature ? formData.digitalSignature.name : '+ Upload  Signature'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-6 py-2.5 bg-white border-2 border-[#3B4B96] text-[#3B4B96] font-semibold rounded-lg hover:bg-[#3B4B96] hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Download PDF of Details
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="checkbox"
                  id="confirmDetails"
                  checked={isConfirmed}
                  onChange={e => setIsConfirmed(e.target.checked)}
                  className="h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96] rounded"
                />
                <label htmlFor="confirmDetails" className="text-sm sm:text-base font-medium text-gray-700 select-none cursor-pointer">
                  I confirm that the above details are correct and I agree to the terms.
                </label>
              </div>
            </div>
            <button
              type="submit"
className={`px-6 py-2 rounded-xl flex items-center gap-2 justify-center font-semibold transition-all duration-300 w-full sm:w-auto
  ${isConfirmed && !isSubmitting 
    ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white hover:bg-[#3B4B96] hover:text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5' 
    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isConfirmed || isSubmitting}
            >
              Submit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperatorForm;


