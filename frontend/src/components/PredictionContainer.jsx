import { useState } from "react"
import axios from 'axios'

export default function PredictionContainer() {

    // headline state
    const [headline, setHeadline] = useState('')
    const [result, setResult] = useState({
        predicted_category: '',
        confidence: ''
    })

    // set headline function
    function handleInputChange(e) {
        setHeadline(e.target.value)
    }

    // categroize function (POST axios request)
    async function handleCategorize() {
        const response = await axios.post('http://127.0.0.1:8000/predict',
            {
                headline: headline
            }
        )
        setResult({
            predicted_category: response.data['predicted_category'],
            confidence: response.data['confidence']
        })
    }

    // clear function
    function handleClear() {
        setHeadline('')
        setResult({
            predicted_category: '',
            confidence: ''
        })
    }

    return (
        <div className="prediction-container">
            <div className="user-input">
                <span className="enter-headline">Enter Headline</span>
                <textarea className="text-area" value={headline} onChange={handleInputChange}></textarea>
            </div>

            <div className="buttons">
                <button className="categorize-btn" onClick={handleCategorize}>Categroize</button>
                <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>

            <div className="results">
                <div>Predicted Category: <span className="predicted-category">{result.predicted_category !== '' ? result.predicted_category.toUpperCase() : ''}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div>Confidence: </div>
                    <div className="confidence-bar">
                        <div className="percent" style={{ width: `${result.confidence !== '' ? result.confidence * 100 : 0}%` }}></div>
                    </div>
                    <span className="confidence">{result.confidence !== '' ? `${Number(result.confidence.toFixed(2)) * 100}%` : ''}</span>
                </div>
            </div>
        </div>
    )
}