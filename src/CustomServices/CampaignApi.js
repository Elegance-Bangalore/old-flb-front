import axios from "axios";
import { getCookie } from "@/CustomServices/GetCookies";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:5500";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return Promise.reject(new Error('Backend server is not available. Please check if the server is running.'));
    }
    
    if (error.response?.status === 403) {
      return Promise.reject(new Error(`Authentication failed: ${error.response?.data?.message || 'Access denied'}`));
    }
    
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Authentication expired. Please login again.'));
    }
    
    return Promise.reject(error);
  }
);

// Helper function to check authentication
const checkAuthentication = () => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }
  return token;
};

// Campaign API functions
export const campaignApi = {
  // Get all campaigns with pagination and filtering
  getCampaigns: async (params = {}) => {
    try {
      checkAuthentication(); // Check if user is authenticated
      const response = await api.get("/campaign", { params });
      return response.data;
    } catch (error) {
      console.error("Campaign API - Error fetching campaigns:", error);
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch campaigns");
    }
  },

  // Get campaign by ID
  getCampaignById: async (id) => {
    try {
      const response = await api.get(`/campaign/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch campaign");
    }
  },

  // Create new campaign
  createCampaign: async (formData) => {
    try {
      const response = await api.post("/campaign", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create campaign");
    }
  },

  // Update campaign
  updateCampaign: async (id, formData) => {
    try {
      const response = await api.put(`/campaign/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update campaign");
    }
  },

  // Delete campaign
  deleteCampaign: async (id) => {
    try {
      const response = await api.delete(`/campaign/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete campaign");
    }
  },

  // Update campaign status
  updateCampaignStatus: async (id, status) => {
    try {
      const response = await api.patch(`/campaign/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update campaign status");
    }
  },

  // Get campaign analytics
  getCampaignAnalytics: async () => {
    try {
      const response = await api.get("/campaign/analytics");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch campaign analytics");
    }
  },

  // Get campaign downloads data
  getCampaignDownloads: async (params = {}) => {
    try {
      checkAuthentication();
      const response = await api.get("/campaigns/downloads", { params });
      return response.data;
    } catch (error) {
      console.error("Campaign API - Error fetching campaign downloads:", error);
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch campaign downloads");
    }
  },

  // Save download request with user details
  saveDownloadRequest: async (campaignId, userDetails) => {
    try {
      // Validate required fields
      if (!campaignId) {
        throw new Error("Campaign ID is required");
      }
      if (!userDetails.name || !userDetails.email) {
        throw new Error("User name and email are required");
      }
      
      const requestData = {
        campaignId: campaignId,
        userName: userDetails.name.trim(),
        userEmail: userDetails.email.trim()
      };
      
      const response = await api.post("/campaign/download-request", requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in saveDownloadRequest:", error.response?.data);
      throw new Error(error.response?.data?.message || error.message || "Failed to save download request");
    }
  },

  // Check authentication status
  checkAuthStatus: () => {
    const token = getCookie("token");
    return {
      isAuthenticated: !!token,
      token: token ? `${token.substring(0, 20)}...` : null,
      apiUrl: API_BASE_URL
    };
  },
};

export default campaignApi;
