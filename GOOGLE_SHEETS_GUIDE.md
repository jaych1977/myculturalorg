# Google Sheets Integration Guide

## Overview

The application automatically records all donations to a Google Sheets spreadsheet for easy tracking and reporting.

## Setup Instructions

### Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Create a new project: `My Cultural Organisation`
3. Enable Google Sheets API:
   - Go to APIs & Services > Library
   - Search for "Google Sheets API"
   - Click Enable

### Step 2: Create Service Account

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > Service Account
3. Fill in details:
   - Service account name: `mco-backend`
   - Grant the Editor role
4. Click Create and Go to Details
5. Go to Keys tab:
   - Click "Add Key" > Create new key
   - Choose JSON
   - Download the file

### Step 3: Extract Credentials

From the downloaded JSON file, copy:
- `project_id`
- `private_key` (entire key)
- `client_email`

Add to backend `.env`:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=mco-backend@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Step 4: Create Google Sheet

1. Go to https://docs.google.com/spreadsheets
2. Create new spreadsheet: "MCO Donations 2026"
3. Rename Sheet1 to "Donations"
4. Add Column Headers (Row 1):
   - A: Transaction ID
   - B: Order ID
   - C: Event Name
   - D: Donor Name
   - E: Contact Number
   - F: Email Address
   - G: MCO Representative
   - H: Amount
   - I: Currency
   - J: Payment Date
   - K: Valid Until

5. Share the spreadsheet:
   - Click Share
   - Add the service account email
   - Grant Editor access

7. Copy Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```

Add to backend `.env`:
```
GOOGLE_SHEET_ID=1abc2def3ghi4jkl5mno6pqr7stu8vwx
```

## Data Structure

### Spreadsheet Columns:

| Column | Field | Type | Required | Example |
|--------|-------|------|----------|---------|
| A | Transaction ID | Text | Yes | txn_a1b2c3d4e5f6 |
| B | Order ID | Text | Yes | order_a1b2c3d4 |
| C | Event Name | Text | Yes | Classical Music Festival |
| D | Donor Name | Text | Yes | John Doe |
| E | Contact Number | Text | No | 9876543210 |
| F | Email Address | Email | No | john@example.com |
| G | MCO Representative | Text | No | Raj Kumar |
| H | Amount | Number | Yes | 500 |
| I | Currency | Text | Yes | INR |
| J | Payment Date | Date | Yes | 2026-02-24 |
| K | Valid Until | Date | Yes | 2026-12-31 |

## Implementation

### Backend Implementation

The backend is already prepared to use Google Sheets. In `backend/utils/sheetsHelper.js`:

```javascript
// Initialize Google Sheets client
const sheets = initializeGoogleSheets();

// Save payment data
await appendToSheet(sheets, spreadsheetId, paymentData);

// Fetch all donations
const donations = await getAllPayments(sheets, spreadsheetId);
```

### Update Payment Controller

In `backend/controllers/paymentController.js`, replace the mock Google Sheets function:

```javascript
import { initializeGoogleSheets, appendToSheet } from '../utils/sheetsHelper.js';

async function saveToGoogleSheets(paymentData) {
  try {
    const sheets = initializeGoogleSheets();
    const result = await appendToSheet(
      sheets,
      process.env.GOOGLE_SHEET_ID,
      paymentData
    );
    return { success: true, message: 'Payment recorded', data: result };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}
```

## Accessing the Data

### View Donations:

1. Open your spreadsheet: https://docs.google.com/spreadsheets
2. Search for "MCO Donations 2026"
3. Each completed payment appears as a new row

### Create Reports:

1. Select all data (Ctrl+A)
2. Insert > Chart
3. Create charts for:
   - Total donations by event
   - Donations over time
   - Average donation amount

### Export Data:

1. File > Download
2. Choose format: CSV, Excel, PDF
3. Share reports with stakeholders

## Troubleshooting

### Error: "403 Forbidden"
- **Cause:** Service account not shared with spreadsheet
- **Fix:** Share spreadsheet with service account email
- **Verify:** In spreadsheet, sharing settings should show the service account

### Error: "Invalid Spreadsheet ID"
- **Cause:** Wrong ID in `.env`
- **Fix:** Copy ID directly from URL, not the share link
- **Example:** `1abc2def3ghi4jkl5mno6pqr7stu8vwx`

### Data Not Appearing in Sheet
- **Check 1:** Is payment verification successful? Check backend logs
- **Check 2:** Are environment variables set correctly?
- **Check 3:** Is the service account email in the spreadsheet sharing?
- **Debug:** Add `console.log()` in `saveToGoogleSheets()` function

### Cannot Find Service Account Email
- Go to Google Cloud Console > Service Accounts
- Click on the service account
- Copy the email from the "Details" tab

## Security Notes

⚠️ **Important:**

1. **Private Key Security:**
   - Never commit private key to Git
   - Use environment variables only
   - Regenerate if exposed

2. **Spreadsheet Access:**
   - Service account should have Editor role only
   - Limit sharing to necessary stakeholders
   - Use Google Sheets settings to restrict editing

3. **Data Privacy:**
   - Consider GDPR/data protection regulations
   - Implement data retention policies
   - Use Google Sheets audit logs

## Advanced: Analytics

### Sample Queries (using Google Sheets filters):

1. **Total Donations by Event:**
   ```
   Pivot Table: Rows = Event Name, Values = Sum of Amount
   ```

2. **Monthly Donation Trend:**
   ```
   Pivot Table: Rows = Payment Date (month), Values = Sum of Amount
   ```

3. **Donor Analytics:**
   ```
   Filter: Remove blank email addresses
   Count unique donors
   ```

## API Endpoints for Data Access

Once fully integrated, you can add these endpoints:

```javascript
// GET /api/donations - Get all donations
router.get('/donations', getDonations);

// GET /api/donations/:id - Get specific donation
router.get('/donations/:id', getDonationById);

// GET /api/stats - Get donation statistics
router.get('/stats', getDonationStats);
```

## Maintenance

### Regular Tasks:

- **Weekly:** Review new donations
- **Monthly:** Update pivot tables and reports
- **Quarterly:** Archive old data (keep backups)
- **Annually:** Review and clean up data

### Backup Strategy:

```bash
# Automated daily backup
0 2 * * * curl -o backup-$(date +%Y%m%d).csv "https://docs.google.com/..."
```

---

**Last Updated:** February 24, 2026
