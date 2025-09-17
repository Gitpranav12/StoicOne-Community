const express = require("express");
const pool = require("../db.js");
const bcrypt = require("bcryptjs");
const router = express.Router();

// 🔹 1. Get full user profile (with stats, activity, achievements)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length === 0) return res.status(404).json({ error: "User not found" });

        // Questions
        const [questions] = await pool.query("SELECT * FROM questions WHERE user_id = ?", [id]);

        // Answers authored by this user
        const [answers] = await pool.query(
            `SELECT a.*, q.title AS questionTitle
            FROM answers a
            JOIN questions q ON a.question_id = q.id
            WHERE a.user_id = ?`,
            [id]
        );

        // Tags
        const [tags] = await pool.query("SELECT * FROM tags WHERE user_id = ?", [id]);

        // Reputation
        const [reputation] = await pool.query("SELECT * FROM reputation WHERE user_id = ?", [id]);

        // Badges
        const [badges] = await pool.query("SELECT * FROM badges WHERE user_id = ?", [id]);

        // Milestones
        const [milestones] = await pool.query("SELECT * FROM milestones WHERE user_id = ?", [id]);

        // Stats with safe defaults
        const stats = {
            reputation: reputation?.length || 0,
            badges: badges?.length || 0,
            questions: questions?.length || 0,
            answers: answers?.length || 0,
            contribution: (questions?.length || 0) + (answers?.length || 0),
        };

        res.json({
            profile: {
                id: user[0]?.id || null,
                name: user[0]?.name || "Unnamed User",
                avatar: user[0]?.avatar || null,
                designation: user[0]?.designation || "",
                bio: user[0]?.bio || "",
                department: user[0]?.department || "",
                score: user[0]?.score || 0,
            },
            account: { email: user[0]?.email || "" },
            stats: stats || {},
            activity: {
                questions: questions || [],
                answers: answers || [],
                tags: tags || [],
                reputation: reputation || [],
            },
            achievements: {
                badges: badges || [],
                milestones: milestones || [],
            },
        });
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 2. Update profile
router.put("/:id/profile", async (req, res) => {
    const userId = req.params.id;
    const { name, designation, bio, department, email } = req.body;

    try {
        await pool.query(
            "UPDATE users SET name=?, designation=?, bio=?, department=?, email=? WHERE id=?",
            [name, designation, bio, department, email, userId]
        );
        res.json({ name, designation, bio, department, email });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// 🔹 3. Update account (password)
router.put("/:id/account", async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    try {
        // 1️⃣ Fetch user hashed password
        const [rows] = await pool.query("SELECT password FROM users WHERE id=?", [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedHash = rows[0].password;

        // 2️⃣ Compare current password with hash
        const isMatch = await bcrypt.compare(currentPassword, storedHash);
        if (!isMatch) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        // 3️⃣ Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 4️⃣ Update password in DB
        await pool.query("UPDATE users SET password=? WHERE id=?", [hashedPassword, userId]);

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error updating account:", err);
        res.status(500).json({ error: "Failed to update account" });
    }
});

// 🔹 4. Delete user + associated data
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        await pool.query("DELETE FROM answers WHERE user_id=?", [userId]);
        await pool.query("DELETE FROM questions WHERE user_id=?", [userId]);
        await pool.query("DELETE FROM tags WHERE user_id=?", [userId]);
        await pool.query("DELETE FROM reputation WHERE user_id=?", [userId]);
        await pool.query("DELETE FROM badges WHERE user_id=?", [userId]);
        await pool.query("DELETE FROM milestones WHERE user_id=?", [userId]);

        const [result] = await pool.query("DELETE FROM users WHERE id=?", [userId]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User and all associated data deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;
