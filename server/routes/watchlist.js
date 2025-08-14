const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Watchlist = require('../models/Watchlist')

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

router.post('/', auth, async (req, res) => {
  const { movieId, title, poster_path } = req.body
  try {
    const doc = await Watchlist.findOneAndUpdate(
      { user: req.user.id, movieId },
      { user: req.user.id, movieId, title, poster_path },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    res.json(doc)
  } catch (e) {
    res.status(500).json({ message: 'db error' })
  }
})

router.get('/', auth, async (req, res) => {
  const list = await Watchlist.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(list)
})

router.delete('/:movieId', auth, async (req, res) => {
  await Watchlist.deleteOne({ user: req.user.id, movieId: req.params.movieId })
  res.json({ ok: true })
})

module.exports = router
