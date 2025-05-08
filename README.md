## 🛠️ Tech Stack

**Frontend:**
* HTML5
* CSS3
* JavaScript (ES6+)
* Bootstrap 5

**Backend:**
* Node.js
* Express.js

**Database:**
* MySQL

**File Handling:**
* `express-fileupload`

**External APIs:**
* NumbersAPI

---

## ✨ Features

### Frontend
* **Responsive Navbar:** A fixed-top, collapsible navigation bar powered by Bootstrap.
* **Hero Section:** Engaging full-screen video background with a content overlay.
* **Bootstrap Cards:** Interactive service listings with hover effects, designed for responsiveness.
* **Smooth Scrolling:** jQuery-enhanced in-page navigation.
* **Animations:** Scroll-triggered animations using AOS (Animate On Scroll).
* **Image Upload:** User-friendly drag-and-drop file upload interface with visual feedback.

### Backend
* **MySQL Integration:** Robust storage for user data with database initialization scripts.
* **Secure File Upload:** System for storing JPG images in a dedicated `upload_images` directory.
* **NumbersAPI Integration:** Fetches dynamic historical facts to enrich content.
* **SPA Routing:** Configured Express.js to support a single-page application architecture.

---

## 🚀 Installation & Setup

You can get ClickFit running on your local machine using one of the following methods:

### Option 1: Standard Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/yourusername/clickFit.git](https://github.com/yourusername/clickFit.git)
    cd clickFit
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure MySQL:**
    * Ensure MySQL is installed and running (default port: `3306`).
    * Update database credentials in `server.js` if necessary:
        ```javascript
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'your_mysql_user', // Default: 'root'
            password: 'your_mysql_password', // Default: 'root'
            database: 'clickfit_db'
        });
        ```
4.  **Run the Application:**
    ```bash
    node server.js
    ```
5.  **Access:** Open your browser and navigate to `http://localhost:3000`.

### Option 2: Docker Setup 🐳

This method uses Docker Compose to set up the application and MySQL database automatically, without requiring local installations of Node.js or MySQL.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/yourusername/clickFit.git](https://github.com/yourusername/clickFit.git)
    cd clickFit
    ```
2.  **Run with Docker Compose:**
    ```bash
    docker-compose up -d
    ```
3.  **Access:** Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Key Files

* `server.js`: The core Express application, handling API endpoints, database initialization, and middleware.
* `public/index.html`: The main HTML structure for the single-page application, incorporating Bootstrap components.
* `public/css/styles.css`: Custom CSS rules for styling and responsive design.
* `public/js/script.js`: Frontend JavaScript for DOM manipulation, API interactions, and file upload logic.

---

## 💡 Implementation Highlights

### Bootstrap Components
* **Navbar:** Utilizes `.navbar-expand-lg` and `.fixed-top` for a responsive and sticky navigation.
* **Containers:** Employs `.container` for consistent content padding and alignment.
* **Flex Utilities:** Leverages `.d-flex`, `.flex-column`, and `.flex-lg-row` for adaptable layouts.
* **Cards:** Uses `.card` components for presenting services with interactive hover states.
* **Animations:** Integrates `data-aos` attributes for engaging scroll-triggered animations.

### Express File Uploader
The application features a secure endpoint for file uploads:
```javascript
// POST /upload
app.post('/upload', (req, res) => {
    // Handles file validation, storage in './upload_images', and response.
});
