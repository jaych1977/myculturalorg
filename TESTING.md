# Testing Guide - My Cultural Organisation

## Manual Testing Checklist

### Frontend Testing

#### Home Page
- [ ] Page loads without errors
- [ ] Navigation menu is visible and functional
- [ ] Hero section displays correctly
- [ ] Feature cards are styled properly
- [ ] CTA buttons are clickable
- [ ] Responsive on mobile (320px, 480px, 768px widths)

#### About Us Page
- [ ] Page loads without errors
- [ ] Mission statement is displayed
- [ ] Event cards are visible and responsive
- [ ] Scrolling works smoothly
- [ ] Images/emojis load correctly

#### Event Calendar Page
- [ ] 12 month buttons are functional
- [ ] Clicking month updates event list
- [ ] Events display with correct date and time
- [ ] Date formatting is correct
- [ ] Mobile layout is readable

#### Payment Page
- [ ] Form loads without errors
- [ ] Event dropdown populates correctly
- [ ] Form validation works:
  - [ ] Required fields show error when empty
  - [ ] Email validation works
  - [ ] Phone validation (10 digits)
  - [ ] Amount minimum validation (₹100)
  - [ ] Date cannot be in past
- [ ] Optional fields can be left blank
- [ ] Amount input shows ₹ symbol

### Backend Testing

#### Server Setup
- [ ] Server starts without errors: `npm start`
- [ ] Health check endpoint works: `GET http://localhost:5000/health`
- [ ] CORS is configured correctly
- [ ] Environment variables are loaded

#### Payment API
- [ ] Create order endpoint works:
  - [ ] `POST /api/create-order` accepts valid data
  - [ ] Returns order ID and amount
  - [ ] Rejects invalid data with 400 error
  - [ ] Handles missing fields
- [ ] Verify payment endpoint:
  - [ ] Validates signature correctly
  - [ ] Accepts valid test payment data
  - [ ] Rejects invalid signatures
  - [ ] Returns success response

### Integration Testing

#### Payment Flow
- [ ] Complete payment process:
  1. [ ] Fill form with test data
  2. [ ] Click "Proceed to Payment"
  3. [ ] Razorpay form opens
  4. [ ] Payment can be completed with test card
  5. [ ] Success message appears
  6. [ ] Transaction ID is displayed
  7. [ ] Form resets after success
  8. [ ] Data appears in Google Sheets

#### Error Handling
- [ ] Invalid form shows errors
- [ ] Payment failure shows error message
- [ ] Network errors are handled gracefully
- [ ] Timeout errors are handled

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Form submission < 2 seconds
- [ ] No console errors
- [ ] No memory leaks
- [ ] Images are optimized

## Automated Testing

### Unit Tests (Jest/Vitest)

Create `frontend/src/__tests__/`:

```javascript
// validators.test.js
import { validators } from '../utils/validators';

describe('Validators', () => {
  test('isValidEmail returns true for valid email', () => {
    expect(validators.isValidEmail('test@example.com')).toBe(true);
  });

  test('isValidEmail returns false for invalid email', () => {
    expect(validators.isValidEmail('invalid')).toBe(false);
  });

  test('isValidPhone validates 10-digit Indian number', () => {
    expect(validators.isValidPhone('9876543210')).toBe(true);
    expect(validators.isValidPhone('12345')).toBe(false);
  });

  test('isValidAmount allows amounts between 100-100000', () => {
    expect(validators.isValidAmount(500)).toBe(true);
    expect(validators.isValidAmount(50)).toBe(false);
  });
});
```

### Integration Tests

```javascript
// payment.integration.test.js
describe('Payment Flow', () => {
  test('creates order and verifies payment', async () => {
    // Create order
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: 50000, eventName: 'Test' })
    });
    const order = await orderResponse.json();

    expect(order.id).toBeDefined();
    expect(order.amount).toBe(50000);
  });
});
```

## Load Testing

### Using Apache Bench

```bash
# 1000 requests, 100 concurrent
ab -n 1000 -c 100 http://localhost:5000/health

# Results should show:
# Requests per second: > 100
# Failed requests: 0
# Longest request: < 100ms
```

### Using Artillery

```yaml
# load-test.yml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: 'Payment API'
    flow:
      - post:
          url: '/api/create-order'
          json:
            amount: 50000
            eventName: 'Test Event'
```

Run:
```bash
npm install -g artillery
artillery quick --count 100 --num 1000 http://localhost:5000/health
```

## Security Testing

### OWASP Top 10 Checklist

- [ ] **Injection:** Test SQL injection, command injection
  ```javascript
  // Try submitting: ' OR '1'='1
  // Verify output is escaped/safe
  ```

- [ ] **Broken Authentication:** Test session management
  - [ ] Can't access protected routes without auth
  - [ ] Session expires after timeout
  - [ ] Tokens are validated

- [ ] **Sensitive Data Exposure:**
  - [ ] No sensitive data in localStorage
  - [ ] HTTPS used in production
  - [ ] API keys not exposed in frontend

- [ ] **XML External Entities:** Not applicable (JSON API)

- [ ] **Broken Access Control:**
  - [ ] Users can only access their own data
  - [ ] No privilege escalation possible

- [ ] **Security Misconfiguration:**
  - [ ] CORS properly configured
  - [ ] No default credentials
  - [ ] Headers are secure

- [ ] **XSS (Cross-Site Scripting):**
  - [ ] Input is sanitized
  - [ ] Output is encoded
  - [ ] CSP headers configured

- [ ] **Insecure Deserialization:** Not applicable

- [ ] **Using Components with Known Vulnerabilities:**
  ```bash
  npm audit
  ```

- [ ] **Insufficient Logging:**
  - [ ] Errors are logged
  - [ ] Sensitive data not logged
  - [ ] Log files are secured

## Test Data

### Valid Test Cases

```javascript
const testDonor = {
  eventName: 'Classical Music Festival',
  donorName: 'Test Donor',
  contactNumber: '9876543210',
  email: 'test@example.com',
  repName: 'Test Rep',
  amount: '500',
  validDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
};
```

### Invalid Test Cases

```javascript
const invalidCases = [
  { ...testDonor, donorName: '' },           // Empty name
  { ...testDonor, contactNumber: '123' },    // Invalid phone
  { ...testDonor, email: 'invalid' },        // Invalid email
  { ...testDonor, amount: '50' },            // Amount too low
  { ...testDonor, validDate: '2020-01-01' }, // Past date
];
```

## Test Results Template

```markdown
## Test Results - [Date]

### Manual Testing: ✅ PASSED
- [ ] All 20/20 checks passed
- [ ] No critical issues found
- [ ] Performance acceptable

### Automated Tests: ✅ PASSED
- [ ] Unit tests: 45/45 passed
- [ ] Integration tests: 12/12 passed
- [ ] Coverage: > 80%

### Browser Testing: ✅ PASSED
- [ ] Chrome: ✅
- [ ] Firefox: ✅
- [ ] Safari: ✅
- [ ] Mobile: ✅

### Performance: ✅ PASSED
- [ ] Load time: 2.3s (< 3s) ✅
- [ ] Payment flow: 1.8s (< 2s) ✅
- [ ] No errors: ✅

### Security: ✅ PASSED
- [ ] npm audit: 0 vulnerabilities ✅
- [ ] No sensitive data exposed ✅
- [ ] CORS properly configured ✅

### Ready for Production: ✅ YES
```

---

**Last Updated:** February 24, 2026
