const axios = require('axios')
const TMDB_KEY = process.env.TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'

const client = axios.create({
  baseURL: BASE,
  params: { api_key: TMDB_KEY }
})

exports.getPopular = async (req, res) => {
  try {
    const page = req.query.page || 1
    const { data } = await client.get('/movie/popular', { params: { page } })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: 'tmdb error' })
  }
}

exports.search = async (req, res) => {
  try {
    const q = req.query.q || ''
    const { data } = await client.get('/search/movie', { params: { query: q } })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: 'tmdb error' })
  }
}

exports.getDetails = async (req, res) => {
  try {
    const id = req.params.id
    const { data } = await client.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits' } })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: 'tmdb error' })
  }
}

exports.getRandom = async (_req, res) => {
  try {
    const page = Math.floor(Math.random()*5)+1
    const { data } = await client.get('/movie/popular', { params: { page } })
    const list = data?.results || []
    const pick = list[Math.floor(Math.random()*list.length)]
    res.json(pick || {})
  } catch (e) {
    res.status(500).json({ message: 'tmdb error' })
  }
}
