# Deployment Guide - My Cultural Organisation

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] API endpoints tested locally
- [ ] Payment gateway credentials obtained
- [ ] Google Sheets setup completed
- [ ] Security credentials secured
- [ ] Build process tested (`npm run build`)
- [ ] CORS configured properly
- [ ] Database migrations (if applicable)

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

1. **Build the application:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Environment Variables:**
   - Add in Vercel Dashboard > Settings > Environment Variables
   - `REACT_APP_RAZORPAY_KEY=` (live key)
   - `REACT_APP_API_BASE_URL=` (your backend URL)

### Option 2: Netlify

1. **Connect GitHub Repository:**
   - Push code to GitHub
   - Connect repo to Netlify

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment Variables:**
   - Set in Netlify Dashboard > Site settings > Build & deploy

### Option 3: Heroku

1. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

2. **Add Buildpack:**
   ```bash
   heroku buildpacks:add mars/create-react-app
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

## Backend Deployment

### Option 1: Railway.app (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Railway:**
   - Go to railway.app
   - Create new project
   - Select GitHub repo

3. **Add Environment Variables:**
   - Railway Dashboard > Variables
   - Add all `.env` variables

4. **Deploy:**
   - Automatic on push (if set up)
   - Manual: Click Deploy button

### Option 2: Heroku

1. **Create Heroku App:**
   ```bash
   heroku create your-api-name
   heroku create your-api-name --buildpack heroku/nodejs
   ```

2. **Set Environment Variables:**
   ```bash
   heroku config:set RAZORPAY_KEY_ID=your_key
   heroku config:set RAZORPAY_KEY_SECRET=your_secret
   heroku config:set GOOGLE_SHEET_ID=your_sheet_id
   # ... set all other variables
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: AWS EC2

1. **Launch EC2 Instance:**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier eligible)

2. **Install Dependencies:**
   ```bash
   sudo apt update && apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and Setup:**
   ```bash
   git clone <your-repo>
   cd backend
   npm install
   ```

4. **Create .env file:**
   ```bash
   nano .env
   # Paste environment variables
   ```

5. **Use PM2 for Process Management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "mco-api"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx Reverse Proxy:**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Configure:
   ```
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **Enable SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Database Setup (PostgreSQL)

### If using PostgreSQL for additional data:

1. **Create Database:**
   ```sql
   CREATE DATABASE myculturalorg;
   CREATE USER mco_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE myculturalorg TO mco_user;
   ```

2. **Run Migrations:**
   ```bash
   npm run migrate
   ```

## Docker Deployment

### Using Docker Compose (Recommended for production):

1. **Build Images:**
   ```bash
   docker-compose build
   ```

2. **Start Services:**
   ```bash
   docker-compose up -d
   ```

3. **Check Status:**
   ```bash
   docker-compose ps
   docker-compose logs backend
   docker-compose logs frontend
   ```

### Kubernetes (Advanced):

1. **Create Kubernetes Manifests:**
   - deployment.yaml
   - service.yaml
   - configmap.yaml
   - secret.yaml

2. **Deploy:**
   ```bash
   kubectl apply -f k8s/
   ```

## SSL/HTTPS Setup

### Let's Encrypt (Free):

```bash
# Ubuntu/Debian
sudo apt-get install certbot
sudo certbot certonly --standalone -d your-domain.com

# Add to backend:
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/your-domain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/your-domain.com/fullchain.pem')
};

https.createServer(options, app).listen(443);
```

## Monitoring & Logging

### Application Performance Monitoring:

1. **PM2 Monitoring:**
   ```bash
   pm2 install pm2-logrotate
   pm2 monit
   ```

2. **Sentry (Error Tracking):**
   ```bash
   npm install @sentry/node
   ```

3. **New Relic (APM):**
   - Sign up at newrelic.com
   - Install agent: `npm install newrelic`

## Backup Strategy

### Regular Backups:

```bash
# Google Sheets - Manual backup:
# File > Download > CSV

# Database backup (if you add PostgreSQL):
pg_dump -U user -d myculturalorg > backup.sql

# Automated daily backup:
# Create cron job: crontab -e
0 2 * * * pg_dump -U user -d myculturalorg | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz
```

## Post-Deployment

1. **Accept Razorpay Live Agreement:**
   - Go to Razorpay Dashboard
   - Complete live activation

2. **Update Frontend for Production:**
   - Change API endpoints to live backend
   - Update Razorpay keys to live
   - Remove console.logs
   - Test payment flow end-to-end

3. **Monitor Logs:**
   ```bash
   # On server
   tail -f logs/app.log
   ```

4. **Setup Email Notifications:**
   - Configure SendGrid or similar email service
   - Add payment confirmation emails
   - Add admin donation notifications

## Troubleshooting Deployment

### Common Issues:

1. **Port Already in Use:**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **CORS Issues in Production:**
   ```javascript
   // backend/server.js
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

3. **Build Fails:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

4. **Environment Variables Not Set:**
   ```bash
   # Check if variables are loaded
   node -e "console.log(process.env.RAZORPAY_KEY_ID)"
   ```

## Rollback Plan

```bash
# If deployment fails, rollback to previous version
git revert HEAD
git push origin main
# Redeploy

# Or use version control:
git checkout <previous-commit-hash>
git push --force-with-lease origin main
```

## Support & Monitoring Dashboard

- **Razorpay:** https://dashboard.razorpay.com/
- **Railway/Heroku:** Your respective dashboards
- **Vercel/Netlify:** Your respective dashboards
- **Google Sheets:** Continue to monitor payment entries

---

**Last Updated:** February 24, 2026
