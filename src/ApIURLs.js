const API_BASE_URL = "http://localhost:8080";

const API_URLS = {
  // ---------------------- ADMIN AUTH ---------------------- //
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // ---------------------- OPERATOR MANAGEMENT (Require Token) ---------------------- //
  OPERATORS: `${API_BASE_URL}/api/operators`,
  OPERATORS_REQUESTS: `${API_BASE_URL}/api/operators/requests`,
  FIND_OPERATORS: (id) => `${API_BASE_URL}/api/operators/${id}`,
  ACCEPT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/accept/${id}`,
  REJECT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/reject/${id}`,
  SET_OPERATOR_CREDENTIALS: (id) => `${API_BASE_URL}/api/operators/set-credentials/${id}`,

  // ---------------------- USER AUTH (OTP Based) ---------------------- //
  USER_REGISTER: `${API_BASE_URL}/auth/register/send-otp`,
  USER_REGISTER_OTP: `${API_BASE_URL}/auth/register/verify-otp`,
  USER_LOGIN: `${API_BASE_URL}/auth/login/send-otp`,
  USER_LOGIN_OTP: `${API_BASE_URL}/auth/login/verify-otp`,

  // ---------------------- OPERATOR AUTH (OTP Based) ---------------------- //
  OPERATOR_LOGIN: `${API_BASE_URL}/api/auth/operator/login`,

  OPERATOR_SEND_OTP: `${API_BASE_URL}/api/auth/operator/send-otp`,
  OPERATOR_VERIFY_OTP: `${API_BASE_URL}/api/auth/operator/verify-otp`,

  // ---------------------- EMPLOYEES ---------------------- //
  EMPLOYEES_SAVED: `${API_BASE_URL}/api/employees`,
  EMPLOYEES_LIST: `${API_BASE_URL}/api/employees`,

  // ---------------------- VEHICLES ---------------------- //
  VEHICLES: `${API_BASE_URL}/api/vehicles`,
  ADD_BUS_NUMBER:`${API_BASE_URL}/api/vehicles/add-bus-number`,

  // ---------------------- BOOKINGS ---------------------- //
  BOOKINGS_SAVED: `${API_BASE_URL}/api/booking`,
  BOOKINGS_LIST: `${API_BASE_URL}/api/booking`,

  // ---------------------- CREDITS ---------------------- //
  CREDITS_SAVED: `${API_BASE_URL}/api/credits`,
  CREDITS_LIST: `${API_BASE_URL}/api/credits`,

  // ---------------------- DEBITS ---------------------- //
  DEBITS_SAVED: `${API_BASE_URL}/api/debits`,
  DEBITS_LIST: `${API_BASE_URL}/api/debits`,

  // ---------------------- INVOICES ---------------------- //
  INVOICES_SAVED: `${API_BASE_URL}/api/invoice`,
  INVOICES_LIST: `${API_BASE_URL}/api/invoice`,

  // ---------------------- TOLL TAXES ---------------------- //
  TOLL_SAVED: `${API_BASE_URL}/api/tolltaxes`,
  TOLL_LIST: `${API_BASE_URL}/api/tolltaxes`,

  // ---------------------- FUEL CHARGES ---------------------- //
  FUEL_SAVED: `${API_BASE_URL}/api/fuelcharges`,
  FUEL_LIST: `${API_BASE_URL}/api/fuelcharges`,

  // ---------------------- SERVICES ---------------------- //
  SERVICE_SAVED: `${API_BASE_URL}/api/services`,
  SERVICE_LIST: `${API_BASE_URL}/api/services`,
};

export default API_URLS;
