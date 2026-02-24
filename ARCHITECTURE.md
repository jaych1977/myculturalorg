# Architecture & Installation Guide

## 📐 Application Architecture

### System Design Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        END USERS                                │
│           (Web Browser - Desktop/Mobile/Tablet)                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    HTTP/HTTPS
                         │
        ┌────────────────┴────────────────┐
        │                                 │
   ┌────▼─────────────┐        ┌─────────▼──────────┐
   │  FRONTEND (React)│        │                    │
   ├──────────────────┤        │  REACT COMPONENTS  │
   │ • Pages          │        │  • Home            │
   │ • Components     │        │  • About Us        │
   │ • Services       │        │  • Events          │
   │ • Styles         │        │  • Payment Form    │
   └────┬─────────────┘        │                    │
        │                      └─────────────────────┘
        │                            │
        │                     Calls API
        │                     (Fetch/Axios)
        │                            │
        └────────────────┬───────────┘
                         │
                    HTTP/REST
                         │
        ┌────────────────▼───────────────┐
        │   BACKEND (Node.js/Express)    │
        ├────────────────────────────────┤
        │ API Server on Port 5000        │
        ├────────────────────────────────┤
        │ Routes:                        │
        │ • POST /api/create-order       │
        │ • POST /api/verify-payment     │
        │ • GET /health                  │
        └────┬─────────────────────┬─────┘
             │                     │
             │                     │
      ┌──────▼────────┐  ┌────────▼────────────┐
      │   RAZORPAY    │  │  GOOGLE SHEETS API  │
      ├───────────────┤  ├─────────────────────┤
      │ Payment       │  │ Payment Records:    │
      │ Gateway       │  │ • Transaction ID    │
      │               │  │ • Donor Info        │
      │ Services:     │  │ • Amount            │
      │ • UPI         │  │ • Payment Date      │
      │ • Cards       │  │ • Valid Until       │
      │ • Bank        │  │ (Spreadsheet)       │
      │ • Wallets     │  │                     │
      └───────────────┘  └─────────────────────┘
```

## 📊 Data Flow

### Payment Process Flow

```
1. User fills Payment Form
   ↓
2. Frontend validates input (validators.js)
   ↓
3. Frontend calls GET /api/create-order
   ↓
4. Backend creates Razorpay order
   ↓
5. Razorpay returns Order ID
   ↓
6. Frontend loads Razorpay Checkout
   ↓
7. User completes payment
   ↓
8. Razorpay returns payment details
   ↓
9. Frontend calls POST /api/verify-payment
   ↓
10. Backend verifies signature
   ↓
11. Backend saves to Google Sheets
   ↓
12. Frontend shows success message
```

## 🔄 Component Interaction

### Frontend Structure

```
App.js (Main Router)
├── Navigation.js (All pages)
├── HomePage.js
│   └── Feature Cards
├── AboutPage.js
│   └── Event Gallery
├── EventCalendarPage.js
│   ├── Month Selector
│   └── Event List
└── PaymentPage.js
    └── PaymentForm.js
        ├── Form Inputs
        ├── Validation (validators.js)
        ├── API Call (axiosConfig.js)
        └── Razorpay Integration (scriptLoader.js)

Services:
├── apiClient.js (API endpoints)
├── axiosConfig.js (HTTP client)
└── scriptLoader.js (Script loader)

Utilities:
├── validators.js (Form validation)
├── formatters.js (Data formatting)
└── constants.js (App constants)

Hooks:
└── useForm, useFetch, useLocalStorage

Components:
├── ErrorBoundary.js (Error handling)
└── Toast.js (Notifications)
```

### Backend Structure

```
server.js (Entry point)
├── CORS & Middleware
├── Routes
│   └── paymentRoutes.js
│       ├── POST /api/create-order
│       └── POST /api/verify-payment
├── Controllers
│   └── paymentController.js
│       ├── initiatePayment()
│       └── verifyPayment()
└── Utils
    └── sheetsHelper.js
        ├── initializeGoogleSheets()
        ├── appendToSheet()
        └── getAllPayments()
```

## 🗄️ Data Schema

### Google Sheets Structure

```
MCO Donations 2026 Spreadsheet
├── Column A: Transaction ID       (pay_xxxx)
├── Column B: Order ID             (order_xxxx)
├── Column C: Event Name           (String)
├── Column D: Donor Name           (String)
├── Column E: Contact Number       (Phone)
├── Column F: Email Address        (Email)
├── Column G: MCO Representative   (String)
├── Column H: Amount               (Number)
├── Column I: Currency             (INR)
├── Column J: Payment Date         (Date)
└── Column K: Valid Until          (Date)
```

## 🌐 API Endpoints

```
GET  http://localhost:5000/health
     Response: {status: "Server is running"}

POST http://localhost:5000/api/create-order
     Body: {amount, currency, eventName, donorName...}
     Response: {id, amount, currency}

POST http://localhost:5000/api/verify-payment
     Body: {razorpay_order_id, razorpay_payment_id, razorpay_signature...}
     Response: {success: true/false, message, paymentId}
```

## 📦 Dependencies

### Frontend
- react: 18.2.0
- react-dom: 18.2.0
- react-router-dom: 6.10.0
- axios: 1.3.4
- date-fns: 2.29.3
- react-big-calendar: 1.8.5

### Backend
- express: 4.18.2
- cors: 2.8.5
- dotenv: 16.0.3
- googleapis: 118.0.0
- razorpay: 2.8.6
- body-parser: 1.20.2

## ⚙️ Configuration Files

### Frontend (.env.local)
```
REACT_APP_RAZORPAY_KEY=rzp_test_xxxxx
REACT_APP_API_BASE_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
GOOGLE_SHEET_ID=xxxxx
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=xxxxx
```

## 🚀 Installation Steps

### Step 1: Prerequisites
```bash
# Verify Node.js is installed
node --version    # Should be v14+
npm --version     # Should be v6+

# Verify Git is installed
git --version
```

### Step 2: Automated Setup
```bash
# macOS/Linux
chmod +x setup.sh
./setup.sh

# Windows
setup.bat
```

### Step 3: Manual Setup (Alternative)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

#### Frontend (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm start
```

### Step 4: Verify Installation
```bash
# Backend should be running at:
curl http://localhost:5000/health

# Frontend should be at:
# http://localhost:3000
```

## 🔐 Security Layers

```
┌──────────────────────────────────────────────────┐
│              USER INTERFACE                      │
│        (Frontend Validation Layer)               │
│  • Email validation                             │
│  • Phone validation                             │
│  • Amount validation                            │
│  • Server-side validation redundancy            │
└──────────┬───────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────┐
│         COMMUNICATION LAYER                      │
│  • HTTPS/TLS Encryption                         │
│  • CORS Validation                              │
│  • Request/Response Headers                     │
└──────────┬───────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────┐
│        BACKEND PROCESSING                        │
│  • Payment signature verification               │
│  • Environment variable security                │
│  • Error handling                               │
│  • Input sanitization                           │
└──────────┬───────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────┐
│       PAYMENT GATEWAY (RAZORPAY)                │
│  • PCI-DSS compliant                            │
│  • Industry-standard encryption                 │
│  • Secure payment processing                    │
└──────────┬───────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────┐
│      DATA STORAGE (GOOGLE SHEETS)               │
│  • Service account authentication               │
│  • Spreadsheet-level permissions                │
│  • Event logging & audit trail                  │
└──────────────────────────────────────────────────┘
```

## 🧪 Testing Environment Setup

### Local Testing
```bash
# Terminal 1: Start Backend
cd backend
npm start
# Backend runs on http://localhost:5000

# Terminal 2: Start Frontend
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

### Test Data
```
Event: Classical Music Festival
Donor Name: Test User
Contact: 9876543210
Email: test@example.com
Amount: ₹500
Date: Any future date
```

### Test Payment
```
Card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
OTP: 123456
```

## 📱 Responsive Breakpoints

```
Mobile (≤480px):
├── Stack all content
├── Full-width inputs
├── Hamburger menu
└── Bottom navigation

Tablet (480px - 768px):
├── 2-column layout
├── Adjusted spacing
└── Touch-friendly buttons

Desktop (≥768px):
├── 3+ column layout
├── Hover effects
├── Side navigation
└── Optimized spacing
```

## 🔄 Update & Maintenance Workflow

```
1. Pull latest changes
   git pull origin main

2. Update dependencies
   npm update (in frontend and backend)

3. Run tests
   npm test

4. Build frontend
   cd frontend && npm run build

5. Restart services
   Backend: npm start
   Frontend: npm start

6. Verify deployment
   Check http://localhost:3000
```

## 📊 Performance Metrics

Target metrics:
- Page Load Time: < 3 seconds
- API Response Time: < 500ms
- Payment Processing: < 2 seconds
- Mobile Lighthouse Score: > 80

## 🚚 Deployment Checklist

```
Frontend:
├── npm run build succeeds
├── Build size < 5MB
├── No console errors
├── All pages accessible
├── Payment form works
└── API calls succeed

Backend:
├── All endpoints working
├── Environment variables set
├── CORS configured for your domain
├── Error handling in place
├── Logging configured
└── Database/Sheets connected

Combined:
├── End-to-end payment flow works
├── Data appears in Google Sheets
├── Error messages are helpful
├── Performance acceptable
├── Security validated
└── Ready for production
```

## 📞 Troubleshooting Architecture

```
Issue → Check Logs → Check Config → Check Connection → Verify API

Frontend Error
├── Check Console (F12)
├── Check .env.local
├── Check API response
└── Check backend logs

Backend Error
├── Check Terminal output
├── Check .env values
├── Check Razorpay credentials
├── Check Google Sheets access
└── Check network connectivity

Payment Error
├── Check Razorpay test mode
├── Check signature verification
├── Check order creation
└── Check Google Sheets permissions
```

---

**Last Updated:** February 24, 2026
