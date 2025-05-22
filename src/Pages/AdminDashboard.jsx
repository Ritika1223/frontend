import React, { useState } from "react";
import DashboardCharts from './DashboardCharts';

import { Link } from "react-router-dom";
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
} from 'react-icons/md';


// Map menu/submenu structure to paths
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


const STAT_CARDS = [
   {
    label: "Total Users",
    value: "1310",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
    ),
    border: "border-blue-400",
  },
  {
    label: "Active Users",
    value: "1263",
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
    ),
    border: "border-green-400",
  },
  {
    label: "Email Unverified Users",
    value: "47",
    icon: (
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
    ),
    border: "border-red-400",
  },
  {
    label: "Mobile Unverified Users",
    value: "0",
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17v4h8v-4M12 21v-4m-2 0a2 2 0 012-2 2 2 0 012 2" /></svg>
    ),
    border: "border-orange-300",
  },
  {
    label: "Total Earnings",
    value: "$14,795.00",
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.333 0-2-.667-2-2s.667-2 2-2 2 .667 2 2-.667 2-2 2zm0 3c2 0 3.5 1.5 3.5 3.5S14 18 12 18s-3.5-1.5-3.5-3.5S10 11 12 11z" /></svg>
    ),
    border: "border-yellow-400",
  },
  {
    label: "Latest Booking Amount",
    value: "$7,080.00",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10h18M9 16h6M12 3v18" /></svg>
    ),
    border: "border-indigo-400",
  },
  {
    label: "Recent Payment",
    value: "$304.95",
    icon: (
      <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
    ),
    border: "border-teal-400",
  },
 
];

function SidebarMenu({ menus }) {
  const [openMenus, setOpenMenus] = useState({});
  function toggleMenu(index) {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  }
  return (
    <aside className="min-h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8 flex items-center">
        <img src="https://ext.same-assets.com/1324810520/2234926623.png" alt="ANT Logo" className="h-12" />
      </div>
      <ul className="flex-1 space-y-1">
        {menus.map((menu, i) => (
          <li key={menu.title}>
            {menu.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(i)}
                  className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="mr-3 text-xl">{menu.icon}</span>
                  <span className="font-medium flex-grow">{menu.title}</span>
                  <span className="transform transition-transform duration-200 inline-block text-xs">
                    {openMenus[i] ? '▲' : '▼'}
                  </span>
                </button>
                {openMenus[i] && (
                  <ul className="pl-8 pb-2 space-y-1">
                    {menu.submenu.map((item) => (
                      <li key={item.label}>
                        <Link to={item.path} className="block text-sm py-1 px-2 rounded hover:bg-gradient-to-r hover:from-[#3B4B96] hover:to-[#FF5722] hover:text-white transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#3B4B96] hover:to-[#FF5722] hover:text-white font-medium transition-colors"
                to={menu.path}
              >
                <span className="mr-3 text-xl">{menu.icon}</span>
                <span>{menu.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-8 text-xs font-bold text-center text-white bg-[#3B4B96] py-2 rounded-md">A N T SOFT SOLUTION</div>
    </aside>
  );
}

function StatCard({ label, value, icon, border }) {
  return (
    <div className={`bg-white rounded-xl shadow-md ${border} border p-5 flex items-center justify-between min-w-[230px]`}>
      <div>
        <div className="text-gray-400 mb-1 text-sm font-medium">{label}</div>
        <div className="font-bold text-2xl text-gray-800">{value}</div>
      </div>
      <div className="ml-4">{icon}</div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex bg-[#f4f6fb] min-h-screen font-[Poppins,Arial,sans-serif]">
      {/* Sidebar */}
      <SidebarMenu menus={SIDEBAR_MENUS} />
      {/* Main dashboard content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex h-16 bg-[#3B4B96] items-center px-8 justify-between">
          <input type="text" placeholder="Search here..." className="w-96 px-4 py-2 rounded-md focus:outline-none" />
          <div className="flex items-center space-x-6">
            <span className="relative"><span className="absolute -top-1 -right-2 bg-red-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">9+</span>🔔</span>
            <span>🌐</span>
            <span>🔑</span>
            <span className="flex items-center"><span className="mr-2">admin</span><span className="text-2xl">👤</span></span>
          </div>
        </header>
        <main className="flex-1 p-8">
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
