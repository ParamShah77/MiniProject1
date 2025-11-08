# 🚀 Pre-Deployment Checklist - CareerPath360

## ✅ Code Readiness

### Backend
- [x] **Production start script** - `npm start` runs `node src/server.js`
- [x] **Environment variables** - Uses `.env` with proper fallbacks
- [x] **CORS configured** - Allows frontend origin
- [x] **MongoDB connection** - Connects to MONGO_URI
- [x] **Error handling** - Global error handler in place
- [x] **File uploads** - Configured for local/cloud storage
- [x] **All routes working** - Auth, Resume, Dashboard, Job Matching, etc.

### Frontend
- [x] **Build script** - `npm run build` creates `dist` folder
- [x] **API URL** - Uses `VITE_API_URL` environment variable
- [x] **React Router** - Configured for SPA routing
- [x] **Dark mode** - Fully implemented
- [x] **Responsive design** - Mobile-friendly
- [x] **All features working** - Upload, Analyze, Build, Job Matching, Chatbot

### ML Service
- [x] **FastAPI app** - `app.py` with proper endpoints
- [x] **Requirements.txt** - All dependencies listed
- [x] **Uvicorn start** - Configured for production
- [x] **PDF parsing** - Enhanced with PyMuPDF, pdfplumber, PyPDF2
- [x] **ATS scoring** - Industry-standard 6-component system
- [x] **Skill extraction** - 500+ skills database

---

## 🔧 Things to Fix Before Deployment

### 1. Frontend API Configuration
**Current Issue:** Frontend uses hardcoded `localhost:5000`

**Files to check:**
- `frontend/src/utils/api.js` or `frontend/src/config/`
- All axios calls with `http://localhost:5000`

**Action Required:** Replace with environment variable

### 2. Backend CORS
**Check:** `backend/src/server.js` allows production frontend URL

### 3. ML Service Dependencies
**Potential Issue:** OCR dependencies (`pdf2image`, `pytesseract`) need system libraries

**Options:**
- Remove OCR support (lines with `pdf2image` and `pytesseract`)
- OR use Render's paid tier with custom Docker image

### 4. File Upload Storage
**Current:** Saves to `backend/uploads/` (ephemeral on Render)

**Options:**
- Use AWS S3 (already configured in `.env`)
- OR accept that files will be lost on restart (free tier)

---

## 📋 Deployment Order

### Phase 1: ML Service (20 mins)
1. Deploy to Render as Web Service
2. Root: `ml-service`
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. **Save the URL** (e.g., `https://careerpath360-ml.onrender.com`)

### Phase 2: Backend (10 mins)
1. Deploy to Render as Web Service
2. Root: `backend`
3. Build: `npm install`
4. Start: `npm start`
5. Add environment variables:
   - `MONGO_URI` - Your MongoDB Atlas connection
   - `JWT_SECRET` - Random secure string
   - `GEMINI_API_KEY` - Your Gemini API key
   - `ML_SERVICE_URL` - ML service URL from Phase 1
   - `FRONTEND_URL` - Will add after Phase 3
   - `NODE_ENV=production`
6. **Save the URL** (e.g., `https://careerpath360-api.onrender.com`)

### Phase 3: Frontend (5 mins)
1. Deploy to Render as Static Site
2. Root: `frontend`
3. Build: `npm install && npm run build`
4. Publish: `dist`
5. Add environment variables:
   - `VITE_API_URL` - Backend URL from Phase 2 + `/api`
6. **Save the URL** (e.g., `https://careerpath360.onrender.com`)

### Phase 4: Update Backend CORS
1. Go back to Backend service
2. Add environment variable:
   - `FRONTEND_URL` - Frontend URL from Phase 3
3. Restart backend

---

## 🧪 Testing Plan

After deployment, test in this order:

### Authentication
- [ ] Sign up new account
- [ ] Receive verification email
- [ ] Login works
- [ ] Logout works

### Resume Upload & Analysis
- [ ] Upload PDF resume
- [ ] Analysis completes
- [ ] ATS score shows
- [ ] Skills extracted correctly
- [ ] Can view analysis report

### Resume Builder
- [ ] Create new resume
- [ ] Fill in sections
- [ ] Preview works
- [ ] Download PDF
- [ ] Can edit saved resume

### Job Matching
- [ ] Upload job description
- [ ] Get match score
- [ ] See missing skills
- [ ] Get recommendations

### Dashboard
- [ ] Stats show correctly
- [ ] Recent analyses appear
- [ ] Delete resume works
- [ ] Refresh button works

### Other Features
- [ ] Chatbot responds
- [ ] Course recommendations
- [ ] Profile settings
- [ ] Dark mode toggle
- [ ] All pages load

---

## 🆘 Common Issues & Solutions

### ML Service Build Fails
**Error:** `pytesseract` or `pdf2image` installation fails

**Solution:** Remove OCR dependencies from `requirements.txt`:
```bash
# Comment out or remove these lines:
# pdf2image==1.16.3
# pytesseract==0.3.10
```

### Backend Won't Connect to MongoDB
**Error:** `MongooseError: connection failed`

**Solution:**
1. Check MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` to IP whitelist
3. Verify connection string format

### Frontend Shows "Network Error"
**Error:** Can't connect to backend

**Solution:**
1. Check `VITE_API_URL` is correct
2. Verify backend is running
3. Check backend CORS allows frontend URL

### Files Upload But Disappear
**Cause:** Render free tier has ephemeral filesystem

**Solution:**
1. Implement AWS S3 storage (recommended)
2. OR accept file loss on restart

---

## 📝 Environment Variables Checklist

### ML Service
- `PYTHON_VERSION=3.11` (optional)

### Backend
- `PORT=10000` (Render provides this)
- `NODE_ENV=production`
- `MONGO_URI=mongodb+srv://...`
- `JWT_SECRET=your_secure_random_string_here`
- `GEMINI_API_KEY=AIzaSy...`
- `ML_SERVICE_URL=https://your-ml-service.onrender.com`
- `FRONTEND_URL=https://your-frontend.onrender.com`
- `EMAIL_USER=your-email@gmail.com` (optional)
- `EMAIL_PASSWORD=your-app-password` (optional)

### Frontend
- `VITE_API_URL=https://your-backend.onrender.com/api`

---

## ⏱️ Expected Timeline

- ML Service: 20 minutes (first build is slow)
- Backend: 5-7 minutes
- Frontend: 3-5 minutes
- Testing: 10-15 minutes

**Total: ~45 minutes to 1 hour**

---

## 🎯 Next Steps

1. **Review this checklist** - Make sure you understand each step
2. **Fix frontend API URLs** - Replace localhost with env variables
3. **Gather credentials** - MongoDB URI, Gemini API key
4. **Start with ML Service** - Longest build time
5. **Follow deployment guides** - Use `RENDER_DEPLOYMENT_STEPS.md`

---

## 📚 Resources

- Deployment Guide: `RENDER_DEPLOYMENT_STEPS.md`
- Quick Start: `DEPLOYMENT_QUICK_START.md`
- Full Guide: `DEPLOYMENT_GUIDE.md`
- MongoDB Atlas: https://cloud.mongodb.com
- Gemini API: https://makersuite.google.com/app/apikey
- Render Dashboard: https://dashboard.render.com

---

Ready to deploy? Let's start! 🚀
