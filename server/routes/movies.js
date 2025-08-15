const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Trending Movies Route
router.get('/trending', async (req, res) => {
  try {
    const tmdbRes = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
    );
    res.json(tmdbRes.data);
  } catch (error) {
    console.error("TMDB Error:", error.response?.data || error.message);
    res.status(500).json({ message: "tmdb error" });
  }
});

module.exports = router;
