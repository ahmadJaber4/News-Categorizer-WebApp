
export default function HistoryContainer() {
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

                <div className="row">
                    <span className="history-headline">"Messi wins world cup after phenominal..."</span>
                    <span className="history-confidence">79%</span>
                </div>

                <div className="row">
                    <span className="history-headline">"Messi wins world cup after phenominal..."</span>
                    <span className="history-confidence">79%</span>
                </div>

                <div className="row">
                    <span className="history-headline">"Messi wins world cup after phenominal..."</span>
                    <span className="history-confidence">79%</span>
                </div>

                <div className="row">
                    <span className="history-headline">"Messi wins world cup after phenominal..."</span>
                    <span className="history-confidence">79%</span>
                </div>
            </div>
        </div>
    )
}