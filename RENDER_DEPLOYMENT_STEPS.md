# 🚀 Render.com Deployment Steps for CareerPath360

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ MongoDB Atlas account with cluster created
- ✅ MongoDB connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
- ✅ Google Gemini API key (get from: https://makersuite.google.com/app/apikey)
- ✅ GitHub repository: https://github.com/ParamShah77/MiniProject1

---

## 🎯 Deployment Order (IMPORTANT!)

Deploy in this exact order:
1. **ML Service** (Python FastAPI) - 15-20 mins build time
2. **Backend** (Node.js + Express) - 5 mins build time
3. **Frontend** (React + Vite) - 3 mins build time

---

## 📦 PART 1: Deploy ML Service (Python)

### Step 1.1: Create Web Service
1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect to GitHub repository: `MiniProject1`
4. Click **"Connect"**

### Step 1.2: Configure ML Service
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `careerpath360-ml-service` |
| **Region** | Oregon (US West) or closest to you |
| **Branch** | `main` |
| **Root Directory** | `ml-service` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | `Free` |

### Step 1.3: Advanced Settings (Scroll down)
Click **"Advanced"** and add:

**Environment Variables:**
```
PYTHON_VERSION = 3.11
```

### Step 1.4: Deploy
1. Click **"Create Web Service"**
2. ⏳ Wait 15-20 minutes (installing ML models takes time)
3. Watch the logs - it should show: "Uvicorn running on..."
4. **COPY THE URL** - you'll need it! Format: `https://careerpath360-ml-service.onrender.com`

**Save this URL:** ___________________________________

---

## 🖥️ PART 2: Deploy Backend (Node.js)

### Step 2.1: Get MongoDB Connection String
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Replace `myFirstDatabase` with `careerpath360`

**Your MongoDB URI:** ___________________________________

### Step 2.2: Create Backend Web Service
1. On Render Dashboard, click **"New +"** → **"Web Service"**
2. Select **"MiniProject1"** repository again
3. Click **"Connect"**

### Step 2.3: Configure Backend
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `careerpath360-backend` |
| **Region** | Same as ML Service (Oregon) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 2.4: Environment Variables (CRITICAL!)
Click **"Advanced"** → **"Add Environment Variable"**

Add these **ONE BY ONE**:

```
PORT = 10000

NODE_ENV = production

MONGODB_URI = <paste-your-mongodb-connection-string-here>

JWT_SECRET = CareerPath360_Super_Secret_Key_Change_This_In_Production_2025

GEMINI_API_KEY = <paste-your-google-gemini-api-key-here>

ML_SERVICE_URL = <paste-ml-service-url-from-part-1>

FRONTEND_URL = https://careerpath360.onrender.com

AWS_ACCESS_KEY_ID = (leave empty for now - optional)

AWS_SECRET_ACCESS_KEY = (leave empty for now - optional)

AWS_BUCKET_NAME = (leave empty for now - optional)
```

**IMPORTANT:** Replace these values:
- `MONGODB_URI`: Your actual MongoDB Atlas connection string
- `GEMINI_API_KEY`: Your Google Gemini API key
- `ML_SERVICE_URL`: The URL from Part 1 (e.g., `https://careerpath360-ml-service.onrender.com`)

### Step 2.5: Deploy Backend
1. Click **"Create Web Service"**
2. ⏳ Wait 3-5 minutes
3. Check logs for: "Server running on port 10000" or similar
4. **COPY THE BACKEND URL** - Format: `https://careerpath360-backend.onrender.com`

**Save this URL:** ___________________________________

---

## 🎨 PART 3: Deploy Frontend (React)

### Step 3.1: Create Static Site
1. On Render Dashboard, click **"New +"** → **"Static Site"**
2. Select **"MiniProject1"** repository
3. Click **"Connect"**

### Step 3.2: Configure Frontend
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `careerpath360` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### Step 3.3: Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these:

```
VITE_API_URL = <paste-backend-url-from-part-2>/api

VITE_ML_API_URL = <paste-ml-service-url-from-part-1>
```

**Example:**
```
VITE_API_URL = https://careerpath360-backend.onrender.com/api
VITE_ML_API_URL = https://careerpath360-ml-service.onrender.com
```

### Step 3.4: Deploy Frontend
1. Click **"Create Static Site"**
2. ⏳ Wait 3-5 minutes
3. Check logs for: "Build succeeded"
4. **YOUR APP IS LIVE!** 🎉

**Your App URL:** `https://careerpath360.onrender.com`

---

## ✅ Post-Deployment Checklist

### Test These Features:
1. **Landing Page** - Visit your app URL
   - [ ] Page loads without errors
   - [ ] Images display correctly
   - [ ] "Get Started" button works

2. **Sign Up** - Create a new account
   - [ ] Can register with email/password
   - [ ] Redirects to dashboard after signup
   - [ ] User appears in MongoDB Atlas

3. **Login** - Use your new account
   - [ ] Can login with credentials
   - [ ] JWT token stored in localStorage
   - [ ] Dashboard loads with your name

4. **Upload Resume**
   - [ ] Can select PDF/DOCX file
   - [ ] Upload completes successfully
   - [ ] Analysis shows with ATS score

5. **Resume Builder**
   - [ ] Can create new resume
   - [ ] AI Optimize button works
   - [ ] Can download PDF

6. **Chatbot**
   - [ ] Opens on dashboard
   - [ ] Responds to questions
   - [ ] Suggestions appear

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Backend fails to start
**Error:** "Cannot connect to MongoDB"
**Fix:** 
1. Check MONGODB_URI is correct
2. Make sure password has no special characters (or URL encode them)
3. Verify IP whitelist in MongoDB Atlas (set to 0.0.0.0/0 for all IPs)

### Issue 2: Frontend shows "Network Error"
**Error:** "Cannot connect to server"
**Fix:**
1. Check VITE_API_URL ends with `/api`
2. Make sure backend is running (check Render dashboard)
3. Check browser console for CORS errors

### Issue 3: ML Service times out
**Error:** "Service Unavailable 503"
**Fix:**
1. ML service takes 15-20 mins first time (installing models)
2. Free tier sleeps after 15 mins inactivity (30s wake-up time)
3. Check Render logs for actual error

### Issue 4: "Failed to build"
**Error:** Build fails in Render
**Fix:**
1. Check build logs for specific error
2. Verify package.json has all dependencies
3. Make sure Root Directory is correct

### Issue 5: Environment variables not working
**Error:** "undefined" or "localhost:5000" in production
**Fix:**
1. Make sure you clicked "Add Environment Variable" for EACH variable
2. Redeploy after adding env vars
3. Check "Environment" tab in Render dashboard

---

## 📊 Important URLs to Save

After deployment, save these URLs:

| Service | URL | Status |
|---------|-----|--------|
| **ML Service** | `https://careerpath360-ml-service.onrender.com` | ⏳ |
| **Backend** | `https://careerpath360-backend.onrender.com` | ⏳ |
| **Frontend** | `https://careerpath360.onrender.com` | ⏳ |
| **MongoDB Atlas** | `https://cloud.mongodb.com` | ✅ |
| **GitHub Repo** | `https://github.com/ParamShah77/MiniProject1` | ✅ |

---

## 🔄 How to Update After Code Changes

When you push new code to GitHub:

1. **Automatic Deploy:**
   - Render detects new commits
   - Automatically rebuilds and deploys
   - Check "Events" tab in Render dashboard

2. **Manual Deploy:**
   - Go to Render Dashboard
   - Select the service
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

3. **Clear Build Cache** (if needed):
   - Go to Settings → Build & Deploy
   - Click **"Clear build cache & deploy"**

---

## 💰 Free Tier Limitations

**Render Free Tier Includes:**
- ✅ 750 hours/month (shared across all services)
- ✅ Auto-sleep after 15 mins inactivity
- ✅ 30-second cold start on first request
- ✅ 512MB RAM per service
- ⚠️ Services sleep separately (ML + Backend + Frontend = 3 services)

**Tips to Stay in Free Tier:**
- Use services during specific hours only
- Consider deploying only backend + frontend (skip ML for testing)
- Upgrade ML service to paid if needed ($7/month for always-on)

---

## 🎉 You're Done!

Your CareerPath360 app is now live at:
**https://careerpath360.onrender.com**

Share it with friends, test all features, and enjoy your deployed app! 🚀

**Need help?** Check Render logs or ask me for debugging assistance.

---

## 📝 Next Steps After Deployment

1. **Test Everything** - Use the checklist above
2. **Share Your App** - Send link to friends/recruiters
3. **Monitor Usage** - Check Render dashboard analytics
4. **Add Custom Domain** (Optional) - Go to Render Settings → Custom Domain
5. **Set up Monitoring** - Enable notifications in Render

**Congratulations on deploying your first full-stack app!** 🎊
