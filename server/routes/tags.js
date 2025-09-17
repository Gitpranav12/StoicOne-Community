// routes/tags.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/tags?search=&sort=&page=&limit=
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const sort = req.query.sort || "popular"; // popular = questions_count
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // Build SQL
    let orderBy = "questions_count DESC";
    if (sort === "name") orderBy = "name ASC";

    const sql = `
      SELECT id, name, description, questions_count, questions_today, questions_week
      FROM tags
      WHERE name LIKE ?
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(sql, [`%${search}%`, limit, offset]);

    // Count total for pagination
    const [countResult] = await db.query(
      "SELECT COUNT(*) as total FROM tags WHERE name LIKE ?",
      [`%${search}%`]
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      data: rows,
      page,
      totalPages,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/tags/all → return all tag names (for AskQuestionPage autocomplete)
router.get("/all", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT name FROM tags ORDER BY name ASC"
    );
    res.json(rows.map((r) => r.name)); // just return array of names
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});





module.exports = router;
