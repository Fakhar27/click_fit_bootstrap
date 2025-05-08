const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clickfit_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                ID INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
                password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
                type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
                active TINYINT default 1,
                PRIMARY KEY (ID)
            )
        `;

        db.query(createTableQuery, (error) => {
            if (error) {
                console.error('Error creating users table:', error);
            } else {
                console.log('Users table created or already exists');

                const createProcedureQuery = `
                    DROP PROCEDURE IF EXISTS addUser;
                    CREATE PROCEDURE addUser(
                        IN p_email VARCHAR(255),
                        IN p_password VARCHAR(255),
                        IN p_type VARCHAR(255)
                    )
                    BEGIN
                        INSERT INTO users (email, password, type, active) 
                        VALUES (p_email, p_password, p_type, 1);
                    END
                `;

                db.query(createProcedureQuery, (procError) => {
                    if (procError) {
                        console.error('Error creating stored procedure:', procError);
                    } else {
                        console.log('Stored procedure created');

                        const callProcedureQuery = `CALL addUser('test@example.com', 'password123', 'admin')`;

                        db.query(callProcedureQuery, (callError) => {
                            if (callError) {
                                console.error('Error calling stored procedure:', callError);
                            } else {
                                console.log('Test user added successfully');
                            }
                        });
                    }
                });
            }
        });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.files) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadDir = path.join(__dirname, 'upload_images');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    let files = req.files.files;
    if (!Array.isArray(files)) {
        files = [files];
    }

    const uploadedFiles = [];
    const errors = [];

    files.forEach(file => {
        if (!file.name.toLowerCase().endsWith('.jpg')) {
            errors.push(`${file.name} is not a JPG file. Only JPG files are allowed.`);
            return;
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '.jpg';
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, file.data);
        uploadedFiles.push({
            filename: filename,
            originalName: file.name,
            size: file.size
        });
    });

    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: 'Some files were not processed',
            errors: errors,
            uploadedFiles: uploadedFiles
        });
    } else {
        res.json({
            success: true,
            message: 'All files uploaded successfully',
            files: uploadedFiles
        });
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

