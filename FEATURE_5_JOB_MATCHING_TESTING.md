# Feature #5: Job Matching - Testing Guide

## Prerequisites
1. ✅ Backend server running on `http://localhost:5000`
2. ✅ Frontend server running on `http://localhost:5173`
3. ✅ MongoDB connected
4. ✅ Google Gemini API key configured in `.env`
5. ✅ At least one resume uploaded to your account

## Test URLs

### Option 1: LinkedIn Jobs (Recommended)
```
https://www.linkedin.com/jobs/view/3234567890
https://www.linkedin.com/jobs/view/software-engineer-at-google-123456
```
**Note**: LinkedIn may block scraping. Use Option 2-4 for reliable testing.

### Option 2: Indeed Jobs
```
https://www.indeed.com/viewjob?jk=1234567890abcdef
https://www.indeed.com/jobs?q=software+engineer&l=New+York
```

### Option 3: RemoteOK (Best for Testing - No Scraping Restrictions)
```
https://remoteok.com/remote-jobs/123456-senior-full-stack-developer
https://remoteok.com/remote-jobs/234567-frontend-react-engineer
https://remoteok.com/remote-jobs/345678-backend-node-js-developer
```

### Option 4: GitHub Jobs Alternative
```
https://www.ycombinator.com/companies/openai/jobs/abc123-software-engineer
https://jobs.github.com/positions/abc123def456
```

### Option 5: AngelList/Wellfound
```
https://wellfound.com/l/2xyzabc
https://angel.co/company/company-name/jobs/123456-software-engineer
```

### Option 6: Stack Overflow Jobs
```
https://stackoverflow.com/jobs/123456/senior-developer
```

## Testing Steps

### Step 1: Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - ML Service (if needed)
cd ml-service
python app.py
```

### Step 2: Login & Upload Resume
1. Go to `http://localhost:5173`
2. Login with your credentials
3. Navigate to **Resume Upload** page
4. Upload a test resume (if you don't have one already)
5. Wait for parsing to complete

### Step 3: Navigate to Job Matching
1. Click **Dashboard** from navigation
2. Click the **Job Matching** card (purple icon)
3. Or directly visit: `http://localhost:5173/job-matching`

### Step 4: Analyze Job Posting

#### Test Case 1: Basic Analysis
1. Paste a job URL (use RemoteOK URL for best results)
2. Select your resume from dropdown
3. Click **Analyze Job Posting**
4. Wait 10-30 seconds for analysis

**Expected Results**:
- ✅ Loading indicator appears
- ✅ Job details extracted (title, company, location)
- ✅ Skills comparison shown (matching vs missing)
- ✅ Match score calculated (0-100%)
- ✅ AI recommendations displayed
- ✅ Recommended courses listed (if available)

#### Test Case 2: Multiple Analyses
1. Analyze 2-3 different job postings
2. Check **Analysis History** section at bottom
3. Verify all analyses are saved

**Expected Results**:
- ✅ All analyses visible in history
- ✅ Each shows: job title, company, match score, date
- ✅ Can click to view full analysis
- ✅ Can delete individual analyses

#### Test Case 3: Error Handling
1. Enter an invalid URL: `https://invalid-url-test.com`
2. Click **Analyze Job Posting**

**Expected Results**:
- ✅ Error message displayed
- ✅ No crash or blank screen

#### Test Case 4: Dark Mode
1. Toggle dark mode in navigation
2. Check Job Matching page appearance

**Expected Results**:
- ✅ All elements visible in dark mode
- ✅ Proper contrast for text/backgrounds
- ✅ Analysis cards styled correctly

## Sample Job Posting for Manual Testing

If web scraping doesn't work, you can test the AI analysis directly by creating a test endpoint:

### Test Job Description (Copy-Paste)
```
Job Title: Senior Full Stack Developer
Company: TechCorp Inc.
Location: Remote

Description:
We're looking for an experienced Full Stack Developer to join our team. 

Required Skills:
- React.js, Node.js, Express
- MongoDB, PostgreSQL
- RESTful APIs, GraphQL
- Git, Docker, AWS
- 5+ years experience

Preferred Skills:
- TypeScript, Next.js
- Redis, Kubernetes
- CI/CD pipelines
- Microservices architecture

Responsibilities:
- Build scalable web applications
- Design and implement APIs
- Collaborate with product team
- Code reviews and mentoring

Salary: $120,000 - $160,000
```

## Backend API Testing (Using Postman/cURL)

### Endpoint 1: Analyze Job Posting
```bash
curl -X POST http://localhost:5000/api/job-matching/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "jobUrl": "https://remoteok.com/remote-jobs/123456",
    "resumeId": "YOUR_RESUME_ID"
  }'
```

### Endpoint 2: Get Analysis History
```bash
curl http://localhost:5000/api/job-matching/history \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Endpoint 3: Get Single Analysis
```bash
curl http://localhost:5000/api/job-matching/ANALYSIS_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Endpoint 4: Delete Analysis
```bash
curl -X DELETE http://localhost:5000/api/job-matching/ANALYSIS_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Expected Match Score Interpretation

- **80-100%**: Excellent match - Apply immediately
- **60-79%**: Good match - You meet most requirements
- **40-59%**: Moderate match - Consider upskilling
- **20-39%**: Low match - Significant skill gaps
- **0-19%**: Poor match - Not recommended

## AI Analysis Components

The Gemini AI analyzes:
1. **Skills Matching**: Compares your resume skills vs job requirements
2. **Experience Level**: Matches your experience to job level (Junior/Mid/Senior)
3. **Strengths**: What makes you a strong candidate
4. **Areas to Improve**: Skills/experience gaps to address
5. **Course Recommendations**: Relevant courses from database

## Troubleshooting

### Issue 1: "Failed to scrape job posting"
- **Cause**: Website blocking or invalid URL
- **Solution**: Try different job board (RemoteOK works best)

### Issue 2: "Analysis failed"
- **Cause**: Gemini API error or rate limit
- **Solution**: Check `.env` for `GEMINI_API_KEY`, wait 1 minute and retry

### Issue 3: No recommended courses
- **Cause**: No courses in database matching required skills
- **Solution**: This is normal if course database is empty

### Issue 4: Match score always 0%
- **Cause**: Resume has no parsed skills
- **Solution**: Upload a resume with clear skills section

### Issue 5: Scraping timeout
- **Cause**: Website took too long to respond
- **Solution**: Increase timeout in `jobMatchingController.js` line 230 (currently 10000ms)

## Success Criteria

✅ **Feature is working if**:
1. Can paste job URL and get analysis
2. Match score calculated correctly
3. Skills comparison shows matching/missing skills
4. AI recommendations are relevant
5. Analysis saved to history
6. Can view and delete past analyses
7. Dark mode works properly

## Demo Flow (Show to Users)

1. **Login** → Dashboard
2. **Upload Resume** → Wait for parsing
3. **Job Matching** → Paste job URL
4. **View Results** → Match score + recommendations
5. **Check History** → See all past analyses
6. **Delete Old Analyses** → Clean up

## Known Limitations

- ⚠️ Some job boards block web scraping (LinkedIn, Glassdoor)
- ⚠️ Gemini API has rate limits (15 requests/minute on free tier)
- ⚠️ Scraping may fail on JavaScript-heavy sites
- ⚠️ Analysis takes 10-30 seconds depending on job description length
- ⚠️ Course recommendations only work if courses exist in database

## Next Steps After Testing

Once Feature #5 is validated:
- Move to **Feature #6: Analytics Dashboard**
- Add charts for ATS score trends
- Historical resume comparison
- Upload frequency analytics
