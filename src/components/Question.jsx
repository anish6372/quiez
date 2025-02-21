import { useState } from 'react'

function Question({ question, timer, onAnswer, attempts }) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = () => {
    onAnswer(selectedOption)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      {question.options ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {question.options.map((option, index) => (
            <div key={index} className="mb-2">
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            placeholder="Enter your answer"
          />
        </div>
      )}
      <p className="text-lg font-semibold">Time remaining: {timer} seconds</p>
      {attempts > 0 && (
        <div className="text-red-500 mb-4">
          Incorrect answer. Attempts: {attempts}
        </div>
      )}
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Submit
      </button>
    </div>
  )
}

export default Question