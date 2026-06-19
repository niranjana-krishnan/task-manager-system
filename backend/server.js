const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());
const User = require("./models/User");
mongoose
  .connect(process.env.MONGO_URI)
  
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Working");
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    app.get("/register", (req, res) => {
  res.send("This is the registration endpoint. Use POST to register.");
});


    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({
  message: "Login Successful",
  token,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      dueDate,
      assignedTo
    } = req.body;

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      assignedTo
    });

    await task.save();

    res.status(201).json({
      message: "Task Created Successfully",
      task
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Task Updated",
      task: updatedTask
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});