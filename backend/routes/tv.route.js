import { getTrendingTV, getTVTrailers, getTVDetails, getSimilarTV, getTVByCategory } from "../controllers/tv.controller.js";

import express from "express";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/details", getTVDetails);
router.get("/:id/similar", getSimilarTV);
router.get("/:category", getTVByCategory);

export default router;
