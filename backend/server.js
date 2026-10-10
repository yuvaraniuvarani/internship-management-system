
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Backend status
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Internship Management System Running Successfully"
    });
});

// Internship list
app.get("/api/internships", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Web Development Intern",
            company: "IBM",
            duration: "3 Months"
        },
        {
            id: 2,
            title: "Software Development Intern",
            company: "IBM",
            duration: "6 Months"
        },
        {
            id: 3,
            title: "Data Analytics Intern",
            company: "IBM",
            duration: "3 Months"
        }
    ]);
});

// Internship application
app.post("/api/applications", (req, res) => {
    const { name, email, internship } = req.body;

    if (!name || !email || !internship) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    console.log("Application received:", {
        name,
        email,
        internship
    });

    res.status(201).json({
        success: true,
        message: "Application submitted successfully"
    });
});

// Login demonstration
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    res.json({
        success: true,
        message: "Login API working"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});

