Weekly To-Do List App
🧠 Overview
Weekly To-Do List is a fullstack web app that lets you manage tasks by days of the week. It supports add and delete tasks, drag-and-drop between days, task completion toggles, and a beatiful particles background.

✨ Tech stack:

Frontend: React/TypeScript + Bootstrap

Backend: Java + Spring Boot + H2 Database +Maven

CORS Ready: Supports localhost ports 3000–3003

📁 Project Structure
weekly-todo/
├── weekly-todo-backend/     # Spring Boot API & database
├── weekly-todo-frontend/    # React frontend
└── README.md               

🚀 Getting Started
1️⃣ Backend (Spring Boot)
📂 Go into the backend folder:

cd weekly-todo-backend
./mvnw spring-boot:run

Or on Windows:
mvnw spring-boot:run

Runs at: http://localhost:8080

H2 Console: http://localhost:8080/h2-console

👉 CORS allows access from:
http://localhost:3000, 3001, 3002, 3003

2️⃣ Frontend (React)
📂 Go into the frontend folder:

cd weekly-todo-frontend
npm install
npm start

Runs at: http://localhost:3000

🛢 H2 Database (in-memory)
URL: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

Username: sa

Password: (leave blank)

🎨 Features
Weekly layout with separate columns per day

Drag and drop tasks between days

Mark tasks as completed

Add new tasks through a form

🌐 CORS Configuration (Backend)
Configured in CorsConfig.java to allow requests from:


.allowedOrigins(
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003"
)

You can update this for production domains later.

📚 License
MIT – Free to use, fork, and modify.

👨‍💻 Author
Tuan Minh Do

Passionate about clean UI, backend APIs, and fullstack development
