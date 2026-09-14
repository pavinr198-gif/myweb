const express = require("express");
const cors=require('cors')
require("dotenv").config();
const connectDB = require("./connection");

const userRoutes = require("./routes/UserRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Database Connection
connectDB();

// Routes
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Student Backend Server Running...");
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});