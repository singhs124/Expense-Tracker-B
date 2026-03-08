<div align="center">
  <h1>📱 Expense Tracker - Android Mobile App</h1>
  <p>The sleek and interactive mobile interface for the Expense Tracker Application.</p>
</div>

---

## 📖 Overview

This directory contains the **React Native** frontend for the Expense Tracker. It provides a rich user experience with smooth navigation, secure token storage, and beautiful data visualizations to help users track their monthly spending on the go.

---

## 🛠️ Built With

- **[React Native](https://reactnative.dev/)** (v0.81.4)
- **[React Navigation](https://reactnavigation.org/)** (v7)
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** - Material Design Components
- **[Gifted Charts](https://gifted-charts.web.app/) & [Chart Kit](https://github.com/indiespirit/react-native-chart-kit)** - Beautiful data visualization
- **[React Native Keychain](https://github.com/oblador/react-native-keychain)** - Secure token and credential storage
- **[Async Storage](https://react-native-async-storage.github.io/async-storage/)** - Local data caching

---

## 🚀 Getting Started

Follow these instructions to run the application on your local development machine.

### Prerequisites

- **Node.js** (v20 or newer recommended)
- **npm** or **Yarn**
- **React Native CLI environment setup:**
    - For Android: Android Studio & Android SDK

  *If you haven't set up a React Native environment yet, please follow the [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup).*

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd react-native
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
---

## 🏃‍♂️ Running the App

### Start the Metro Bundler
First, you need to start Metro, the JavaScript bundler that ships with React Native.
```bash
npm start
```

### Run on Android
Open a new terminal window, navigate to the `react-native` folder, and run:
```bash
npm run android
```
---

## 🔌 Connecting to the Backend

By default, the Mobile App will attempt to connect to your local backend API.
Ensure that your backend (Spring Boot) is currently running.

> **Important Note for Android Emulators:**  
> If you are running the app on an Android Emulator and your backend is on `localhost`, you may need to point your API configuration to `10.0.2.2:8080` instead of `localhost:8080`, as Android Emulators use `10.0.2.2` to refer to the host machine. Update server IP in `frontend/src/config.js` in place of `<localhost>`

---

<div align="center">
  <i>Stay on top of your budget! 💰</i>
</div>
