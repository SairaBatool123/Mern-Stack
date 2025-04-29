import express from "express";
import mongoose from "./db/db.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import taskRoutes from "./routes/taskRoutes.mjs"
import cors from "cors";
// import { TaskModel } from "./schema/taskSchema.mjs";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      // give access to frontend without /
      "https://mern-rho-lemon.vercel.app",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "userid"],
  })
);

// // Server Static Handling
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "build")));


// API MAKING
// app.post("/createTask", (req, res) => {
//   TaskModel.create(req.body)
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.get("/", (req, res) => {
//   TaskModel.find({})
//     .then((users) => res.json(users))
//     .catch((error) => res.json(error));
// });

// app.get("/getTask/:id", (req, res) => {
//   const { id } = req.params;
//   TaskModel.findById({ _id: id })
//     .then((users) => res.json(users))
//     .catch((error) => res.json(error));
// });

// // update
// app.put("/updateTask/:id", (req, res) => {
//   const { id } = req.params;
//   TaskModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       name: req.body.name,
//       email: req.body.email,
//       age: req.body.age,
//     }
//   )
//     .then((users) => res.json(users))
//     .catch((error) => res.json(error));
// });

// // delete
// app.delete("/deleteTask/:id", (req, res) => {
//   const { id } = req.params;
//   TaskModel.findByIdAndDelete({ _id: id })
//     .then((res) => res.json(res))
//     .catch((error) => res.json(error));
// });


app.use(express.json());
const port = process.env.PORT || 8080;
app.use("/auth", userRoutes)
app.use("/task", taskRoutes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
