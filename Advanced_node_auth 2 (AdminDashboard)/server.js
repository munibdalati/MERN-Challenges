require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const UserModel = require("./models/User");

// Connect DB

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

const user = require("./models/User");

// Retrieve all data from the database
app.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving users from the database" });
  }
});

//create a new user
app.post("/createUser", async (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

//find the user
app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

//get the user
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//edit the user data
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//deleting a user from the database
app.delete("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await user.deleteOne({ _id: userid }),
      res.json({ status: "ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", data: "Error Deleting user" });
  }
});

// Error Handler should be last piece of middleware

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server runnig on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

//to start server (backend) just type "npm run server" on the terminal
//be sure to connect to MongoDB in config.env (MONGO_URI)
