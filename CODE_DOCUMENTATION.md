# My Cultural Organisation - Code Documentation

## Overview

This document provides comprehensive documentation for the My Cultural Organisation React Native application codebase.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Core Components](#core-components)
3. [Services](#services)
4. [Utilities](#utilities)
5. [Type Definitions](#type-definitions)
6. [Constants](#constants)
7. [Custom Hooks](#custom-hooks)
8. [Code Examples](#code-examples)
9. [API Integration](#api-integration)

## Project Structure

```
myculturalorg/
├── App.tsx                      # Main app component with navigation
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler configuration
├── app.json                    # Expo configuration
├── README.md                   # User guide
├── SETUP_GUIDE.md             # Setup instructions
├── CODE_DOCUMENTATION.md       # This file
│
├── screens/                    # Screen components
│   ├── AboutUsScreen.tsx
│   ├── EventCalendarScreen.tsx
│   └── PaymentScreen.tsx
│
├── services/                   # Business logic services
│   └── googleSheetsService.ts
│
├── types/                      # TypeScript type definitions
│   └── index.ts
│
├── constants/                  # App constants and configuration
│   └── index.ts
│
├── utils/                      # Utility functions
│   └── paymentUtils.ts
│
├── hooks/                      # Custom React hooks
│   └── index.ts
│
└── index.ts                    # Main export file
```

## Core Components

### App.tsx - Main Application

The main entry point that sets up navigation.

**Key Features:**
- Bottom tab navigation for three main screens
- Gesture handler root view for navigation
- Status bar configuration

**Structure:**
```
App
├── GestureHandlerRootView
├── StatusBar config
└── NavigationContainer
    └── BottomTabNavigator
        ├── AboutUsStack
        ├── EventCalendarStack
        └── PaymentStack
```

### AboutUsScreen.tsx

Displays organization information, mission, vision, and events.

**Props:** None

**State:**
- `expandedSection`: Currently expanded section (null | 'description' | 'mission' | 'vision' | 'events')

**Features:**
- Expandable sections with icons
- Event list display
- Contact information
- Responsive design

**Example Usage:**
```typescript
import AboutUsScreen from './screens/AboutUsScreen';

<Stack.Screen 
  name="AboutUs" 
  component={AboutUsScreen} 
/>
```

### EventCalendarScreen.tsx

Interactive calendar for viewing events throughout the year.

**Props:** None

**State:**
- `selectedMonth`: Current month (0-11)
- `selectedYear`: Current year
- `calendarDays`: Array of days for current month

**Features:**
- Month navigation
- Calendar grid with event indicators
- Event list for selected month
- All events for the year
- Today highlighting

**Example Usage:**
```typescript
import EventCalendarScreen from './screens/EventCalendarScreen';

// Displays events from DefaultEvents constant
// User can navigate through months
// Events are highlighted on calendar
```

### PaymentScreen.tsx (with SuccessModal)

Payment form with validation and processing.

**Props:** None

**State:**
- `formData`: Payment form data
- `errors`: Form validation errors
- `isLoading`: Payment processing state
- `showSuccessModal`: Success modal visibility
- `successMessage`: Success message text
- `transactionId`: Generated transaction ID

**Features:**
- Event dropdown selection
- Form validation with error display
- Multiple payment method selection
- Date picker with range buttons
- Payment processing simulation
- Success confirmation modal
- Google Sheets integration
- Form reset capability

**Example Usage:**
```typescript
import PaymentScreen from './screens/PaymentScreen';
import { SuccessModal } from './screens/PaymentScreen';

// Validates payment form
// Processes payment with simulation
// Records to Google Sheets if configured
// Shows success modal with transaction ID
```

## Services

### googleSheetsService.ts

Handles integration with Google Forms and Google Sheets API.

**Functions:**

#### `submitPaymentToGoogleForm(payment: PaymentRecord): Promise<any>`
Submits payment data to Google Forms.

```typescript
import { submitPaymentToGoogleForm } from './services/googleSheetsService';

const paymentRecord = {
  transactionId: 'TXN-123456789',
  eventName: 'Diwali Festival',
  donorName: 'John Doe',
  amount: 5000,
  // ... other fields
};

try {
  await submitPaymentToGoogleForm(paymentRecord);
  console.log('Submitted to Google Forms');
} catch (error) {
  console.error('Submission failed:', error);
}
```

#### `submitPaymentToGoogleSheets(payment: PaymentRecord): Promise<any>`
Submits payment data directly to Google Sheets API.

```typescript
import { submitPaymentToGoogleSheets } from './services/googleSheetsService';

try {
  await submitPaymentToGoogleSheets(paymentRecord);
  console.log('Submitted to Google Sheets');
} catch (error) {
  console.error('Submission failed:', error);
}
```

#### `fetchPaymentsFromGoogleSheets(): Promise<PaymentRecord[]>`
Retrieves all payment records from Google Sheets.

```typescript
import { fetchPaymentsFromGoogleSheets } from './services/googleSheetsService';

const payments = await fetchPaymentsFromGoogleSheets();
console.log('Total payments:', payments.length);
```

**Configuration:**
Edit `GOOGLE_FORM_CONFIG` and `GOOGLE_SHEETS_CONFIG` constants to set up integration.

## Utilities

### paymentUtils.ts

Payment-related utility functions.

**Functions:**

#### `generateTransactionId(): string`
Generates unique transaction ID.

```typescript
import { generateTransactionId } from './utils/paymentUtils';

const id = generateTransactionId();
// Returns: TXN-1677000000000-1234
```

#### `validateEmail(email: string): boolean`
Validates email format.

```typescript
import { validateEmail } from './utils/paymentUtils';

validateEmail('user@example.com');  // true
validateEmail('invalid-email');     // false
```

#### `validatePhoneNumber(phoneNumber: string): boolean`
Validates Indian phone number (10 digits).

```typescript
import { validatePhoneNumber } from './utils/paymentUtils';

validatePhoneNumber('9876543210');  // true
validatePhoneNumber('12345');       // false
```

#### `formatCurrency(amount: number): string`
Formats amount as currency.

```typescript
import { formatCurrency } from './utils/paymentUtils';

formatCurrency(5000);  // Returns: ₹5,000.00
formatCurrency(1234.56);  // Returns: ₹1,234.56
```

#### `formatDate(date: Date): string`
Formats date as DD/MM/YYYY.

```typescript
import { formatDate } from './utils/paymentUtils';

formatDate(new Date());  // Returns: 25/02/2026
```

#### `createPaymentRecord(formData: PaymentFormData): PaymentRecord`
Converts form data to payment record.

```typescript
import { createPaymentRecord } from './utils/paymentUtils';

const record = createPaymentRecord({
  eventName: 'Diwali',
  donorName: 'John',
  amount: 5000,
  // ... other fields
});

// record includes transactionId, timestamps, etc.
```

#### `validatePaymentForm(formData: PaymentFormData): { isValid: boolean; errors: string[] }`
Validates entire payment form.

```typescript
import { validatePaymentForm } from './utils/paymentUtils';

const validation = validatePaymentForm(formData);

if (!validation.isValid) {
  console.log('Errors:', validation.errors);
}
```

#### `simulatePaymentGateway(paymentMethod: string, amount: number): Promise<...>`
Simulates payment gateway processing (for testing).

```typescript
import { simulatePaymentGateway } from './utils/paymentUtils';

try {
  const result = await simulatePaymentGateway('UPI', 5000);
  console.log('Payment successful:', result.transactionId);
} catch (error) {
  console.log('Payment failed:', error.message);
}
```

## Type Definitions

### types/index.ts

**Interfaces:**

#### `Event`
Represents an organization event.

```typescript
interface Event {
  id: string;              // Unique identifier
  name: string;            // Event name
  date: Date;              // Event date
  description: string;     // Event description
  imageUrl?: string;       // Optional event image
  location?: string;       // Optional location
}
```

#### `PaymentFormData`
Payment form input data.

```typescript
interface PaymentFormData {
  eventName: string;            // Event to donate for
  donorName: string;            // Donor name
  contactNumber?: string;       // Optional phone
  email?: string;               // Optional email
  representativeName?: string;  // Optional org rep name
  paymentValidDate: Date;       // Payment validity
  paymentMethod: 'UPI' | 'DEBIT_CARD' | 'CREDIT_CARD' | 'BANK_TRANSFER';
  amount: number;               // Donation amount
}
```

#### `PaymentRecord`
Complete payment record (includes generated data).

```typescript
interface PaymentRecord {
  transactionId: string;           // Generated ID
  eventName: string;               // Event name
  donorName: string;               // Donor name
  contactNumber?: string;          // Optional phone
  email?: string;                  // Optional email
  representativeName?: string;     // Optional org rep
  amount: number;                  // Amount
  currency: string;                // Currency code
  paymentValidDate: string;        // Formatted date
  paymentDate: string;             // Timestamp
  paymentMethod: string;           // Method used
}
```

#### `CalendarEvent`
Event for calendar display.

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}
```

## Constants

### constants/index.ts

**Color Palette:**
```typescript
Colors.primary      // #8B4513 - Brown (main color)
Colors.secondary    // #D2691E - Chocolate
Colors.accent       // #FFD700 - Gold
Colors.background   // #FFF8DC - Cornsilk
Colors.white        // #FFFFFF
Colors.black        // #000000
Colors.gray         // #808080
Colors.lightGray    // #F5F5F5
Colors.red          // #FF6B6B
Colors.green        // #51CF66
Colors.blue         // #4C6EF5
```

**Typography:**
```typescript
Typography.h1    // fontSize: 28, bold
Typography.h2    // fontSize: 24, semi-bold
Typography.h3    // fontSize: 20, semi-bold
Typography.body  // fontSize: 16, regular
Typography.caption // fontSize: 14
Typography.small // fontSize: 12
```

**Spacing:**
```typescript
Spacing.xs   // 4px
Spacing.sm   // 8px
Spacing.md   // 16px
Spacing.lg   // 24px
Spacing.xl   // 32px
Spacing.xxl  // 48px
```

**Default Events:**
```typescript
DefaultEvents  // Array of Event objects for the year
```

**Payment Methods:**
```typescript
PaymentMethods  // Array of { label, value } for payment options
```

## Custom Hooks

### hooks/index.ts

#### `useForm<T>(initialValues: T, onSubmit?: (values: T) => void | Promise<void>)`

Form state management hook.

```typescript
import { useForm } from './hooks';

const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  (values) => {
    console.log('Submit:', values);
  }
);

// Use in components
<TextInput 
  value={values.email}
  onChangeText={(text) => handleChange('email', text)}
/>
```

#### `useAsync<T, E>(asyncFunction: () => Promise<T>, immediate?: boolean)`

Async operation management hook.

```typescript
import { useAsync } from './hooks';

const { status, data, error, execute, retry } = useAsync(
  () => fetchPayments(),
  true // execute immediately
);

if (status === 'loading') return <ActivityIndicator />;
if (error) return <Text>Error: {error}</Text>;
```

#### `useToggle(initialValue?: boolean)`

Boolean toggle hook.

```typescript
import { useToggle } from './hooks';

const { value, toggle, setTrue, setFalse } = useToggle(false);

<TouchableOpacity onPress={toggle}>
  <Text>{value ? 'On' : 'Off'}</Text>
</TouchableOpacity>
```

More hooks available: `useLocalStorage`, `useDebounce`, `useThrottle`

## Code Examples

### Example 1: Adding a New Event

```typescript
// constants/index.ts
export const DefaultEvents = [
  // ... existing events
  {
    id: '5',
    name: 'Janmashtami Festival',
    date: new Date(2026, 7, 15), // August 15
    description: 'Celebration of Lord Krishna birth',
    location: 'Main Hall',
  },
];
```

### Example 2: Processing a Payment

```typescript
// screens/PaymentScreen.tsx
const handlePayment = async () => {
  // Validate
  const validation = validatePaymentForm(formData);
  if (!validation.isValid) {
    Alert.alert('Errors', validation.errors.join('\n'));
    return;
  }

  setIsLoading(true);
  try {
    // Process payment
    const result = await simulatePaymentGateway(
      formData.paymentMethod,
      formData.amount
    );

    // Create record
    const record = createPaymentRecord(formData);
    record.transactionId = result.transactionId;

    // Save to Google Sheets
    await submitPaymentToGoogleForm(record);

    // Show success
    setSuccessMessage('Payment successful!');
    setShowSuccessModal(true);
  } catch (error) {
    Alert.alert('Error', error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Example 3: Custom Component with Form

```typescript
import { useForm } from './hooks';

const MyForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '' },
    async (values) => {
      await submitData(values);
    }
  );

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={values.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
      
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## API Integration

### Integrating Real Payment Gateway

To integrate a real payment gateway (Razorpay, Stripe, etc.):

1. **Install SDK:**
```bash
npm install razorpay-react-native
# or
npm install @stripe/stripe-react-native
```

2. **Replace `simulatePaymentGateway` in `utils/paymentUtils.ts`:**

```typescript
import RazorpayCheckout from 'razorpay-react-native';

export const simulatePaymentGateway = async (
  paymentMethod: string,
  amount: number
) => {
  try {
    const response = await RazorpayCheckout.open({
      key_id: 'your_razorpay_key',
      amount: amount * 100, // Razorpay expects amount in paise
      name: 'My Cultural Organisation',
      currency: 'INR',
      order_id: generateTransactionId(),
    });
    
    return {
      success: true,
      transactionId: response.razorpay_payment_id,
      message: 'Payment successful',
    };
  } catch (error) {
    throw new Error('Payment failed: ' + error.message);
  }
};
```

### Email Notifications

To send email receipts:

```typescript
import nodemailer from 'nodemailer';

const sendReceipt = async (email: string, paymentRecord: PaymentRecord) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Payment Receipt - My Cultural Organisation',
    html: `
      <h2>Thank you for your donation!</h2>
      <p>Event: ${paymentRecord.eventName}</p>
      <p>Amount: ${formatCurrency(paymentRecord.amount)}</p>
      <p>Transaction ID: ${paymentRecord.transactionId}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
```

---

## Testing

Run TypeScript check:
```bash
npx tsc --noEmit
```

Check for lint errors:
```bash
npx eslint . --ext .ts,.tsx
```

Build for production:
```bash
npm run build
```

---

**Last Updated:** February 2026
**Version:** 1.0.0

For more information, see [README.md](README.md) and [SETUP_GUIDE.md](SETUP_GUIDE.md).
