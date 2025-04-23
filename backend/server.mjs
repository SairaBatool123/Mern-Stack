import express from "express";
import mongoose from "./db/db.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import cors from "cors";

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
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// // Server Static Handling 
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "build")));


app.use(express.json());
const port = process.env.PORT || 8080;
app.use("/auth",userRoutes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
