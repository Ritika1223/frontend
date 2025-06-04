// AppContent.jsx

import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

// Components (Common)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

// Authentication Pages
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import UserLogin from './Pages/Authentication/UserLogin';

// Public Pages
import ContactPopup from './Pages/ContactPopup';
import EnquiryForm from './Pages/EnquiryForm';
import OperatorsList from './Pages/OperatorsList';
import OperatorDetails from './Pages/OperatorDetails';
import OperatorForm from './Pages/OperatorForm';
import OperatorLogin from './Pages/Authentication/OperatorLogin';

// User Dashboard Pages
import UserDashboard from './Pages/Dashboard/UserDashboard';
import Profile from './Pages/Dashboard/Profile';
import MyBookings from './Pages/Dashboard/MyBookings';
import Offers from './Pages/Dashboard/Offers';

// Operator Pages
import OperatorDashboard from './Pages/OperatorDashboard';
import OperatorRequestList from './Pages/OperatorRequestList';

// Admin Dashboard
import AdminDashboard from './Pages/AdminDashboard';

// Admin → Admin Management
import ManageUser from './Pages/admin/admin/ManageUser';
import AssignModules from './Pages/admin/admin/AssignModules';
import ManageIds from './Pages/admin/admin/ManageIds';

// Admin → Master
import ManageExtraCharge from './Pages/admin/master/ManageExtraCharge';
import ManageGst from './Pages/admin/master/ManageGst';
import ManageGstReport from './Pages/admin/master/ManageGstReport';
import ManageOffer from './Pages/admin/master/ManageOffer';

// Admin → Vehicle
import ManageVehicle from './Pages/admin/vehicle/ManageVehicle';
import ManageVehicleType from './Pages/admin/vehicle/ManageVehicleType';
import ManageVehicleName from './Pages/admin/vehicle/ManageVehicleName';

// Admin → Operator
import AddOperator from './Pages/admin/operator/AddOperator';
import ManageOperator from './Pages/admin/operator/ManageOperator';
import OperatorAccount from './Pages/admin/operator/OperatorAccount';

// Admin → Operations (Booking)
import ManageBooking from './Pages/admin/operations/ManageBooking';
import ManagePayment from './Pages/admin/operations/ManagePayment';
import ManageDutyVoucher from './Pages/admin/operations/ManageDutyVoucher';
import ManageInvoice from './Pages/admin/operations/ManageInvoice';

// Admin → Hire Sections
import ManageLocalBusHire from './Pages/admin/bus-hire/ManageLocal';
import ManageOutstationBusHire from './Pages/admin/bus-hire/ManageOutstation';

import ManageLocalMinivan from './Pages/admin/minivan-hire/ManageLocal';
import ManageOutstationMinivan from './Pages/admin/minivan-hire/ManageOutstation';

import ManageLocalCar from './Pages/admin/car-hire/ManageLocal';
import ManageOutstationCar from './Pages/admin/car-hire/ManageOutstation';

// Admin → Bus Ticket
import ManageBus from './Pages/admin/bus-ticket/ManageBus';
import ManageCity from './Pages/admin/bus-ticket/ManageCity';
import ManageService from './Pages/admin/bus-ticket/ManageService';
import ManageRoute from './Pages/admin/bus-ticket/ManageRoute';
import ManageQuota from './Pages/admin/bus-ticket/ManageQuota';
import ManagePassenger from './Pages/admin/bus-ticket/ManagePassenger';

// Admin → Bus Tour
import ManageTour from './Pages/admin/bus-tour/ManageTour';

// Admin → Settings
import SystemSetting from './Pages/admin/settings/SystemSetting';

// Admin → Chat
import ChatPage from './Pages/admin/chat/Chat';

// Admin → Extra Tools
import Application from './Pages/admin/extra/Application';
import Server from './Pages/admin/extra/Server';
import Cache from './Pages/admin/extra/Cache';
import Update from './Pages/admin/extra/Update';

// Admin → Static Pages
import Faqs from './Pages/admin/pages/Faqs';
import Gallery from './Pages/admin/pages/Gallery';
import TrendingOffers from './Pages/admin/pages/TrendingOffers';
import Testimonial from './Pages/admin/pages/Testimonial';
import OperatorPage from './Pages/admin/pages/Operator';
import OperationPage from './Pages/admin/pages/Operation';
import ReportRequest from './Pages/admin/ReportRequest';

// Route Guards
import AdminProtection from '../protection/adminProtection';
import UserProtection from '../protection/UserProtection';
import OperatorProtection from '../protection/OperatorProtection';

function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const pathname = location.pathname;
  const shouldShowNavbar =
    !['operators', 'login', 'operator-registration', 'admin'].includes(pathname.split('/')[1]) &&
    !pathname.includes('operator/');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {shouldShowNavbar && (
        <Navbar onContactClick={() => setShowContact(true)} onEnquiryClick={() => setShowForm(true)} />
      )}

      <main className="flex-grow relative">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Home
                showContact={showContact}
                showForm={showForm}
                handleContactClick={() => setShowContact(true)}
                handleCloseContact={() => setShowContact(false)}
                setShowForm={setShowForm}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/operator-registration" element={<OperatorForm />} />
          <Route path="/contact-us" element={<ContactPopup />} />
          <Route path="/operator-login" element={<OperatorLogin />} />



          {/* Admin Protected Routes */}
          <Route element={<AdminProtection />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/operator/:id" element={<OperatorDetails />} />
            <Route path="/operators/requests" element={<OperatorRequestList />} />

            {/* Admin: Admin Management */}
            <Route path="/admin/admin/manage-user" element={<ManageUser />} />
            <Route path="/admin/admin/assign-modules" element={<AssignModules />} />
            <Route path="/admin/admin/manage-ids" element={<ManageIds />} />

            {/* Admin: Master */}
            <Route path="/admin/master/manage-extra-charge" element={<ManageExtraCharge />} />
            <Route path="/admin/master/manage-gst" element={<ManageGst />} />
            <Route path="/admin/master/manage-gst-report" element={<ManageGstReport />} />
            <Route path="/admin/master/manage-offer" element={<ManageOffer />} />

            {/* Admin: Vehicle */}
            <Route path="/admin/vehicle/manage-vehicle" element={<ManageVehicle />} />
            <Route path="/admin/vehicle/manage-vehicle-type" element={<ManageVehicleType />} />
            <Route path="/admin/vehicle/manage-vehicle-name" element={<ManageVehicleName />} />

            {/* Admin: Operator */}
            <Route path="/admin/operator/add-operator" element={<AddOperator />} />
            <Route path="/admin/operator/manage-operator" element={<ManageOperator />} />
            <Route path="/admin/operator/operator-account" element={<OperatorAccount />} />

            {/* Admin: Operations */}
            <Route path="/admin/operations/manage-booking" element={<ManageBooking />} />
            <Route path="/admin/operations/manage-payment" element={<ManagePayment />} />
            <Route path="/admin/operations/manage-duty-voucher" element={<ManageDutyVoucher />} />
            <Route path="/admin/operations/manage-invoice" element={<ManageInvoice />} />

            {/* Admin: Bus/Minivan/Car Hire */}
            <Route path="/admin/bus-hire/manage-local" element={<ManageLocalBusHire />} />
            <Route path="/admin/bus-hire/manage-outstation" element={<ManageOutstationBusHire />} />
            <Route path="/admin/minivan-hire/manage-local" element={<ManageLocalMinivan />} />
            <Route path="/admin/minivan-hire/manage-outstation" element={<ManageOutstationMinivan />} />
            <Route path="/admin/car-hire/manage-local" element={<ManageLocalCar />} />
            <Route path="/admin/car-hire/manage-outstation" element={<ManageOutstationCar />} />

            {/* Admin: Bus Ticket */}
            <Route path="/admin/bus-ticket/manage-bus" element={<ManageBus />} />
            <Route path="/admin/bus-ticket/manage-city" element={<ManageCity />} />
            <Route path="/admin/bus-ticket/manage-service" element={<ManageService />} />
            <Route path="/admin/bus-ticket/manage-route" element={<ManageRoute />} />
            <Route path="/admin/admin/bus-ticket/manage-quota" element={<ManageQuota />} />
            <Route path="/admin/bus-ticket/manage-passenger" element={<ManagePassenger />} />

            {/* Admin: Bus Tour */}
            <Route path="/admin/bus-tour/manage-tour" element={<ManageTour />} />

            {/* Admin: Settings */}
            <Route path="/admin/settings/system-setting" element={<SystemSetting />} />

            {/* Admin: Chat */}
            <Route path="/admin/chat" element={<ChatPage />} />

            {/* Admin: Extra */}
            <Route path="/admin/extra/application" element={<Application />} />
            <Route path="/admin/extra/server" element={<Server />} />
            <Route path="/admin/extra/cache" element={<Cache />} />
            <Route path="/admin/extra/update" element={<Update />} />

            {/* Admin: Pages */}
            <Route path="/admin/pages/faqs" element={<Faqs />} />
            <Route path="/admin/pages/gallery" element={<Gallery />} />
            <Route path="/admin/pages/trending-offers" element={<TrendingOffers />} />
            <Route path="/admin/pages/testimonial" element={<Testimonial />} />
            <Route path="/admin/pages/operator" element={<OperatorPage />} />
            <Route path="/admin/pages/operation" element={<OperationPage />} />
            <Route path="/admin/report-request" element={<ReportRequest />} />
          </Route>

          {/* User Protected Routes */}
          <Route element={<UserProtection />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="user/dashboard" element={<UserDashboard />} />
              <Route path="dashboard/bookings" element={<MyBookings />} />
              <Route path="dashboard/offers" element={<Offers />} />
              <Route path="dashboard/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Operator Protected Routes */}
          <Route element={<OperatorProtection />}>
            <Route path="/operator/dashboard" element={<OperatorDashboard />} />
          </Route>
        </Routes>
      </main>

      {/* Footer Only on Home Page */}
      {pathname === '/' && <Footer />}
    </div>
  );
}

export default AppContent;
