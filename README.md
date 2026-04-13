# Flowboard V2
## Professional No-Code Workflow Builder

A modern, multi-page SaaS platform for building data transformation pipelines, automating workflows, and creating business logic without code.

### 🚀 Features

- **Visual Workflow Builder**: Drag-and-drop node-based interface powered by ReactFlow
- **12+ Node Types**: Input nodes, data transforms, conditional branching, and output handlers
- **Real-Time Execution**: See results instantly as your workflow runs
- **Multi-User Support**: JWT-based authentication with user-isolated workflows
- **Professional Landing Page**: Multi-section landing with 3D animations and smooth navigation
- **Responsive Design**: Glassmorphic UI with dark theme and gradient effects
- **Google OAuth Ready**: Support for Google Sign-In and local email/password authentication

### 📋 Tech Stack

**Frontend:**
- React 18.3 + Vite
- React Router v6 (multi-page routing)
- Framer Motion (animations)
- React Three Fiber (3D animations)
- Zustand (state management)
- Axios (HTTP client)
- ReactFlow (node editor)

**Backend:**
- Express.js (server framework)
- MongoDB + Mongoose (database)
- JWT (authentication)
- bcryptjs (password hashing)

### 🛠️ Local Development

**Prerequisites:**
- Node.js 16+ 
- MongoDB Atlas account (or local MongoDB)
- Git

**Installation:**

```bash
# Clone the repository
git clone <your-repo>
cd FLOWBOARD

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install --legacy-peer-deps
```

**Configuration:**

1. **Backend (.env):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

2. **Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Running Locally:**

```bash
# Terminal 1 - Start backend
cd server
npm run dev  # or: npm start

# Terminal 2 - Start frontend
cd client
npm run dev
```

Visit http://localhost:5173 in your browser.

### 🚀 Deployment

#### Frontend (Vercel)

1. Create a Vercel account at https://vercel.com
2. Connect your GitHub repository
3. Deploy the `client` directory:
   - Set root directory to `client`
   - Build command: `npm run build`
   - Output directory: `dist`

#### Backend (Render)

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `server`
   - Environment variables (set in Render dashboard):
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Generate a strong random string
     - `GOOGLE_CLIENT_ID`: From Google Cloud Console
     - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
     - `CLIENT_ORIGIN`: Your Vercel frontend URL
     - `NODE_ENV`: production

### 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized JavaScript origins: 
     - http://localhost:5173 (local)
     - https://your-vercel-domain.vercel.app (production)
   - Authorized redirect URIs:
     - http://localhost:5173 (local)
     - https://your-vercel-domain.vercel.app (production)
5. Copy Client ID and Secret to `.env` files

### 📁 Project Structure

```
FLOWBOARD/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # Page components (Home, Login, Dashboard, Editor)
│   │   ├── components/  # Reusable components & 3D modules
│   │   ├── context/     # AuthContext for state management
│   │   ├── api/         # API client and endpoints
│   │   └── store/       # Zustand state store
│   └── vite.config.js
├── server/              # Express backend
│   ├── models/          # MongoDB schemas (User, Workflow)
│   ├── routes/          # API route handlers
│   ├── controllers/      # Business logic
│   ├── middleware/      # Auth middleware & JWT verification
│   ├── engine/          # Workflow execution engine
│   └── server.js        # Entry point
└── .gitignore
```

### 🔗 API Endpoints

**Auth Routes:**
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/register` - Email signup
- `POST /api/auth/login` - Email login
- `GET /api/auth/me` - Get current user (protected)

**Workflow Routes (all protected):**
- `GET /api/workflows` - List user's workflows
- `POST /api/workflows` - Create new workflow
- `GET /api/workflows/:id` - Get workflow details
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/execute` - Execute workflow

**Public Routes:**
- `GET /api/node-types` - Get available node types
- `GET /api/health` - Health check

### 🎨 Design System

The landing page features:
- Professional multi-section layout
- Glassmorphic cards with backdrop blur
- Gradient text and buttons
- Smooth scroll progress bar
- Responsive grid layouts
- 3D animated hero section
- Framer Motion page animations

### 📊 Workflow Execution

**Node Types:**

Input Nodes:
- Text Input
- Number Input
- JSON Input

Transform Nodes:
- Uppercase / Lowercase
- Append Text
- Replace Text
- Parse JSON

Condition Nodes:
- Condition (if/else branching)
- Compare (value comparison)

Output Nodes:
- Display Output
- Log Output (console)

### 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- User-isolated workflows (cannot access other users' data)
- HTTP-only token storage (recommended for production)
- CORS configured for frontend origin
- MongoDB injection protection via Mongoose
- Rate limiting ready (can be added via express-rate-limit)

### 🐛 Troubleshooting

**Backend won't start:**
- Ensure MongoDB connection string is correct
- Check that port 5000 is not in use
- Verify all environment variables are set

**Frontend build fails:**
- Run `npm install --legacy-peer-deps` in client folder
- Clear `node_modules` and reinstall if issues persist
- Check Node.js version (16+ required)

**Google login not working:**
- Verify Google Client ID is correct in .env
- Check your domain is whitelisted in Google Cloud Console
- Ensure redirect URIs match your deployment URLs

### 📝 License

MIT License - Feel free to use for personal or commercial projects

### 🤝 Contributing

Contributions welcome! Please fork and submit pull requests.

### 📧 Support

For issues or questions, open an issue on GitHub or contact us at support@flowboard.local

---

**Built with ❤️ for creators and developers**
