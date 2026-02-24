import { google } from 'googleapis';

/**
 * Initialize Google Sheets API client
 */
export const initializeGoogleSheets = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

/**
 * Append payment data to Google Sheets
 */
export const appendToSheet = async (sheets, spreadsheetId, paymentData) => {
  try {
    const values = [[
      paymentData.transactionId,
      paymentData.orderId,
      paymentData.eventName,
      paymentData.donorName,
      paymentData.contactNumber,
      paymentData.email,
      paymentData.repName,
      paymentData.amount,
      paymentData.currency,
      paymentData.paymentDate,
      paymentData.validDate
    ]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A:K',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
};

/**
 * Get all payments from Google Sheets
 */
export const getAllPayments = async (sheets, spreadsheetId) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A2:K',
    });

    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};
