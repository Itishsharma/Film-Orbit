import { useState } from "react"
import { saveReview } from "../utils/localStorage"

const ReviewForm = ({ movieId }) => {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(5)

  const handleSubmit = () => {
    if (text.trim()) {
      saveReview(movieId, { text, rating, date: new Date().toISOString() })
      setText("")
      alert("Review submitted!")
    }
  }

  return (
    <div className="bg-zinc-800 p-4 rounded mt-4">
      <textarea
        className="w-full p-2 mb-2 bg-zinc-700 text-white rounded"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="bg-zinc-700 p-2 rounded text-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          className="bg-orange-500 px-4 py-2 rounded text-black font-bold hover:bg-orange-600"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default ReviewForm
