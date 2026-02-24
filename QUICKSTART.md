# My Cultural Organisation - Quick Start Guide

## Getting Started (5 minutes)

### Step 1: Clone/Setup Repository
```bash
cd /Users/jaychowdhury/react_projects/myculturalorg
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your Razorpay test credentials
# (Don't need Google Sheets setup for testing)
npm start
# Server runs on http://localhost:5000
```

### Step 3: Setup Frontend (New Terminal)
```bash
cd frontend
npm install
cp .env.example .env.local

# Edit .env.local with your Razorpay test key
npm start
# App runs on http://localhost:3000
```

## Testing the Application

### Navigation
- Click through "About Us" to see the organization information
- Click "Events" to browse the event calendar
- Click "Donate" to test the payment form

### Testing Payment
1. Go to Payment page
2. Fill form with test data:
   - Event: Any from dropdown
   - Donor Name:TestUser
   - Amount: 100 (or higher)
   - Date: Any future date
3. Click "Proceed to Payment"
4. Use Razorpay test card: `4111 1111 1111 1111`
5. OTP: `123456`

## Key Features Implemented

✅ **Home Page** - Hero section, feature cards, navigation
✅ **About Us** - Mission, programs, featured events gallery
✅ **Event Calendar** - 12-month calendar with events, interactive navigation
✅ **Payment Form** - Complete form with validation, optional/mandatory fields
✅ **Razorpay Integration** - Test payment processing
✅ **Responsive Design** - Mobile, tablet, desktop friendly
✅ **Google Sheets Ready** - Backend prepared for data storage

## What's Ready to Deploy

- ✅ Production-ready React frontend
- ✅ Express backend with payment API
- ✅ Docker & Docker Compose configurations
- ✅ Mobile-responsive design
- ✅ SEO-friendly structure

## Next Steps for Production

1. **Get Real Credentials**
   - Razorpay live mode keys
   - Google Sheets API setup
   - Domain setup

2. **Update Environment Files**
   - Replace test credentials with live ones
   - Update API base URLs
   - Configure CORS for your domain

3. **Deploy**
   - Frontend: Vercel, Netlify, or Heroku
   - Backend: Railway, Heroku, or AWS
   - Database: PostgreSQL on cloud

4. **Google Sheets Integration**
   - Follow setup in backend/config/README.md
   - Implement Google Sheets API calls
   - Test data storage

## File Structure

```
myculturalorg/
├── frontend/          # React SPA
│   ├── public/        # Static files
│   ├── src/           # Source code
│   └── package.json
├── backend/           # Node.js API
│   ├── controllers/   # Business logic
│   ├── routes/        # API endpoints
│   ├── utils/         # Helper functions
│   └── server.js      # Entry point
├── docker-compose.yml # Local development
├── README.md          # Full documentation
└── .gitignore
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in server.js or kill process
lsof -i :5000  # Check what's using port
kill -9 <PID>
```

### Module Not Found
```bash
# Install missing dependencies
npm install
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### CORS Issues
- Ensure backend is running on correct port
- Check `.env.local` has correct API_BASE_URL
- Verify axios/fetch calls use full URLs

## Contact & Support

For questions about implementation, refer to:
- README.md - Full documentation
- backend/config/README.md - Backend setup
- Each component has inline comments

---

Ready to code! 🚀
