# 🚀 Quick Deployment Reference

## Before You Start - Gather These:

### 1. MongoDB Atlas Connection String
Go to: https://cloud.mongodb.com
- Click "Connect" on your cluster
- Format: `mongodb+srv://username:password@cluster.mongodb.net/careerpath360?retryWrites=true&w=majority`

**Your MongoDB URI:**
```
_________________________________________________
```

### 2. Google Gemini API Key
Go to: https://makersuite.google.com/app/apikey
- Click "Create API Key"
- Copy the key

**Your Gemini API Key:**
```
_________________________________________________
```

### 3. GitHub Repository
**URL:** https://github.com/ParamShah77/MiniProject1
**Branch:** main

---

## 📝 Deployment Checklist

### ☐ STEP 1: Deploy ML Service (20 mins)
- [ ] Go to https://render.com → New → Web Service
- [ ] Connect `MiniProject1` repo
- [ ] Name: `careerpath360-ml-service`
- [ ] Root: `ml-service`
- [ ] Build: `pip install -r requirements.txt`
- [ ] Start: `uvicorn app:app --host 0.0.0.0 --port $PORT`
- [ ] Wait for build to complete
- [ ] **Save URL:** ______________________________

### ☐ STEP 2: Deploy Backend (5 mins)
- [ ] Render → New → Web Service
- [ ] Connect `MiniProject1` repo
- [ ] Name: `careerpath360-backend`
- [ ] Root: `backend`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add Environment Variables (see below)
- [ ] **Save URL:** ______________________________

**Backend Environment Variables:**
```env
PORT=10000
NODE_ENV=production
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=CareerPath360_Secret_Key_2025
GEMINI_API_KEY=<your-gemini-key>
ML_SERVICE_URL=<ml-service-url>
FRONTEND_URL=https://careerpath360.onrender.com
```

### ☐ STEP 3: Deploy Frontend (3 mins)
- [ ] Render → New → Static Site
- [ ] Connect `MiniProject1` repo
- [ ] Name: `careerpath360`
- [ ] Root: `frontend`
- [ ] Build: `npm install && npm run build`
- [ ] Publish: `dist`
- [ ] Add Environment Variables (see below)
- [ ] **Your App:** ______________________________

**Frontend Environment Variables:**
```env
VITE_API_URL=<backend-url>/api
VITE_ML_API_URL=<ml-service-url>
```

---

## ✅ Test Checklist

After deployment:
- [ ] Open app URL
- [ ] Sign up new account
- [ ] Login works
- [ ] Upload resume
- [ ] Build resume
- [ ] Chatbot responds
- [ ] All pages load

---

## 🆘 Quick Fixes

**Backend won't start?**
→ Check MongoDB URI format and whitelist 0.0.0.0/0 in Atlas

**Frontend shows errors?**
→ Verify VITE_API_URL ends with `/api`

**ML service slow?**
→ First time takes 15-20 mins, then sleeps after 15 mins (30s wake)

---

## 📞 Need Help?

1. Check Render logs (click on service → Logs tab)
2. See full guide: `RENDER_DEPLOYMENT_STEPS.md`
3. Ask me for debugging help!

**Start here:** https://render.com 🚀
