# 🔑 Password Reset Feature - Testing Guide

## Feature Overview
Users can now reset their password if they forget it using a secure email-based token system.

---

## 🧪 Testing Flow

### **Step 1: Go to Login Page**
- Navigate to: `http://localhost:5173/login`
- Click on **"Forgot password?"** link

### **Step 2: Request Password Reset**
- URL: `http://localhost:5173/forgot-password`
- Enter your email address
- Click **"Send Reset Link"**
- You should see a success message and email confirmation screen

### **Step 3: Check Your Email**
- Open your email inbox
- Look for email with subject: **"Password Reset Request - CareerPath360"**
- Email contains:
  - Purple gradient header
  - Reset password button
  - Link expires in 1 hour
  - Warning about security

### **Step 4: Click Reset Link**
- Click the **"Reset Password"** button in the email
- OR copy the link and paste in browser
- URL format: `http://localhost:5173/reset-password?token=...`

### **Step 5: Create New Password**
- Enter new password (minimum 6 characters)
- Confirm password (must match)
- Password visibility toggle available
- Real-time password match indicator
- Click **"Reset Password"**

### **Step 6: Success & Redirect**
- See success message with green checkmark
- Auto-redirects to login page after 3 seconds
- Login with new password

---

## 📧 API Endpoints

### **1. Request Password Reset**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

### **2. Validate Reset Token**
```http
POST /api/auth/validate-reset-token
Content-Type: application/json

{
  "token": "abc123..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Token is valid",
  "data": {
    "email": "user@example.com"
  }
}
```

### **3. Reset Password**
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123...",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Password has been reset successfully. You can now login with your new password."
}
```

---

## 🔐 Security Features

### **Token Security:**
- ✅ **Cryptographically secure** tokens using `crypto.randomBytes(32)`
- ✅ **1-hour expiration** window
- ✅ **One-time use** - token cleared after successful reset
- ✅ **Stored in database** with expiry timestamp

### **Email Security:**
- ✅ **Generic response** - doesn't reveal if email exists (prevents email enumeration)
- ✅ **Professional HTML template** with clear warnings
- ✅ **HTTPS recommended** for production (link security)

### **Password Security:**
- ✅ **Minimum 6 characters** validation
- ✅ **bcrypt hashing** with salt (10 rounds)
- ✅ **Password confirmation** required
- ✅ **Old token cleared** after reset

---

## ⚠️ Error Scenarios

### **1. Invalid/Expired Token**
- Shows red error page
- Message: "Invalid or Expired Link"
- Button to request new link

### **2. Email Not Found**
- Still shows success message (security best practice)
- No email sent if account doesn't exist
- Prevents email enumeration attacks

### **3. Password Validation Failed**
- Less than 6 characters: Error shown
- Passwords don't match: Error shown
- Empty fields: Error shown

### **4. Token Already Used**
- Considered expired
- User must request new reset link

---

## 🎨 UI/UX Features

### **Forgot Password Page:**
- 📧 Purple/pink gradient theme
- ✅ Email input with validation
- ✅ Loading state with spinner
- ✅ Success state with instructions
- ✅ "Send to different email" option
- ✅ "Back to Login" link
- ✅ Dark mode support

### **Reset Password Page:**
- 🔒 Lock icon header
- ✅ Three states: Validating, Invalid, Success
- ✅ Password visibility toggles
- ✅ Real-time password match indicator
- ✅ Auto-redirect after success (3 seconds)
- ✅ Shows email being reset
- ✅ Dark mode support

---

## 🔄 Complete User Journey

```
1. User forgets password
   ↓
2. Clicks "Forgot password?" on login
   ↓
3. Enters email on /forgot-password
   ↓
4. Receives email with reset link
   ↓
5. Clicks link → /reset-password?token=...
   ↓
6. Token validated automatically
   ↓
7. Creates new password
   ↓
8. Password reset successfully
   ↓
9. Auto-redirected to /login
   ↓
10. Logs in with new password ✅
```

---

## 🐛 Troubleshooting

### **Email not received:**
1. Check spam/junk folder
2. Verify EMAIL_USER and EMAIL_PASSWORD in backend/.env
3. Check backend console for email sending errors
4. Gmail may block if too many emails sent quickly

### **Token validation fails:**
1. Check if link expired (1 hour limit)
2. Verify token in URL matches database
3. Check if token was already used
4. Ensure FRONTEND_URL in backend/.env is correct

### **Password reset fails:**
1. Check password length (minimum 6 characters)
2. Verify passwords match
3. Check backend console for errors
4. Ensure User model has passwordResetToken fields

---

## 📝 Database Fields Used

**User Model Updates:**
- `passwordResetToken` (String, select: false)
- `passwordResetExpiry` (Date, select: false)

These fields were already added in Feature #1 (Email Verification).

---

## ✅ Feature Checklist

- [x] Backend controller created (passwordResetController.js)
- [x] 3 API endpoints added (/forgot-password, /reset-password, /validate-reset-token)
- [x] Routes added to auth.js
- [x] ForgotPassword.jsx page created
- [x] ResetPassword.jsx page created
- [x] Routes added to App.jsx
- [x] "Forgot password?" link already exists on Login page
- [x] Email template designed (purple gradient theme)
- [x] Password validation implemented
- [x] Token security implemented
- [x] Dark mode support added
- [x] Auto-redirect after success
- [ ] **Test complete flow** (request → email → reset → login)

---

## 🎯 Next Steps

**After testing Feature #2:**

1. **Feature #3: Profile Settings**
   - Update name, email, password
   - Profile picture upload (optional)
   - Email re-verification if changed

2. **Feature #4: Resume Templates**
   - Add 3-5 professional templates
   - Template preview functionality
   - Apply template to builder

3. **Feature #5: Job Matching (URL-based)**
   - Paste job URL
   - AI analyzes job requirements
   - Compare with resume
   - Recommend improvements

4. **Feature #6: Analytics Dashboard**
   - Charts showing ATS score trends
   - Upload frequency analytics
   - Skill distribution pie chart
   - Historical comparison

---

**Ready to test! 🚀**
