// Types for the application

export interface Event {
  id: string;
  name: string;
  date: Date;
  description: string;
  imageUrl?: string;
  location?: string;
}

export interface PaymentFormData {
  eventName: string;
  donorName: string;
  contactNumber?: string;
  email?: string;
  representativeName?: string;
  paymentValidDate: Date;
  paymentMethod: 'UPI' | 'DEBIT_CARD' | 'CREDIT_CARD' | 'BANK_TRANSFER';
  amount: number;
}

export interface PaymentRecord {
  transactionId: string;
  eventName: string;
  donorName: string;
  contactNumber?: string;
  email?: string;
  representativeName?: string;
  amount: number;
  currency: string;
  paymentValidDate: string;
  paymentDate: string;
  paymentMethod: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}
