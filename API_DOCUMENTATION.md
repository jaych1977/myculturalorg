# API Documentation

## Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://mco-api.herokuapp.com/api` (Example)

## Authentication
Currently, the API does not require authentication. For production, implement JWT authentication.

## Endpoints

### Payment & Donations

#### 1. Create Payment Order
**Endpoint:** `POST /api/create-order`

**Description:** Initiates a new payment order with Razorpay

**Request Body:**
```json
{
  "amount": 50000,
  "currency": "INR",
  "eventName": "Classical Music Festival",
  "donorName": "John Doe",
  "contactNumber": "9876543210",
  "email": "john@example.com",
  "repName": "Raj Kumar",
  "validDate": "2026-12-31"
}
```

**Response:** (Success - 200)
```json
{
  "id": "order_L6fzHvHfrVr1Zy",
  "amount": 50000,
  "currency": "INR"
}
```

**Response:** (Error - 500)
```json
{
  "error": "Failed to create order",
  "details": "Error message details"
}
```

---

#### 2. Verify Payment
**Endpoint:** `POST /api/verify-payment`

**Description:** Verifies Razorpay payment signature and saves data to Google Sheets

**Request Body:**
```json
{
  "razorpay_order_id": "order_L6fzHvHfrVr1Zy",
  "razorpay_payment_id": "pay_L6fzHvHfrVr1Zy",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d",
  "formData": {
    "eventName": "Classical Music Festival",
    "donorName": "John Doe",
    "contactNumber": "9876543210",
    "email": "john@example.com",
    "repName": "Raj Kumar",
    "validDate": "2026-12-31"
  },
  "amount": "500"
}
```

**Response:** (Success - 200)
```json
{
  "success": true,
  "message": "Payment verified and recorded successfully",
  "paymentId": "pay_L6fzHvHfrVr1Zy",
  "sheetsResult": {
    "success": true,
    "message": "Data would be saved to Google Sheets",
    "data": {
      "transactionId": "pay_L6fzHvHfrVr1Zy",
      "eventName": "Classical Music Festival",
      "donorName": "John Doe",
      "amount": "500",
      "currency": "INR"
    }
  }
}
```

**Response:** (Error - 400)
```json
{
  "success": false,
  "error": "Invalid signature"
}
```

**Response:** (Error - 500)
```json
{
  "success": false,
  "error": "Verification failed",
  "details": "Error message details"
}
```

---

## Error Codes & Handling

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Invalid payment signature |
| 404 | Not Found | Endpoint not found |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, implement:
- 100 requests per minute per IP for public endpoints
- 1000 requests per minute for authenticated users

---

## Request/Response

### Headers

**All Requests:**
```
Content-Type: application/json
```

**Optional (Future):**
```
Authorization: Bearer <JWT_TOKEN>
X-API-Version: 1.0
```

---

## Code Examples

### JavaScript/Fetch

```javascript
// Create Order
const createOrder = async (orderData) => {
  const response = await fetch('http://localhost:5000/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 50000,
      currency: 'INR',
      eventName: 'Classical Music Festival',
      donorName: 'John Doe'
    })
  });

  const data = await response.json();
  console.log('Order ID:', data.id);
  return data;
};

// Verify Payment
const verifyPayment = async (paymentData) => {
  const response = await fetch('http://localhost:5000/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData)
  });

  const result = await response.json();
  if (result.success) {
    console.log('Payment verified!');
  } else {
    console.error('Payment verification failed:', result.error);
  }
  return result;
};
```

### cURL

```bash
# Create Order
curl -X POST http://localhost:5000/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "currency": "INR",
    "eventName": "Classical Music Festival",
    "donorName": "John Doe"
  }'

# Verify Payment
curl -X POST http://localhost:5000/api/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_...",
    "razorpay_payment_id": "pay_...",
    "razorpay_signature": "...",
    "formData": {...},
    "amount": "500"
  }'
```

### Python

```python
import requests
import json

# Create Order
url = "http://localhost:5000/api/create-order"
payload = {
    "amount": 50000,
    "currency": "INR",
    "eventName": "Classical Music Festival",
    "donorName": "John Doe"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())

# Verify Payment
verify_url = "http://localhost:5000/api/verify-payment"
verify_payload = {
    "razorpay_order_id": "...",
    "razorpay_payment_id": "...",
    "razorpay_signature": "...",
    "formData": {...},
    "amount": "500"
}

verify_response = requests.post(verify_url, json=verify_payload, headers=headers)
print(verify_response.json())
```

---

## Testing with Postman

1. Import the following collection:
```json
{
  "info": {
    "name": "MCO API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Order",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/create-order",
          "host": ["{{base_url}}"],
          "path": ["api", "create-order"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"amount\": 50000,\n  \"currency\": \"INR\",\n  \"eventName\": \"Classical Music Festival\",\n  \"donorName\": \"John Doe\"\n}"
        }
      }
    }
  ]
}
```

2. Set variable: `base_url = http://localhost:5000`
3. Send requests and check responses

---

## Future API Endpoints (To Implement)

```
GET  /api/events               - List all events
GET  /api/events/:id           - Get event details
GET  /api/donations            - Get all donations
GET  /api/donations/:id        - Get donation details
PUT  /api/donations/:id        - Update donation
DELETE /api/donations/:id      - Delete donation
GET  /api/stats                - Get donation statistics
POST /api/admin/login          - Admin authentication
GET  /api/admin/dashboard      - Admin dashboard data
```

---

## Changelog

### Version 1.0.0 (2026-02-24)
- Initial API release
- Create order endpoint
- Verify payment endpoint
- Google Sheets integration

### Future Versions
- Admin endpoints
- Authentication
- Advanced filtering
- Webhooks for real-time updates

---

**Last Updated:** February 24, 2026
