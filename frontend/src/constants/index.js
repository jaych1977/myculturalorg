/**
 * Constant values used throughout the application
 */

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'credit_card', name: 'Credit Card', icon: '💳' },
  { id: 'debit_card', name: 'Debit Card', icon: '💳' },
  { id: 'net_banking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Digital Wallets', icon: '💰' },
];

export const EVENTS_LIST = [
  'Classical Music Festival',
  'Kathak Dance Workshop',
  'Cultural Food Festival',
  'Art Exhibition',
  'Language & Literature Fest',
  'Summer Cultural Camp',
  'Heritage Preservation Seminar',
  'Community Music Jam',
  'Dussehra Festival Events',
  'Diwali Celebrations',
  'Winter Festival',
  'New Year Eve Extravaganza',
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CURRENCY_SYMBOL = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

export const DONATION_TIERS = [
  { amount: 500, label: '₹500 - Support' },
  { amount: 1000, label: '₹1,000 - Sponsor' },
  { amount: 5000, label: '₹5,000 - Patron' },
  { amount: 10000, label: '₹10,000 - Benefactor' },
];

export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PAYMENT_ERROR: 'Payment failed. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};
