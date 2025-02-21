



function Question({ question, timer, onAnswer }) {


 

  const handleInputChange = (e) => {
    if (e.target.value.trim() !== "") {
      onAnswer(e.target.value.trim())
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      {question.options ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="Enter your answer"
           
            onBlur={handleInputChange}
          />
        </div>
      )}
      <p className="text-lg font-semibold">Time remaining: {timer} seconds</p>
    </div>
  )
}

export default Question