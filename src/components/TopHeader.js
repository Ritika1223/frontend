import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TopHeader() {
  const { t, i18n } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("B-128");

  const locations = {
    "B-128": {
      label: "B-128 Transport Nagar, Sector-69, Noida",
      map: "https://maps.google.com/?q=B-128+Transport+Nagar+Noida",
    },
    "A-24": {
      label: "A-24 Industrial Area, Sector-5, Noida",
      map: "https://maps.google.com/?q=A-24+Industrial+Area+Noida",
    },
    "C-56": {
      label: "C-56/12 Tech Park, Sector-62, Noida",
      map: "https://maps.google.com/?q=C-56/12+Tech+Park+Noida",
    },
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-white border-b text-base text-gray-600 relative">
      <div className="container mx-auto flex justify-between items-center px-4 py-1">
        {/* Left side: location + toll-free */}
        <div className="flex items-center gap-10 flex-grow md:ml-auto">
          <div className="flex items-center">
            <a
              href={locations[selectedLocation].map}
              target="_blank"
              rel="noopener noreferrer"
              title="Open location in Google Maps"
            >
              <i className="fa-solid fa-location-dot text-lg cursor-pointer" />
            </a>
            <select
              className="bg-transparent border-none outline-none text-base"
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
            >
              {Object.entries(locations).map(([key, loc]) => (
      <option key={key} value={key}>
        {/* 👇 Only show label on md and up */}
        <span className="hidden md:inline">{loc.label}</span>
        {/* 👇 Show short name (key) on small screens */}
        <span className="md:hidden">{key}</span>
      </option>
    ))}
  </select>
          </div>
          <span className="hidden md:inline text-base flex items-center">
            <i className="fa-solid fa-phone mr-1" />
            Toll Free 24x7 - <span className="ml-1">1800 1027 408</span>
          </span>
        </div>

        {/* Desktop: right links */}
        <div className="hidden md:flex items-center gap-5 text-base text-gray-700">
          <span className="flex items-center">
            <i className="fa-solid fa-gift mr-1" />
            {t("offer")}
            <sup className="bg-red-600 text-white text-xs px-1 rounded-full ml-1">10</sup>
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-truck-fast mr-1" />
            {t("tracking")}
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-circle-question mr-1" />
            {t("faq")}
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-headset mr-1" />
            {t("support")}
          </span>
          <span className="flex items-center">
            <i className="fa-solid fa-wallet mr-1" />
            {t("wallet")}
          </span>
          <select
            onChange={(e) => handleChangeLanguage(e.target.value)}
            className="bg-white border border-gray-300 px-2 py-1 rounded text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        {/* Hamburger icon for mobile */}
        <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar for Mobile */}
      {showSidebar && (
        <>
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black opacity-50 z-40"
          />
          <div className="md:hidden fixed top-0 right-0 w-72 bg-white shadow-md z-50 p-4 transition-all duration-300 ease-in-out">
            <button
              onClick={() => setShowSidebar(false)}
              className="text-right w-full mb-4 text-gray-700 text-lg"
            >
              ×
            </button>
            <ul className="space-y-5 text-base text-gray-800">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-gift" />
                {t("offer")}
                <span className="ml-1 bg-red-600 text-white text-xs px-1 rounded-full">10</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-truck-fast" />
                {t("tracking")}
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-question" />
                {t("faq")}
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-headset" />
                {t("support")}
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-wallet" />
                {t("wallet")}
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-language" />
                <select
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                  className="bg-white border border-gray-300 px-2 py-1 rounded w-full"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
