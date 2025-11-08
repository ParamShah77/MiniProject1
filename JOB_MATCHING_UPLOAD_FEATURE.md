# Job Matching - Resume Upload Feature

## ✅ What's New

The Job Matching feature now supports **TWO ways** to analyze job postings:

### Option 1: Use Existing Resume (Original)
- Select from any resume you've previously uploaded or built
- Choose "Use Existing Resume" mode
- Select from dropdown of all your resumes (uploaded + built)

### Option 2: Upload New Resume (NEW!)
- Upload a fresh resume directly on the Job Matching page
- No need to go to Resume Upload page first
- Instantly analyze the new resume against the job posting
- Resume is automatically saved to your account

## 🎨 UI Changes

### New Toggle Buttons
```
[ Use Existing Resume ]  [ Upload New Resume ]
```

### Upload Mode Features
- **Drag & Drop Zone**: Click to upload PDF/Word files
- **File Validation**: 
  - Accepts: PDF, DOC, DOCX
  - Max size: 5MB
  - Shows selected filename
- **Remove Button**: Clear selection and choose different file
- **Visual Feedback**: Green highlight when file selected

## 🔧 Backend Changes

### New API Endpoint
```
POST /api/job-matching/analyze-with-upload
```

**Features**:
- Accepts multipart/form-data with resume file
- Uploads resume to server
- Calls ML service to parse resume
- Analyzes job posting vs uploaded resume
- Saves both resume and analysis to database
- Returns analysis results + new resume ID

**Request**:
```javascript
FormData:
- resume: File (PDF/DOC/DOCX)
- jobUrl: String (job posting URL)
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "analysis": { /* JobAnalysis object */ },
    "resumeId": "64abc123..."
  }
}
```

### Updated Controller
**File**: `backend/src/controllers/jobMatchingController.js`

**New Method**: `analyzeWithUpload()`
- Line ~135-280
- Handles file upload via multer middleware
- Creates Resume record in database
- Calls ML service for parsing
- Performs job analysis
- Returns combined results

### Updated Routes
**File**: `backend/src/routes/jobMatching.js`

**Added**:
```javascript
const { upload } = require('../middleware/upload');

router.post(
  '/analyze-with-upload', 
  auth, 
  upload.single('resume'), 
  jobMatchingController.analyzeWithUpload
);
```

## 📱 Frontend Changes

### New State Variables
```javascript
const [uploadMode, setUploadMode] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);
```

### New Functions
**`handleFileSelect(e)`**:
- Validates file type (PDF, DOC, DOCX)
- Validates file size (max 5MB)
- Updates selectedFile state

**Updated `handleAnalyze(e)`**:
- Checks uploadMode to determine which API to call
- If uploadMode: creates FormData and calls `/analyze-with-upload`
- If existing mode: calls original `/analyze` endpoint
- Refreshes resume list after upload

### UI Components Added
1. **Mode Toggle Buttons**: Switch between existing/upload
2. **File Upload Zone**: Drag-drop area with visual feedback
3. **File Preview**: Shows selected filename
4. **Remove Button**: Clear file selection
5. **Conditional Validation**: Button disabled if upload mode but no file

## 🎯 User Flow

### Upload New Resume Flow
1. User navigates to Job Matching page
2. Pastes job posting URL
3. Clicks "Upload New Resume" button
4. Clicks upload zone and selects resume file
5. File preview shows selected file name
6. Clicks "Upload & Analyze" button
7. Backend:
   - Uploads resume
   - Parses with ML service
   - Scrapes job posting
   - Analyzes match with AI
   - Saves both to database
8. Frontend displays analysis results
9. New resume now available in resume list

### Use Existing Resume Flow (Original)
1. User navigates to Job Matching page
2. Pastes job posting URL
3. Stays on "Use Existing Resume" mode (default)
4. Selects resume from dropdown (or uses most recent)
5. Clicks "Analyze Job Posting" button
6. Analysis runs and displays results

## 🔒 Validation & Error Handling

### Frontend Validation
- ✅ Job URL required
- ✅ File required in upload mode
- ✅ File type validation (PDF, DOC, DOCX only)
- ✅ File size validation (max 5MB)
- ✅ Button disabled until valid inputs

### Backend Validation
- ✅ Job URL required
- ✅ File required in upload mode
- ✅ File upload handled by multer middleware
- ✅ ML service timeout: 60 seconds
- ✅ Graceful fallback if ML parsing fails

### Error Messages
- "Please enter a job posting URL"
- "Please select a resume file to upload"
- "Please upload a PDF or Word document"
- "File size should be less than 5MB"
- "Failed to analyze job posting. Please check the URL and try again."

## 🚀 Testing Instructions

### Test Upload Mode
1. Go to http://localhost:5173/job-matching
2. Paste job URL: `https://remoteok.com/remote-jobs/123456`
3. Click "Upload New Resume" button
4. Upload a test resume (PDF/DOCX)
5. Verify filename shows in green box
6. Click "Upload & Analyze"
7. Wait 10-30 seconds
8. Check results display with match score
9. Go to Resume History - verify uploaded resume appears

### Test Existing Resume Mode
1. Click "Use Existing Resume" button
2. Select resume from dropdown
3. Click "Analyze Job Posting"
4. Verify analysis works as before

### Test Validation
1. Try uploading without selecting file - button disabled ✓
2. Try uploading .txt file - error message ✓
3. Try uploading 10MB file - error message ✓
4. Try empty job URL - error message ✓

## 📊 Database Impact

### Resume Collection
New resumes uploaded via Job Matching are saved with:
- `isBuiltResume: false`
- `parsedData`: Contains ML analysis
- All standard resume fields

### JobAnalysis Collection
- `resumeUsed`: References the uploaded resume ID
- Works same as before

## 🎨 Dark Mode Support

All new UI elements support dark mode:
- Toggle buttons: `dark:bg-slate-700`
- Upload zone: `dark:border-gray-600`
- File preview: `dark:bg-green-900/20`
- Text colors: `dark:text-white`, `dark:text-gray-400`

## 🔄 Backward Compatibility

✅ **Fully backward compatible**
- Existing resume analysis still works
- No changes to existing API endpoints
- New endpoint is additional, not replacement
- Old analyses remain unchanged

## 📝 Files Modified

### Backend
1. `backend/src/routes/jobMatching.js` - Added upload route
2. `backend/src/controllers/jobMatchingController.js` - Added analyzeWithUpload method

### Frontend
1. `frontend/src/pages/JobMatching.jsx` - Complete UI overhaul with upload support

### No Changes Required
- ✅ Resume model
- ✅ JobAnalysis model
- ✅ Upload middleware (already existed)
- ✅ ML service
- ✅ Other routes/controllers

## 🎯 Benefits

1. **Convenience**: Upload and analyze in one place
2. **Flexibility**: Use old or new resumes
3. **Speed**: No need to navigate to Resume Upload first
4. **Organization**: All resumes saved automatically
5. **History**: Both uploaded and built resumes in one list

## ⚡ Performance

- Upload + Parse + Analyze: ~10-40 seconds total
- File upload: ~1-2 seconds
- ML parsing: ~5-15 seconds
- Job scraping: ~2-5 seconds
- AI analysis: ~5-20 seconds

## 🔮 Future Enhancements

Potential improvements:
- Multiple resume upload at once
- Compare multiple resumes against same job
- Save job postings for later comparison
- Export analysis as PDF report
- Email analysis results
