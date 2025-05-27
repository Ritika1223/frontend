const API_BASE_URL = "http://localhost:8080";

const API_URLS = {
  // ----------------------ADMIN AUTH ---------------------- //
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // ---------------------- REQUIRE TOKEN ---------------------- //

  OPERATORS: `${API_BASE_URL}/api/operators`,
  OPERATORS_REQUESTS: `${API_BASE_URL}/api/operators/requests`,
  FIND_OPERATORS: (id) => `${API_BASE_URL}/api/operators/${id}`,

  ACCEPT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/accept/${id}`,
  REJECT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/reject/${id}`,
SET_OPERATOR_CREDENTIALS: (id) => `${API_BASE_URL}/api/operators/set-credentials/${id}`,

    // ---------------------- USER AUTH ---------------------- //
    USER_REGISTER: `${API_BASE_URL}/auth/register/send-otp`,
        USER_REGISTER_OTP: `${API_BASE_URL}/auth/register/verify-otp`,

            USER_LOGIN: `${API_BASE_URL}/auth/login/send-otp`,
    USER_LOGIN_OTP: `${API_BASE_URL}/auth/login/verify-otp`,




};

export default API_URLS;
