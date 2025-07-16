# 🔧 Interview Prep Tracker – Backend

This is the **Spring Boot** backend service for the Interview Prep Tracker project. It provides RESTful APIs to manage interview questions, track progress by status, category, difficulty, and company, and serve data for analytics on the frontend.

---

## 🔗 Related Repositories

- 🖥️ **Frontend (React + TypeScript)**: [interview-prep-tracker](https://github.com/vtaunk1932/Interview-prep-tracker)

---

## 🚀 Features

- ✅ REST APIs for managing topics and company-specific questions
- 📊 Aggregated statistics by:
  - Status (Not Started, In Progress, Completed)
  - Category (DSA, System Design, etc.)
  - Difficulty (Easy, Medium, Hard)
  - Company-wise breakdown (Bar chart)
  - Company-wise progress (Progress bars)
- 🧠 Supports both default and user-added questions
- 🔐 CORS configured for cross-origin requests from frontend
- 🔄 Docker & PostgreSQL compatible setup

---

## 🧰 Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Language     | Java 17           |
| Framework    | Spring Boot 3     |
| DB           | MySql      |
| ORM          | Spring Data JPA   |
| Build Tool   | Maven             |
| Dev Tools    | Spring Boot DevTools |

---

## 📂 Folder Structure
interview-prep-tracker-backend/
├── src/
│ ├── controller/
│ ├── service/
│ ├── model/
│ ├── repository/
│ ├── dto/
│ └── InterviewPrepApplication.java
├── pom.xml
└── README.md
.

📡 API Endpoints
| Endpoint                      | Method | Description                             |
| ----------------------------- | ------ | --------------------------------------- |
| `/api/stats/status`           | GET    | Get counts by question status           |
| `/api/stats/category`         | GET    | Get counts by category                  |
| `/api/stats/difficulty`       | GET    | Get counts by difficulty                |
| `/api/stats/company`          | GET    | Get total questions per company         |
| `/api/stats/company-progress` | GET    | Get completed vs total company progress |



📬 Contact Vasu Taunk
🔗 GitHub: vtaunk1932
📫 Email: vasutaunk1932@gmail.com

⭐ Star This Project
If you found this backend useful for your learning or portfolio, consider giving it a ⭐ on GitHub!


