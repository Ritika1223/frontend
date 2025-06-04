import React from 'react';
import { Link, useLocation, Outlet,  useNavigate } from 'react-router-dom';
import { LogOut, Home, Calendar, Gift, User, ArrowRight, Sparkles } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';



const Dashboard = () => {
  const location = useLocation();
    const navigate = useNavigate();


  
 const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/user-login"); // or "/admin-login" if that's your route
  };

  const menuItems = [
    { label: 'Home', path: '/user/dashboard', icon: Home },
    { label: 'My Bookings', path: '/dashboard/bookings', icon: Calendar },
    { label: 'Offers', path: '/dashboard/offers', icon: Gift },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-white to-blue-50/50 backdrop-blur-sm border-r border-white/20 shadow-xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-100/50">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-gradient-to-r from-[#3B4B96] to-[#FF5722] p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent text-center">
            AntBus
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1">Travel Smart, Travel Easy</p>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-blue-100/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#3B4B96] to-[#FF5722] rounded-full flex items-center justify-center shadow-lg">
              <FaUserCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Welcome back!</h3>
              <p className="text-sm text-gray-500">Travel enthusiast</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3B4B96] to-[#FF5722] text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-gray-800 hover:shadow-md hover:transform hover:scale-105'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <ArrowRight className="w-4 h-4 ml-auto text-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
         <div className="absolute bottom-6 left-4 right-4">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#3B4B96] to-[#FF5722] bg-clip-text text-transparent">
                Welcome to your account!
              </h2>
              <p className="text-gray-600 mt-1">Manage your travel experience with ease</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
