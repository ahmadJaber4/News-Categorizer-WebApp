import { useState } from "react"
import axios from 'axios'

export default function PredictionContainer() {

    // headline and result states
    const [headline, setHeadline] = useState(null)
    const [result, setResult] = useState({
        predicted_category: null,
        confidence: null
    })

    // loading and error states
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // set headline function
    function handleInputChange(e) {
        setHeadline(e.target.value)
    }

    // categroize function (POST axios request)
    async function handleCategorize() {
        try {
            setLoading(true)
            setError(null)

            const response = await axios.post('http://127.0.0.1:8000/predict',
                {
                    headline: headline
                }
            )
            setResult({
                predicted_category: response.data['predicted_category'],
                confidence: response.data['confidence']
            })
        } catch (err) {
            if (err.response?.status === 422) {
                setError('Input cannot be empty. Please enter a headline.')
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    // clear function
    function handleClear() {
        setHeadline(null)
        setResult({
            predicted_category: null,
            confidence: null
        })
        setError(null)
    }

    return (
        <div className="prediction-container">
            <div className="user-input">
                <span className="enter-headline">Enter Headline</span>
                <textarea className="text-area" value={headline ?? ''} onChange={handleInputChange}></textarea>
            </div>

            <div className="buttons">
                <button className="categorize-btn" onClick={handleCategorize}>{loading ? <i className="fa-solid fa-spinner fa-spin fa-lg" style={{ color: 'black' }}></i> : 'Categorize'}</button>
                <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>

            {
                error && <div className="error">{error}</div>
            }

            <div className="results">
                <div>Predicted Category: <span className="predicted-category">{result.predicted_category ? result.predicted_category.toUpperCase() : ''}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div>Confidence: </div>
                    <div className="confidence-bar">
                        <div className="percent" style={{ width: `${result.confidence ? result.confidence * 100 : 0}%` }}></div>
                    </div>
                    <span className="confidence">{result.confidence ? `${Number((result.confidence*100).toFixed(2))}%` : ''}</span>
                </div>
            </div>
        </div>
    )
}