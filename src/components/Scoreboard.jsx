function Scoreboard({ score, total }) {
  const getFeedback = () => {
    const percentage = (score / total) * 100
    if (percentage === 100) {
      return "Excellent! You got all the answers correct!"
    } else if (percentage >= 75) {
      return "Great job! You scored very well."
    } else if (percentage >= 50) {
      return "Good effort! You passed the quiz."
    } else {
      return "Keep trying! You can improve with more practice."
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Scoreboard</h2>
      <p className="text-xl">
        You scored <span className="text-green-500 font-semibold">{score}</span> out of <span className="text-blue-500 font-semibold">{total}</span>
      </p>
      <p className="text-lg mt-4">{getFeedback()}</p>
    </div>
  )
}

export default Scoreboard