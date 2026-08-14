# Service Provider Registry API & Web Dashboard

A robust, modern backend API and responsive dashboard built using **Node.js + Fastify + PostgreSQL** and integrated with **Neon Database**.

## Features
- **Interactive UI:** A sleek, responsive dashboard built with dark mode and glassmorphic aesthetics.
- **Service Registration (`POST /api/register`):** Register plumbers, electricians, painters, etc., and save them to the cloud database.
- **Provider Directory (`GET /api/providers`):** Fetch the full list of registered providers.
- **Specific Lookup (`GET /api/providers/:id`):** Look up individual provider details by their database ID with fallback error handling.

---

## Setup & Running the Server

### 1. Install Dependencies
Navigate to the directory and install all required modules:
```bash
npm install
```

### 2. Set Up Database Schema
Run the database setup script to automatically construct the `service_providers` table inside Neon PostgreSQL:
```bash
node db-setup.js
```

### 3. Start the Server
Run the Fastify server:
```bash
node server.js
```
*You will see the console log: `Server running on port 3000`.*

---

## How to Run & Use Using Google Chrome

### Method A: Using the Web Dashboard (Visual UI)
1. Ensure your server is running (`node server.js`).
2. Open **Google Chrome**.
3. Navigate to **`http://localhost:3000`**.
4. You will see the **MonoApp Registry** dashboard:
   - **Left Panel:** Enter a name, phone, skill, and city, and click **Submit Registration**.
   - **Right Panel:** Watch the live directory list update automatically in real-time as providers are added to the database.

### Method B: Querying API Endpoints Directly in Chrome
You can query the `GET` endpoints directly in the Chrome search bar:
- **List All Providers:** Open `http://localhost:3000/api/providers`
- **List Provider by ID:** Open `http://localhost:3000/api/providers/1`

### Method C: Testing POST Requests using Chrome DevTools
If you want to test the `POST /api/register` endpoint without filling out the form, you can do so in the Chrome Console:
1. Navigate to `http://localhost:3000` in Google Chrome.
2. Press **`F12`** (or right-click anywhere and select **Inspect**), then click the **Console** tab.
3. Paste the following JavaScript code and press **Enter**:
   ```javascript
   fetch('/api/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'Peter Parker',
       phone: '555-0182',
       skill: 'Electrician',
       city: 'Queens'
     })
   })
   .then(res => res.json())
   .then(data => console.log('Response:', data))
   .catch(err => console.error('Error:', err));
   ```
4. You will see the response returned by Fastify logged directly in the console.
