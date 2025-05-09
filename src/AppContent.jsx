// AppContent.jsx
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import ContactPopup from './components/ContactPopup';
import EnquiryForm from './components/EnquiryForm';
import OperatorsList from './components/OperatorsList';
import OperatorDetails from './components/OperatorDetails';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import OperatorForm from './components/OperatorForm';
import Footer from './components/Footer'; // Import the Footer component

function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const handleContactClick = () => setShowContact(true);
  const handleCloseContact = () => setShowContact(false);

  const pathname = location.pathname;
  const shouldShowNavbar =
    !['operators', 'login', 'operator-registration'].includes(pathname.split('/')[1]) &&
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
            path="/operator/:id"
            element={
              <ProtectedRoute>
                <OperatorDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/contact-us" element={<ContactPopup />} />
        </Routes>
      </main>

      {/* Render Footer only on the Home page */}
      {pathname === '/' && <Footer />}
    </div>
  );
}

export default AppContent;
