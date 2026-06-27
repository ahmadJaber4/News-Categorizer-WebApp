import HistoryContainer from "./components/HistoryContainer"
import PredictionContainer from "./components/PredictionContainer"
import Title from "./components/Title"
import { useState } from "react"

function App() {

  // history state
  const [history, setHistory] = useState([])

  return (
    <>
      <Title />
      <PredictionContainer history={history} setHistory={setHistory}/>
      <HistoryContainer history={history}/>
    </>
  )
}

export default App
