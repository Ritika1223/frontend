// AppContent.jsx
import { useState } from 'react';
import { useLocation, Routes, Route,  Navigate } from 'react-router-dom';

import ContactPopup from './Pages/ContactPopup';
import EnquiryForm from './Pages/EnquiryForm';
import OperatorsList from './Pages/OperatorsList';
import OperatorDetails from './Pages/OperatorDetails';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './Pages/Login';
import ProtectedRoute from './Pages/ProtectedRoute';
import OperatorForm from './Pages/OperatorForm';
import Footer from './components/Footer'; // Import the Footer component
import OperatorRequestList from './Pages/OperatorRequestList';
import AdminDashboard from './Pages/AdminDashboard';
import Register from './Pages/Authentication/Register';
import UserLogin from './Pages/Authentication/UserLogin';
import UserDashboard from './Pages/Dashboard.jsx/UserDashboard';
import Profile from './Pages/Dashboard.jsx/Profile';
import MyBookings from './Pages/Dashboard.jsx/MyBookings';
import Offers from './Pages/Dashboard.jsx/Offers';
import Dashboard from './components/Dashboard';


// ADMIN
import ManageUser from './Pages/admin/admin/ManageUser';
import AssignModules from './Pages/admin/admin/AssignModules';
import ManageIds from './Pages/admin/admin/ManageIds';

// MASTER
import ManageExtraCharge from './Pages/admin/master/ManageExtraCharge';
import ManageGst from './Pages/admin/master/ManageGst';
import ManageGstReport from './Pages/admin/master/ManageGstReport';
import ManageOffer from './Pages/admin/master/ManageOffer';

// VEHICLE
import ManageVehicle from './Pages/admin/vehicle/ManageVehicle';
import ManageVehicleType from './Pages/admin/vehicle/ManageVehicleType';
import ManageVehicleName from './Pages/admin/vehicle/ManageVehicleName';

// OPERATOR
import AddOperator from './Pages/admin/operator/AddOperator';
import ManageOperator from './Pages/admin/operator/ManageOperator';
import OperatorAccount from './Pages/admin/operator/OperatorAccount';

// OPERATIONS (Booking)
import ManageBooking from './Pages/admin/operations/ManageBooking';
import ManagePayment from './Pages/admin/operations/ManagePayment';
import ManageDutyVoucher from './Pages/admin/operations/ManageDutyVoucher';
import ManageInvoice from './Pages/admin/operations/ManageInvoice';

// BUS HIRE (Hire)
import ManageLocalBusHire from './Pages/admin/bus-hire/ManageLocal';
import ManageOutstationBusHire from './Pages/admin/bus-hire/ManageOutstation';

// MINIVAN HIRE (Hire)
import ManageLocalMinivan from './Pages/admin/minivan-hire/ManageLocal';
import ManageOutstationMinivan from './Pages/admin/minivan-hire/ManageOutstation';

// CAR HIRE (Hire)
import ManageLocalCar from './Pages/admin/car-hire/ManageLocal';
import ManageOutstationCar from './Pages/admin/car-hire/ManageOutstation';

// BUS TICKET (Bus)
import ManageBus from './Pages/admin/bus-ticket/ManageBus';
import ManageCity from './Pages/admin/bus-ticket/ManageCity';
import ManageService from './Pages/admin/bus-ticket/ManageService';
import ManageRoute from './Pages/admin/bus-ticket/ManageRoute';
import ManageQuota from './Pages/admin/bus-ticket/ManageQuota';
import ManagePassenger from './Pages/admin/bus-ticket/ManagePassenger';

// BUS TOUR (Tour)
import ManageTour from './Pages/admin/bus-tour/ManageTour';

// SETTINGS
import SystemSetting from './Pages/admin/settings/SystemSetting';

// CHAT
import ChatPage from './Pages/admin/chat/Chat';

// EXTRA
import Application from './Pages/admin/extra/Application';
import Server from './Pages/admin/extra/Server';
import Cache from './Pages/admin/extra/Cache';
import Update from './Pages/admin/extra/Update';

// Pages (Static Pages)
import Faqs from './Pages/admin/pages/Faqs';
import Gallery from './Pages/admin/pages/Gallery';
import TrendingOffers from './Pages/admin/pages/TrendingOffers';
import Testimonial from './Pages/admin/pages/Testimonial';
import OperatorPage from './Pages/admin/pages/Operator';
import OperationPage from './Pages/admin/pages/Operation';
import ReportRequest from './Pages/admin/ReportRequest';


function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const handleContactClick = () => setShowContact(true);
  const handleCloseContact = () => setShowContact(false);

  const pathname = location.pathname;
  const shouldShowNavbar =
  !['operators', 'login', 'operator-registration', 'admin'].includes(pathname.split('/')[1]) &&
  !pathname.includes('operator/');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {shouldShowNavbar && (
        <Navbar onContactClick={handleContactClick} onEnquiryClick={() => setShowForm(true)} />
      )}

      <main className="flex-grow relative">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showContact={showContact}
                showForm={showForm}
                handleContactClick={handleContactClick}
                handleCloseContact={handleCloseContact}
                setShowForm={setShowForm}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/operator-registration" element={<OperatorForm />} />
          <Route
            path="/operators"
            element={
              <ProtectedRoute>
                <OperatorsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operators/requests"
            element={
              <ProtectedRoute>
                <OperatorRequestList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              
                <AdminDashboard/>
                          }
          />
          
          <Route
            path="/operator/:id"
            element={
              <ProtectedRoute>
                <OperatorDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/contact-us" element={<ContactPopup />} />

          <Route path="/register" element={<Register />} />
                    <Route path="/user-login" element={<UserLogin />} />

  
  {/* DASHBOARD ROUTES NESTED */}
<Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >

    <Route path="user/dashboard" element={<UserDashboard />} />
    <Route path="dashboard/bookings" element={<MyBookings />} />
    <Route path="dashboard/offers" element={<Offers />} />
    <Route path="dashboard/profile" element={<Profile />} />
  </Route>



   {/* ADMIN */}
          <Route path="/admin/admin/manage-user" element={<ManageUser />} />
          <Route path="/admin/admin/assign-modules" element={<AssignModules />} />
          <Route path="/admin/admin/manage-ids" element={<ManageIds />} />

          {/* MASTER */}
          <Route path="/admin/master/manage-extra-charge" element={<ManageExtraCharge />} />
          <Route path="/admin/master/manage-gst" element={<ManageGst />} />
          <Route path="/admin/master/manage-gst-report" element={<ManageGstReport />} />
          <Route path="/admin/master/manage-offer" element={<ManageOffer />} />

          {/* VEHICLE */}
          <Route path="/admin/vehicle/manage-vehicle" element={<ManageVehicle />} />
          <Route path="/admin/vehicle/manage-vehicle-type" element={<ManageVehicleType />} />
          <Route path="/admin/vehicle/manage-vehicle-name" element={<ManageVehicleName />} />

          {/* OPERATOR */}
          <Route path="/admin/operator/add-operator" element={<AddOperator />} />
          <Route path="/admin/operator/manage-operator" element={<ManageOperator />} />
          <Route path="/admin/operator/operator-account" element={<OperatorAccount />} />

          {/* OPERATIONS (Booking) */}
          <Route path="/admin/operations/manage-booking" element={<ManageBooking />} />
          <Route path="/admin/operations/manage-payment" element={<ManagePayment />} />
          <Route path="/admin/operations/manage-duty-voucher" element={<ManageDutyVoucher />} />
          <Route path="/admin/operations/manage-invoice" element={<ManageInvoice />} />

          {/* BUS HIRE */}
          <Route path="/admin/bus-hire/manage-local" element={<ManageLocalBusHire />} />
          <Route path="/admin/bus-hire/manage-outstation" element={<ManageOutstationBusHire />} />

          {/* MINIVAN HIRE */}
          <Route path="/admin/minivan-hire/manage-local" element={<ManageLocalMinivan />} />
          <Route path="/admin/minivan-hire/manage-outstation" element={<ManageOutstationMinivan />} />

          {/* CAR HIRE */}
          <Route path="/admin/car-hire/manage-local" element={<ManageLocalCar />} />
          <Route path="/admin/car-hire/manage-outstation" element={<ManageOutstationCar />} />

          {/* BUS TICKET */}
          <Route path="/admin/bus-ticket/manage-bus" element={<ManageBus />} />
          <Route path="/admin/bus-ticket/manage-city" element={<ManageCity />} />
          <Route path="/admin/bus-ticket/manage-service" element={<ManageService />} />
          <Route path="/admin/bus-ticket/manage-route" element={<ManageRoute />} />
          <Route path="/admin/admin/bus-ticket/manage-quota" element={<ManageQuota />} />
          <Route path="/admin/bus-ticket/manage-passenger" element={<ManagePassenger />} />

          {/* BUS TOUR */}
          <Route path="/admin/bus-tour/manage-tour" element={<ManageTour />} />

          {/* SETTINGS */}
          <Route path="/admin/settings/system-setting" element={<SystemSetting />} />

          {/* CHAT */}
          <Route path="/admin/chat" element={<ChatPage />} />

          {/* EXTRA */}
          <Route path="/admin/extra/application" element={<Application />} />
          <Route path="/admin/extra/server" element={<Server />} />
          <Route path="/admin/extra/cache" element={<Cache />} />
          <Route path="/admin/extra/update" element={<Update />} />

          {/* PAGES (Static Pages) */}
          <Route path="/admin/pages/faqs" element={<Faqs />} />
          <Route path="/admin/pages/gallery" element={<Gallery />} />
          <Route path="/admin/pages/trending-offers" element={<TrendingOffers />} />
          <Route path="/admin/pages/testimonial" element={<Testimonial />} />
          <Route path="/admin/pages/operator" element={<OperatorPage />} />
          <Route path="/admin/pages/operation" element={<OperationPage />} />

          {/* REPORT REQUEST */}
          <Route path="/admin/report-request" element={<ReportRequest />} />
</Routes>

      </main>

      {/* Render Footer only on the Home page */}
      {pathname === '/' && <Footer />}
    </div>
  );
}

export default AppContent;
