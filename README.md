# JWT Authentication — React & Express.js

A full-stack authentication application built with React and Express.js. The application supports user registration, login, JSON Web Token (JWT) authentication, and access to a protected route.

## Features

- User registration with username and password
- Password hashing using bcryptjs
- Login with credential validation
- JWT generation after successful login
- JWT authentication middleware
- Protected backend API route
- React registration and login forms
- JWT storage in browser local storage
- Protected dashboard
- Logout functionality
- Responsive CSS styling

## Technologies Used

**Frontend**
- React
- Vite
- React Router DOM
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- JSON Web Token (jsonwebtoken)
- bcryptjs
- dotenv
- CORS


## Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- A GitHub account

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd jwt-auth-project
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=4000
JWT_SECRET=your_own_long_random_secret
```

Start the backend:

```bash
npm run dev
```

The API will run locally at `http://localhost:4000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.


## Deployment

The application can be deployed using:

- **Backend:** Render Web Service
- **Frontend:** Netlify

Configure the `JWT_SECRET` environment variable in Render. Configure `VITE_API_URL` in Netlify to point to the deployed Render API URL.

Update the backend CORS allowlist to include the actual Netlify site origin.


## Author
Fathima Fidha

