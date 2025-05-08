Tech Stack

Frontend: HTML5, CSS3, JavaScript, Bootstrap 5
Backend: Node.js, Express.js
Database: MySQL
File Handling: express-fileupload
External API: NumbersAPI integration

Features
UI Components

Responsive Navbar: Fixed-top navigation with Bootstrap's collapsible navbar
Hero Section: Full-screen video background with overlay and centered content
Bootstrap Cards: Service listings with hover effects and responsive layout
Smooth Scrolling: jQuery-based smooth scroll for in-page navigation
Animations: AOS (Animate On Scroll) integration for scroll-triggered animations
Image Upload: Drag-and-drop file upload with visual feedback

Backend Features

MySQL Integration: User data storage with database initialization
File Upload System: Secure JPG image storage in dedicated upload directory
API Integration: Dynamic content fetching from NumbersAPI
SPA Routing: Express configuration for single-page application support

Installation & Setup
Option 1: Standard Setup

Clone the repository:
bashgit clone https://github.com/yourusername/clickFit.git
cd clickFit

Install dependencies:
bashnpm install

Configure MySQL:

Ensure MySQL is installed and running on port 3306
Open server.js and modify database credentials if needed:
javascriptconst db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clickfit_db'
});



Run the application:
bashnode server.js

Access the application at http://localhost:3000

Option 2: Docker Setup

Clone the repository:
bashgit clone https://github.com/yourusername/clickFit.git
cd clickFit

Run with Docker Compose:
bashdocker-compose up -d

Access the application at http://localhost:3000

This Docker approach automatically sets up both the application and MySQL database without requiring any local installations.
Key Files

server.js: Main Express application with API endpoints and DB initialization
public/index.html: Single-page application markup with Bootstrap components
public/css/styles.css: Custom styling and responsive design rules
public/js/script.js: Frontend logic, API calls, and upload handling

Implementation Details
Bootstrap Components

Navbar: .navbar-expand-lg with .fixed-top positioning
Containers: Responsive .container wrappers for consistent content padding
Flex Utilities: .d-flex with .flex-column / .flex-lg-row for responsive layouts
Cards: .card components for service presentation with interactive hover states
Animations: Data-AOS attributes for scroll-triggered reveal animations

Express File Uploader
The application implements a secure file upload system:
javascriptapp.post('/upload', (req, res) => {
    // File validation, storage and response handling
    // Files are stored in ./upload_images directory
});
External API Integration
The application fetches historical facts using the NumbersAPI:
javascriptfunction fetchNumbersApiData() {
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        // Process and display response
    });
}
