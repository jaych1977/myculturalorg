# My Cultural Organisation - React Native Application

A fully functional React Native application designed for cross-platform deployment (web, iOS, and Android) that enables users to learn about a cultural organization, view events, and make donations.

## Features

✨ **Key Features:**

1. **About Us Page** - Displays organization information, mission, vision, and upcoming events
2. **Event Calendar** - Interactive calendar showing events throughout the year with monthly and yearly views
3. **Payment & Donation System** - Secure payment collection with multiple payment methods (UPI, Debit Card, Credit Card, Bank Transfer)
4. **Google Sheets Integration** - Automatic recording of payment transactions to Google Sheets
5. **Cross-Platform Support** - Works seamlessly on web browsers, iOS, and Android devices

## Project Structure

```
myculturalorg/
├── App.tsx                           # Main application component with navigation
├── app.json                          # Expo configuration
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── README.md                         # This file
├── constants/
│   └── index.ts                      # App-wide constants, colors, typography
├── types/
│   └── index.ts                      # TypeScript interfaces and types
├── utils/
│   └── paymentUtils.ts               # Payment processing and validation utilities
├── services/
│   └── googleSheetsService.ts        # Google Sheets and Forms integration
└── screens/
    ├── AboutUsScreen.tsx             # About Us page component
    ├── EventCalendarScreen.tsx       # Event Calendar component
    └── PaymentScreen.tsx             # Payment page component
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /Users/jaychowdhury/react_projects/myculturalorg
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Google Sheets Integration (Optional):**
   
   For payment data to be automatically recorded to Google Sheets, follow these steps:

   **Option A: Using Google Forms (Easier, No Authentication)**
   
   1. Go to [Google Forms](https://forms.google.com)
   2. Create a new form with these fields:
      - Event Name (Short answer)
      - Donor Name (Short answer)
      - Contact Number (Short answer)
      - Email (Short answer)
      - Representative Name (Short answer)
      - Transaction ID (Short answer)
      - Amount (Short answer)
      - Currency (Short answer)
      - Payment Valid Date (Date)
      - Payment Method (Multiple choice)
   
   3. Click the three dots menu → "Get response destination" → Select/create a Google Sheet
   4. Send the form and open in new window
   5. Right-click → View page source
   6. Search for `form action="` and copy the URL
   7. In `services/googleSheetsService.ts`:
      - Replace `GOOGLE_FORM_CONFIG.actionUrl` with your form's action URL
      - Find each field's entry ID (search for `name="entry.` in page source)
      - Replace the entry IDs in `GOOGLE_FORM_CONFIG.fields`
   
   **Option B: Using Google Sheets API (More Secure)**
   
   1. Go to [Google Cloud Console](https://console.cloud.google.com)
   2. Create a new project
   3. Enable Google Sheets API
   4. Create a Service Account and download JSON key
   5. Create a Google Sheet and share it with the service account email
   6. In `services/googleSheetsService.ts`:
      - Replace `GOOGLE_SHEETS_CONFIG.spreadsheetId` with your sheet ID
      - Replace `GOOGLE_SHEETS_CONFIG.apiKey` with your API key

### Running the Application

**For Web (Browser):**
```bash
npm run web
```

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Development (Expo Go):**
```bash
npm start
```
Then scan the QR code with Expo Go app on your mobile device.

## Usage Guide

### About Us Tab
- View comprehensive information about the organization
- Expandable sections for mission, vision, and upcoming events
- Contact information and social media links

### Events Tab
- Interactive calendar view for the entire year
- Navigate between months
- View events with dates and descriptions
- Separate list view of all events for the selected month

### Payment/Donation Tab
- Select event from dropdown
- Enter donor information (name mandatory, others optional)
- Choose payment method (UPI, Debit Card, Credit Card, Bank Transfer)
- Set payment validity date
- Real-time form validation
- Successful payments generate transaction IDs
- Receipt confirmation modal

## Payment System Details

### Supported Payment Methods
- **UPI** - Unified Payments Interface (India)
- **Debit Card** - Direct debit from bank account
- **Credit Card** - Credit card payment
- **Bank Transfer** - Direct bank account transfer

### Payment Validation
- Event name (mandatory)
- Donor name (mandatory)
- Contact number (10-digit Indian format, optional)
- Email address (optional with format validation)
- Amount (must be > 0)
- Payment valid date (must be future date)

### Payment Recording
Upon successful payment:
1. Transaction ID is automatically generated
2. Payment record includes:
   - Transaction ID
   - Event name
   - Donor details
   - Amount and currency
   - Payment method
   - Payment date and validity date
   - Organization representative name
3. Data is recorded to Google Sheets (if configured)
4. Success confirmation with transaction ID is displayed

## Technology Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **UI Components:** React Native built-ins + Expo Icons
- **HTTP Client:** Axios
- **Date Handling:** date-fns
- **State Management:** React Hooks
- **Backend Integration:** Google Forms/Sheets API

## Customization

### Changing Colors
Edit `constants/index.ts`:
```typescript
export const Colors = {
  primary: '#8B4513',      // Brown for cultural org
  secondary: '#D2691E',    // Chocolate
  // ... other colors
};
```

### Adding Events
Edit `constants/index.ts` `DefaultEvents` array:
```typescript
export const DefaultEvents = [
  {
    id: '5',
    name: 'Event Name',
    date: new Date(2026, 0, 15), // January 15
    description: 'Event description',
    location: 'Event location',
  },
  // ... more events
];
```

### Modifying Payment Methods
Edit `constants/index.ts` `PaymentMethods` array to add or remove payment options.

## Troubleshooting

### Common Issues

**Issue: `npm install` fails**
- Solution: Clear npm cache with `npm cache clean --force` and try again

**Issue: Expo app won't load**
- Solution: Make sure you're on the same WiFi network, or use tunneling with `expo start --tunnel`

**Issue: Google Sheets integration not working**
- Solution: Check entry IDs in googleSheetsService.ts match your form exactly
- Verify CORS is enabled for your Google Form/Sheet
- Check browser console for specific error messages

**Issue: Payment simulation always fails**
- Solution: This is intentional for testing (5% failure rate). Refresh and try again.

## Building for Production

When ready to release:

```bash
# For iOS
eas build --platform ios

# For Android
eas build --platform android

# For Web
npm run build
```

You'll need to configure EAS (Expo Application Services) first. See [Expo Documentation](https://docs.expo.dev/deploy/build/).

## API Integration Guide

To integrate real payment gateways:

1. **Replace `simulatePaymentGateway()` in `utils/paymentUtils.ts`** with actual payment provider SDK
2. **Error Handling:** Ensure proper error handling for payment failures
3. **Security:** Use HTTPS for all transactions
4. **PCI Compliance:** Ensure payment data handling complies with PCI-DSS standards

## Performance Optimization

- Images are cached locally
- Event data is lazily loaded
- Navigation uses native stack navigator for smooth transitions
- Form validation happens on blur to prevent excessive re-renders

## Security Considerations

⚠️ **Production deployment security:**

- Never commit Google API keys to version control
- Use environment variables for sensitive configuration
- Implement HTTPS for all API calls
- Add rate limiting to payment endpoints
- Implement CAPTCHA for payment form
- Store sensitive data securely
- Implement user authentication if needed

## Contributing

To add new features:

1. Create a new screen in the `screens/` directory
2. Add navigation in `App.tsx`
3. Create corresponding types in `types/index.ts`
4. Add utilities in `utils/` if needed
5. Follow existing code structure and naming conventions

## License

© 2026 My Cultural Organisation. All rights reserved.

## Support

For issues or questions:
- Email: support@myculturalorg.com
- Phone: +91 1234-567-890
- Website: Contact through About Us tab

## Future Enhancements

- [ ] User authentication and profile management
- [ ] Event image gallery with upload capability
- [ ] Real payment gateway integration (Razorpay, Stripe)
- [ ] Email receipt generation and sending
- [ ] SMS notifications for donors
- [ ] Donation history and receipts
- [ ] Multiple language support
- [ ] Accessibility improvements
- [ ] Dark mode support
- [ ] Event registration system

---

**Last Updated:** February 2026
**Version:** 1.0.0
