# 📧 Email Verification Setup Guide

## Overview
This guide will help you set up and test the email verification feature in CareerPath360.

---

## 🔧 Setup Steps

### 1. Configure Gmail App Password

**Why do we need an App Password?**
- Gmail doesn't allow regular passwords for third-party apps anymore
- App Passwords provide secure access for nodemailer

**Steps to create Gmail App Password:**

1. **Go to your Google Account**: https://myaccount.google.com/

2. **Enable 2-Step Verification** (Required for App Passwords):
   - Click on "Security" in the left sidebar
   - Scroll to "How you sign in to Google"
   - Click on "2-Step Verification"
   - Follow the setup wizard to enable it

3. **Generate App Password**:
   - After enabling 2-Step Verification, go back to Security
   - Scroll to "How you sign in to Google"
   - Click on "App passwords"
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Enter "CareerPath360"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

4. **Add to backend/.env**:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```
   ⚠️ **Important**: Remove spaces from the app password or keep them (both work)

---

### 2. Update Environment Variables

**Backend (.env file)**:
```env
# Add these to your existing backend/.env file
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env file)**:
```env
# Should already be set from previous steps
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing Email Verification

### Test Flow:

1. **Register a New User**:
   - Go to http://localhost:5173/register
   - Enter your details (use a real email you can access)
   - Click "Sign Up"

2. **Check Dashboard Banner**:
   - After login, you should see a **yellow/orange banner** at the top
   - Banner text: "📧 Email Verification Required"
   - Click "Send Verification Email" button

3. **Check Your Email**:
   - Go to your Gmail inbox
   - Look for email from "CareerPath360"
   - Subject: "Verify Your Email - CareerPath360"
   - Click the "Verify Email" button in the email

4. **Email Verification Page**:
   - You'll be redirected to `/verify-email?token=...`
   - Page shows loading spinner → Success message
   - Auto-redirects to dashboard after 3 seconds

5. **Confirm Verification**:
   - Dashboard should **no longer show** the yellow banner
   - Email is now verified ✅

---

## 🔍 Troubleshooting

### Issue: "Invalid credentials" error

**Solution**: Check if:
- 2-Step Verification is enabled on your Google Account
- You're using an **App Password**, not your regular Gmail password
- App Password is copied correctly (check for extra spaces)
- EMAIL_USER matches the Gmail account that created the App Password

### Issue: Email not received

**Solution**: Check:
1. **Spam folder** - verification emails might be filtered
2. **Backend console** - look for nodemailer errors
3. **Email address** - ensure it's correct in your user registration
4. **Gmail SMTP limits** - Google limits ~500 emails/day for free accounts

### Issue: "Token expired" error

**Solution**:
- Verification tokens expire after **24 hours**
- Go back to dashboard and click "Send Verification Email" again
- New token will be generated

### Issue: Backend crashes on sending email

**Check backend/.env**:
```env
# Ensure these are set
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

**Restart backend server** after updating .env:
```bash
cd backend
npm start
```

---

## 📝 Email Template Customization

The email template is located in:
```
backend/src/controllers/emailVerificationController.js
```

**To customize the email**:
1. Find the `mailOptions` object in `sendVerificationEmail` function
2. Modify the `html` template (lines ~60-120)
3. Change colors, text, logo, etc.

**Current template features**:
- Gradient header (purple to pink)
- Professional styling
- Responsive design
- Clear CTA button
- 24-hour expiry notice

---

## 🔐 Security Features

### Token Generation:
- Uses `crypto.randomBytes(32)` for cryptographically secure tokens
- Tokens are hashed before storage (future enhancement)
- 24-hour expiry window

### Database Protection:
- `emailVerificationToken` has `select: false` (not returned in queries)
- `emailVerificationExpiry` has `select: false`
- Tokens cleared after successful verification

### Email Security:
- Uses Gmail's secure SMTP (port 587 with STARTTLS)
- App Passwords prevent exposure of main Google password
- Nodemailer supports TLS encryption

---

## 🚀 Production Deployment

### For Render.com / Other Platforms:

1. **Add Environment Variables** in platform dashboard:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Update Email Template** (optional):
   - Change `FRONTEND_URL` references in email template
   - Update branding/logo if needed

3. **Test in Production**:
   - Register with real email
   - Verify email link works with production domain
   - Check email delivery time

### Gmail Sending Limits:
- **Free Gmail**: ~500 emails/day
- **Google Workspace**: ~2,000 emails/day
- For higher volume, consider:
  - SendGrid (100 emails/day free, then paid)
  - AWS SES (62,000 emails/month free)
  - Mailgun (5,000 emails/month free)

---

## 📊 API Endpoints Reference

### Send Verification Email
```http
POST /api/auth/send-verification
Authorization: Bearer <token>
```
**Response**:
```json
{
  "status": "success",
  "message": "Verification email sent successfully"
}
```

### Verify Email
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "abc123..."
}
```
**Response**:
```json
{
  "status": "success",
  "message": "Email verified successfully"
}
```

### Check Verification Status
```http
GET /api/auth/check-verification
Authorization: Bearer <token>
```
**Response**:
```json
{
  "status": "success",
  "data": {
    "isEmailVerified": true
  }
}
```

---

## ✅ Feature Checklist

Before moving to Feature #2 (Password Reset), confirm:

- [x] Backend controller created (`emailVerificationController.js`)
- [x] User model updated (6 new fields)
- [x] Routes added to `auth.js` (3 endpoints)
- [x] Frontend page created (`VerifyEmail.jsx`)
- [x] Banner component created (`EmailVerificationBanner.jsx`)
- [x] Route added to `App.jsx` (`/verify-email`)
- [x] Banner added to Dashboard
- [x] nodemailer installed (`npm install nodemailer`)
- [x] .env.example updated with email config
- [ ] **Gmail App Password created and added to .env**
- [ ] **Tested complete flow** (register → send → verify)
- [ ] **Banner disappears after verification**

---

## 🎯 Next Steps

Once email verification is fully tested and working:

1. **Feature #2: Password Reset**
   - "Forgot Password" link on login page
   - Similar email flow with reset link
   - New password form with validation

2. **Feature #3: Profile Settings**
   - Update name, email, password
   - Re-verify email if changed
   - Profile picture upload (optional)

---

## 📞 Support

If you encounter issues:
1. Check backend console logs for detailed errors
2. Check frontend browser console for API errors
3. Verify all environment variables are set correctly
4. Ensure backend server is running on port 5000
5. Ensure frontend server is running on port 5173

---

**Happy Coding! 🚀**
