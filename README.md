# My Cultural Organisation - Full Stack Application

A web and mobile-friendly application for "My Cultural Organisation" built with React, Node.js, and Google Sheets integration.

## Features

### 1. **About Us Page** 📱
- Introductory content about the organization
- Mission and vision statements
- Featured events gallery with descriptions
- Responsive design for mobile and desktop

### 2. **Event Calendar** 📅
- Year-round event calendar (January - December 2026)
- Event browsing by month
- Event details including date, time, and description
- Interactive month selector
- Event categories display

### 3. **Payment Integration** 💳
- Razorpay payment gateway integration
- Support for multiple payment methods:
  - UPI
  - Credit Cards
  - Debit Cards
  - Net Banking
  - Digital Wallets
  - Bank Transfers

### 4. **Donation Form** 
- Event selection dropdown (mandatory)
- Donor name input (mandatory)
- Contact number (optional)
- Email (optional)
- MCO representative name (optional)
- Donation amount input
- Payment valid date
- Form validation with error messages

### 5. **Google Sheets Integration** 📊
- Automatic storage of transaction data
- Records include:
  - Transaction ID
  - Order ID
  - Event Name
  - Donor Name
  - Contact Number
  - Email
  - Representative Name
  - Amount Paid
  - Currency
  - Payment Date
  - Valid Until Date

### 6. **Responsive Design**
- Mobile-first approach
- Works on all devices: iOS, Android, Tablets, Desktops
- Touch-friendly navigation
- Optimized performance

## Project Structure

```
myculturalorg/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   └── PaymentForm.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── AboutPage.js
│   │   │   ├── EventCalendarPage.js
│   │   │   └── PaymentPage.js
│   │   ├── services/
│   │   │   └── scriptLoader.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Navigation.css
│   │   │   ├── HomePage.css
│   │   │   ├── AboutPage.css
│   │   │   ├── EventCalendarPage.css
│   │   │   ├── PaymentPage.css
│   │   │   └── PaymentForm.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── config/
│   │   └── README.md
│   ├── controllers/
│   │   └── paymentController.js
│   ├── routes/
│   │   └── paymentRoutes.js
│   ├── utils/
│   │   └── sheetsHelper.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env (create from .env.example)
└── app-context.txt
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Razorpay account
- Google Cloud account with Sheets API enabled

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your Razorpay test key:
   ```
   REACT_APP_RAZORPAY_KEY=rzp_test_your_key
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

5. Start development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```
   RAZORPAY_KEY_ID=your_test_key_id
   RAZORPAY_KEY_SECRET=your_test_key_secret
   GOOGLE_SHEET_ID=your_spreadsheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY=your_private_key
   ```

5. Start the server:
   ```bash
   npm start
   ```

To use hot-reload during development:
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:5000`

## Getting Razorpay Credentials

1. Go to https://dashboard.razorpay.com/
2. Create an account or sign in
3. Navigate to Settings > API Keys
4. Copy the Test Mode credentials
5. Use these in your `.env` files

## Google Sheets Setup

1. Create a new Google Sheet for storing donation data
2. Set up column headers:
   - A: Transaction ID
   - B: Order ID
   - C: Event Name
   - D: Donor Name
   - E: Contact Number
   - F: Email
   - G: Representative Name
   - H: Amount
   - I: Currency
   - J: Payment Date
   - K: Valid Until Date

3. Share the spreadsheet with the service account email
4. Update `.env` with your Spreadsheet ID

## Testing

### Test Razorpay Payment
- Amount: Any amount in INR (use ₹100 or more)
- Card: Use Razorpay test card numbers
- Email: Any email format
- OTP: 123456

Test card: 4111 1111 1111 1111

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Update environment variables in your hosting platform
# Deploy the backend
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to version control
- Keep your API keys secure
- Use different keys for development and production
- Enable HTTPS in production
- Validate all inputs on both frontend and backend
- Use CORS properly in production

## Troubleshooting

### Payment Page Issues
- Ensure Razorpay script is loaded: Check network tab in DevTools
- Verify API keys in `.env` files
- Check backend console for errors

### Google Sheets Integration
- Verify spreadsheet sharing with service account
- Check Google Cloud credentials
- Ensure Google Sheets API is enabled

### CORS Issues
- Update CORS configuration in backend if needed
- Verify origin URLs match your deployment

## Support & Contribution

For issues or feature requests, please create an issue in the repository.

## License

This project is proprietary to My Cultural Organisation.

---

**Last Updated:** February 24, 2026
