# My Cultural Organisation - Setup and Deployment Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running Locally](#running-locally)
6. [Building for Production](#building-for-production)
7. [Firebase Configuration (Optional)](#firebase-configuration-optional)
8. [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run web      # Web browser
npm run ios      # iOS simulator/device
npm run android  # Android simulator/device
```

## Prerequisites

- **Node.js:** v16 or higher
- **npm:** v8 or higher (or yarn v1.22+)
- **Expo CLI:** Latest version (`npm install -g expo-cli`)
- **For iOS:** macOS with Xcode and CocoaPods
- **For Android:** Android Studio with SDK 30+ and API level 30+

### Verify Installation

```bash
node --version      # Should be v16+
npm --version       # Should be v8+
expo --version      # Should be latest
```

## Installation

### 1. Clone or Navigate to Project

```bash
cd /Users/jaychowdhury/react_projects/myculturalorg
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### 3. Verify Installation

```bash
npm start
```

This will start the Metro bundler and display a QR code.

## Configuration

### 1. Environment Variables

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Google Sheets/Forms credentials
- API endpoints
- App settings

### 2. Google Sheets Integration Setup

#### Option A: Google Forms (Recommended for beginners)

1. **Create a Google Form:**
   - Go to [Google Forms](https://forms.google.com)
   - Click "Create new form" (Blank template)
   - Name it "My Cultural Organisation Payments"

2. **Add Form Fields:**
   - Click "+" to add new question
   - Add these fields in this order:
     1. Event Name (Short answer)
     2. Donor Name (Short answer)
     3. Contact Number (Short answer)
     4. Email (Short answer)
     5. Representative Name (Short answer)
     6. Transaction ID (Short answer)
     7. Amount (Short answer)
     8. Currency (Short answer)
     9. Payment Valid Date (Short answer)
     10. Payment Method (Multiple choice: UPI, Debit Card, Credit Card, Bank Transfer)

3. **Link to Google Sheet:**
   - Click the three-dot menu in form → "Responses" tab
   - Click "Create spreadsheet"
   - Accept to create a new sheet

4. **Get Form Details:**
   - Click "Send" button in form
   - Click the three-dot menu → "Get response destination"
   - Open form in new window
   - Right-click → "View page source" (Ctrl+U or Cmd+U)
   - Find `form action="` - copy the URL
   - Find `name="entry.XXXXX"` for each field and note the numbers

5. **Update Configuration:**
   - Edit `services/googleSheetsService.ts`
   - Replace `GOOGLE_FORM_CONFIG.actionUrl` with your form URL
   - Replace entry IDs in `GOOGLE_FORM_CONFIG.fields`

Example:
```typescript
const GOOGLE_FORM_CONFIG = {
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdeXXXXXXX/formResponse',
  fields: {
    eventName: 'entry.123456789',
    donorName: 'entry.123456790',
    // ... rest of fields
  },
};
```

#### Option B: Google Sheets API (Advanced)

1. **Create Project in Google Cloud:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project
   - Enable "Google Sheets API"
   - Enable "Google Drive API"

2. **Create Service Account:**
   - Go to "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in details and create
   - Go to "Keys" tab
   - Add new key → JSON format
   - Download the JSON file

3. **Create Google Sheet:**
   - Create new Google Sheet
   - Add these column headers:
     - A: Timestamp
     - B: Transaction ID
     - C: Event Name
     - D: Donor Name
     - E: Contact Number
     - F: Email
     - G: Representative Name
     - H: Amount
     - I: Currency
     - J: Payment Valid Date
     - K: Payment Method

4. **Share Sheet with Service Account:**
   - Copy service account email from JSON file
   - Open your Google Sheet
   - Click "Share"
   - Paste service account email
   - Give "Editor" access

5. **Update Configuration:**
   - Edit `services/googleSheetsService.ts`
   - Set `GOOGLE_SHEETS_CONFIG.spreadsheetId` (from sheet URL)
   - Set `GOOGLE_SHEETS_CONFIG.apiKey` (from JSON file)

## Running Locally

### Web Browser

```bash
npm run web
```

- Opens at `http://localhost:19006/`
- Hot reload enabled
- Debug with Chrome DevTools (F12)

### iOS Simulator (macOS only)

```bash
npm run ios
```

Requirements:
- Xcode installed
- iOS simulator running

### Android Emulator

```bash
npm run android
```

Requirements:
- Android Studio installed
- Emulator running

### Expo Go App (Any Device)

```bash
npm start
```

1. Download Expo Go app
2. Scan QR code from terminal/terminal
3. App loads in Expo Go

## Building for Production

### Web Build

```bash
npm run build
```

Output in `dist/` folder. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

### iOS Build

Requirements:
- Apple Developer Account
- Paid membership ($99/year)

```bash
eas build --platform ios
```

Then distribute via:
- App Store Connect
- TestFlight
- Ad Hoc distribution

### Android Build

Requirements:
- Google Play Developer Account
- One-time fee ($25)
- Signed keystore file

```bash
eas build --platform android
```

Then upload to:
- Google Play Store
- Galaxy Store
- APK distribution

## Firebase Configuration (Optional)

For analytics and crash reporting:

### 1. Create Firebase Project

- Go to [Firebase Console](https://firebase.google.com)
- Create new project
- Register your app (web, iOS, Android)

### 2. Add Firebase to Project

```bash
npm install firebase
```

### 3. Create Firebase Config File

Create `services/firebaseConfig.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
```

## Troubleshooting

### Issue: `npm install` Fails

**Solution:**
```bash
npm cache clean --force
npm install
```

### Issue: Port Already in Use

**Solution:**
```bash
# Find process on port 19006
lsof -i :19006

# Kill the process
kill -9 <PID>

# Or use different port
expo start --web --port 19007
```

### Issue: Module Not Found

**Solution:**
- Make sure `babel.config.js` exists
- Run `npm install` again
- Clear cache: `npm start -- --reset-cache`

### Issue: Google Forms Not Receiving Data

**Solution:**
- Verify entry IDs match exactly
- Check browser console for errors
- Ensure form is published (not in editor view)
- Test form entry manually first
- Verify CORS isn't blocking (use Postman to test)

### Issue: App Crashes on Startup

**Solution:**
- Check console logs: `npm start` shows detailed logs
- Enable debug mode in `.env`: `EXPO_PUBLIC_DEBUG_MODE=true`
- Check TypeScript errors: `npx tsc --noEmit`

### Issue: iOS Build Fails

**Solution:**
- Clean build cache: `eas build --platform ios --clear-cache`
- Update EAS CLI: `npm install -g eas-cli@latest`
- Check Apple Developer account validity
- Ensure provisioning profile is valid

### Issue: Android Build Fails

**Solution:**
- Update Gradle: `gradle wrapper --gradle-version latest`
- Generate new keystore: `keytool -genkey -v -keystore ...`
- Ensure minimum SDK is 30+
- Check Java version: `java -version`

## Development Best Practices

### Code Organization
- Keep components focused and reusable
- Use TypeScript for type safety
- Follow the existing file structure
- Use constants for magic numbers/strings

### Performance
- Use React.memo for expensive components
- Optimize re-renders with useCallback/useMemo
- Lazy load images and data
- Monitor bundle size: `expo bundle-analyzer`

### Security
- Never commit `.env` files
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize data before sending to backend

### Testing
- Test on both iOS and Android
- Test on web browser
- Test with slow network (DevTools throttling)
- Test with different screen sizes

## Deployment Checklist

Before deploying to production:

- [ ] Remove debug code and console.logs
- [ ] Update version in package.json and app.json
- [ ] Configure Google Sheets integration
- [ ] Test on all platforms (web, iOS, Android)
- [ ] Test payment flow end-to-end
- [ ] Update README with real organization details
- [ ] Set privacy policy and terms of service
- [ ] Configure error tracking (Sentry/Firebase)
- [ ] Set up auto-update strategy (EAS Updates)
- [ ] Plan backup and recovery strategy

## Support and Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Google Forms API](https://developers.google.com/forms/api)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

**For questions or issues, contact:** support@myculturalorg.com
