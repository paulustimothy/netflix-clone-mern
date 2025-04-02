import express from "express";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import mediaRoutes from "./routes/media.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json({limit: "5mb"})); // req.body
app.use(express.urlencoded({extended: true})); // to parse form data

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/media", mediaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});


    