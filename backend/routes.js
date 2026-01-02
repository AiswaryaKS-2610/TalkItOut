const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

router.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
// Create a new note
router.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";

  db.query(sql, [title, content], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Note created successfully",
      noteId: result.insertId,
    });
  });
});

module.exports = router;
