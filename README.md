# BlogEpic — Full Stack Blog Application

A minimalist full-stack blog platform where users can register, log in, write blog posts with rich text, upload cover images, and manage their own content. Built with React on the frontend and Express + MongoDB on the backend.

---

## Features

- **Authentication** — JWT-based sign up and login with bcrypt password hashing
- **Write & Publish** — Rich text editor (Jodit) with cover image upload
- **Ownership Control** — Users can only edit or delete their own blogs; others can read but not modify
- **Dark / Light Mode** — Toggle persisted to localStorage, theme applied via CSS custom properties
- **Minimalist Design** — Clean, flat UI with no animations, neutral palette, and consistent typography
- **Protected Routes** — All pages except login/signup require authentication

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 (Vite) | UI framework |
| React Router DOM | Client-side routing |
| Jodit React | Rich text editor |
| Vanilla CSS + CSS Variables | Styling and theming |
| Tailwind CSS | Utility classes |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | Image file uploads |
| Nodemon | Development auto-restart |

---

## Project Structure

```
blogepic/
├── backend/
│   ├── models/
│   │   ├── userModel.js       # User schema (username, email, password, isAdmin)
│   │   └── blogModel.js       # Blog schema (title, desc, content, image, user ref, date)
│   ├── routes/
│   │   └── index.js           # All API routes
│   ├── uploads/               # Uploaded cover images (served statically)
│   ├── app.js                 # Express app setup
│   └── package.json
│
└── frontend/
    └── src/
        ├── context/
        │   └── ThemeContext.jsx    # Dark/light mode state and hook
        ├── components/
        │   ├── Navbar.jsx          # Navigation + theme toggle + logout
        │   ├── Blogs.jsx           # Blog grid listing
        │   ├── Blog.jsx            # Single blog card (with owner-only edit/delete)
        │   ├── Here.jsx            # Hero section
        │   └── Fotter.jsx          # Footer
        ├── pages/
        │   ├── Home.jsx            # Home page (hero + blog grid)
        │   ├── SingleBlog.jsx      # Full blog view (owner-only edit/delete)
        │   ├── UploadBlog.jsx      # Create new blog form
        │   ├── EditBlog.jsx        # Edit existing blog form (owner only)
        │   ├── Loign.jsx           # Login page
        │   ├── SignUp.jsx          # Sign up page
        │   └── NoPage.jsx          # 404 page
        ├── App.jsx                 # Routes + ThemeProvider wrapper
        ├── App.css                 # Global styles and CSS variable themes
        └── helper.js              # API base URL constant
```

---

## API Endpoints

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/signUp` | Register a new user | No |
| `POST` | `/login` | Log in and receive a JWT token | No |
| `POST` | `/uploadBlog` | Create a new blog post (with image) | Yes |
| `POST` | `/getBlogs` | Fetch all blog posts | Yes |
| `POST` | `/getBlog` | Fetch a single blog by ID | Yes |
| `POST` | `/updateBlog` | Update a blog (owner only) | Yes |
| `POST` | `/deleteBlog` | Delete a blog (owner only) | Yes |

> All authenticated routes require a valid JWT `token` in the request body.

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally on port `27017`

### 1. Clone the repository

```bash
git clone https://github.com/hafizmahdi2010/Full-Stack-Blog-App.git
cd Full-Stack-Blog-App
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on **http://localhost:3000**

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## Environment Notes

- MongoDB connection is hardcoded to `mongodb://localhost:27017/blogApp`
- JWT secret is set to `"secret"` in `routes/index.js` — change this for production
- Uploaded images are stored in `backend/uploads/` and served statically

---

## How Authentication Works

1. User signs up → password is hashed with bcrypt and stored
2. User logs in → server returns a JWT token + userId
3. Frontend stores `token`, `userId`, and `isLoggedIn` in `localStorage`
4. Every API request sends the token; the server decodes it to identify the user
5. On logout, all three localStorage keys are cleared

---

## Ownership & Permissions

- **Any logged-in user** can read all blogs
- **Only the blog author** sees Edit / Delete buttons on blog cards and the single blog view
- **If a non-owner** navigates directly to `/editBlog/:id`, they are redirected back with an error message
- **Backend enforces** ownership on `/updateBlog` and `/deleteBlog` — unauthorized requests are rejected even if the UI is bypassed

---

## Dark / Light Mode

- Managed by `ThemeContext` — state persisted to `localStorage`
- Toggled via the button in the Navbar (shows current mode label)
- Theme applied by setting `data-theme="dark"` or `data-theme="light"` on the `<html>` element
- All colors are CSS custom properties (`--bg`, `--text-primary`, `--border`, etc.) defined in `App.css`

---

## License

MIT