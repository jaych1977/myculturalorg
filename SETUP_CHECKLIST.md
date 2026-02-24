# Setup Checklist

## Pre-Development Setup

### System Requirements
- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] Git installed and configured
- [ ] Text editor/IDE (VS Code recommended)
- [ ] Terminal/Command line access

### Environment Setup
- [ ] Clone/extract project
- [ ] Navigate to project directory
- [ ] All required directories created

## Frontend Setup

### Installation
- [ ] Run `npm install` in frontend folder
- [ ] All dependencies installed without errors
- [ ] No peer dependency warnings (acceptable warnings only)

### Configuration
- [ ] Create `.env.local` from `.env.example`
- [ ] Set `REACT_APP_RAZORPAY_KEY` (use test key)
- [ ] Set `REACT_APP_API_BASE_URL=http://localhost:5000`
- [ ] `.env.local` added to `.gitignore` (already done)

### Testing
- [ ] Run `npm start`
- [ ] App opens on `http://localhost:3000`
- [ ] No console errors
- [ ] Navigation works
- [ ] Can navigate to all pages

## Backend Setup

### Installation
- [ ] Run `npm install` in backend folder
- [ ] All dependencies installed without errors
- [ ] No errors in installation log

### Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Get Razorpay test credentials:
  - [ ] Sign up at https://razorpay.com
  - [ ] Go to Dashboard > Settings > API Keys
  - [ ] Copy Test Key ID and Secret
  - [ ] Add to `.env`:
    ```
    RAZORPAY_KEY_ID=rzp_test_xxxxx
    RAZORPAY_KEY_SECRET=xxxxx
    ```
- [ ] Set `NODE_ENV=development`
- [ ] Set `PORT=5000`
- [ ] `.env` file added to `.gitignore` (already done)

### Testing
- [ ] Run `npm start`
- [ ] Server starts on port 5000
- [ ] No errors in server output
- [ ] Health check: `curl http://localhost:5000/health`
- [ ] Returns `{"status":"Server is running"}`

## Payment Gateway Setup

### Razorpay Account
- [ ] Create account at https://razorpay.com
- [ ] Verify email and phone
- [ ] Complete KYC (for production later)
- [ ] Get Test API Keys
- [ ] Keep Test credentials secure
- [ ] Plan to upgrade to Live mode for production

### Test Payment Details
- [ ] Know test card: `4111 1111 1111 1111`
- [ ] Know test OTP: `123456`
- [ ] Know amounts that work: any amount ≥ ₹100
- [ ] Know test email format: any valid email

## Google Sheets Setup (Optional for Initial Testing)

### For Later Implementation
- [ ] Create Google Cloud account
- [ ] Create project: "My Cultural Org"
- [ ] Enable Google Sheets API
- [ ] Create service account (save JSON credentials)
- [ ] Create Google Sheet for donations
- [ ] Share with service account email
- [ ] Document setup in backend/.env

## Database Setup (Optional)

### PostgreSQL (if using)
- [ ] Install PostgreSQL
- [ ] Create database: `myculturalorg`
- [ ] Create user with password
- [ ] Update connection string in `.env`
- [ ] Run migrations (if applicable)

## Git Repository Setup

- [ ] Repository initialized (`git init`)
- [ ] `.gitignore` properly configured
- [ ] Initial commit made
- [ ] Remote repository added (GitHub/GitLab)
- [ ] First push successful

## Development Tools

### VS Code Extensions (Recommended)
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] Prettier - Code formatter
- [ ] ESLint
- [ ] Thunder Client or REST Client
- [ ] Thunder Client or Postman (for API testing)

### Browser Tools
- [ ] React Developer Tools installed
- [ ] Redux DevTools (if using Redux later)
- [ ] DevTools Network tab for API debugging

## Testing Environment

### Test Data
- [ ] Sample donor names ready
- [ ] Sample event names ready
- [ ] Sample email addresses ready
- [ ] Sample phone numbers ready (10 digits)
- [ ] Future dates ready for testing

### Razorpay Test Mode
- [ ] Dashboard in Test Mode (not Live)
- [ ] Test credentials added to `.env`
- [ ] Test payment gateway accessible
- [ ] Can create test orders

## Documentation Review

- [ ] README.md read and understood
- [ ] QUICKSTART.md followed successfully
- [ ] API_DOCUMENTATION.md bookmarked
- [ ] DEPLOYMENT.md saved for later
- [ ] GOOGLE_SHEETS_GUIDE.md saved for later

## Development Ready

- [ ] Both frontend and backend running locally
- [ ] Can navigate between pages
- [ ] Payment form displays correctly
- [ ] Form validation works
- [ ] No console errors
- [ ] Ready to test payment flow

## First Test Run

### Manual Test Sequence
1. [ ] Open `http://localhost:3000`
2. [ ] Click "About Us" - page loads
3. [ ] Click "Events" - calendar shows with events
4. [ ] Click "Donate" - payment form displays
5. [ ] Fill form (all required fields):
   - [ ] Select event from dropdown
   - [ ] Enter donor name
   - [ ] Enter amount (minimum ₹100)
   - [ ] Select future date
6. [ ] Click "Proceed to Payment"
7. [ ] Razorpay payment window opens
8. [ ] Enter test credentials:
   - [ ] Card: `4111 1111 1111 1111`
   - [ ] Any future expiry (e.g., 12/25)
   - [ ] Any CVV (e.g., 123)
9. [ ] OTP prompt appears
10. [ ] Enter OTP: `123456`
11. [ ] Payment processes
12. [ ] Success message appears
13. [ ] Transaction ID displays

## Troubleshooting Checklist

If issues arise, check:
- [ ] Are both frontend and backend running?
- [ ] Is `http://localhost:3000` accessible?
- [ ] Is `http://localhost:5000` accessible?
- [ ] Are all environment variables set?
- [ ] Are dependencies installed (`package.json`)?
- [ ] Are there any console errors (F12)?
- [ ] Is the correct Node version installed?
- [ ] Are ports 3000 and 5000 free?

## Production Preparation (Later)

- [ ] [ ] Prepare Razorpay live account
- [ ] [ ] Get live API credentials
- [ ] [ ] Setup Google Sheets integration
- [ ] [ ] Configure domains/URLs
- [ ] [ ] Plan deployment platform
- [ ] [ ] Setup SSL/HTTPS
- [ ] [ ] Configure environment variables for production
- [ ] [ ] Test complete flow in staging
- [ ] [ ] Deploy to production
- [ ] [ ] Monitor logs and errors
- [ ] [ ] Set up backups and monitoring

---

## Quick Reference Links

| Tool | URL |
|------|-----|
| Razorpay Dashboard | https://dashboard.razorpay.com |
| Node.js | https://nodejs.org |
| React Docs | https://react.dev |
| Express Docs | https://expressjs.com |
| Razorpay API | https://razorpay.com/docs/api |

---

**Setup Date:** _____________
**Completed By:** _____________
**Notes:** _____________________________________________

---

**Last Updated:** February 24, 2026
