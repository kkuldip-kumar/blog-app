import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/database.js";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/Auth.routes.js";
import userRoutes from "./routes/User.routes.js";
import blogRoutes from "./routes/Blog.routes.js";

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
connectDatabase();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get("host")}`;
  next();
});

app.get("/", (req, res) => {
  res.send(`server is  now live ! ${req.baseUrl}`);
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
