import { useState, useEffect } from 'react'
import Question from './Question'
import Scoreboard from './Scoreboard'
import { openDB } from 'idb'


const multipleChoiceQuestions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Berlin", "Mercury", "Earth", "Mars"],
    answer: "Mercury"
  },
  {
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "JAVA", "HTML", "C++"],
    answer: "HTML"
  },
  {
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au"
  },
  {
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    answer: "Filtration"
  },
  
]

const integerTypeQuestions = [
  {
    question: "What is the value of 12 + 28?",
    answer: "40"
  },
  {
    question: "How many states are there in the United States?",
    answer: "50"
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    answer: "1776"
  },
  {
    question: "What is the value of pi rounded to the nearest integer?",
    answer: "3"
  },
  {
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: "120"
  },
 
]

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [questionTimer, setQuestionTimer] = useState(30)
  const [quizTimer, setQuizTimer] = useState(1800) 
  const [isMultipleChoice, setIsMultipleChoice] = useState(true)
  const [error, setError] = useState(null)
  const [answerError, setAnswerError] = useState(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (questionTimer > 0) {
      const interval = setInterval(() => {
        setQuestionTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      handleNextQuestion()
    }
  }, [questionTimer])

  useEffect(() => {
    if (quizTimer > 0) {
      const interval = setInterval(() => {
        setQuizTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setShowScoreboard(true)
      saveQuizHistory()
    }
  }, [quizTimer])

  const handleAnswer = (selectedOption) => {
    if (!selectedOption) {
      setAnswerError('Answer is required.')
      return
    }
    setAnswerError(null)
    const currentQuestions = isMultipleChoice ? multipleChoiceQuestions : integerTypeQuestions
    if (selectedOption === currentQuestions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1)
      setAttempts(0) 
    } else {
      setAttempts(prev => prev + 1)
    }
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    setQuestionTimer(30)
    const currentQuestions = isMultipleChoice ? multipleChoiceQuestions : integerTypeQuestions
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (isMultipleChoice) {
      setIsMultipleChoice(false)
      setCurrentQuestionIndex(0)
    } else {
      setShowScoreboard(true)
      saveQuizHistory()
    }
  }

  const saveQuizHistory = async () => {
    try {
      const db = await openDB('quizDB', 1, {
        upgrade(db) {
          db.createObjectStore('history', { keyPath: 'id', autoIncrement: true })
        }
      })
      await db.add('history', {
        date: new Date(),
        score,
        total: multipleChoiceQuestions.length + integerTypeQuestions.length
      })
    } catch (err) {
      setError('Failed to save quiz history.')
    }
  }

  const currentQuestions = isMultipleChoice ? multipleChoiceQuestions : integerTypeQuestions

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-4">Quiz Instructions</h2>
        <ul className="list-disc list-inside mb-4">
          <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
          <li>For integer-type questions, write your numerical answer clearly.</li>
          <li>No calculators unless specified.</li>
          <li>You have 30 minutes to complete this quiz.</li>
        </ul>
        <div className="text-lg font-semibold mb-4">
          Time remaining: {Math.floor(quizTimer / 60)}:{quizTimer % 60}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {answerError && <div className="text-red-500 mb-4">{answerError}</div>}
        {showScoreboard ? (
          <Scoreboard score={score} total={multipleChoiceQuestions.length + integerTypeQuestions.length} />
        ) : (
          <Question
            question={currentQuestions[currentQuestionIndex]}
            timer={questionTimer}
            onAnswer={handleAnswer}
            attempts={attempts}
          />
        )}
      </div>
    </div>
  )
}

export default Quiz