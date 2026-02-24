/**
 * API Client Configuration
 * Centralized API calls for the frontend
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const apiClient = {
  // Payment endpoints
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  verifyPayment: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/api/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  // Add more API methods as needed
  getEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    return response.json();
  },

  getDonations: async () => {
    const response = await fetch(`${API_BASE_URL}/api/donations`);
    return response.json();
  },
};
