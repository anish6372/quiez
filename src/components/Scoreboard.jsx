function Scoreboard({ score, total }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Scoreboard</h2>
      <p className="text-xl">
        You scored <span className="text-green-500 font-semibold">{score}</span> out of <span className="text-blue-500 font-semibold">{total}</span>
      </p>
    </div>
  )
}

export default Scoreboard