# My Cultural Organisation - Resource Index

## 📖 Main Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| [README.md](README.md) | Complete project overview | Everyone |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide | Developers |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | What's been created | Everyone |
| [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) | Step-by-step setup | Developers |

## 🔧 Technical Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | API endpoints & usage | Backend developers |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide | DevOps/Deployment |
| [GOOGLE_SHEETS_GUIDE.md](GOOGLE_SHEETS_GUIDE.md) | Google Sheets integration | Backend developers |
| [TESTING.md](TESTING.md) | Testing procedures | QA/Testing |

## 📂 Directory Structure

### Frontend
```
frontend/
├── public/                  # Static files
├── src/
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── services/            # API & utility services
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── constants/           # Application constants
│   ├── config/              # Configuration files
│   ├── styles/              # CSS stylesheets
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
├── .env.example             # Environment template
├── Dockerfile               # Docker configuration
└── package.json             # Dependencies
```

### Backend
```
backend/
├── config/                  # Configuration guides
├── controllers/             # Business logic
├── routes/                  # API routes
├── utils/                   # Utility functions
├── server.js                # Server entry point
├── .env.example             # Environment template
├── Dockerfile               # Docker configuration
└── package.json             # Dependencies
```

## 🚀 Quick Start Commands

### Installation
```bash
# Linux/Mac
chmod +x setup.sh
./setup.sh

# Windows
setup.bat

# Or manually:
cd frontend && npm install
cd ../backend && npm install
```

### Development
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

### Production
```bash
# Frontend
npm run build

# Backend
NODE_ENV=production npm start

# Docker
docker-compose up -d
```

## 📚 Key Files & Their Purpose

### Configuration
- `.env` files - API keys and secrets
- `package.json` - Dependencies
- `docker-compose.yml` - Containerization
- `.gitignore` - Git exclusions

### Frontend Key Files
- `src/App.js` - Main router and layout
- `src/pages/PaymentPage.js` - Payment integration
- `src/components/PaymentForm.js` - Payment form
- `src/services/apiClient.js` - API configuration

### Backend Key Files
- `server.js` - Express server setup
- `controllers/paymentController.js` - Payment logic
- `routes/paymentRoutes.js` - API routes
- `utils/sheetsHelper.js` - Google Sheets helper

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
GOOGLE_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
```

### Frontend (.env.local)
```
REACT_APP_RAZORPAY_KEY=
REACT_APP_API_BASE_URL=http://localhost:5000
```

## 📊 API Reference

### Payment Endpoints
- **POST** `/api/create-order` - Create payment order
- **POST** `/api/verify-payment` - Verify payment signature
- **GET** `/health` - Server health check

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for details.

## 🧪 Testing

### Local Testing
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm start`
3. Open `http://localhost:3000`
4. Use test card: `4111 1111 1111 1111`
5. Use test OTP: `123456`

See [TESTING.md](TESTING.md) for comprehensive testing guide.

## 🌐 Deployment Options

| Platform | Guide | Status |
|----------|-------|--------|
| Vercel | [DEPLOYMENT.md](DEPLOYMENT.md#option-1-vercel-recommended-for-react) | ✅ Recommended |
| Netlify | [DEPLOYMENT.md](DEPLOYMENT.md#option-2-netlify) | ✅ Ready |
| Railway | [DEPLOYMENT.md](DEPLOYMENT.md#option-1-railwayapp-recommended) | ✅ Recommended |
| Heroku | [DEPLOYMENT.md](DEPLOYMENT.md#option-2-heroku) | ✅ Ready |
| AWS | [DEPLOYMENT.md](DEPLOYMENT.md#option-3-aws-ec2) | ✅ Ready |

## 🛠️ Tools & Services

### Required
- **Node.js** - Runtime environment
- **npm** - Package manager
- **Razorpay** - Payment gateway

### Optional
- **Google Cloud** - Google Sheets API
- **Docker** - Containerization
- **PostgreSQL** - Database (if needed)

## 📞 Support Resources

### Getting Help
1. Check relevant `.md` file for your issue
2. Review inline code comments
3. Check TESTING.md for troubleshooting

### Key Contacts
- **Razorpay Support** - https://razorpay.com/support
- **Google Cloud Support** - https://cloud.google.com/support
- **Node.js Docs** - https://nodejs.org/docs
- **React Docs** - https://react.dev

## 🎯 Setup Workflow

1. **Install** - Run `./setup.sh` or `setup.bat`
2. **Configure** - Edit `.env` files with credentials
3. **Develop** - Start frontend and backend
4. **Test** - Follow testing guide
5. **Deploy** - Use deployment guide for your platform

## 📋 Checklist

### Before Deployment
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Payment flow tested locally
- [ ] Database/Google Sheets setup (if using)
- [ ] SSL certificates prepared
- [ ] Razorpay live credentials obtained
- [ ] Frontend build test passed
- [ ] Backend error handling tested

### Production
- [ ] Domain configured
- [ ] SSL/HTTPS enabled
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Error logging enabled

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| Razorpay Dashboard | https://dashboard.razorpay.com |
| Google Cloud Console | https://console.cloud.google.com |
| Node.js | https://nodejs.org |
| React | https://react.dev |
| Express | https://expressjs.com |

## 📝 Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0.0 | Feb 24, 2026 | ✅ Initial Release |

## 📄 License

Proprietary - My Cultural Organisation

---

## Quick Links

- [Back to README](README.md)
- [Quick Start](QUICKSTART.md)
- [Project Summary](PROJECT_SUMMARY.md)
- [Setup Checklist](SETUP_CHECKLIST.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Testing Guide](TESTING.md)
- [Google Sheets Guide](GOOGLE_SHEETS_GUIDE.md)

---

**Last Updated:** February 24, 2026
