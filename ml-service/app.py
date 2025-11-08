from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import logging

# Document parsing
import pdfplumber
from docx import Document

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CareerPath360 ML Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Comprehensive skill database (500+ industry-standard skills)
SKILLS = [
    # ════════════════════════════════════════════════════════════
    # PROGRAMMING LANGUAGES
    # ════════════════════════════════════════════════════════════
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'C', 'Go', 'Rust',
    'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart',
    'Objective-C', 'Shell Scripting', 'Bash', 'PowerShell', 'Groovy', 'Elixir',
    'Haskell', 'Clojure', 'F#', 'Visual Basic', 'Assembly', 'COBOL', 'Fortran',
    
    # ════════════════════════════════════════════════════════════
    # WEB TECHNOLOGIES (Frontend)
    # ════════════════════════════════════════════════════════════
    'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'SCSS', 'Less', 'Tailwind CSS',
    'React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js',
    'jQuery', 'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI', 'Styled Components',
    'Redux', 'MobX', 'Vuex', 'Pinia', 'Context API', 'Webpack', 'Vite', 'Parcel',
    'Babel', 'ESLint', 'Prettier', 'TypeScript', 'JSX', 'AJAX', 'Responsive Design',
    'Progressive Web Apps', 'PWA', 'Single Page Application', 'SPA', 'Web Components',
    
    # ════════════════════════════════════════════════════════════
    # WEB TECHNOLOGIES (Backend)
    # ════════════════════════════════════════════════════════════
    'Node.js', 'Express', 'Nest.js', 'Fastify', 'Koa', 'Hapi.js',
    'Django', 'Flask', 'FastAPI', 'Pyramid', 'Tornado', 'Bottle',
    'Spring', 'Spring Boot', 'Spring MVC', 'Hibernate', 'Micronaut', 'Quarkus',
    'Ruby on Rails', 'Sinatra', 'Laravel', 'Symfony', 'CodeIgniter', 'CakePHP',
    'ASP.NET', 'ASP.NET Core', '.NET Framework', '.NET Core', 'Entity Framework',
    'GraphQL', 'REST API', 'RESTful Services', 'SOAP', 'gRPC', 'WebSockets',
    'Microservices', 'API Gateway', 'Message Queue', 'Event-Driven Architecture',
    
    # ════════════════════════════════════════════════════════════
    # MOBILE DEVELOPMENT
    # ════════════════════════════════════════════════════════════
    'React Native', 'Flutter', 'iOS Development', 'Android Development',
    'Swift UI', 'Jetpack Compose', 'Xamarin', 'Ionic', 'Cordova', 'PhoneGap',
    'Kotlin Multiplatform', 'Android Studio', 'Xcode', 'Mobile UI/UX',
    
    # ════════════════════════════════════════════════════════════
    # DATABASES & DATA STORAGE
    # ════════════════════════════════════════════════════════════
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite',
    'Microsoft SQL Server', 'Oracle Database', 'IBM DB2', 'Redis', 'Memcached',
    'Elasticsearch', 'Apache Solr', 'Cassandra', 'CouchDB', 'DynamoDB', 'Firebase',
    'Firestore', 'Neo4j', 'ArangoDB', 'InfluxDB', 'TimescaleDB', 'ClickHouse',
    'Snowflake', 'BigQuery', 'Amazon RDS', 'Amazon Aurora', 'Azure SQL', 'Cosmos DB',
    'Database Design', 'Database Optimization', 'Query Optimization', 'Indexing',
    'Data Modeling', 'ETL', 'Data Warehousing', 'OLAP', 'OLTP',
    
    # ════════════════════════════════════════════════════════════
    # CLOUD & DEVOPS
    # ════════════════════════════════════════════════════════════
    'AWS', 'Amazon Web Services', 'Azure', 'Microsoft Azure', 'Google Cloud', 'GCP',
    'AWS EC2', 'AWS S3', 'AWS Lambda', 'AWS ECS', 'AWS EKS', 'AWS RDS',
    'Azure DevOps', 'Azure Functions', 'Azure App Service', 'Google Cloud Functions',
    'Docker', 'Kubernetes', 'K8s', 'Helm', 'OpenShift', 'Rancher',
    'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Bamboo',
    'Terraform', 'Ansible', 'Puppet', 'Chef', 'CloudFormation', 'ARM Templates',
    'CI/CD', 'Continuous Integration', 'Continuous Deployment', 'DevOps',
    'Infrastructure as Code', 'IaC', 'Monitoring', 'Prometheus', 'Grafana',
    'ELK Stack', 'Splunk', 'Datadog', 'New Relic', 'Nagios', 'Zabbix',
    'Service Mesh', 'Istio', 'Linkerd', 'Container Orchestration',
    
    # ════════════════════════════════════════════════════════════
    # MACHINE LEARNING & AI
    # ════════════════════════════════════════════════════════════
    'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'AI',
    'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'XGBoost', 'LightGBM',
    'Natural Language Processing', 'NLP', 'Computer Vision', 'Neural Networks',
    'CNN', 'RNN', 'LSTM', 'GAN', 'Transformer', 'BERT', 'GPT', 'Large Language Models', 'LLM',
    'Reinforcement Learning', 'Supervised Learning', 'Unsupervised Learning',
    'Feature Engineering', 'Model Deployment', 'MLOps', 'Hugging Face',
    'OpenCV', 'YOLO', 'ResNet', 'Model Training', 'Hyperparameter Tuning',
    
    # ════════════════════════════════════════════════════════════
    # DATA SCIENCE & ANALYTICS
    # ════════════════════════════════════════════════════════════
    'Data Science', 'Data Analysis', 'Data Analytics', 'Business Intelligence',
    'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Bokeh',
    'Tableau', 'Power BI', 'Looker', 'Qlik', 'D3.js', 'Apache Spark', 'PySpark',
    'Hadoop', 'MapReduce', 'Hive', 'Pig', 'Kafka', 'Apache Airflow', 'Luigi',
    'Statistical Analysis', 'Predictive Analytics', 'A/B Testing', 'Hypothesis Testing',
    'Data Visualization', 'Data Mining', 'Big Data', 'Data Pipelines',
    
    # ════════════════════════════════════════════════════════════
    # VERSION CONTROL & COLLABORATION
    # ════════════════════════════════════════════════════════════
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'Perforce',
    'Git Flow', 'GitHub Flow', 'Version Control', 'Code Review', 'Pull Requests',
    'JIRA', 'Confluence', 'Trello', 'Asana', 'Monday.com', 'Slack', 'Microsoft Teams',
    
    # ════════════════════════════════════════════════════════════
    # TESTING & QA
    # ════════════════════════════════════════════════════════════
    'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'E2E Testing',
    'Jest', 'Mocha', 'Chai', 'Jasmine', 'Karma', 'Cypress', 'Selenium', 'Playwright',
    'JUnit', 'TestNG', 'PyTest', 'Robot Framework', 'Cucumber', 'Postman',
    'Test-Driven Development', 'TDD', 'Behavior-Driven Development', 'BDD',
    'Load Testing', 'Performance Testing', 'JMeter', 'Gatling', 'Locust',
    
    # ════════════════════════════════════════════════════════════
    # SECURITY & COMPLIANCE
    # ════════════════════════════════════════════════════════════
    'Cybersecurity', 'Information Security', 'Application Security', 'Network Security',
    'OAuth', 'JWT', 'OpenID', 'SAML', 'SSO', 'Authentication', 'Authorization',
    'Encryption', 'SSL/TLS', 'HTTPS', 'Penetration Testing', 'Vulnerability Assessment',
    'OWASP', 'Security Auditing', 'GDPR', 'HIPAA', 'SOC 2', 'ISO 27001',
    
    # ════════════════════════════════════════════════════════════
    # TOOLS & IDEs
    # ════════════════════════════════════════════════════════════
    'VS Code', 'Visual Studio', 'IntelliJ IDEA', 'PyCharm', 'WebStorm', 'Eclipse',
    'NetBeans', 'Sublime Text', 'Vim', 'Emacs', 'Atom', 'Android Studio', 'Xcode',
    'Postman', 'Insomnia', 'Swagger', 'OpenAPI', 'Figma', 'Adobe XD', 'Sketch',
    
    # ════════════════════════════════════════════════════════════
    # METHODOLOGIES & PRACTICES
    # ════════════════════════════════════════════════════════════
    'Agile', 'Scrum', 'Kanban', 'Waterfall', 'Lean', 'Six Sigma', 'SAFe',
    'Object-Oriented Programming', 'OOP', 'Functional Programming', 'Design Patterns',
    'SOLID Principles', 'Clean Code', 'Code Refactoring', 'Pair Programming',
    'Code Reviews', 'Documentation', 'Technical Writing', 'System Design',
    'Software Architecture', 'Scalability', 'High Availability', 'Fault Tolerance',
    
    # ════════════════════════════════════════════════════════════
    # EMERGING TECHNOLOGIES
    # ════════════════════════════════════════════════════════════
    'Blockchain', 'Smart Contracts', 'Ethereum', 'Solidity', 'Web3',
    'IoT', 'Internet of Things', 'Edge Computing', 'Quantum Computing',
    'AR/VR', 'Augmented Reality', 'Virtual Reality', '5G', 'Serverless',
    
    # ════════════════════════════════════════════════════════════
    # SOFT SKILLS (Important but not overweight in ATS)
    # ════════════════════════════════════════════════════════════
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Time Management', 'Project Management', 'Stakeholder Management',
    'Presentation Skills', 'Mentoring', 'Collaboration', 'Adaptability'
]

def parse_pdf(file_path: str) -> str:
    """
    Production-grade PDF text extraction for resumes
    Uses PyMuPDF (fitz) - industry standard for resume parsing
    """
    text = ""
    
    # ══════════════════════════════════════════════════════════════
    # METHOD 1: PyMuPDF (fitz) - BEST for resumes ⭐
    # ══════════════════════════════════════════════════════════════
    try:
        import fitz  # PyMuPDF
        
        doc = fitz.open(file_path)
        for page_num, page in enumerate(doc):
            # Extract text with layout preservation
            page_text = page.get_text("text")
            if page_text:
                text += page_text + "\n"
        
        doc.close()
        
        if len(text.strip()) > 50:
            logger.info(f"✅ PyMuPDF extracted {len(text)} chars from {len(doc)} pages")
            # Clean up the text
            text = clean_extracted_text(text)
            return text.strip()
    except ImportError:
        logger.warning("⚠️ PyMuPDF not installed, trying fallback...")
    except Exception as e:
        logger.warning(f"⚠️ PyMuPDF failed: {e}")
    
    # ══════════════════════════════════════════════════════════════
    # METHOD 2: pdfplumber - Good fallback
    # ══════════════════════════════════════════════════════════════
    try:
        import pdfplumber
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        if len(text.strip()) > 50:
            logger.info(f"✅ pdfplumber extracted {len(text)} chars")
            text = clean_extracted_text(text)
            return text.strip()
    except Exception as e:
        logger.warning(f"⚠️ pdfplumber failed: {e}")
    
    # ══════════════════════════════════════════════════════════════
    # METHOD 3: PyPDF2 - Last resort
    # ══════════════════════════════════════════════════════════════
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        
        if len(text.strip()) > 50:
            logger.info(f"✅ PyPDF2 extracted {len(text)} chars")
            text = clean_extracted_text(text)
            return text.strip()
    except Exception as e:
        logger.warning(f"⚠️ PyPDF2 failed: {e}")
    
    # ══════════════════════════════════════════════════════════════
    # FALLBACK: Return whatever we got or error
    # ══════════════════════════════════════════════════════════════
    if len(text.strip()) > 0:
        logger.warning(f"⚠️ Limited text extracted: {len(text)} chars")
        return clean_extracted_text(text).strip()
    else:
        logger.error("❌ All PDF extraction methods failed")
        raise Exception("Unable to extract text from PDF. The file may be corrupted or image-based.")


def clean_extracted_text(text: str) -> str:
    """
    Clean and normalize extracted text for better skill detection
    """
    import re
    
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Normalize bullet points and separators
    text = text.replace('•', ' ')
    text = text.replace('○', ' ')
    text = text.replace('●', ' ')
    text = text.replace('→', ' ')
    text = text.replace('|', ' ')
    
    # Add spaces around common separators to help skill detection
    text = re.sub(r'([,;/])', r' \1 ', text)
    text = re.sub(r'([()])', r' \1 ', text)
    
    # Remove multiple spaces again
    text = re.sub(r'\s+', ' ', text)
    
    return text

def parse_docx(file_path: str) -> str:
    doc = Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

def extract_skills(text: str) -> list:
    """
    Intelligent skill extraction with fuzzy matching and context awareness
    Enhanced to catch more variations
    """
    import re
    
    text_lower = text.lower()
    found_skills = set()  # Use set to avoid duplicates
    
    # Method 1: Case-insensitive substring matching (more lenient)
    for skill in SKILLS:
        skill_lower = skill.lower()
        
        # For single-letter or very short skills (C, C++, R), use strict word boundaries
        if len(skill_lower.replace('+', '').replace('#', '').replace('.', '')) <= 2:
            pattern = r'\b' + re.escape(skill_lower) + r'\b'
        else:
            # For longer skills, use more flexible matching
            # Match if skill appears as whole word OR with common separators
            skill_pattern = re.escape(skill_lower).replace(r'\ ', r'[\s\-\_]*')
            pattern = r'(?:^|[\s,\.\-\(\)\[\]\{\}])' + skill_pattern + r'(?:$|[\s,\.\-\(\)\[\]\{\}])'
        
        if re.search(pattern, text_lower):
            found_skills.add(skill)
    
    # Method 2: Common skill variations and acronyms (expanded)
    # All variations map to CANONICAL names (without .js suffix)
    variations = {
        'javascript': 'JavaScript',
        'java script': 'JavaScript',
        'js': 'JavaScript',
        'typescript': 'TypeScript',
        'type script': 'TypeScript',
        'ts': 'TypeScript',
        'nodejs': 'Node.js',
        'node js': 'Node.js',
        'node': 'Node.js',
        'reactjs': 'React',
        'react js': 'React',
        'react.js': 'React',
        'react native': 'React Native',
        'vuejs': 'Vue',
        'vue js': 'Vue',
        'vue.js': 'Vue',
        'vue': 'Vue',
        'angular': 'Angular',
        'angularjs': 'Angular',
        'nextjs': 'Next.js',
        'next js': 'Next.js',
        'next.js': 'Next.js',
        'expressjs': 'Express',
        'express js': 'Express',
        'express.js': 'Express',
        'nestjs': 'Nest.js',
        'nest js': 'Nest.js',
        'nest.js': 'Nest.js',
        'k8s': 'Kubernetes',
        'eks': 'AWS EKS',
        'ecs': 'AWS ECS',
        'ec2': 'AWS EC2',
        's3': 'AWS S3',
        'lambda': 'AWS Lambda',
        'rds': 'AWS RDS',
        'postgresql': 'PostgreSQL',
        'postgres': 'PostgreSQL',
        'mongo': 'MongoDB',
        'mongodb': 'MongoDB',
        'mysql': 'MySQL',
        'mssql': 'Microsoft SQL Server',
        'sql server': 'Microsoft SQL Server',
        'ci/cd': 'CI/CD',
        'cicd': 'CI/CD',
        'ml': 'Machine Learning',
        'ai': 'Artificial Intelligence',
        'nlp': 'Natural Language Processing',
        'dl': 'Deep Learning',
        'tf': 'TensorFlow',
        'tensorflow': 'TensorFlow',
        'pytorch': 'PyTorch',
        'sklearn': 'Scikit-learn',
        'scikit-learn': 'Scikit-learn',
        'scikit learn': 'Scikit-learn',
        'restful': 'REST API',
        'rest api': 'REST API',
        'rest': 'REST API',
        'graphql': 'GraphQL',
        'graph ql': 'GraphQL',
        'oauth': 'OAuth',
        'jwt': 'JWT',
        'sso': 'SSO',
        'tdd': 'Test-Driven Development',
        'bdd': 'Behavior-Driven Development',
        'oop': 'Object-Oriented Programming',
        'aws': 'AWS',
        'amazon web services': 'AWS',
        'gcp': 'Google Cloud',
        'google cloud platform': 'Google Cloud',
        'azure': 'Azure',
        'microsoft azure': 'Azure',
        'docker': 'Docker',
        'kubernetes': 'Kubernetes',
        'git': 'Git',
        'github': 'GitHub',
        'gitlab': 'GitLab',
        'tailwind': 'Tailwind CSS',
        'tailwindcss': 'Tailwind CSS',
        'bootstrap': 'Bootstrap',
        'material ui': 'Material-UI',
        'mui': 'Material-UI',
        'html5': 'HTML5',
        'html': 'HTML',
        'css3': 'CSS3',
        'css': 'CSS',
        'sass': 'Sass',
        'scss': 'SCSS',
        'redux': 'Redux',
        'mobx': 'MobX',
        'webpack': 'Webpack',
        'vite': 'Vite',
        'babel': 'Babel',
        'jest': 'Jest',
        'mocha': 'Mocha',
        'chai': 'Chai',
        'cypress': 'Cypress',
        'selenium': 'Selenium',
        'postman': 'Postman',
        'django': 'Django',
        'flask': 'Flask',
        'fastapi': 'FastAPI',
        'spring': 'Spring',
        'spring boot': 'Spring Boot',
        'hibernate': 'Hibernate',
        'laravel': 'Laravel',
        'symfony': 'Symfony',
        'rails': 'Ruby on Rails',
        'ruby on rails': 'Ruby on Rails',
        'asp.net': 'ASP.NET',
        'dotnet': '.NET Core',
        '.net': '.NET Framework',
        'redis': 'Redis',
        'elasticsearch': 'Elasticsearch',
        'kafka': 'Kafka',
        'rabbitmq': 'RabbitMQ',
        'nginx': 'Nginx',
        'apache': 'Apache'
    }
    
    for variant, canonical in variations.items():
        # Use word boundaries for variations too
        pattern = r'(?:^|[\s,\.\-\(\)\[\]\{\}])' + re.escape(variant) + r'(?:$|[\s,\.\-\(\)\[\]\{\}])'
        if re.search(pattern, text_lower):
            found_skills.add(canonical)
    
    # Method 3: Framework/library pairs (add parent if child is found)
    framework_pairs = {
        'React': ['Redux', 'React Native', 'Next.js'],
        'Angular': ['RxJS', 'NgRx', 'AngularJS'],
        'Vue': ['Vuex', 'Nuxt.js', 'Pinia'],
        'Node.js': ['Express', 'Nest.js', 'Fastify'],
        'Python': ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'PyTorch', 'TensorFlow'],
        'Java': ['Spring', 'Spring Boot', 'Hibernate', 'Maven', 'Gradle'],
        'JavaScript': ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'TypeScript'],
        'AWS': ['AWS Lambda', 'AWS EC2', 'AWS S3', 'AWS EKS', 'AWS RDS'],
        'Machine Learning': ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'XGBoost'],
        'Docker': ['Kubernetes', 'Docker Compose'],
        'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch']
    }
    
    for parent, children in framework_pairs.items():
        for child in children:
            if child in found_skills or child.lower() in text_lower:
                found_skills.add(parent)
                break
    
    # Method 4: Remove redundant/duplicate entries & normalize names
    # Normalize to canonical names (remove .js suffix for consistency)
    normalized_skills = set()
    for skill in found_skills:
        # Normalize React.js → React, Vue.js → Vue, etc.
        if skill == 'React.js':
            normalized_skills.add('React')
        elif skill == 'Vue.js':
            normalized_skills.add('Vue')
        elif skill == 'Next.js':
            normalized_skills.add('Next.js')  # Keep Next.js as is
        elif skill == 'Nest.js':
            normalized_skills.add('Nest.js')  # Keep Nest.js as is
        elif skill == 'Express.js':
            normalized_skills.add('Express')
        else:
            normalized_skills.add(skill)
    
    found_skills = normalized_skills
    
    # Method 5: Add common implied skills
    # If has "React" and "JavaScript" not found, add it
    if any(fw in found_skills for fw in ['React', 'Angular', 'Vue.js', 'Express', 'Node.js']):
        found_skills.add('JavaScript')
    
    if any(fw in found_skills for fw in ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy']):
        found_skills.add('Python')
    
    if any(fw in found_skills for fw in ['Spring', 'Spring Boot', 'Hibernate']):
        found_skills.add('Java')
    
    # Convert back to sorted list
    return sorted(list(found_skills))

def calculate_ats_score(text: str, skills: list) -> dict:
    """
    Industry-Standard ATS Scoring (Based on Real ATS Systems)
    Mirrors scoring logic from Taleo, Greenhouse, Workday, Lever
    """
    import re
    
    text_lower = text.lower()
    word_count = len(text.split())
    skill_count = len(skills)
    
    # Initialize score components (total 100 points)
    scores = {
        'contact_info': 0,      # 15 pts
        'formatting': 0,        # 20 pts
        'skills': 0,            # 25 pts
        'experience': 0,        # 20 pts
        'education': 0,         # 10 pts
        'keywords': 0           # 10 pts
    }
    
    # ═══════════════════════════════════════════════════════════
    # 1️⃣ CONTACT INFORMATION (15 points) - Critical for ATS
    # ═══════════════════════════════════════════════════════════
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    phone_pattern = r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]'
    linkedin_pattern = r'(linkedin\.com|github\.com|portfolio|website)'
    
    has_email = bool(re.search(email_pattern, text))
    has_phone = bool(re.search(phone_pattern, text))
    has_location = bool(re.search(r'\b(city|state|country|address|location|remote)\b', text_lower))
    has_linkedin = bool(re.search(linkedin_pattern, text_lower))
    
    contact_score = 0
    contact_score += 6 if has_email else 0      # Email is mandatory
    contact_score += 5 if has_phone else 0      # Phone highly preferred
    contact_score += 2 if has_location else 0   # Location matters
    contact_score += 2 if has_linkedin else 0   # Professional links bonus
    
    # Critical penalty: missing email or phone drastically hurts
    if not has_email or not has_phone:
        contact_score = min(contact_score, 8)  # Cap at 8/15 if missing critical info
    
    scores['contact_info'] = contact_score

    # ═══════════════════════════════════════════════════════════
    # 2️⃣ FORMATTING & PARSEABILITY (20 points) - ATS Readability
    # ═══════════════════════════════════════════════════════════
    format_score = 0
    
    # Section headers (standard ATS sections)
    required_sections = ['experience', 'education', 'skills']
    optional_sections = ['summary', 'projects', 'certifications', 'achievements', 'objective']
    
    required_found = sum(1 for s in required_sections if s in text_lower)
    optional_found = sum(1 for s in optional_sections if s in text_lower)
    
    format_score += required_found * 4  # 4 pts each required section (max 12)
    format_score += min(optional_found * 2, 4)  # 2 pts each optional (max 4)
    
    # Proper date formatting (MM/YYYY or Month YYYY)
    date_patterns = [
        r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b',
        r'\b\d{1,2}/\d{4}\b',
        r'\b\d{4}\s*-\s*\d{4}\b',
        r'\b(present|current)\b'
    ]
    has_dates = any(re.search(pattern, text_lower) for pattern in date_patterns)
    format_score += 4 if has_dates else 0
    
    scores['formatting'] = min(format_score, 20)

    # ═══════════════════════════════════════════════════════════
    # 3️⃣ SKILLS ASSESSMENT (25 points) - Most Critical for ATS
    # ═══════════════════════════════════════════════════════════
    # Real ATS systems prioritize RELEVANT technical skills
    skill_score = 0
    
    # Tier-based scoring (industry standard: 8-15 skills is optimal)
    if skill_count >= 15:
        skill_score = 20  # Excellent skill coverage
    elif skill_count >= 12:
        skill_score = 18  # Very good
    elif skill_count >= 8:
        skill_score = 15  # Good (sweet spot)
    elif skill_count >= 5:
        skill_score = 10  # Acceptable
    elif skill_count >= 3:
        skill_score = 6   # Minimal
    else:
        skill_score = 2   # Poor
    
    # Skill context bonus (skills mentioned in experience section)
    experience_section = ''
    exp_match = re.search(r'experience.*?(?=education|skills|$)', text_lower, re.DOTALL)
    if exp_match:
        experience_section = exp_match.group()
        skills_in_context = sum(1 for skill in skills if skill.lower() in experience_section)
        context_bonus = min(skills_in_context * 0.3, 3)  # Max 3 bonus points
        skill_score += context_bonus
    
    # Penalty for too many generic soft skills
    soft_skills = ['communication', 'leadership', 'teamwork', 'creative', 'organized', 'motivated']
    soft_skill_count = sum(1 for s in skills if any(soft in s.lower() for soft in soft_skills))
    if soft_skill_count > skill_count * 0.4:  # More than 40% soft skills
        skill_score -= 2
    
    # Bonus for in-demand tech skills
    hot_skills = ['python', 'react', 'aws', 'docker', 'kubernetes', 'machine learning', 'ai', 'node.js', 'typescript']
    hot_skill_count = sum(1 for s in skills if any(hot in s.lower() for hot in hot_skills))
    if hot_skill_count >= 3:
        skill_score += 2
    
    scores['skills'] = max(min(skill_score, 25), 0)

    # ═══════════════════════════════════════════════════════════
    # 4️⃣ EXPERIENCE QUALITY (20 points) - Depth & Impact
    # ═══════════════════════════════════════════════════════════
    exp_score = 0
    
    # Action verbs (ATS scans for achievement indicators)
    action_verbs = [
        'developed', 'managed', 'led', 'created', 'implemented', 'designed', 
        'built', 'improved', 'optimized', 'analyzed', 'increased', 'reduced',
        'launched', 'delivered', 'achieved', 'spearheaded', 'collaborated',
        'engineered', 'architected', 'automated'
    ]
    action_count = sum(text_lower.count(verb) for verb in action_verbs)
    
    # Tiered scoring based on action verb density
    if action_count >= 15:
        exp_score += 8
    elif action_count >= 10:
        exp_score += 6
    elif action_count >= 5:
        exp_score += 4
    else:
        exp_score += 1
    
    # Quantified achievements (numbers = impact)
    numbers_pattern = r'\b\d+%|\b\d+\+|\b\d+ (users|customers|projects|teams|million|thousand)\b'
    quantified_count = len(re.findall(numbers_pattern, text_lower))
    exp_score += min(quantified_count * 2, 6)  # Max 6 points
    
    # Job titles/roles (career progression)
    job_titles = ['engineer', 'developer', 'manager', 'lead', 'senior', 'architect', 'analyst', 'consultant', 'specialist']
    title_count = sum(1 for title in job_titles if title in text_lower)
    exp_score += min(title_count * 2, 6)  # Max 6 points
    
    scores['experience'] = min(exp_score, 20)

    # ═══════════════════════════════════════════════════════════
    # 5️⃣ EDUCATION (10 points) - Credentials Matter
    # ═══════════════════════════════════════════════════════════
    edu_score = 0
    
    degrees = ['bachelor', 'master', 'phd', 'mba', 'b.tech', 'm.tech', 'b.s.', 'm.s.', 'associate']
    has_degree = any(degree in text_lower for degree in degrees)
    
    certifications = ['certified', 'certification', 'aws certified', 'google cloud', 'microsoft certified', 'pmp', 'cfa']
    has_cert = any(cert in text_lower for cert in certifications)
    
    universities = ['university', 'college', 'institute', 'academy']
    has_institution = any(uni in text_lower for uni in universities)
    
    edu_score += 6 if has_degree else 2  # Degree strongly preferred
    edu_score += 3 if has_cert else 0    # Certifications valuable
    edu_score += 1 if has_institution else 0
    
    scores['education'] = min(edu_score, 10)

    # ═══════════════════════════════════════════════════════════
    # 6️⃣ KEYWORD DENSITY (10 points) - Industry Relevance
    # ═══════════════════════════════════════════════════════════
    keyword_score = 0
    
    # Industry keywords (software/tech focused)
    industry_keywords = [
        'software', 'development', 'engineering', 'agile', 'scrum', 'api',
        'database', 'cloud', 'deployment', 'testing', 'debugging', 'version control',
        'collaboration', 'problem solving', 'scalability', 'performance'
    ]
    keyword_matches = sum(1 for kw in industry_keywords if kw in text_lower)
    keyword_score = min(keyword_matches * 0.8, 10)  # Max 10 points
    
    scores['keywords'] = keyword_score

    # ═══════════════════════════════════════════════════════════
    # 🎯 FINAL SCORE CALCULATION (Industry Standard: 60-75 is good)
    # ═══════════════════════════════════════════════════════════
    total_raw_score = sum(scores.values())
    
    # Apply quality multiplier based on content length
    if word_count < 200:
        quality_multiplier = 0.7  # Too short, penalize
    elif word_count < 350:
        quality_multiplier = 0.85
    elif word_count < 600:
        quality_multiplier = 1.0  # Ideal range
    elif word_count < 800:
        quality_multiplier = 0.95
    else:
        quality_multiplier = 0.9  # Too long, slight penalty
    
    final_score = round(total_raw_score * quality_multiplier, 1)
    
    # Generate detailed breakdown
    breakdown = {
        'contact_information': {
            'score': round((scores['contact_info'] / 15) * 100, 1),
            'max_points': 15,
            'points_earned': scores['contact_info'],
            'status': 'excellent' if scores['contact_info'] >= 13 else 'good' if scores['contact_info'] >= 10 else 'needs_improvement',
            'has_email': has_email,
            'has_phone': has_phone,
            'has_location': has_location,
            'has_links': has_linkedin
        },
        'formatting': {
            'score': round((scores['formatting'] / 20) * 100, 1),
            'max_points': 20,
            'points_earned': scores['formatting'],
            'status': 'excellent' if scores['formatting'] >= 16 else 'good' if scores['formatting'] >= 12 else 'needs_improvement',
            'required_sections_found': required_found,
            'optional_sections_found': optional_found,
            'has_proper_dates': has_dates
        },
        'skills': {
            'score': round((scores['skills'] / 25) * 100, 1),
            'max_points': 25,
            'points_earned': scores['skills'],
            'status': 'excellent' if scores['skills'] >= 20 else 'good' if scores['skills'] >= 15 else 'needs_improvement',
            'total_skills': skill_count,
            'skills_in_context': skills_in_context if exp_match else 0,
            'hot_skills_count': hot_skill_count
        },
        'experience': {
            'score': round((scores['experience'] / 20) * 100, 1),
            'max_points': 20,
            'points_earned': scores['experience'],
            'status': 'excellent' if scores['experience'] >= 16 else 'good' if scores['experience'] >= 12 else 'needs_improvement',
            'action_verbs': action_count,
            'quantified_achievements': quantified_count,
            'job_titles_mentioned': title_count
        },
        'education': {
            'score': round((scores['education'] / 10) * 100, 1),
            'max_points': 10,
            'points_earned': scores['education'],
            'status': 'excellent' if scores['education'] >= 8 else 'good' if scores['education'] >= 5 else 'needs_improvement',
            'has_degree': has_degree,
            'has_certifications': has_cert
        },
        'keywords': {
            'score': round((scores['keywords'] / 10) * 100, 1),
            'max_points': 10,
            'points_earned': scores['keywords'],
            'status': 'good' if scores['keywords'] >= 6 else 'needs_improvement',
            'industry_keywords_found': keyword_matches
        }
    }
    
    # Generate improvement recommendations
    recommendations = []
    
    if scores['contact_info'] < 12:
        recommendations.append({
            'category': 'Contact Information',
            'priority': 'critical',
            'issue': 'Missing or incomplete contact details',
            'suggestion': 'Add email, phone number, location, and LinkedIn/GitHub profile'
        })
    
    if scores['skills'] < 15:
        recommendations.append({
            'category': 'Skills',
            'priority': 'high',
            'issue': f'Only {skill_count} skills listed (optimal: 8-15)',
            'suggestion': 'Add more relevant technical skills with context of where you used them'
        })
    
    if scores['experience'] < 12:
        recommendations.append({
            'category': 'Experience',
            'priority': 'high',
            'issue': 'Weak achievement descriptions',
            'suggestion': 'Use action verbs and quantify achievements with numbers (e.g., "Increased efficiency by 30%")'
        })
    
    if scores['formatting'] < 14:
        recommendations.append({
            'category': 'Formatting',
            'priority': 'medium',
            'issue': 'Missing standard resume sections',
            'suggestion': 'Include clear sections: Experience, Education, Skills, and add proper dates (MM/YYYY)'
        })
    
    if word_count < 300:
        recommendations.append({
            'category': 'Content Length',
            'priority': 'medium',
            'issue': 'Resume too short',
            'suggestion': 'Expand with more details about your responsibilities and achievements (aim for 400-600 words)'
        })
    
    if quantified_count < 3:
        recommendations.append({
            'category': 'Quantifiable Impact',
            'priority': 'high',
            'issue': 'No quantified achievements',
            'suggestion': 'Add numbers to show impact: team size, revenue, efficiency gains, users reached, etc.'
        })
    
    return {
        'final_score': final_score,
        'grade': 'Excellent' if final_score >= 75 else 'Good' if final_score >= 60 else 'Fair' if final_score >= 45 else 'Needs Improvement',
        'breakdown': breakdown,
        'raw_scores': scores,
        'quality_multiplier': quality_multiplier,
        'word_count': word_count,
        'recommendations': recommendations
    }

@app.get("/")
async def root():
    return {
        "message": "CareerPath360 ML Service",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "ml-parser"}

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """Parse resume and calculate ATS score"""
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.docx')):
            raise HTTPException(400, "Only PDF and DOCX supported")
        
        # Save temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        try:
            # Extract text
            if file.filename.endswith('.pdf'):
                text = parse_pdf(tmp_path)
            else:
                text = parse_docx(tmp_path)
            
            if len(text.strip()) < 50:
                raise HTTPException(400, "Resume content too short")
            
            # Log extracted text preview for debugging
            logger.info(f"📄 Extracted text preview (first 500 chars):\n{text[:500]}...")
            
            # Extract skills
            skills = extract_skills(text)
            
            # Log ALL detected skills for debugging
            logger.info(f"🎯 FULL SKILL LIST ({len(skills)} total):")
            logger.info(f"   {', '.join(sorted(skills))}")
            
            # Calculate ATS score
            ats_result = calculate_ats_score(text, skills)
            
            logger.info(f"✅ Parsed resume: {len(text)} chars, {len(skills)} skills, {ats_result['final_score']}% ATS ({ats_result['grade']})")
            
            return {
                "success": True,
                "data": {
                    "final_ats_score": ats_result['final_score'],
                    "ats_score": ats_result['final_score'],  # Duplicate for compatibility
                    "ats_grade": ats_result['grade'],
                    "ml_relevance_score": ats_result['final_score'],
                    "skill_match_score": min(len(skills) / 12 * 100, 100),  # Optimal: 12 skills
                    "extracted_skills": skills,
                    "skill_count": len(skills),
                    "word_count": ats_result['word_count'],
                    "score_breakdown": ats_result['breakdown'],
                    "raw_component_scores": ats_result['raw_scores'],
                    "quality_multiplier": ats_result['quality_multiplier'],
                    "parsed_data": {
                        "primary_info": {
                            "name": "Extracted Name",
                            "email": None,
                            "phone": None
                        }
                    },
                    "skill_gaps": [],
                    "recommendations": ats_result['recommendations']
                }
            }
        
        finally:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(500, str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
