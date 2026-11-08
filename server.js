require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Render sets PORT for us; fall back to 3001 when running locally
const PORT = process.env.PORT || 3001;

//lets the react site on github pages read from this server
app.use(cors());

//serves the api page (public/index.html) and the course images
app.use(express.static("public"));

const courses = [
  {
    _id: 1,
    title: "Budgeting Fundamentals",
    category: "Budgeting",
    instructor: "Sarah Miller, CFP",
    duration: "2h 30m",
    lessons: 12,
    level: "Beginner",
    description: "Build a monthly budget you can actually stick to using the 50/30/20 method.",
    img_name: "images/course-budgeting.svg",
    link: "/course",
  },
  {
    _id: 2,
    title: "Stock Market Basics",
    category: "Investing",
    instructor: "David Chen, Portfolio Lead",
    duration: "3h 45m",
    lessons: 16,
    level: "Beginner",
    description: "Learn how stocks work, how prices move, and how to buy your first share with confidence.",
    img_name: "images/course-investing.svg",
    link: "/pricing",
  },
  {
    _id: 3,
    title: "Credit Score Mastery",
    category: "Debt",
    instructor: "James Holloway, Analyst",
    duration: "1h 15m",
    lessons: 8,
    level: "Beginner",
    description: "Understand what goes into your credit score and the habits that raise it fastest.",
    img_name: "images/course-credit.svg",
    link: "/pricing",
  },
  {
    _id: 4,
    title: "Retirement Planning 101",
    category: "Retirement",
    instructor: "Elena Rostova, Advisor",
    duration: "3h 10m",
    lessons: 14,
    level: "Intermediate",
    description: "Compare 401(k)s and IRAs and figure out how much you need to save to retire comfortably.",
    img_name: "images/course-retirement.svg",
    link: "/pricing",
  },
  {
    _id: 5,
    title: "Tax Strategy Simplified",
    category: "Taxes",
    instructor: "Mark Torres, CPA",
    duration: "2h 20m",
    lessons: 10,
    level: "Intermediate",
    description: "Decode tax brackets, deductions, and credits so you keep more of every paycheck.",
    img_name: "images/course-taxes.svg",
    link: "/pricing",
  },
  {
    _id: 6,
    title: "Emergency Fund Blueprint",
    category: "Budgeting",
    instructor: "Sarah Miller, CFP",
    duration: "1h 00m",
    lessons: 6,
    level: "Beginner",
    description: "Set a savings target and build a cash cushion that protects you from surprise expenses.",
    img_name: "images/course-emergency.svg",
    link: "/pricing",
  },
  {
    _id: 7,
    title: "Debt Payoff Strategies",
    category: "Debt",
    instructor: "James Holloway, Analyst",
    duration: "2h 05m",
    lessons: 9,
    level: "Intermediate",
    description: "Compare the snowball and avalanche methods and build a plan to become debt free.",
    img_name: "images/course-debt.svg",
    link: "/pricing",
  },
  {
    _id: 8,
    title: "Index Fund Investing",
    category: "Investing",
    instructor: "David Chen, Portfolio Lead",
    duration: "2h 40m",
    lessons: 11,
    level: "Intermediate",
    description: "Discover why low-cost index funds beat most active investors and how to start with any amount.",
    img_name: "images/course-index-funds.svg",
    link: "/pricing",
  },
  {
    _id: 9,
    title: "Paying for College",
    category: "Budgeting",
    instructor: "Elena Rostova, Advisor",
    duration: "1h 50m",
    lessons: 8,
    level: "Beginner",
    description: "Navigate FAFSA, scholarships, and 529 plans to keep student loans to a minimum.",
    img_name: "images/course-college.svg",
    link: "/pricing",
  },
];

app.get("/api/courses", (req, res) => {
  res.json(courses);
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
