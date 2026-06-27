import HistoryContainer from "./components/HistoryContainer"
import PredictionContainer from "./components/PredictionContainer"
import Title from "./components/Title"
import { useState, useEffect } from "react"

function App() {

  // history state
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictionHistory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('predictionHistory', JSON.stringify(history))
  }, [history])

  return (
    <>
      <Title />
      <PredictionContainer history={history} setHistory={setHistory}/>
      <HistoryContainer history={history}/>
    </>
  )
}

export default App
