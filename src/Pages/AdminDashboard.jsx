import React, { useState } from "react";
import DashboardCharts from './DashboardCharts';

import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdAdminPanelSettings,
  MdSettings,
  MdDirectionsBus,
  MdCommute,
  MdConfirmationNumber,
  MdTour,
  MdManageAccounts,
  MdDirectionsCar,
  MdOutlineChat,
  MdExtension,
  MdPages,
  MdStorage,
  MdEmojiTransportation,
  MdSearch,
  MdNotifications,
  MdLanguage,
  MdVpnKey,
  MdPerson,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';

// Sidebar Menu
const SIDEBAR_MENUS = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Admin",
    icon: <MdAdminPanelSettings />,
    submenu: [
      { label: "Manage User", path: "/admin/admin/manage-user" },
      { label: "Assign Modules", path: "/admin/admin/assign-modules" },
      { label: "Manage Ids", path: "/admin/admin/manage-ids" },
    ],
  },
  {
    title: "Master",
    icon: <MdStorage />,
    submenu: [
      { label: "Manage Extra Charge", path: "/admin/master/manage-extra-charge" },
      { label: "Manage GST", path: "/admin/master/manage-gst" },
      { label: "Manage GST Report", path: "/admin/master/manage-gst-report" },
      { label: "Manage Offer", path: "/admin/master/manage-offer" },
    ],
  },
  {
    title: "Vehicle",
    icon: <MdDirectionsBus />,
    submenu: [
      { label: "Manage Vehicle", path: "/admin/vehicle/manage-vehicle" },
      { label: "Manage Vehicle Type", path: "/admin/vehicle/manage-vehicle-type" },
      { label: "Manage Vehicle Name", path: "/admin/vehicle/manage-vehicle-name" },
    ],
  },
  {
    title: "Operator",
    icon: <MdManageAccounts />,
    submenu: [
      { label: "Add Operator", path: "/admin/operator/add-operator" },
      { label: "Manage Operator", path: "/admin/operator/manage-operator" },
      { label: "Operator Account", path: "/admin/operator/operator-account" },
    ],
  },
  {
    title: "Operations",
    icon: <MdSettings />,
    submenu: [
      { label: "Manage Booking", path: "/admin/operations/manage-booking" },
      { label: "Manage Payment", path: "/admin/operations/manage-payment" },
      { label: "Manage Duty Voucher", path: "/admin/operations/manage-duty-voucher" },
      { label: "Manage Invoice", path: "/admin/operations/manage-invoice" },
    ],
  },
  {
    title: "Bus Hire",
    icon: <MdCommute />,
    submenu: [
      { label: "Manage Local", path: "/admin/bus-hire/manage-local" },
      { label: "Manage Outstation", path: "/admin/bus-hire/manage-outstation" },
    ],
  },
  {
    title: "MiniVan Hire",
    icon: <MdCommute />,
    submenu: [
      { label: "Manage Local", path: "/admin/minivan-hire/manage-local" },
      { label: "Manage Outstation", path: "/admin/minivan-hire/manage-outstation" },
    ],
  },
  {
    title: "Car Hire",
    icon: <MdDirectionsCar />,
    submenu: [
      { label: "Manage Local", path: "/admin/car-hire/manage-local" },
      { label: "Manage Outstation", path: "/admin/car-hire/manage-outstation" },
    ],
  },
  {
    title: "Bus Ticket",
    icon: <MdConfirmationNumber />,
    submenu: [
      { label: "Manage Bus", path: "/admin/bus-ticket/manage-bus" },
      { label: "Manage City", path: "/admin/bus-ticket/manage-city" },
      { label: "Manage Service", path: "/admin/bus-ticket/manage-service" },
      { label: "Manage Route", path: "/admin/bus-ticket/manage-route" },
      { label: "Manage Quota", path: "/admin/bus-ticket/manage-quota" },
      { label: "Manage Passenger List", path: "/admin/bus-ticket/manage-passenger" },
    ],
  },
  {
    title: "Bus Tour",
    icon: <MdTour />,
    submenu: [
      { label: "Manage Tour", path: "/admin/bus-tour/manage-tour" },
    ],
  },
  {
    title: "Transport Manager",
    icon: <MdEmojiTransportation />,
    submenu: [
      { label: "Counter", path: "/admin/transport-manager/counter" },
      {
        label: "Manage Fleet",
        submenu: [
          { label: "Seat Layout", path: "/admin/transport-manager/fleet-layouts" },
          { label: "Fleet Type", path: "/admin/transport-manager/fleet-type" },
          { label: "Vehicles", path: "/admin/transport-manager/fleet-vehicles" },
        ],
      },
      {
        label: "Manage Trip",
        submenu: [
          { label: "Route", path: "/admin/transport-manager/trip-route" },
          { label: "Schedule", path: "/admin/transport-manager/trip-schedule" },
          { label: "Ticket Price", path: "/admin/transport-manager/ticket-price" },
          { label: "Trip", path: "/admin/transport-manager/trip" },
          { label: "Vehicle Assign", path: "/admin/transport-manager/vehicle-assign" },
        ],
      },
    ],
  },
  {
    title: "Settings",
    icon: <MdSettings />,
    submenu: [
      { label: "System Setting", path: "/admin/settings/system-setting" },
    ],
  },
  {
    title: "Chat",
    icon: <MdOutlineChat />,
    submenu: [
      { label: "Chat", path: "/admin/chat" },
    ],
  },
  {
    title: "Extra",
    icon: <MdExtension />,
    submenu: [
      { label: "Application", path: "/admin/extra/application" },
      { label: "Server", path: "/admin/extra/server" },
      { label: "Cache", path: "/admin/extra/cache" },
      { label: "Update", path: "/admin/extra/update" },
    ],
  },
  {
    title: "Pages",
    icon: <MdPages />,
    submenu: [
      { label: "FAQ's", path: "/admin/pages/faqs" },
      { label: "Gallery", path: "/admin/pages/gallery" },
      { label: "Trending Offers", path: "/admin/pages/trending-offers" },
      { label: "Testimonial", path: "/admin/pages/testimonial" },
      { label: "Operator", path: "/admin/pages/operator" },
      { label: "Operation", path: "/admin/pages/operation" },
      { label: "Report & Request", path: "/admin/report-request" },
    ],
  },
 
];

// Stat Cards
const STAT_CARDS = [
  {
    label: "Total Users",
    value: "1,310",
    icon: <MdPerson className="w-8 h-8" />,
    gradient: "from-blue-500 to-purple-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Active Users",
    value: "1,263",
    icon: <MdPerson className="w-8 h-8" />,
    gradient: "from-green-500 to-teal-600",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    label: "Email Unverified",
    value: "47",
    icon: <MdNotifications className="w-8 h-8" />,
    gradient: "from-red-500 to-pink-600",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    label: "Mobile Unverified",
    value: "0",
    icon: <MdNotifications className="w-8 h-8" />,
    gradient: "from-orange-500 to-yellow-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    label: "Total Earnings",
    value: "$14,795.00",
    icon: <MdVpnKey className="w-8 h-8" />,
    gradient: "from-yellow-500 to-orange-600",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    label: "Latest Booking",
    value: "$7,080.00",
    icon: <MdVpnKey className="w-8 h-8" />,
    gradient: "from-indigo-500 to-purple-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    label: "Recent Payment",
    value: "$304.95",
    icon: <MdVpnKey className="w-8 h-8" />,
    gradient: "from-teal-500 to-cyan-600",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
];

export { SIDEBAR_MENUS, STAT_CARDS };

function SidebarMenu({ menus }) {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
    const navigate = useNavigate();


  function toggleMenu(index) {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const isActiveLink = (path) => location.pathname === path;

  const isActiveParent = (submenu) => {
    return submenu?.some((item) => location.pathname === item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login"); // or "/admin-login" if that's your route
  };

  return (
    <aside className="min-h-screen w-72 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 p-6 flex flex-col shadow-lg">
      <div className="mb-8 flex items-center justify-center">
        <div className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] p-3 rounded-xl shadow-lg">
          <img
            src="https://ext.same-assets.com/1324810520/2234926623.png"
            alt="ANT Logo"
            className="h-10 w-auto filter brightness-0 invert"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {menus.map((menu, i) => (
          <div key={menu.title} className="group">
            {menu.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(i)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 group-hover:shadow-md ${
                    isActiveParent(menu.submenu) || openMenus[i]
                      ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white shadow-lg'
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3 text-xl">{menu.icon}</span>
                  <span className="font-medium flex-grow">{menu.title}</span>
                  {openMenus[i] ? (
                    <MdExpandLess className="text-lg" />
                  ) : (
                    <MdExpandMore className="text-lg" />
                  )}
                </button>
                {openMenus[i] && (
                  <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                    {menu.submenu.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={`block text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                          isActiveLink(item.path)
                            ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white shadow-md transform translate-x-1'
                            : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-800 hover:translate-x-1'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-md ${
                  menu.path && isActiveLink(menu.path)
                    ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white shadow-lg transform translate-x-1'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:translate-x-1'
                }`}
                to={menu.path || '#'}
              >
                <span className="mr-3 text-xl">{menu.icon}</span>
                <span>{menu.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
 {/* Logout Button */}
        <div className="mt-6 px-6">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
          >
            Logout
          </button>
        </div>
      <div className="mt-8 text-xs font-bold text-center text-white bg-gradient-to-r from-[#3B4B96] to-[#FF5722] py-3 rounded-xl shadow-lg">
        A N T SOFT SOLUTION
      </div>
    </aside>  );
}

function StatCard({ label, value, icon, gradient, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-gray-500 mb-2 text-sm font-medium">{label}</div>
          <div className={`font-bold text-3xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {value}
          </div>
        </div>
        <div className={`${iconBg} ${iconColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}


export default function AdminDashboard() {
  return (
    
<div className="flex bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-[Poppins,Arial,sans-serif]">
        {/* Sidebar */}
        <SidebarMenu menus={SIDEBAR_MENUS} />
     {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="flex h-16 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] items-center px-8 justify-between shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-96 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/90 backdrop-blur-sm transition-all duration-300"
                />
              </div>
            </div>
 <div className="flex items-center space-x-6">
              <div className="relative cursor-pointer hover:scale-110 transition-transform duration-300">
                <MdNotifications className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                  9+
                </span>
              </div>
              <MdLanguage className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform duration-300" />
              <MdVpnKey className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform duration-300" />
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300">
                <span className="text-white font-medium">admin</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MdPerson className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </header>        <main className="flex-1 p-8">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {STAT_CARDS.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>
               <DashboardCharts />

        </main>
        
      </div>
    </div>
  );
}
function SamplePage({ title }) {
  return (
    <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-gray-600 mt-2">This is the {title} page.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center text-gray-500">
          <div className="w-20 h-20 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-full mx-auto mb-6 flex items-center justify-center">
            <MdSettings className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Coming Soon</h3>
          <p className="text-gray-600">This feature is under development.</p>
          <button className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white px-6 py-2.5 rounded-xl hover:from-[#2C3A7D] hover:to-[#E64A19] transition-all duration-300 flex items-center group shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mx-auto mt-6">
            Get Notified
          </button>
        </div>
      </div>
    </main>
  );
}

