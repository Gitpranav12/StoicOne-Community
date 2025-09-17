const router = require("express").Router();
const passport = require("passport");
const db = require("../db.js"); // your MySQL connection
const bcrypt = require("bcryptjs"); // optional, in case you want to hash any passwords

// --- Login success ---
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

// --- Login failed ---
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
});

// --- Google Login ---
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// --- Google callback ---
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
    async (req, res) => {
        try {
            const profile = req.user; // Passport stores profile here

            // check if user already exists in DB
            const [existing] = await db.query(
                "SELECT * FROM users WHERE google_id = ?", [profile.id]
            );

            let userId;

            if (existing.length === 0) {
                // insert new Google user into DB
                const result = await db.query(
                    "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)", [profile.displayName, profile.emails[0].value, profile.id]
                );
                userId = result[0].insertId;
            } else {
                userId = existing[0].id;
            }

            // Optionally: set a cookie or JWT for frontend auth
            // Example: res.cookie("userId", userId, { httpOnly: true });

            // Redirect to frontend dashboard
            res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        } catch (err) {
            console.error("Google login error:", err);
            res.redirect("/auth/login/failed");
        }
    }
);

// --- Logout ---
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(process.env.CLIENT_URL);
    });
});

module.exports = router;