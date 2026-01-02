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
// Update a note
router.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const sql = "UPDATE notes SET title = ?, content = ? WHERE id = ?";

  db.query(sql, [title, content, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note updated successfully" });
  });
});
// Delete a note
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  });
});

module.exports = router;
