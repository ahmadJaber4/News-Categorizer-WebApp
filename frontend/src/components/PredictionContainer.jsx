
export default function PredictionContainer(){
    return (
        <div className="prediction-container">
            <div className="user-input">
                <span className="enter-headline">Enter Headline</span>
                <textarea className="text-area"></textarea>
            </div>

            <div className="buttons">
                <button className="categorize-btn">Categroize</button>
                <button className="clear-btn">Clear</button>
            </div>

            <div className="results">
                <div>Predicted Category:</div>
                <div>Confidence: </div>
            </div>
        </div>
    )
}