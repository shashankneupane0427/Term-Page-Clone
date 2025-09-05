# Term Page Clone

A full-stack **Term Page Clone** application built with **React** for the frontend and **Fastify + PostgreSQL** for the backend.
The project supports multiple languages and dynamically fetches content from the backend API.

---

##  Project Structure

```
TERM-PAGE-CLONE
│
├─ backend
│  ├─ models
│  │  └─ Terms.js
│  ├─ node_modules
│  ├─ .env
│  ├─ .gitignore
│  ├─ db.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ seed.js
│  ├─ server.js
│  ├─ terms_en.json
│  └─ terms_sv.json
│
├─ frontend
│  ├─ node_modules
│  ├─ public
│  ├─ src
│  ├─ .env
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ README.md
│  └─ vite.config.js
│
└─ SOW Task-1 Documentation.md
```

---

## Getting Started

### Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the frontend folder:**

```env
VITE_API_URL=http://localhost:4000
```


4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser and navigate to:**

```
https://localhost:5173
```

---

### Backend Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the backend folder:**

```env
DATABASE_URL=<your-database-url>
NODE_ENV=development
```


4. **Start the development server:**

```bash
npm run dev
```

5. **Backend server will run at:**

```
http://127.0.0.1:4000
```

---

## Features

* Multi-language term page (**English** and **Swedish**)
* Automatic database seeding on server startup
* Separate frontend and backend for modularity
* Fully responsive UI for **Desktop, Tablet, and Mobile**
* Deployed frontend on **Vercel**, backend and **PostgreSQL** database on **Render**

---

## Note

Due to **free Render account limitations**, the backend or database may take longer to respond when idle.
Free instances spin down with inactivity, which can delay requests by **50 seconds or more**.

---