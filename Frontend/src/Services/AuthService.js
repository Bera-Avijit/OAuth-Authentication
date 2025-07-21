import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const AuthService = {
  getCurrentUser: async () => {
    try {
      const response = api.get("/api/auth/current-user");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
      window.location.href = `${BASE_URL}/logout`; // Redirect to logout page
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  loginWithGoogle: () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  },

  loginWithGitHub: () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/github`;
  },
};
