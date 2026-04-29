# ClassSync

ClassSync is a comprehensive booking system that bridges the gap between students and teachers. It allows teachers to manage their availability and students to book learning slots seamlessly.

## 🚀 What We Implemented

This project is built using the **MERN** stack (MongoDB, Express.js, React, Node.js) and includes the following key features:

- **Role-Based Authentication & Authorization:** Secure login and registration for two primary roles: **Teacher** and **Student**.
- **Teacher Dashboard:** Teachers can add new available time slots, view their created slots, and manage their schedule.
- **Student Dashboard:** Students can browse available teacher slots, book sessions, and view their booking history.
- **Modern UI/UX:** A responsive, accessible, and aesthetically pleasing interface built with React, Tailwind CSS, and DaisyUI.
- **RESTful API Backend:** A robust Express backend integrated with MongoDB for reliable data storage and efficient queries.
- **CORS & Security:** Configured secure cross-origin communication between the frontend and backend, with proper JWT/Auth integrations.
- **Vercel Deployment:** Configured `vercel.json` for seamless deployment of both frontend and backend applications.

## ⚙️ How to Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A [MongoDB](https://www.mongodb.com/) database connection URI.
- (If applicable) Firebase configuration keys for authentication.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd ClassSync
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory and add any required environment variables (like API URL or Firebase config):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The application should now be running locally. The backend typically runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## 🔐 Demo Credentials (Username & Password)

To explore the application without creating a new account, you can use the following test credentials:

**Teacher Account:**
- **Email (Username):** `teacher@classsync.com`
- **Password:** `Teacher123!`

**Student Account:**
- **Email (Username):** `student@classsync.com`
- **Password:** `Student123!`

*(Note: Depending on your current database state, you may need to register these users first via the sign-up page.)*
