import { getReviews } from "../utils/localStorage"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReviewForm from "../components/ReviewForm"

const Reviews = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const data = getReviews()
    setReviews(data[id] || [])
  }, [id])

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-400 mb-4">No reviews yet.</p>
      ) : (
        <ul className="space-y-3 mb-4">
          {reviews.map((r, i) => (
            <li key={i} className="bg-zinc-800 p-3 rounded">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">
                  {new Date(r.date).toLocaleDateString()}
                </span>
                <span className="text-yellow-400 font-bold">{r.rating} ⭐</span>
              </div>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      )}
      <ReviewForm movieId={id} />
    </div>
  )
}

export default Reviews
