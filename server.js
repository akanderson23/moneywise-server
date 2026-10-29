require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Render sets PORT for us; fall back to 3001 when running locally
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World from the MoneyWise server!");
});

app.listen(PORT, () => {
  console.log(`MoneyWise server listening on port ${PORT}`);
});

//the Atlas connection string lives in .env locally and in Render's environment settings
//testdb is name of database, it will automatically make it
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "testdb" })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
}

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

//catch the error so a failed save doesn't crash the whole server
createMessage().catch((err) => console.error("could not save message...", err));
