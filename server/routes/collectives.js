const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection

// GET /api/collectives
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, members, description, icon FROM collectives");
    res.json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
