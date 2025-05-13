const API_BASE_URL = "https://antbusbackend-2.onrender.com";

const API_URLS = {
  // ---------------------- AUTH ---------------------- //
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // ---------------------- REQUIRE TOKEN ---------------------- //

  OPERATORS: `${API_BASE_URL}/api/operators`,
  OPERATORS_REQUESTS: `${API_BASE_URL}/api/operators/requests`,
  FIND_OPERATORS: (id) => `${API_BASE_URL}/api/operators/${id}`,

  ACCEPT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/accept/${id}`,
  REJECT_OPERATOR_REQUEST: (id) => `${API_BASE_URL}/api/operators/reject/${id}`,
};

export default API_URLS;
