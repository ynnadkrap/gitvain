const express = require("express");

const { fetchData } = require("./script");
const PORT = process.env.PORT || 3000;

var app = express();

app.get("/stats", async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const stats = await fetchData(date);
    res.json(stats);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(PORT, () => console.log(`gitvain is running on port ${PORT}`));
