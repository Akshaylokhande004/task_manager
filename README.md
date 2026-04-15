# 🚀 Task Manager Backend API

## 📌 Overview
A production-ready backend API for a task management system built with a focus on scalability, clean architecture, and real-world backend practices.

This application allows users to securely manage their tasks with authentication, advanced filtering, reminders, and external integrations.

The system uses a **hybrid database architecture**:
- PostgreSQL (Neon) → User data & authentication  
- MongoDB Atlas → Task data  

---

## 🧠 Key Highlights
- 🔐 JWT-based authentication with refresh token flow  
- 🗄️ Hybrid database system (PostgreSQL + MongoDB Atlas)  
- ⚡ Optimized queries with pagination and filtering  
- 🏷️ Task categorization & flexible tagging system  
- ⏰ Real-time task reminders (in-memory scheduler)  
- 🌐 Webhook integration with retry logic  
- 📄 Interactive API documentation using Swagger  
- 🔒 Secure user-specific data access  

---

## 🏗️ Architecture

### Backend (Node.js + Express + TypeScript)
- Modular structure (auth, tasks, categories, middleware)  
- Prisma ORM with Neon PostgreSQL (user management)  
- MongoDB with Mongoose (task management)  
- Clean separation of concerns:
  - Controller → request/response handling  
  - Service → business logic  
  - Model → database interaction  

---

## ⚙️ Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- Prisma ORM  
- Neon (PostgreSQL)  
- MongoDB Atlas  
- JWT (Access + Refresh Tokens)  
- Swagger (OpenAPI Documentation)  
- Axios (Webhook calls)  

---

## ✨ Features

### 🔐 Authentication
- User registration & login  
- Access + Refresh token strategy  
- Secure logout  
- Protected routes  

---

### 📋 Task Management
- Create, update, delete tasks  
- View all tasks  
- View single task  
- Tasks are linked to authenticated users  

---

### 🏷️ Categories & Tags
- Predefined categories (Work, Personal, Urgent)  
- Multiple tags per task (free-form text)  
- Endpoint to fetch categories  
- Endpoint to fetch all unique tags  

---

### 🔍 Advanced Filtering
Supports:
- Pagination  
- Search (title-based)  
- Filter by category  
- Filter by tags  

Example:
```
GET /tasks?category=Work&tag=Backend&search=api
```

---

### ⏰ Task Reminder System
- In-memory scheduler using `setTimeout`  
- Triggers reminder before due date  
- Handles:
  - Task updates (rescheduling)  
  - Task completion (cancels reminder)  

---

### 🌐 Webhook Integration
- Triggered when task status becomes **completed**  
- Sends POST request to external service  
- Includes:
  - taskId  
  - title  
  - userId  
  - completedAt  

---

### 🔁 Retry Logic
- Retries webhook delivery up to 3 times  
- Uses exponential backoff  

---

## 📡 API Documentation (Swagger)

### Swagger UI
http://localhost:5000/api-docs

### Swagger JSON
http://localhost:5000/swagger.json

---

### 🔐 Authentication in Swagger

Click **Authorize** and enter:
```
Bearer <your_token>
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-link>
cd task-manager-backend
```

---

### 2. Install Dependencies
```bash
npm install
```

---

### 3. Environment Variables

Create `.env` file:

```env
DATABASE_URL=your_neon_postgres_url
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret
WEBHOOK_URL=https://webhook.site/your-id
PORT=5000
```

---

### 4. Setup PostgreSQL (Neon)
```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5. Run Server
```bash
npm run dev
```

---

## 🌐 API Base URL
```
http://localhost:5000
```

---

## 🔒 Authentication
Use JWT in headers:
```
Authorization: Bearer <token>
```

---

## 📋 API Endpoints

### Auth
- POST /auth/register  
- POST /auth/login  
- POST /auth/logout  
- POST /auth/refresh  
- GET /auth/me  

---

### Tasks
- POST /tasks  
- GET /tasks  
- GET /tasks/:id  
- PATCH /tasks/:id  
- DELETE /tasks/:id  

---

### Categories
- GET /categories  

---

### Tags
- GET /tasks/tags  

---

## 📅 Date Format (IMPORTANT)
The API uses **ISO 8601 format** for `dueDate`.

Example:
```
2026-04-20T10:00:00.000Z
```

---

## 🧪 Demo Credentials
Email: akshay96@gmail.com  
Password: password  

---

## 📽️ Demo Video
👉 https://drive.google.com/drive/folders/1s-7Qtp5iYJi4LIWKrbBt73SIoHEQ6evH?usp=sharing

---

## 🎯 Design Decisions

- **Hybrid Database**
  - PostgreSQL → structured user/auth data  
  - MongoDB → flexible task data  

- **Enum-based categories**
  → simple and controlled  

- **Tags as array**
  → flexible and scalable  

- **In-memory scheduler**
  → lightweight and sufficient for assignment  

- **Webhook + retry**
  → simulates real-world async systems  

---

## 🚀 Future Improvements
- Unit & integration testing  
- Role-based access control (RBAC)  
- Queue system (BullMQ) for production reminders  
- Docker deployment  

---

## 👤 Author
Developed by Akshay Lokhande  

---

## 💬 Final Note
This project demonstrates real-world backend engineering practices including hybrid database usage, asynchronous workflows (reminders & webhooks), and scalable API design.
