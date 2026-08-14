# Service Provider Registry API & Web Dashboard

A robust, modern backend API and responsive dashboard built using **Node.js + Fastify + PostgreSQL** and integrated with **Neon Database** (or your own SQL database).

---

## Getting Started

### 1. Clone the Repository
Clone the repository using Git and navigate into the project folder:
```bash
git clone https://github.com/Jaswanth0811/Backend-Test.git
cd Backend-Test
```

### 2. Install Dependencies
Install all required Node modules:
```bash
npm install
```

---

## Database Configuration (Using Your Own SQL Database)

By default, the application is pre-configured to connect to a Neon cloud PostgreSQL database. To use **your own local or cloud SQL/PostgreSQL database**, follow these steps:

### A. Create a `.env` File
Create a new file named `.env` in the root of the project:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name?sslmode=require
```
*(Replace `username`, `password`, `host`, `port`, and `database_name` with your own PostgreSQL details. If your local DB doesn't require SSL, you can remove `?sslmode=require`).*

### B. Run the Database Setup Script
Use the setup script to construct the `service_providers` table inside your database. 

**Using Node.js 20.6.0+ (reads `.env` automatically):**
```bash
node --env-file=.env db-setup.js
```

**Alternative (setting environment variable manually):**
- **Linux/macOS:**
  ```bash
  DATABASE_URL="your_connection_string" node db-setup.js
  ```
- **Windows PowerShell:**
  ```powershell
  $env:DATABASE_URL="your_connection_string"
  node db-setup.js
  ```

---

## Running the Server

Start the Fastify API server:

**Option 1: Using your own database (configured in `.env`):**
```bash
node --env-file=.env server.js
```

**Option 2: Using the default Neon database:**
```bash
node server.js
```

*Once started, you will see the message: `Server running on port 3000`.*

---

## Testing the APIs

You can test the APIs in multiple ways:

### Method A: Using Google Chrome (Interactive UI)
1. Open **Google Chrome**.
2. Navigate to **`http://localhost:3000`**.
3. You will see the **MonoApp Registry** dashboard. Fill out the form on the left to register a provider and see the directory list on the right update in real-time.

### Method B: Running the Automated Test Script
Open a second terminal window (while the server is running) and execute:

**Option 1: Test with your own database (configured in `.env`):**
```bash
node --env-file=.env test-api.js
```

**Option 2: Test with the default Neon database:**
```bash
node test-api.js
```

### Method C: Manual Testing in Google Chrome
Enter these URLs in the Chrome address bar to request database records:
- **List All Providers:** Open `http://localhost:3000/api/providers`
- **List Provider by ID:** Open `http://localhost:3000/api/providers/1`
- **Register via Chrome Console:** Press `F12`, select the **Console** tab, and run:
  ```javascript
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bruce Wayne', phone: '555-0192', skill: 'Electrician', city: 'Gotham' })
  }).then(res => res.json()).then(console.log);
  ```
