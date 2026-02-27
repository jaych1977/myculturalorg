import axios from 'axios';
import { PaymentRecord } from '../types';

/**
 * Service for managing Google Sheets integration
 * 
 * NOTE: To set up Google Sheets integration:
 * 1. Create a Google Form linked to a Google Sheet
 * 2. Get the form's action URL from the form's HTML
 * 3. Replace GOOGLE_FORM_ACTION_URL with your form's action URL
 * 4. Map the form field entry IDs to the corresponding fields below
 */

// IMPORTANT: Replace these with your actual Google Form IDs
// These are the entry IDs from your Google Form
const GOOGLE_FORM_CONFIG = {
  actionUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  fields: {
    eventName: 'entry.XXXXXXX',
    donorName: 'entry.XXXXXXX',
    contactNumber: 'entry.XXXXXXX',
    email: 'entry.XXXXXXX',
    representativeName: 'entry.XXXXXXX',
    transactionId: 'entry.XXXXXXX',
    amount: 'entry.XXXXXXX',
    currency: 'entry.XXXXXXX',
    paymentValidDate: 'entry.XXXXXXX',
    paymentMethod: 'entry.XXXXXXX',
  },
};

/**
 * Alternative: Using Google Sheets API with Service Account
 * This is a more secure approach
 */
const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID', // Replace with your Google Sheet ID
  sheetName: 'Payments',
  apiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your API key
};

/**
 * Submit payment record to Google Sheets via Form
 * @param payment - Payment record to submit
 * @returns Promise with the response
 */
export const submitPaymentToGoogleForm = async (payment: PaymentRecord): Promise<any> => {
  try {
    const formData = new FormData();
    
    // Add form fields (modify these entry IDs with your actual Google Form entry IDs)
    formData.append(GOOGLE_FORM_CONFIG.fields.eventName, payment.eventName);
    formData.append(GOOGLE_FORM_CONFIG.fields.donorName, payment.donorName);
    formData.append(GOOGLE_FORM_CONFIG.fields.contactNumber, payment.contactNumber || '');
    formData.append(GOOGLE_FORM_CONFIG.fields.email, payment.email || '');
    formData.append(GOOGLE_FORM_CONFIG.fields.representativeName, payment.representativeName || '');
    formData.append(GOOGLE_FORM_CONFIG.fields.transactionId, payment.transactionId);
    formData.append(GOOGLE_FORM_CONFIG.fields.amount, payment.amount.toString());
    formData.append(GOOGLE_FORM_CONFIG.fields.currency, payment.currency);
    formData.append(GOOGLE_FORM_CONFIG.fields.paymentValidDate, payment.paymentValidDate);
    formData.append(GOOGLE_FORM_CONFIG.fields.paymentMethod, payment.paymentMethod);

    const response = await axios.post(GOOGLE_FORM_CONFIG.actionUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Payment submitted to Google Form:', response.status);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error submitting payment to Google Form:', error);
    throw error;
  }
};

/**
 * Submit payment record to Google Sheets via API (requires authentication)
 * @param payment - Payment record to submit
 * @returns Promise with the response
 */
export const submitPaymentToGoogleSheets = async (payment: PaymentRecord): Promise<any> => {
  try {
    const values = [
      [
        new Date().toISOString(),
        payment.transactionId,
        payment.eventName,
        payment.donorName,
        payment.contactNumber || '',
        payment.email || '',
        payment.representativeName || '',
        payment.amount,
        payment.currency,
        payment.paymentValidDate,
        payment.paymentMethod,
      ],
    ];

    const response = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:K:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_CONFIG.apiKey}`,
      { values },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Payment submitted to Google Sheets:', response.status);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error submitting payment to Google Sheets:', error);
    throw error;
  }
};

/**
 * Fetch all payments from Google Sheets
 * @returns Promise with list of payment records
 */
export const fetchPaymentsFromGoogleSheets = async (): Promise<PaymentRecord[]> => {
  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.sheetName}!A:K?key=${GOOGLE_SHEETS_CONFIG.apiKey}`
    );

    // Parse the response and convert to PaymentRecord array
    const rows = response.data.values || [];
    const headers = rows[0];
    
    return rows.slice(1).map((row: any[]) => ({
      transactionId: row[1] || '',
      eventName: row[2] || '',
      donorName: row[3] || '',
      contactNumber: row[4] || '',
      email: row[5] || '',
      representativeName: row[6] || '',
      amount: parseFloat(row[7]) || 0,
      currency: row[8] || 'INR',
      paymentValidDate: row[9] || '',
      paymentMethod: row[10] || '',
      paymentDate: row[0] || '',
    }));
  } catch (error) {
    console.error('Error fetching payments from Google Sheets:', error);
    throw error;
  }
};

/**
 * Setup instructions for Google Sheets integration
 * 
 * METHOD 1: Using Google Forms (Easier, no authentication needed)
 * 1. Create a Google Form at forms.google.com
 * 2. Add the following fields to your form:
 *    - Event Name (Short answer)
 *    - Donor Name (Short answer)
 *    - Contact Number (Short answer)
 *    - Email (Short answer)
 *    - Representative Name (Short answer)
 *    - Transaction ID (Short answer)
 *    - Amount (Short answer)
 *    - Currency (Short answer)
 *    - Payment Valid Date (Date)
 *    - Payment Method (Multiple choice: UPI, Debit Card, Credit Card, Bank Transfer)
 * 3. Send the form and open in new window
 * 4. Right-click > View page source and search for "action="
 * 5. Copy the URL and replace GOOGLE_FORM_CONFIG.actionUrl
 * 6. Find entry IDs for each field in the page source
 * 7. Replace the entry IDs in GOOGLE_FORM_CONFIG.fields
 * 
 * METHOD 2: Using Google Sheets API
 * 1. Go to Google Cloud Console
 * 2. Create a new project and enable Google Sheets API
 * 3. Create a Service Account and download JSON key
 * 4. Share the Google Sheet with the service account email
 * 5. Replace GOOGLE_SHEETS_CONFIG values with your spreadsheet ID and API key
 */
