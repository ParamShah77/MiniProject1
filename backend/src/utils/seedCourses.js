const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const courses = [
  // JavaScript & React
  {
    title: 'The Complete JavaScript Course 2024',
    platform: 'Udemy',
    instructor: 'Jonas Schmedtmann',
    url: 'https://www.udemy.com/course/the-complete-javascript-course/',
    description: 'Master JavaScript with modern ES6+ syntax, async/await, promises, and more',
    relatedSkills: ['JavaScript', 'ES6', 'Async/Await', 'DOM Manipulation'],
    duration: '69 hours',
    difficulty: 'Beginner',
    rating: 4.7,
    reviewCount: 145000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },
  {
    title: 'React - The Complete Guide',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    url: 'https://www.udemy.com/course/react-the-complete-guide/',
    description: 'Learn React hooks, Redux, routing, animations, Next.js and more',
    relatedSkills: ['React', 'Redux', 'React Hooks', 'Next.js'],
    duration: '49 hours',
    difficulty: 'Intermediate',
    rating: 4.6,
    reviewCount: 180000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },
  
  // Backend & Node.js
  {
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    platform: 'Udemy',
    instructor: 'Jonas Schmedtmann',
    url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/',
    description: 'Master Node.js by building a real-world RESTful API and web app',
    relatedSkills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    duration: '42 hours',
    difficulty: 'Intermediate',
    rating: 4.7,
    reviewCount: 85000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // Python & Data Science
  {
    title: 'Complete Python Bootcamp',
    platform: 'Udemy',
    instructor: 'Jose Portilla',
    url: 'https://www.udemy.com/course/complete-python-bootcamp/',
    description: 'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications',
    relatedSkills: ['Python', 'Programming Fundamentals', 'Object-Oriented Programming'],
    duration: '22 hours',
    difficulty: 'Beginner',
    rating: 4.6,
    reviewCount: 475000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },
  {
    title: 'Machine Learning A-Z',
    platform: 'Udemy',
    instructor: 'Kirill Eremenko',
    url: 'https://www.udemy.com/course/machinelearning/',
    description: 'Learn to create Machine Learning Algorithms in Python and R',
    relatedSkills: ['Machine Learning', 'Python', 'Data Science', 'TensorFlow'],
    duration: '44 hours',
    difficulty: 'Intermediate',
    rating: 4.5,
    reviewCount: 175000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // DevOps & Cloud
  {
    title: 'Docker and Kubernetes: The Complete Guide',
    platform: 'Udemy',
    instructor: 'Stephen Grider',
    url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
    description: 'Build, test, and deploy Docker applications with Kubernetes',
    relatedSkills: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
    duration: '22 hours',
    difficulty: 'Intermediate',
    rating: 4.6,
    reviewCount: 98000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },
  {
    title: 'AWS Certified Solutions Architect',
    platform: 'Udemy',
    instructor: 'Stephane Maarek',
    url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/',
    description: 'Pass the AWS Certified Solutions Architect Associate Exam',
    relatedSkills: ['AWS', 'Cloud Computing', 'Cloud Architecture'],
    duration: '27 hours',
    difficulty: 'Intermediate',
    rating: 4.7,
    reviewCount: 125000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // Database & SQL
  {
    title: 'The Complete SQL Bootcamp',
    platform: 'Udemy',
    instructor: 'Jose Portilla',
    url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/',
    description: 'Master SQL and PostgreSQL with real-world projects',
    relatedSkills: ['SQL', 'PostgreSQL', 'Database Design'],
    duration: '9 hours',
    difficulty: 'Beginner',
    rating: 4.6,
    reviewCount: 140000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },
  {
    title: 'MongoDB - The Complete Developers Guide',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/',
    description: 'Master MongoDB Development for Web & Mobile Apps',
    relatedSkills: ['MongoDB', 'NoSQL', 'Database'],
    duration: '17 hours',
    difficulty: 'Intermediate',
    rating: 4.6,
    reviewCount: 45000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // Web Design & CSS
  {
    title: 'Advanced CSS and Sass',
    platform: 'Udemy',
    instructor: 'Jonas Schmedtmann',
    url: 'https://www.udemy.com/course/advanced-css-and-sass/',
    description: 'Master flexbox, CSS Grid, responsive design, and more',
    relatedSkills: ['CSS', 'Sass', 'Responsive Design', 'Flexbox'],
    duration: '28 hours',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviewCount: 92000,
    price: { amount: 84.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // Git & Version Control
  {
    title: 'Git Complete: The Definitive Guide',
    platform: 'Udemy',
    instructor: 'Jason Taylor',
    url: 'https://www.udemy.com/course/git-complete/',
    description: 'Master Git and GitHub with real-world projects',
    relatedSkills: ['Git', 'GitHub', 'Version Control'],
    duration: '6 hours',
    difficulty: 'Beginner',
    rating: 4.7,
    reviewCount: 35000,
    price: { amount: 54.99, currency: 'USD', isFree: false },
    language: 'English',
    certificate: true,
    isActive: true
  },

  // Free Courses
  {
    title: 'CS50: Introduction to Computer Science',
    platform: 'edX',
    instructor: 'David J. Malan',
    url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
    description: 'Harvard University\'s introduction to computer science',
    relatedSkills: ['Programming Fundamentals', 'C', 'Python', 'SQL'],
    duration: '12 weeks',
    difficulty: 'Beginner',
    rating: 4.9,
    reviewCount: 50000,
    price: { amount: 0, currency: 'USD', isFree: true },
    language: 'English',
    certificate: true,
    isActive: true
  },
  {
    title: 'Responsive Web Design',
    platform: 'Other',
    instructor: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    description: 'Learn HTML, CSS, and responsive design principles',
    relatedSkills: ['HTML', 'CSS', 'Responsive Design'],
    duration: '300 hours',
    difficulty: 'Beginner',
    rating: 4.8,
    reviewCount: 120000,
    price: { amount: 0, currency: 'USD', isFree: true },
    language: 'English',
    certificate: true,
    isActive: true
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    const inserted = await Course.insertMany(courses);
    console.log(`✅ Inserted ${inserted.length} courses`);

    console.log('\n📚 Courses Added:');
    inserted.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title} (${course.platform}) - ${course.difficulty}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();
