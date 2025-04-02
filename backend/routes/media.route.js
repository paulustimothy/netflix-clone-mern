import express from "express";
import { getTrending, getTrailers, getDetails, getSimilar, getByCategory } from "../controllers/media.controller.js";

const router = express.Router();

// Add validation middleware
const validateMediaType = (req, res, next) => {
    const { mediaType } = req.params;
    if (!['movie', 'tv'].includes(mediaType)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid media type. Must be either "movie" or "tv"'
        });
    }
    next();
};

router.get("/:mediaType/trending", validateMediaType, getTrending);
router.get("/:mediaType/:id/trailers", validateMediaType, getTrailers);
router.get("/:mediaType/:id/details", validateMediaType, getDetails);
router.get("/:mediaType/:id/similar", validateMediaType, getSimilar);
router.get("/:mediaType/:category", validateMediaType, getByCategory);

export default router;