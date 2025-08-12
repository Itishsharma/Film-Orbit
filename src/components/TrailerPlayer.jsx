const TrailerPlayer = ({ trailerKey }) => {
  return (
    <div className="w-full aspect-video mt-4 rounded overflow-hidden shadow-lg">
      <iframe
        title="Trailer"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default TrailerPlayer
