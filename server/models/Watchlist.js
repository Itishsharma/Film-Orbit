const { Schema, model } = require('mongoose')

const WatchlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  title: String,
  poster_path: String
}, { timestamps: true })

WatchlistSchema.index({ user: 1, movieId: 1 }, { unique: true })

module.exports = model('Watchlist', WatchlistSchema)
