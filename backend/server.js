const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//this is for testing route
app.get("/", (req, res) => {
  res.send("TalkItOut backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
