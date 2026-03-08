<div align="center">
  <h1>💸 Expense Tracker Application</h1>
  <p>A comprehensive full-stack solution to track and manage your monthly expenses efficiently.</p>
</div>

---

## 📖 Overview

The Expense Tracker application helps users easily log their daily expenses, view spending habits through beautiful charts, and maintain their financial health. This repository contains both the **Backend API** and the **Mobile Frontend**.

- **Backend:** Java 17 & Spring Boot (Located in the root directory)
- **Frontend:** React Native Mobile App (Located in the `frontend` directory)

---

## 🛠️ Tech Stack

### ⚙️ Backend (Spring Boot)
- **Java 17** & **Spring Boot 3.5.x**
- **Spring Data JPA & Hibernate** - Database ORM
- **PostgreSQL** - Primary Database
- **Spring Security & JWT** - Secure Authentication
- **Maven** - Dependency Management

### 📱 Frontend (React Native)
- **React Native 0.81.4**
- **React Navigation** - Smooth App Navigation
- **React Native Gifted Charts** - Stunning Data Visualizations
- **Secure Storage** - Keychain & Async Storage

---

## 🚀 Getting Started (Backend)

Follow these instructions to set up and run the backend server locally.

### Prerequisites
- [Java Development Kit (JDK) 17](https://jdk.java.net/17/)
- [PostgreSQL](https://www.postgresql.org/download/) installed and running
- [Maven](https://maven.apache.org/) (Optional, as `mvnw` wrapper is included)

### Database Setup
1. Open your PostgreSQL terminal (psql) or pgAdmin.
2. Create a database for the application (default name is usually configured in `application.properties/yml`).
   ```sql
   CREATE DATABASE expense_tracker;
   ```
3. Update your `src/main/resources/application.properties` with your PostgreSQL username and password.

### Running the Application

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd expenses
   ```

2. **Run the backend using the Maven wrapper**:
   
   *On Windows:*
   ```cmd
   .\mvnw spring-boot:run
   ```
   
   *On Mac/Linux:*
   ```bash
   ./mvnw spring-boot:run
   ```

The server will start on `http://localhost:8080` (or whichever port is specified in your properties file).

---

## 📱 Frontend Instructions

The mobile application codebase is located in the `react-native` folder. Please refer to the [Frontend README.md](./frontend/README.md) for detailed instructions on how to set up and run the mobile app on Android or iOS simulators.

---

## ✨ Features

- **User Authentication:** Secure Sign Up and Login using JWT.
- **Add Transactions:** Log expenses and incomes quickly.
- **Categorization:** Classify your spending into different categories.
- **Analytics & Insights:** Visualize your spending habits through interactive charts.
- **Secure Data:** All user data is securely stored and managed.

---
<div align="center">
  <i>Developed with ❤️ to help you achieve your financial goals.</i>
</div>
