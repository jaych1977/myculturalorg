# My Cultural Organisation - Backend Configuration

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google Sheets
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
```

## Setup Instructions

1. **Razorpay Setup**
   - Create a Razorpay account at https://razorpay.com
   - Get your API Key ID and Key Secret from Dashboard > Settings > API Keys
   - Use test credentials for development

2. **Google Sheets Setup**
   - Create a Google Cloud project
   - Enable Google Sheets API
   - Create a service account
   - Share the spreadsheet with the service account email
   - Download the JSON key file and extract credentials

3. **Database Schema for Google Sheets**
   Create a spreadsheet with the following columns:
   - Transaction ID
   - Order ID
   - Event Name
   - Donor Name
   - Contact Number
   - Email
   - Representative Name
   - Amount
   - Currency
   - Payment Date
   - Valid Until Date
