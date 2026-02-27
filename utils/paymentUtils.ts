import uuid from 'react-native-uuid';
import { PaymentFormData, PaymentRecord } from '../types';
import { Currency } from '../constants';

/**
 * Generate a unique transaction ID
 */
export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const randomId = (Math.random() * 10000).toString().split('.')[0];
  return `TXN-${timestamp}-${randomId}`;
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phoneNumber.replace(/\D/g, ''));
};

/**
 * Format currency value
 */
export const formatCurrency = (amount: number): string => {
  return `${Currency.symbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format date to string
 */
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Convert payment form data to payment record
 */
export const createPaymentRecord = (formData: PaymentFormData): PaymentRecord => {
  return {
    transactionId: generateTransactionId(),
    eventName: formData.eventName,
    donorName: formData.donorName,
    contactNumber: formData.contactNumber,
    email: formData.email,
    representativeName: formData.representativeName,
    amount: formData.amount,
    currency: Currency.code,
    paymentValidDate: formatDate(formData.paymentValidDate),
    paymentDate: formatDate(new Date()),
    paymentMethod: formData.paymentMethod,
  };
};

/**
 * Validate payment form data
 */
export const validatePaymentForm = (formData: PaymentFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.eventName || formData.eventName.trim() === '') {
    errors.push('Event name is required');
  }

  if (!formData.donorName || formData.donorName.trim() === '') {
    errors.push('Donor name is required');
  }

  if (formData.contactNumber && !validatePhoneNumber(formData.contactNumber)) {
    errors.push('Invalid contact number format (10-digit Indian phone number required)');
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.push('Invalid email format');
  }

  if (formData.amount <= 0) {
    errors.push('Amount must be greater than zero');
  }

  if (formData.paymentValidDate < new Date()) {
    errors.push('Payment valid date must be in the future');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get mock payment methods simulator (for testing)
 */
export const simulatePaymentGateway = async (
  paymentMethod: string,
  amount: number
): Promise<{ success: boolean; transactionId: string; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 95% success rate for demo
  const isSuccess = Math.random() < 0.95;

  if (isSuccess) {
    return {
      success: true,
      transactionId: generateTransactionId(),
      message: `Payment of ${formatCurrency(amount)} via ${paymentMethod} successful`,
    };
  } else {
    throw new Error('Payment failed. Please try again.');
  }
};

/**
 * Format payment record for display
 */
export const formatPaymentRecord = (record: PaymentRecord): string => {
  return `
Transaction ID: ${record.transactionId}
Event: ${record.eventName}
Donor: ${record.donorName}
Amount: ${formatCurrency(record.amount)} ${record.currency}
Payment Method: ${record.paymentMethod}
Date: ${record.paymentDate}
Valid Until: ${record.paymentValidDate}
  `.trim();
};
