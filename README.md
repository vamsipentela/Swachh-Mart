# SwacHhMart - Digital Supermarket Catalog

A premium, view-only digital catalog system for SwacHh Mart, built with the MERN stack.

## Project Structure
* **frontend/**: React (Vite) frontend with luxury UI components and SPA routing.
* **backend/**: Node.js (Express) backend linked to MongoDB Atlas.

## Deployment Details

### 1. Frontend (Vercel)
* **Status**: Deployed
* **URL**: [https://swachhmart.vercel.app](https://swachhmart.vercel.app)
* **Root Directory**: `frontend`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Required Environment Variables**:
  * `VITE_API_URL`: URL of your deployed Render backend.
  * `VITE_ADMIN_PHONE`: Admin login phone number.
  * `VITE_ADMIN_PASSWORD`: Admin login password.

### 2. Backend (Render)
* **Status**: Deployed
* **URL**: [https://swachh-mart-backend.onrender.com](https://swachh-mart-backend.onrender.com) (Example)
* **Root Directory**: `backend`
* **Build Command**: `npm install`
* **Start Command**: `node server.js`
* **Required Environment Variables**:
  * `MONGO_URI`: MongoDB Atlas connection string.
  * `JWT_SECRET`: Random security string.
  * `PORT`: `10000` (Managed by Render)

## Local Setup

### Backend
1. Go to `/backend`
2. Run `npm install`
3. Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
4. Run `npm run dev`

### Frontend
1. Go to `/frontend`
2. Run `npm install`
3. Create a `.env` file with `VITE_API_URL` (e.g., http://localhost:5000).
4. Run `npm run dev`

---
*Created with focus on quality and cleanliness for SwacHh Mart.*
