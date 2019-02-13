const express = require("express");
const path = require("path");

const { fetchData } = require("./script");
const PORT = process.env.PORT || 8080;

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

app.use(
  "/static",
  express.static(path.join(__dirname, "client", "build", "static"))
);

app.use((req, res, next) => {
  if (!req.route) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  }
});

app.listen(PORT, () => console.log(`gitvain is running on port ${PORT}`));
