/**
 * Format utilities for displaying data
 */

export const formatters = {
  // Format currency
  formatCurrency: (amount, currency = 'INR') => {
    const currencySymbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
    };
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${parseFloat(amount).toLocaleString('en-IN')}`;
  },

  // Format phone number
  formatPhone: (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.replace(/(\d{5})(\d{5})/, '$1 $2');
  },

  // Format date
  formatDate: (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  },

  // Format ISO date to input format (YYYY-MM-DD)
  formatDateToInput: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  // Capitalize first letter
  capitalize: (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';
  },

  // Truncate text
  truncate: (text, length = 50) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  },

  // Payment status badge
  getStatusBadge: (status) => {
    const badges = {
      completed: { color: 'green', text: '✓ Completed' },
      pending: { color: 'yellow', text: '⏳ Pending' },
      failed: { color: 'red', text: '✕ Failed' },
    };
    return badges[status] || badges.pending;
  },
};
