// routes/auth.js
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs"); // 👈 add this
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const router = express.Router();


router.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        console.log("Incoming signup:", name, email); // 👀

        // check if user exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        console.log("Existing:", existing);

        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Signup error:", err); // 👀 print full error
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// --- LOGIN ---
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // sign JWT
        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
 

module.exports = router;