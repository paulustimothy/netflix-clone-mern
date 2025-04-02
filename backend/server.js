import express from "express";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import { protectRoute } from "./middleware/protectRoute.js";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import mediaRoutes from "./routes/media.route.js";
import searchRoutes from "./routes/search.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json({limit: "5mb"})); // req.body
app.use(express.urlencoded({extended: true})); // to parse form data
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);    
app.use("/api/v1/media", protectRoute, mediaRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});


    