
---

```markdown
# 📚 MERN Stack PDF Upload & Resource Sharing App

This is a full-stack web application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** that allows users to upload, view, filter, and download PDF files based on subjects.

---

## 🚀 Features

- User Registration and Login (Authentication)
- Upload PDF files with metadata like subject and filename
- Filter PDFs by subject
- Search PDFs by name or subject
- View and download uploaded PDFs
- Responsive and clean UI using React

---

## 🛠️ Tech Stack

**Frontend:** React, Axios, CSS  
**Backend:** Node.js, Express.js, MongoDB, Multer  
**Database:** MongoDB (Local or Atlas)

---

## 📁 Project Structure

```

backend/
├── models/
│   └── Pdf.js
├── routes/
│   └── pdfs.js
├── uploads/
├── server.js
└── ...other backend files

frontend/
├── src/
│   ├── components/
│   │   └── FileList.js
│   │   └── SubjectList.js
│   └── App.js
└── ...other frontend files

````

---

## 🧑‍💻 How to Run Locally

### Prerequisites

- Node.js and npm installed
- MongoDB installed locally OR MongoDB Atlas account
- Git

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/pdf-upload-app.git
cd pdf-upload-app
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

* Create a `.env` file and add your MongoDB URI:

```env
MONGO_URI=mongodb://localhost:27017/pdfApp
PORT=3001
```

* Start backend server:

```bash
node server.js
```

> Backend will run on `http://127.0.0.1:3001`

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

* Start frontend React app:

```bash
npm start
```

> Frontend will run on `http://localhost:3000`

---

## 📦 File Upload Format

When uploading a PDF, users are expected to provide:

* **File name**
* **Subject**
* **Original file (PDF format)**

All uploaded files are stored in `/backend/uploads/`.

---

## ❗ Troubleshooting

* **MongoDB connection error**: Ensure MongoDB is running locally or your Atlas URI is correct.
* **Port conflict**: Make sure port `3000` (frontend) and `3001` (backend) are free or change them in `.env` and React proxy.

---

## 📄 License

MIT

---

## ✨ Author

Made by [Mannat Berry](https://github.com/vie-nyx)

```

---

Let me know if you'd like this to include deployment instructions (e.g., on Render, Vercel, or Railway) or if you're using any authentication middleware like JWT.
```
