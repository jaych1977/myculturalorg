/**
 * Validation utilities for form inputs
 */

export const validators = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone number validation (10 digits)
  isValidPhone: (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  },

  // Amount validation
  isValidAmount: (amount) => {
    return amount >= 100 && amount <= 100000;
  },

  // Date validation (future date)
  isFutureDate: (date) => {
    return new Date(date) > new Date();
  },

  // Empty field validation
  isNotEmpty: (value) => {
    return value && value.trim().length > 0;
  },

  // Event name validation
  isValidEventName: (eventName, eventsList) => {
    return eventsList.includes(eventName);
  },
};

/**
 * Format validation errors
 */
export const getErrorMessage = (fieldName, rule) => {
  const messages = {
    email: {
      invalid: 'Please enter a valid email address',
      required: 'Email is required',
    },
    phone: {
      invalid: 'Please enter a valid 10-digit phone number',
    },
    amount: {
      invalid: 'Amount must be between ₹100 and ₹100,000',
      required: 'Amount is required',
    },
    date: {
      invalid: 'Please select a future date',
      required: 'Date is required',
    },
    default: {
      required: `${fieldName} is required`,
    },
  };

  return messages[fieldName]?.[rule] || messages.default.required;
};
