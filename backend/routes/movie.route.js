import express from "express";
import { getTrending, getTrailers, getDetails, getSimilar, getByCategory } from "../controllers/media.controller.js";

const router = express.Router();

router.get("/trending", getTrending);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getDetails);
router.get("/:id/similar", getSimilar);
router.get("/:category", getByCategory);

export default router;
