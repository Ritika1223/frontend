const API_BASE_URL = "http://localhost:8080";

const API_URLS = {
  // ---------------------- AUTH ---------------------- //
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // ---------------------- REQUIRE TOKEN ---------------------- //

  OPERATORS: `${API_BASE_URL}/api/operators`,
  FIND_OPERATORS: (id) => `${API_BASE_URL}/api/operators/${id}`,
};

export default API_URLS;
