# 🚀 AI-Based Employee Performance Analytics & Recommendation System

A full-stack **MERN** web application for HR/Admin users to manage employees, track performance, generate AI-based recommendations, and view analytics dashboards.

> **B.Tech 4th Semester — AI Driven Full Stack Development Project**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Sample Data](#-sample-data)
- [Deployment Guide](#-deployment-guide)
- [Screenshots](#-screenshots)
- [GitHub Commands](#-github-commands)

---

## ✨ Features

### Employee Management
- ✅ Add, edit, delete employees
- ✅ View detailed employee profiles
- ✅ Search employees by department
- ✅ Filter by performance score range
- ✅ Dynamic ranking with Gold/Silver/Bronze badges

### AI-Powered Analytics
- 🤖 Promotion recommendations
- 📚 Training suggestions
- 🔍 Skill gap analysis
- 📈 Employee ranking
- 💬 AI-generated personalized feedback
- 🔄 Rule-based fallback when API key is unavailable

### Dashboard & Charts
- 📊 Interactive analytics dashboard
- 📉 Department-wise performance bar chart
- 🍩 Performance distribution doughnut chart
- 🏆 Top performers leaderboard
- 🕐 Recently added employees

### Authentication & Security
- 🔐 JWT-based authentication
- 🔒 bcrypt password hashing
- 🛡️ Protected API routes
- 🚪 Auto-redirect on session expiry

### UI/UX
- 🌙 Dark mode glassmorphic design
- 📱 Fully responsive (mobile/tablet/desktop)
- 🎨 Custom Tailwind CSS design system
- 🔔 Toast notifications
- ⏳ Loading states & animations
- ✨ Smooth page transitions

---

## 🛠 Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| **Frontend**   | React.js 18, Vite, Tailwind CSS 3             |
| **Backend**    | Node.js, Express.js                           |
| **Database**   | MongoDB, Mongoose                             |
| **Auth**       | JWT, bcryptjs                                 |
| **AI**         | OpenRouter API (LLaMA 3.1)                    |
| **Charts**     | Chart.js + react-chartjs-2                    |
| **HTTP**       | Axios                                         |
| **Routing**    | React Router DOM v6                           |
| **Deployment** | Render                                        |

---

## 📁 Folder Structure

```
Employee Performance ESE/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── EmployeeCard.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── RankingBadge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── PerformanceChart.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EmployeeListPage.jsx
│   │   │   ├── EmployeeDetailPage.jsx
│   │   │   ├── AddEmployeePage.jsx
│   │   │   ├── EditEmployeePage.jsx
│   │   │   └── AIRecommendationPage.jsx
│   │   ├── services/          # API service layer
│   │   ├── context/           # React Context (Auth)
│   │   ├── routes/            # Protected Route
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Express Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedData.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── render.yaml
├── POSTMAN_COLLECTION.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/AI-FSD.git
cd AI-FSD
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in the `server/` directory:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/employee-performance?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Seed Sample Data (Optional)
```bash
npm run seed
```
This creates a demo user (`admin@demo.com` / `admin123`) and 12 sample employees.

### 4. Start Backend
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### 5. Setup Frontend
```bash
cd ../client
npm install
```

### 6. Start Frontend
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable              | Description                          | Required |
|-----------------------|--------------------------------------|----------|
| `MONGO_URI`           | MongoDB Atlas connection string      | ✅       |
| `JWT_SECRET`          | Secret key for JWT tokens            | ✅       |
| `OPENROUTER_API_KEY`  | OpenRouter API key for AI features   | ❌ (has fallback) |
| `PORT`                | Backend server port                  | ❌ (default: 5000) |
| `NODE_ENV`            | Environment mode                     | ❌       |
| `CLIENT_URL`          | Frontend URL for CORS                | ❌       |

### Getting OpenRouter API Key (Free)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

> **Note:** The app works without an API key — AI features will use the built-in rule-based recommendation engine.

---

## 📡 API Documentation

### Auth APIs
| Method | Endpoint            | Description     | Auth |
|--------|---------------------|-----------------|------|
| POST   | `/api/auth/signup`  | Register user   | ❌   |
| POST   | `/api/auth/login`   | Login user      | ❌   |

### Employee APIs
| Method | Endpoint                                  | Description              | Auth |
|--------|-------------------------------------------|--------------------------|------|
| POST   | `/api/employees`                          | Create employee          | ✅   |
| GET    | `/api/employees`                          | Get all employees        | ✅   |
| GET    | `/api/employees/:id`                      | Get employee by ID       | ✅   |
| PUT    | `/api/employees/:id`                      | Update employee          | ✅   |
| DELETE | `/api/employees/:id`                      | Delete employee          | ✅   |
| GET    | `/api/employees/search?department=Dev`    | Search by department     | ✅   |
| GET    | `/api/employees?minScore=70&maxScore=100` | Filter by score range    | ✅   |

### AI APIs
| Method | Endpoint             | Description            | Auth |
|--------|----------------------|------------------------|------|
| POST   | `/api/ai/recommend`  | Get AI recommendations | ✅   |

### Sample Employee JSON
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

---

## 📊 Sample Data

Run `npm run seed` in the server directory to populate:
- **1 Admin User**: admin@demo.com / admin123
- **12 Sample Employees** across all departments with varied performance scores

---

## 🌐 Deployment Guide (Render)

### Backend Deployment
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repository
3. **Build Command**: `cd server && npm install`
4. **Start Command**: `cd server && npm start`
5. Add environment variables (MONGO_URI, JWT_SECRET, etc.)

### Frontend Deployment
1. Go to Render → New → Static Site
2. Connect your GitHub repository
3. **Build Command**: `cd client && npm install && npm run build`
4. **Publish Directory**: `client/dist`

### MongoDB Atlas Setup
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create a database user
4. Whitelist `0.0.0.0/0` for all IPs
5. Get the connection string and add to `.env`

---

## 📸 Screenshots

> Screenshots will be added after running the application.

---

## 🔧 GitHub Commands

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Employee Performance Analytics System"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/AI-FSD.git

# Push
git push -u origin main
```

---

## 👨‍💻 Author

**B.Tech 4th Semester — AI Driven Full Stack Development**

---

## 📄 License

This project is for educational purposes only.
