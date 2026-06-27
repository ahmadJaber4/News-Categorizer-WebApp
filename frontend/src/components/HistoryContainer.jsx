// [{ headline, predicted_category, confidence }]

export default function HistoryContainer({ history }) {
    return (
        <div className="history-container">

            <div className="recent-predictions">
                Recent Predictions
            </div>

            <div className="history-table">
                <div className="col-names">
                    <span>Headline</span>
                    <span>Confidence</span>
                </div>

                {
                    history.map((item, index) => {
                        return (
                            <div className="row" key={index}>
                                <span className="history-headline">{`${item.headline.slice(0, 50)}...`} <b>{`(${item.predicted_category})`}</b></span>
                                <span className="history-confidence">{Number((item.confidence * 100).toFixed(2))}%</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}