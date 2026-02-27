# Quick Start Guide - My Cultural Organisation App

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (1-2 minutes)

```bash
cd /Users/jaychowdhury/react_projects/myculturalorg
npm install
```

### Step 2: Choose Your Platform

**For Web Browser:**
```bash
npm run web
```
Opens at `http://localhost:19006/`

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Mobile with Expo Go:**
```bash
npm start
# Scan QR code with Expo Go app
```

### Step 3: Explore the App

1. **About Us Tab** - View organization information
2. **Events Tab** - Browse event calendar
3. **Donate Tab** - Try payment form (simulated for testing)

## 📋 What's Included

### ✅ Fully Functional Features

- ✨ **About Us Page** - Organization info, mission, vision, upcoming events
- 📅 **Event Calendar** - Interactive yearly calendar with event highlights
- 💳 **Payment System** - Full donation form with validation
  - Multiple payment methods (UPI, Cards, Bank Transfer)
  - Real-time form validation
  - Transaction ID generation
  - Google Sheets integration ready
- 🎨 **Professional UI** - Beautiful, responsive design
- 📱 **Cross-Platform** - Works on web, iOS, and Android
- 🔄 **Form Management** - Smart validation and error handling

### 📚 Documentation Included

- **README.md** - Complete user guide
- **SETUP_GUIDE.md** - Detailed setup instructions
- **CODE_DOCUMENTATION.md** - Developer reference
- **QUICK_START.md** - This file

## 🔧 Configuration (Optional)

### Google Sheets Integration

To enable automatic payment recording to Google Sheets:

1. **Create a Google Form** (easiest method)
   - Go to [Google Forms](https://forms.google.com)
   - Create form with these fields in order:
     - Event Name, Donor Name, Contact Number, Email
     - Representative Name, Transaction ID, Amount
     - Currency, Payment Valid Date, Payment Method
   - Link to Google Sheet
   - Copy form action URL and entry IDs

2. **Update Configuration**
   - Edit: `services/googleSheetsService.ts`
   - Replace: `GOOGLE_FORM_CONFIG.actionUrl`
   - Replace: `GOOGLE_FORM_CONFIG.fields` entry IDs

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## 🧪 Testing the App

### Payment Flow Demo

1. Open the **Donate** tab
2. Fill in the form:
   - **Event:** Select an event from dropdown
   - **Donor Name:** Enter your name
   - **Amount:** Enter donation amount (e.g., 500)
   - **Payment Method:** Choose one (UPI, Debit Card, etc.)
3. Click **Proceed to Payment**
4. Wait for simulated processing
5. See success modal with transaction ID

**Note:** Payment is simulated for testing. Real gateway integration requires Razorpay, Stripe, etc.

### Calendar Features

1. Open the **Events** tab
2. Navigate months using arrows
3. Events are highlighted with dots
4. Click day to see event details
5. View all events for the month below

### About Us Exploration

1. Open the **About Us** tab
2. Click sections to expand/collapse:
   - About Us
   - Our Mission
   - Our Vision
   - Upcoming Events
3. View contact information

## 📁 Project Structure

```
myculturalorg/
├── App.tsx                 # Main app with navigation
├── screens/                # Three main screens
│   ├── AboutUsScreen.tsx
│   ├── EventCalendarScreen.tsx
│   └── PaymentScreen.tsx
├── services/               # Google Sheets integration
├── utils/                  # Payment utilities
├── constants/              # Colors, typography, data
├── types/                  # TypeScript interfaces
├── hooks/                  # Custom React hooks
└── docs/
    ├── README.md           # Full documentation
    ├── SETUP_GUIDE.md      # Setup instructions
    └── CODE_DOCUMENTATION.md  # Developer guide
```

## 🎨 Customization

### Change Organization Name

Edit `constants/index.ts`:
```typescript
export const AboutUsContent = {
  title: 'Your Organization Name',
  // ...
};
```

### Add Logo/Images

Update `screens/AboutUsScreen.tsx`:
```typescript
<Image source={require('./assets/logo.png')} />
```

### Change Colors

Edit `constants/index.ts`:
```typescript
export const Colors = {
  primary: '#YourColor',
  // ...
};
```

### Add New Events

Edit `constants/index.ts`:
```typescript
export const DefaultEvents = [
  // ... existing events
  {
    id: '5',
    name: 'Your Event',
    date: new Date(2026, 0, 15),
    description: 'Event details',
    location: 'Location',
  },
];
```

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Kill existing process and try again
npm start -- --reset-cache
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build Errors

```bash
# Clear cache and rebuild
npm start -- --reset-cache
```

### Payment Form Not Saving

Check `services/googleSheetsService.ts` configuration:
- Verify form action URL
- Check entry IDs match your form
- Ensure form is published

## 📱 Deploy to Phone

### Using Expo Go (Easiest)

```bash
npm start
# Scan QR code with Expo Go app
```

### Building Production App

```bash
# iOS App Store
eas build --platform ios

# Google Play Store
eas build --platform android

# Web hosting
npm run build
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for production deployment.

## 💡 Next Steps

1. ✅ Run the app: `npm run web`
2. ✅ Explore the three tabs
3. ✅ Test payment form (simulated)
4. ✅ Configure Google Sheets (optional)
5. ✅ Customize content for your organization
6. ✅ Build for production

## 📖 Learn More

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Google Forms API](https://developers.google.com/forms)

## 🎯 Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| About Us Page | ✅ Complete | Mission, vision, events, contact |
| Event Calendar | ✅ Complete | Monthly/yearly views, highlights |
| Payment Form | ✅ Complete | Validation, simulation, recording |
| Google Sheets | ✅ Ready | Needs configuration |
| Multiple Payments | ✅ Complete | UPI, Cards, Bank Transfer |
| Responsive Design | ✅ Complete | Mobile & Web optimized |
| TypeScript | ✅ Complete | Full type safety |
| Navigation | ✅ Complete | Tab-based navigation |

## 📞 Support

For issues or questions:
- 📧 Email: support@myculturalorg.com
- 📖 Docs: See README.md and SETUP_GUIDE.md
- 🐛 Bugs: Check console (F12 DevTools) for error messages

---

**Ready to go?** Run `npm run web` and explore! 🎉

**Last Updated:** February 2026
