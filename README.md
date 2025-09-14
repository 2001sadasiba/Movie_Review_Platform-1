🛠️ Installation & Setup
*-------------------------*

### Clone the repo:
git clone https://github.com/2001sadasiba/Movie_Review_Platform.git
cd Movie_Review_Platform

### Backend env file setup
NODE_ENV=development

# ------------------------
# MongoDB Connection String
# ------------------------
DB_STRING=mongodb+srv://sadasiba2001:Sainy2001@cluster0.flefd8q.mongodb.net/MOVIE_REVIEW_DB?retryWrites=true&w=majority

# ------------------------
# JWT Authentication
# ------------------------
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d   # or 15m, 7d etc.

# ------------------------
# Cookie Settings (if using HTTP-only cookies for auth)
# ------------------------
COOKIE_NAME=token
COOKIE_EXPIRES_IN=1d
COOKIE_SECURE=false  # set true in production (for HTTPS only)

# ------------------------
# CORS (for frontend-backend communication)
# ------------------------
CLIENT_URL=http://localhost:3037

# ------------------------
# Server Port
# ------------------------
PORT=5004

# ------------------------
# OMDB API Configuration
# ------------------------
OMDB_API_KEY=df2503ef
OMDB_BASE_URL=http://www.omdbapi.com
OMDB_IMAGE_BASE_URL=http://img.omdbapi.com

# ------------------------
# CORS Configuration
# ------------------------
CORS_ORIGINS=http://localhost:5173
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_HEADERS=Content-Type,Authorization,Cache-Control,Pragma,Expires
CORS_CREDENTIALS=true

### Backend installation
cd backend
npm install
npm run dev




### Frontend env file setup
VITE_BACKEND_URL=http://localhost:5004

### Frontend installation
cd frontend
npm install
npm start


 APIs
*----*
1. USER register: http://localhost:5004/api/v1/users/register, method = POST
2. USER Login: http://localhost:5004/api/v1/users/login, method = POST
3. User Authentication: http://localhost:5004/api/v1/users/auth-check, method = GET
4. User personal details: http://localhost:5004/api/v1/users/me, method = GET
5. User profile Update: http://localhost:5004/api/v1/users/me, method = PUT
6. User Logout: http://localhost:5004/api/v1/users/logout, method = POST

7. Movie get by name: http://localhost:5004/api/v1/movies/search/?q=Popular, method = GET
8. Movie details by IMBD: http://localhost:5004/api/v1/movies/search/?q=Popular, method = GET

9. Review submit: http://localhost:5004/api/v1/rev/movies/<IMBD ID>/reviews, method = POST
10. Review get: http://localhost:5004/api/v1/rev/movies/<IMBD ID>/reviews, method = GET
