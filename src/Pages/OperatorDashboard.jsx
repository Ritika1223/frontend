import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Home,
  User,
  Users,
  Car,
  FileText,
  IndianRupeeIcon,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

import HomePage from './dashboard/HomePage';
import ProfilePage from './dashboard/ProfilePage';
import EmployeePage from './dashboard/EmployeePage';
import VehiclePage from './dashboard/VehiclePage';
import BookingOrdersPage from './dashboard/BookingOrdersPage';
import CreditAmountPage from './dashboard/CreditAmountPage';
import DebitAmountPage from './dashboard/DebitAmountPage';
import ManageInvoicePage from './dashboard/ManageInvoicePage';
import ManageFuelChargePage from './dashboard/ManageFuelChargePage';
import ManageTollTaxesPage from './dashboard/ManageTollTaxesPage';
import ServiceAndMaintenance from './dashboard/ServiceAndMaintenance';


const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDebooMenuOpen, setIsDebooMenuOpen] = useState(false);
  const [isMaintenanceMenuOpen, setIsMaintenanceMenuOpen] = useState(false);
    const navigate = useNavigate();
    const operatorData = JSON.parse(localStorage.getItem('userData'));
const operatorName = operatorData?.name || 'Operator';
const operatorId = operatorData?.id;
console.log('Logged-in Operator:', operatorData);



    const handleLogout = () => {
    localStorage.removeItem('O_token');
    localStorage.removeItem('userData');
    navigate('/operator-login'); // Change to '/admin-login' if needed
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'employee', label: 'Employee', icon: Users },
    { id: 'vehicle', label: 'Vehicle', icon: Car },
    { id: 'booking-orders', label: 'Booking Orders', icon: FileText },
    {
      id: 'debo-book',
      label: 'Debo Book',
      icon: IndianRupeeIcon,
      hasSubmenu: true,
      submenu: [
        { id: 'credit-amount', label: 'Credit Amount', icon: CreditCard },
        { id: 'debit-amount', label: 'Debit Amount', icon: CreditCard }
      ]
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { id: 'manage-fuel-charge', label: 'Manage Fuel Charge' },
        { id: 'manage-toll-taxes', label: 'Manage Toll Taxes' },
        { id: 'service-maintenance', label: 'Service And Maintenance' }
      ]
    },
    { id: 'manage-invoice', label: 'Manage Invoice', icon: FileText }
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === 'debo-book') {
      setIsDebooMenuOpen(!isDebooMenuOpen);
      setIsMaintenanceMenuOpen(false);
      return;
    }
    if (itemId === 'maintenance') {
      setIsMaintenanceMenuOpen(!isMaintenanceMenuOpen);
      setIsDebooMenuOpen(false);
      return;
    }

    setActiveTab(itemId);

    if (!['credit-amount', 'debit-amount'].includes(itemId)) {
      setIsDebooMenuOpen(false);
    }
    if (!['manage-fuel-charge', 'manage-toll-taxes', 'service-maintenance'].includes(itemId)) {
      setIsMaintenanceMenuOpen(false);
    }
  };

  const renderContent = () => {
      const props = { operatorId }; // pass to all components

    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'profile': return <ProfilePage />;
      case 'employee': return <EmployeePage />;
      case 'vehicle': return <VehiclePage />;
      case 'booking-orders': return <BookingOrdersPage />;
      case 'credit-amount': return <CreditAmountPage />;
      case 'debit-amount': return <DebitAmountPage />;
      case 'manage-fuel-charge': return <ManageFuelChargePage />;
      case 'manage-toll-taxes': return <ManageTollTaxesPage />;
      case 'service-maintenance': return <ServiceAndMaintenance />;
      case 'manage-invoice': return <ManageInvoicePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B4B96] to-[#FF5722]">
    AntBus
  </h1>
  <p className="text-sm text-gray-600 mt-1">Operator Dashboard</p>
  <div className="mt-3 flex items-center space-x-2">
    <User className="w-5 h-5 text-gray-600" />
    <span className="text-sm text-gray-800 font-semibold">{operatorName}</span>
  </div>
</div>


        <nav className="mt-6">
          {menuItems.map((item) => {
            const isSubmenuOpen =
              item.id === 'debo-book' ? isDebooMenuOpen :
              item.id === 'maintenance' ? isMaintenanceMenuOpen : false;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    isSubmenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {item.hasSubmenu && isSubmenuOpen && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveTab(subItem.id)}
                        className={`w-full flex items-center px-12 py-2 text-left hover:bg-gray-100 transition-colors ${
                          activeTab === subItem.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {subItem.icon && <subItem.icon className="w-4 h-4 mr-3" />}
                        <span className="text-sm">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default OperatorDashboard;
