import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URLS from "../ApIURLs";

const OperatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState(false);
  const handelAccept = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(API_URLS.ACCEPT_OPERATOR_REQUEST(id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to accept operator");
      }

      navigate("/operators/requests");
    } catch (error) {
      console.error("Error accepting operator:", error);
    }
  };

  const handelReject = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(API_URLS.REJECT_OPERATOR_REQUEST(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject operator");
      }

      console.log("Rejected operator:", id);
      navigate("/operators/requests");
    } catch (error) {
      console.error("Error rejecting operator:", error);
    }
  };

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await fetch(API_URLS.FIND_OPERATORS(id), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized error - redirect to login
            navigate("/login");
            throw new Error("Please login again");
          }
          throw new Error("Failed to fetch operator details");
        }

        const data = await response.json();
        setOperator(data);
        setRequest(data.approved);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperatorDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="text-[#3B4B96] text-lg font-medium">
            Loading operator details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-red-800 text-lg font-semibold text-center mb-2">
            Error Loading Operator
          </h3>
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={() => navigate("/operators")}
            className="mt-6 w-full bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white py-2 rounded-lg hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Operators List
          </button>
        </div>
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-600">Operator not found</h2>
          <button
            onClick={() => navigate("/operators")}
            className="mt-4 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2 rounded-lg hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300"
          >
            Back to Operators List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Button Row */}
        <div className="flex justify-between items-center mb-6">
          {/* Back Button on Left */}
          <button
            onClick={() => navigate("/operators")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF5722] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Operators List
          </button>

          {/* Accept/Decline Buttons on Right */}
          {!request && (
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                onClick={handelAccept}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Accept
              </button>
              <button
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                onClick={handelReject}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Decline
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Operator Header */}
          <div className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{operator.name}</h1>
                <p className="text-white/80 text-lg">
                  {operator.companyName}, {operator.officeLocation}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-sm text-white/80">Registered on</p>
                <p className="text-xl font-semibold">
                  {new Date(operator.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#3B4B96] mb-6 flex items-center gap-3">
                  <div className="p-2 bg-[#3B4B96]/10 rounded-lg">
                    <svg
                      className="w-6 h-6 text-[#3B4B96]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Emails */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#FF5722] mb-4">
                      Email Addresses
                    </h3>
                    {operator.emails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 mb-3 bg-white p-3 rounded-lg shadow-sm"
                      >
                        <svg
                          className="w-5 h-5 text-[#3B4B96]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-800">{email.email}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#FF5722] mb-4">
                      Alternate Email Addresses
                    </h3>
                    {operator.emails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 mb-3 bg-white p-3 rounded-lg shadow-sm"
                      >
                        <svg
                          className="w-5 h-5 text-[#3B4B96]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-800">{email.alternate}</span>
                      </div>
                    ))}
                  </div>

                  {/* Phone Numbers */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#FF5722] mb-4">
                      Phone Numbers
                    </h3>
                    {operator.phoneNumbers.map((phone, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 mb-3 bg-white p-3 rounded-lg shadow-sm"
                      >
                        <svg
                          className="w-5 h-5 text-[#3B4B96]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-gray-800">{phone.primary}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#FF5722] mb-4">
                      Alternate Phone Numbers
                    </h3>
                    {operator.phoneNumbers.map((phone, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 mb-3 bg-white p-3 rounded-lg shadow-sm"
                      >
                        <svg
                          className="w-5 h-5 text-[#3B4B96]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-gray-800">{phone.alternate}</span>
                      </div>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[#FF5722] mb-4">
                      Location
                    </h3>
                    <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <svg
                        className="w-5 h-5 text-[#3B4B96] mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-800">{operator.address}</p>
                        <p className="text-gray-600 mt-1">
                          {operator.city}, {operator.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                                <h2 className="text-2xl font-bold text-[#3B4B96] mb-6 flex items-center gap-3">
                  <div className="p-2 bg-[#3B4B96]/10 rounded-lg">
                    <svg
                      className="w-6 h-6 text-[#3B4B96]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                  </div>
                  Bus Information
                </h2>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#FF5722]">
                      Total Buses
                    </h3>
                    <span className="text-3xl font-bold text-[#3B4B96] bg-white px-4 py-2 rounded-lg shadow-sm">
                      {operator.buses.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {operator.buses.map((bus, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold text-[#3B4B96]">
                            Bus {index + 1}
                          </h4>
                          <span className="px-3 py-1 bg-[#FF5722]/10 text-[#FF5722] rounded-full text-sm font-medium">
                            {bus.busType}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          <p className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-[#3B4B96]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Model: {bus.busModel}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buses Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">


                {/* Documents Section */}
                <div>
                  <h2 className="text-2xl font-bold text-[#3B4B96] mb-6 flex items-center gap-3">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg">
                      <svg
                        className="w-6 h-6 text-[#3B4B96]"
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
                    </div>
                    Documents Numbers
                  </h2>

                  {operator.gstinNumber && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-[#FF5722]"
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
                        </div>
                        <div>
                          <p className="font-semibold text-[#3B4B96]">GSTIN</p>
                          <p className="text-gray-600">
                            {operator.gstinNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">
                          Account Number
                        </p>
                        <p className="text-gray-600">
                          {operator.accountNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">
                          IFSC Code
                        </p>
                        <p className="text-gray-600">{operator.ifscCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#3B4B96] mb-6 flex items-center gap-3">
                    <div className="p-2 bg-[#3B4B96]/10 rounded-lg">
                      <svg
                        className="w-6 h-6 text-[#3B4B96]"
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
                    </div>
                    Attached Documents
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={operator.cancelCheque}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">
                          Cancel Cheque
                        </p>
                        <p className="text-blue-600 underline break-all">
                          Click to view
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={operator.addressProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">
                          Address Proof
                        </p>
                        <p className="text-blue-600 underline break-all">
                          Click to view
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={operator.digitalSignature}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">
                          Digital Signature
                        </p>
                        <p className="text-blue-600 underline break-all">
                          Click to view
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={operator.photo1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">Photo1</p>
                        <p className="text-blue-600 underline break-all">
                          Click to view
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={operator.photo2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                        <svg
                          className="w-5 h-5 text-[#FF5722]"
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
                      </div>
                      <div>
                        <p className="font-semibold text-[#3B4B96]">Photo2</p>
                        <p className="text-blue-600 underline break-all">
                          Click to view
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    {operator.aadharCards?.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                      >
                        <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-[#FF5722]"
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
                        </div>
                        <div>
                          <p className="font-semibold text-[#3B4B96]">
                            aadharCards {index + 1}
                          </p>
                          <p className="text-sm text-blue-600 underline">
                            Click to view
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    {operator.panCards?.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                      >
                        <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-[#FF5722]"
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
                        </div>
                        <div>
                          <p className="font-semibold text-[#3B4B96]">
                            panCards {index + 1}
                          </p>
                          <p className="text-sm text-blue-600 underline">
                            Click to view
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    {operator.officePhotos?.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                      >
                        <div className="p-2 bg-[#FF5722]/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-[#FF5722]"
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
                        </div>
                        <div>
                          <p className="font-semibold text-[#3B4B96]">
                            officePhotos {index + 1}
                          </p>
                          <p className="text-sm text-blue-600 underline">
                            Click to view
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDetails;
