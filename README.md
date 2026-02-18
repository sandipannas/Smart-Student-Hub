# Smart Student Hub – React Frontend

A role-based React web app prototype for managing students, faculty, and institute head dashboards.

## 🚀 Features

### Landing Page (`/`)

* App title, tagline, and login button.
* Responsive design.

### Authentication

* Login page (`/login`) with email & password.
* Mock API call to `/auth/login` (returns `{ token, role }`).
* Stores JWT token in `localStorage`.
* Redirects based on role:

  * `student` → `/student/dashboard`
  * `faculty` → `/faculty/dashboard`
  * `head` → `/head/dashboard`
* Private routes protect dashboard pages.

### Student Dashboard (`/student/dashboard`)

* Sidebar navigation.
* Sections for:

  * Attendance
  * Marks
  * Certificates
  * Projects
  * Skills
  * Events & Notices
* Placeholder sections (ready for backend integration).

### Faculty Dashboard (`/faculty/dashboard`)

* Sidebar navigation.
* Sections for:

  * My Classes
  * Certificates Approval
  * Events & Notices (with CRUD using local state).

### Head Dashboard (`/head/dashboard`)

* Sidebar navigation.
* Sections for:

  * Faculty Management (add faculty emails using dummy state).
  * Institution Reports
  * Global Events/Notices

### Components

* **Navbar**: Top navigation for landing & login.
* **Sidebar**: Role-specific dashboard navigation.
* **AuthForm**: Login form.

### Tech Stack

* **React 18+** with functional components & hooks (`useState`, `useEffect`).
* **React Router v6** for routing.
* **Vanilla CSS** (no Tailwind/Bootstrap).
* **Local state** for mock data.

### File Structure

```
/frontend
 ├── /src
 │    ├── /components
 │    │    ├── Navbar.js
 │    │    ├── Sidebar.js
 │    │    └── AuthForm.js
 │    ├── /pages
 │    │    ├── Landing.js
 │    │    ├── Login.js
 │    │    ├── /student/Dashboard.js
 │    │    ├── /faculty/Dashboard.js
 │    │    └── /head/Dashboard.js
 │    ├── /routes
 │    │    └── PrivateRoute.js
 │    ├── /styles
 │    │    ├── globals.css
 │    │    ├── Navbar.css
 │    │    ├── Sidebar.css
 │    │    ├── AuthForm.css
 │    │    ├── Dashboard.css
 │    │    └── Landing.css
 │    ├── App.js
 │    ├── index.js
 │    └── api.js (mock axios calls)
 └── package.json
```

## 🛠️ Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-student-hub.git
cd smart-student-hub/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔐 Authentication Flow

1. User enters email + password.
2. Frontend calls mock `POST /auth/login`.
3. Response returns `{ token, role }`.
4. Token is saved to `localStorage`.
5. User redirected to role-specific dashboard.

##
