import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrending = async (req, res) => {
    const {mediaType} = req.params;
    
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`);
        const randomContent = data.results[Math.floor(Math.random() * data.results.length)];

        res.json({success: true, content: randomContent});

    } catch (error) {
        console.log("Error in getTrending", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getTrailers = async (req, res) => {
    const {id} = req.params;
    const {mediaType} = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`)
        res.json({success: true, trailers: data.results});

    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        console.log("Error in getTrailers", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getDetails = async (req, res) => {
    const {id} = req.params;
    const {mediaType} = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`)
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }

        console.log("Error in getDetails", error.message);
        res.status(500).json({success: false, message: "Internal server error"});

    }
}

export const getSimilar = async (req, res) => {
    const {id} = req.params;
    const {mediaType} = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success: true, similar: data.results});

    } catch (error) {
        console.log("Error in getSimilar", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getByCategory = async (req, res) => {
    const {category} = req.params;
    const {mediaType} = req.params;
    
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US&page=1`)
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        console.log("Error in getByCategory", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

