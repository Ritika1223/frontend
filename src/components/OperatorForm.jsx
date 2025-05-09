import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OperatorDropdown from './OperatorDropdown';
import Navbar from './Navbar'
import jsPDF from 'jspdf';
import { uploadFileToFirebase } from "../firebase/firebaseUpload";

const statesData = {
  Uttarakhand: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie', 'Almora', 'Haldwani'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad', 'Noida', 'Ghaziabad', 'Meerut'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Navi Mumbai'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar'],
  Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur', 'Ajmer', 'Kota', 'Bikaner', 'Pushkar'],
  Punjab: ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Mohali'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Dalhousie', 'McLeodganj'],
  Haryana: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak'],
};

const busTypeOptions = ['AC Deluxe', 'AC Luxury', 'AC Sleeper'];

const busModelOptions = {
  'AC Deluxe': [
    'AC Deluxe Bus 21 Seater (2+1)',
    'AC Deluxe Bus 27 Seater (2+2)',
    'AC Deluxe Bus 35 Seater (2+2)',
    'AC Deluxe Bus 41 Seater (2+2)',
    'AC Deluxe Bus 45 Seater (2+2)',
    'AC Deluxe Bus 49 Seater (2+2)',
    'AC Deluxe Bus 60 Seater (3+2)',
  ],
  'AC Luxury': [
    'AC Luxury Bus 25 Seater (2+1)',
    'AC Luxury Bus 31 Seater (2+2)',
    'AC Luxury Bus 41 Seater (2+2)',
    'AC Luxury Bus 45 Seater (2+2)',
    'AC Luxury Bus 49 Seater (2+2)',
    'AC Luxury Bus 55 Seater (2+2)',
  ],
  'AC Sleeper': ['AC Seater Sleeper Bus (2+2)', 'AC Sleeper Bus (2+1)'],
};

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const steps = [
  'Personal/Office',
  'Contacts & Address',
  'Vehicle Details',
  'GST/Bank/KYC/Photos',
  'Review & Submit',
];

const validateStep = (step, data) => {
  const errors = {};
  if (step === 0) {
    if (!data.name) errors.name = 'Required';
    if (!data.companyName) errors.companyName = 'Required';
    if (!data.officeLocation) errors.officeLocation = 'Required';
    if (!data.officePhotos?.length || !data.officePhotos[0]) errors.officePhotos = 'At least one office photo is required';
  }
  if (step === 1) {
    if (!data.emails?.[0]?.email) errors.email = 'Email is required';
    if (!data.phoneNumbers?.[0]?.primary) errors.phone = 'At least one phone number is required';
    if (!data.state) errors.state = 'State is required';
    if (!data.city) errors.city = 'City is required';
    if (!data.address) errors.address = 'Office address is required';
  }
  if (step === 2) {
    if (!data.buses?.length || !data.buses[0]?.busType) errors.buses = 'At least one bus entry is required';
  }
  if (step === 3) {
    if (data.hasGSTIN === 'yes') {
      if (!data.gstinNumber) errors.gstinNumber = 'GSTIN Number required';
      if (!data.gstinFile) errors.gstinFile = 'GSTIN doc required';
    }
    if (!data.aadharCards?.[0]) errors.aadharCards = 'At least one Aadhar card required';
    if (!data.panCards?.[0]) errors.panCards = 'At least one PAN card required';
    if (!data.accountNumber) errors.accountNumber = 'Account number required';
    if (!data.ifscCode) errors.ifscCode = 'IFSC code required';
    if (!data.cancelCheque) errors.cancelCheque = 'Cancelled cheque required';
    if (!data.photo1) errors.photo1 = 'Photo 1 required';
    if (!data.photo2) errors.photo2 = 'Photo 2 required';
    if (!data.digitalSignature) errors.digitalSignature = 'Digital Sign required';
  }
  return errors;
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
    officePhotos: [null],
    addressProof: null,
    accountNumber: '',
    ifscCode: '',
    cancelCheque: null,
    digitalSignature: null,
  });

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [openBusTypeDropdown, setOpenBusTypeDropdown] = useState([]);
  const [openBusModelDropdown, setOpenBusModelDropdown] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  // Ensure dropdown state arrays grow with buses
  useEffect(() => {
    setOpenBusTypeDropdown((arr) => {
      const copy = [...arr];
      while (copy.length < formData.buses.length) copy.push(false);
      return copy.slice(0, formData.buses.length);
    });
    setOpenBusModelDropdown((arr) => {
      const copy = [...arr];
      while (copy.length < formData.buses.length) copy.push(false);
      return copy.slice(0, formData.buses.length);
    });
  }, [formData.buses.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (index, type, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = {
      ...newPhoneNumbers[index],
      [type]: value,
    };
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: newPhoneNumbers,
    }));
  };

  const addPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, { primary: '', alternate: '' }],
    }));
  };

  const removePhoneNumber = (index) => {
    if (formData.phoneNumbers.length > 1) {
      const newPhoneNumbers = formData.phoneNumbers.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        phoneNumbers: newPhoneNumbers,
      }));
    }
  };

  const handleEmailChange = (index, type, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = {
      ...newEmails[index],
      [type]: value,
    };
    setFormData((prev) => ({
      ...prev,
      emails: newEmails,
    }));
  };

  const addEmail = () => {
    setFormData((prev) => ({
      ...prev,
      emails: [...prev.emails, { email: '', alternate: '' }],
    }));
  };

  const removeEmail = (index) => {
    if (formData.emails.length > 1) {
      const newEmails = formData.emails.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        emails: newEmails,
      }));
    }
  };

  const handleStateSelect = (state) => {
    setFormData((prev) => ({
      ...prev,
      state,
      city: '',
    }));
    setShowStateDropdown(false);
  };

  const handleCitySelect = (city) => {
    setFormData((prev) => ({
      ...prev,
      city,
    }));
    setShowCityDropdown(false);
  };

  const handleBusTypeSelect = (busType, index) => {
    setFormData((prev) => {
      const newBuses = [...prev.buses];
      newBuses[index] = {
        ...newBuses[index],
        busType,
        busModel: '',
      };
      return { ...prev, buses: newBuses };
    });
    setOpenBusTypeDropdown((prev) => prev.map((v, i) => (i === index ? false : v)));
  };

  const handleBusModelSelect = (busModel, index) => {
    setFormData((prev) => {
      const newBuses = [...prev.buses];
      newBuses[index] = {
        ...newBuses[index],
        busModel,
      };
      return { ...prev, buses: newBuses };
    });
    setOpenBusModelDropdown((prev) => prev.map((v, i) => (i === index ? false : v)));
  };

  const addBus = () => {
    setFormData((prev) => ({
      ...prev,
      buses: [...prev.buses, { busType: '', busModel: '' }],
    }));
  };

  const removeBus = (index) => {
    if (formData.buses.length > 1) {
      setFormData((prev) => {
        const newBuses = prev.buses.filter((_, i) => i !== index);
        return { ...prev, buses: newBuses };
      });
    }
  };

  // File size validation for ALL file inputs
  const handleSafeFileInput = (cb) => (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert(`File is too big! Max allowed: ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    cb(file);
  };

  const handleFileChange = (field, idx, file) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[idx] = file;
      return { ...prev, [field]: arr };
    });
  };

  const addFile = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], null],
    }));
  };

  const removeFile = (field, idx) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  // Custom photo input for camera/gallery
  const CustomPhotoInput = ({ value, onChange, label, cameraOnly }) => (
    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
      <input
        type="file"
        accept="image/*"
        capture={cameraOnly ? 'environment' : undefined}
        onChange={handleSafeFileInput(onChange)}
        className="hidden"
      />
      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">{value ? value.name : label}</span>
    </label>
  );

  // PDF generation function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 15;
    doc.setFontSize(18);
    doc.text('Operator Registration Details', 14, y);
    y += 10;
    doc.setFontSize(12);
    doc.text('Personal Details', 14, y);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Operator Name:', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.name || '', 60, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Business Name:', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.companyName || '', 60, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Office Location:', 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.officeLocation || '', 60, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Numbers:', 14, y);
    doc.setFont('helvetica', 'normal');
    (formData.phoneNumbers || []).forEach((p, i) => {
      doc.text(`- ${p.primary || ''}${p.alternate ? ', ' + p.alternate : ''}`, 20, y + 7 + i * 6);
    });
    y += 7 + (formData.phoneNumbers?.length || 1) * 6;
    doc.setFont('helvetica', 'bold');
    doc.text('Email Addresses:', 14, y);
    doc.setFont('helvetica', 'normal');
    (formData.emails || []).forEach((e, i) => {
      doc.text(`- ${e.email || ''}${e.alternate ? ', ' + e.alternate : ''}`, 20, y + 7 + i * 6);
    });
    y += 7 + (formData.emails?.length || 1) * 6;
    doc.setFont('helvetica', 'bold');
    doc.text('KYC:', 14, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.text(`Aadhar: ${formData.aadharCards?.length ? 'Attached' : 'Not attached'}`, 20, y);
    y += 6;
    doc.text(`PAN: ${formData.panCards?.length ? 'Attached' : 'Not attached'}`, 20, y);
    y += 6;
    doc.text(`Address Proof: ${formData.addressProof ? 'Attached' : 'Not attached'}`, 20, y);
    y += 6;
    doc.text(`Bank Account: ${formData.accountNumber || ''}`, 20, y);
    y += 6;
    doc.text(`IFSC: ${formData.ifscCode || ''}`, 20, y);
    y += 6;
    doc.text(`Cancelled Cheque: ${formData.cancelCheque ? 'Attached' : 'Not attached'}`, 20, y);
    y += 6;
    doc.text(`Digital Signature: ${formData.digitalSignature ? 'Attached' : 'Not attached'}`, 20, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Buses:', 14, y);
    doc.setFont('helvetica', 'normal');
    (formData.buses || []).forEach((b, i) => {
      doc.text(`- ${b.busType || ''} ${b.busModel ? '(' + b.busModel + ')' : ''}`, 20, y + 7 + i * 6);
    });
    y += 7 + (formData.buses?.length || 1) * 6;
    doc.save('Operator-Registration-Details.pdf');
  };

  // Step form navigation
  const nextStep = () => {
    const validation = validateStep(step, formData);
    setErrors(validation);
    if (Object.keys(validation).length === 0) setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => (s > 0 ? s - 1 : 0));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateStep(step, formData);

    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      alert('Please fix errors before submitting.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/operators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      alert('Form submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-8 pb-8 ">
        {/* Stepper indicators */}
        <nav className="flex mb-8" aria-label="Form steps">
          {steps.map((title, idx) => (
            <div
              key={title}
              className={`flex-1 flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-md transition-all duration-300 ${
                idx === step ? 'bg-[#3B4B96] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {title}
            </div>
          ))}
        </nav>

        {/* Render step form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-8" noValidate>
          {/* Step 0: Personal/Office Details */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Operator Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Business name"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Office Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="officeLocation"
                  value={formData.officeLocation || ''}
                  onChange={handleChange}
                  placeholder="Enter office location"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                    errors.officeLocation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.officeLocation && <p className="text-red-500 text-xs mt-1">{errors.officeLocation}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Office Photo(s) <span className="text-red-500">*</span>
                </label>
                {formData.officePhotos.map((file, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${
                      errors.officePhotos && idx === 0 ? 'border border-red-500 rounded-md p-1' : ''
                    }`}
                  >
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSafeFileInput((file) => {
                          const newFiles = [...formData.officePhotos];
                          newFiles[idx] = file;
                          setFormData((prev) => ({ ...prev, officePhotos: newFiles }));
                        })}
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
                            setFormData((prev) => ({ ...prev, officePhotos: newFiles }));
                          }}
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                          aria-label="Remove office photo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.officePhotos.length - 1 && (
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, officePhotos: [...prev.officePhotos, null] }))}
                          className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
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
                {errors.officePhotos && <p className="text-red-500 text-xs mt-1">{errors.officePhotos}</p>}
              </div>
            </div>
          )}

          {/* Step 1: Contacts/Address */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Emails */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Addresses <span className="text-red-500">*</span>
                </label>
                {formData.emails.map((emails, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                    <div className="space-y-2">
                      <input
                        type="email"
                        value={emails.email}
                        onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
                        placeholder={index === 0 ? 'Enter your email address' : 'Enter alternate email address'}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                          index === 0 && errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required={index === 0}
                      />
                      {index === 0 && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        value={emails.alternate}
                        onChange={(e) => handleEmailChange(index, 'alternate', e.target.value)}
                        placeholder="Enter alternate email address"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex gap-2 col-span-1 sm:col-span-2">
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={addEmail}
                          className="px-3 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Another Email
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeEmail(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Remove Email
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phone Numbers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Numbers <span className="text-red-500">*</span>
                </label>
                {formData.phoneNumbers.map((phones, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                    <div className="space-y-2">
                      <input
                        type="tel"
                        value={phones.primary}
                        onChange={(e) => handlePhoneChange(index, 'primary', e.target.value)}
                        placeholder={index === 0 ? 'Enter phone number' : 'Enter alternate number'}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                          index === 0 && errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required={index === 0}
                      />
                      {index === 0 && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                    <div className="flex gap-2 col-span-1 sm:col-span-2">
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={addPhoneNumber}
                          className="px-3 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Another Number
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removePhoneNumber(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Remove Number
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <OperatorDropdown
                    options={Object.keys(statesData)}
                    value={formData.state}
                    onChange={handleStateSelect}
                    placeholder="Select State"
                    isOpen={showStateDropdown}
                    onOpen={() => setShowStateDropdown(true)}
                    onClose={() => setShowStateDropdown(false)}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <OperatorDropdown
                    options={formData.state ? statesData[formData.state] : []}
                    value={formData.city}
                    onChange={handleCitySelect}
                    placeholder="Select City"
                    isOpen={showCityDropdown}
                    onOpen={() => setShowCityDropdown(true)}
                    onClose={() => setShowCityDropdown(false)}
                    disabled={!formData.state}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your full office address"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-gray-700">Please add all the bus types and models you own</p>
                {errors.buses && <p className="text-red-500 text-xs">{errors.buses}</p>}
                <div className="space-y-6">
                  {formData.buses.map((bus, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900">Bus {index + 1}</h3>
                        {formData.buses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBus(index)}
                            className="text-red-500 hover:text-red-700 flex items-center gap-1.5 text-sm"
                            aria-label={`Remove Bus ${index + 1}`}
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
                            onOpen={() =>
                              setOpenBusTypeDropdown((prev) => {
                                const arr = [...prev];
                                arr[index] = true;
                                return arr;
                              })
                            }
                            onClose={() =>
                              setOpenBusTypeDropdown((prev) => {
                                const arr = [...prev];
                                arr[index] = false;
                                return arr;
                              })
                            }
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
                            onOpen={() =>
                              setOpenBusModelDropdown((prev) => {
                                const arr = [...prev];
                                arr[index] = true;
                                return arr;
                              })
                            }
                            onClose={() =>
                              setOpenBusModelDropdown((prev) => {
                                const arr = [...prev];
                                arr[index] = false;
                                return arr;
                              })
                            }
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
                    className="w-full sm:w-auto px-4 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another Bus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: GST/Bank/KYC/Photos */}
          {step === 3 && (
            <div className="space-y-6">
              {/* GSTIN Section */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B4B96] mb-4 sm:mb-6 flex items-center gap-3 tracking-tight">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF5722]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  GSTIN Details
                </h2>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <label className="block text-base sm:text-lg font-bold text-[#3B4B96] mb-2">
                      Do you have GSTIN?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-base sm:text-lg font-medium text-gray-700 hover:text-[#3B4B96] transition-colors">
                        <input
                          type="radio"
                          name="hasGSTIN"
                          value="yes"
                          checked={formData.hasGSTIN === 'yes'}
                          onChange={() => setFormData((prev) => ({ ...prev, hasGSTIN: 'yes' }))}
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
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              hasGSTIN: 'no',
                              gstinNumber: '',
                              gstinFile: null,
                            }))
                          }
                          className="form-radio h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  {formData.hasGSTIN === 'yes' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          GSTIN Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="gstinNumber"
                          value={formData.gstinNumber}
                          onChange={handleChange}
                          placeholder="Enter your GSTIN number"
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base ${
                            errors.gstinNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.gstinNumber && <p className="text-red-500 text-xs mt-1">{errors.gstinNumber}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          GSTIN Document <span className="text-red-500">*</span>
                        </label>
                        <label
                          className={`flex items-center gap-2 cursor-pointer border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[#f3f4f6] transition-colors ${
                            errors.gstinFile ? 'border-red-500' : 'border-[#3B4B96]'
                          }`}
                        >
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleSafeFileInput((file) => setFormData((prev) => ({ ...prev, gstinFile: file })))}
                            className="hidden"
                          />
                          <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                            {formData.gstinFile ? formData.gstinFile.name : '+ Attach GSTIN document'}
                          </span>
                          <span className="text-xs text-gray-500">(image/pdf)</span>
                        </label>
                        {errors.gstinFile && <p className="text-red-500 text-xs mt-1">{errors.gstinFile}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* KYC Section */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  KYC Documents
                </h2>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-8">
                  {/* Aadhar Card */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">
                      Aadhar Card <span className="text-red-500">*</span>
                    </label>
                    {formData.aadharCards.map((file, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border rounded-lg p-2 sm:p-3 shadow-sm ${
                          errors.aadharCards && idx === 0 ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleSafeFileInput((file) => handleFileChange('aadharCards', idx, file))}
                            className="hidden"
                          />
                          <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                            {file ? file.name : '+ Attach Aadhar card'}
                          </span>
                        </label>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          {formData.aadharCards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFile('aadharCards', idx)}
                              className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                              aria-label="Remove Aadhar card"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                          {idx === formData.aadharCards.length - 1 && (
                            <button
                              type="button"
                              onClick={() => addFile('aadharCards')}
                              className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
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
                    {errors.aadharCards && <p className="text-red-500 text-xs mt-1">{errors.aadharCards}</p>}
                  </div>

                  {/* PAN Card */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">
                      PAN Card <span className="text-red-500">*</span>
                    </label>
                    {formData.panCards.map((file, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border rounded-lg p-2 sm:p-3 shadow-sm ${
                          errors.panCards && idx === 0 ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleSafeFileInput((file) => handleFileChange('panCards', idx, file))}
                            className="hidden"
                          />
                          <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                            {file ? file.name : '+ Attach PAN card'}
                          </span>
                        </label>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          {formData.panCards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFile('panCards', idx)}
                              className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                              aria-label="Remove PAN card"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                          {idx === formData.panCards.length - 1 && (
                            <button
                              type="button"
                              onClick={() => addFile('panCards')}
                              className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
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
                    {errors.panCards && <p className="text-red-500 text-xs mt-1">{errors.panCards}</p>}
                  </div>

                  {/* Electricity Bill / Rent Agreement */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">Electricity Bill / Rent Agreement</label>
                    <label
                      className={`flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors ${
                        errors.addressProof ? 'border-red-500' : 'border-[#3B4B96]'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleSafeFileInput((file) => setFormData((prev) => ({ ...prev, addressProof: file })))}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {formData.addressProof ? formData.addressProof.name : '+ Upload Electricity Bill / Rent Agreement'}
                      </span>
                    </label>
                    {errors.addressProof && <p className="text-red-500 text-xs mt-1">{errors.addressProof}</p>}
                  </div>

                  {/* Bank Details */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">Bank Details</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={handleChange}
                        placeholder="Account Number"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-sm sm:text-base ${
                          errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode || ''}
                        onChange={handleChange}
                        placeholder="IFSC Code"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-sm sm:text-base ${
                          errors.ifscCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <label
                        className={`flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 h-12 hover:bg-[#f3f4f6] transition-colors ${
                          errors.cancelCheque ? 'border-red-500' : 'border-[#3B4B96]'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleSafeFileInput((file) => setFormData((prev) => ({ ...prev, cancelCheque: file })))}
                          className="hidden"
                        />
                        <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                          {formData.cancelCheque ? formData.cancelCheque.name : '+ Cancelled Cheque'}
                        </span>
                      </label>
                    </div>
                    {(errors.accountNumber || errors.ifscCode || errors.cancelCheque) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.accountNumber || errors.ifscCode || errors.cancelCheque}
                      </p>
                    )}
                  </div>

                  {/* Photos */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">Photos</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <CustomPhotoInput
                        value={formData.photo1}
                        onChange={(file) => setFormData((prev) => ({ ...prev, photo1: file }))}
                        label="+ Attach Photo 1"
                        cameraOnly={false}
                      />
                      <CustomPhotoInput
                        value={formData.photo2}
                        onChange={(file) => setFormData((prev) => ({ ...prev, photo2: file }))}
                        label="+ Attach Photo 2"
                        cameraOnly={false}
                      />
                    </div>
                    {(errors.photo1 || errors.photo2) && (
                      <p className="text-red-500 text-xs mt-1">{errors.photo1 || errors.photo2}</p>
                    )}
                  </div>

                  {/* Digital Signature */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-900">Digital Signature</label>
                    <label
                      className={`flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 h-12 hover:bg-[#f3f4f6] transition-colors ${
                        errors.digitalSignature ? 'border-red-500' : 'border-[#3B4B96]'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleSafeFileInput((file) => setFormData((prev) => ({ ...prev, digitalSignature: file })))}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {formData.digitalSignature ? formData.digitalSignature.name : '+ Upload Digital Signature'}
                      </span>
                    </label>
                    {errors.digitalSignature && <p className="text-red-500 text-xs mt-1">{errors.digitalSignature}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Summary/review panel of all inputs */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                <h3 className="font-bold text-lg mb-2 text-[#3B4B96]">Review Your Details</h3>
                <pre className="overflow-x-auto text-xs bg-white rounded-lg border border-gray-100 p-2 text-gray-800">
                  {JSON.stringify(formData, null, 2)}
                </pre>
                <div className="text-xs text-gray-400 mt-2">(For demo: In a real version, render all fields prettier!)</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">Please confirm all details and submit.</div>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="confirmDetails"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96] rounded"
                />
                <label
                  htmlFor="confirmDetails"
                  className="text-sm sm:text-base font-medium text-gray-700 select-none cursor-pointer"
                >
                  I confirm that the above details are correct and I agree to the terms.
                </label>
              </div>
            </div>
          )}

          {/* Navigation buttons (Next, Back, or Submit) */}
          <div className="flex justify-between items-center mt-6 border-t pt-6">
            {step > 0 && (
              <button
                type="button"
                className="px-5 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                className="px-6 py-3 rounded bg-[#3B4B96] text-white hover:bg-[#2C3A7D] font-semibold ml-auto"
                onClick={nextStep}
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                className={`px-6 py-3 rounded bg-[#3B4B96] text-white hover:bg-[#2C3A7D] font-semibold ml-auto ${
                  isConfirmed ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isConfirmed}
              >
                Submit
              </button>
            )}
          </div>

          {/* Download PDF button always visible */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-6 py-2.5 bg-white border-2 border-[#3B4B96] text-[#3B4B96] font-semibold rounded-lg hover:bg-[#3B4B96] hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Download PDF of Details
            </button>
          </div>
        </form>
      </div>
    </div>

        <footer className="w-full bg-white/90 backdrop-blur-sm text-center shadow-top z-[50] sm:relative sm:bottom-auto sm:left-auto sm:w-auto fixed bottom-0 left-0 py-2">
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
      </>
  );
};

export default OperatorForm;

<style>
  {`
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
`}
</style>