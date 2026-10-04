const express = require("express");
const app = express();

// Render sets PORT for us; fall back to 3001 when running locally
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World from the MoneyWise server!");
});

app.listen(PORT, () => {
  console.log(`MoneyWise server listening on port ${PORT}`);
});
