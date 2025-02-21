import Quiz from './components/Quiz'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Interactive Quiz Platform</h1>
      <Quiz />
    </div>
  )
}

export default App