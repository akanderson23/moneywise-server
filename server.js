require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");
const app = express();

// Render sets PORT for us; fall back to 3001 when running locally
const PORT = process.env.PORT || 3001;

//lets the react site on github pages read from this server
app.use(cors());

//reads the json body sent by the add course form
app.use(express.json());

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
  },
];

//each new course gets the picture for its category
const categoryImages = {
  Budgeting: "images/course-budgeting.svg",
  Investing: "images/course-investing.svg",
  Debt: "images/course-debt.svg",
  Retirement: "images/course-retirement.svg",
  Taxes: "images/course-taxes.svg",
};

//these rules match the client side checks in the react AddCourseForm
const validateCourse = (course) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(60).required(),
    category: Joi.string().valid(...Object.keys(categoryImages)).required(),
    instructor: Joi.string().trim().min(3).max(60).required(),
    duration: Joi.string()
      .trim()
      .pattern(/^\d{1,2}h [0-5]\dm$/)
      .required()
      .messages({ "string.pattern.base": '"duration" must look like 2h 30m' }),
    lessons: Joi.number().integer().min(1).max(50).required(),
    level: Joi.string().valid("Beginner", "Intermediate", "Advanced").required(),
    description: Joi.string().trim().min(10).max(200).required(),
  });

  return schema.validate(course);
};

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send({ success: false, message: result.error.details[0].message });
    return;
  }

  //start at 1 if every course has been deleted
  const course = {
    _id: courses.reduce((max, c) => Math.max(max, c._id), 0) + 1,
    ...result.value,
    img_name: categoryImages[result.value.category],
  };

  courses.push(course);
  res.status(200).send({ success: true, course });
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c._id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send({ success: false, message: "That course could not be found." });
    return;
  }

  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send({ success: false, message: result.error.details[0].message });
    return;
  }

  //keep the same _id, but update the picture in case the category changed
  Object.assign(course, result.value, { img_name: categoryImages[result.value.category] });
  res.status(200).send({ success: true, course });
});

app.delete("/api/courses/:id", (req, res) => {
  const index = courses.findIndex((c) => c._id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send({ success: false, message: "That course could not be found." });
    return;
  }

  const [course] = courses.splice(index, 1);
  res.status(200).send({ success: true, course });
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
