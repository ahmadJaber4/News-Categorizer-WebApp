from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import joblib
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')
from utils import cleaned_text

# create app
app = FastAPI()

# generic exception handler (ensures CORS headers are present on error responses)
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={'error': 'Internal server error'})

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://news-categorizer-frontend.onrender.com"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# load model, vectorizer, and label encoder
classifier = joblib.load('model/classifier.pkl')
vectorizer = joblib.load('model/vectorizer.pkl')
le = joblib.load('model/label_encoder.pkl')

# baseline 
class HeadlineRequest(BaseModel):
    headline: str

# GET /
@app.get('/')
def home():
    return {
        'message': 'Server running 🚀'
    }

# POST /predict
@app.post('/predict')
def predict(request: HeadlineRequest):
    vector = vectorizer.transform([cleaned_text(request.headline)])
    predicted_category = le.inverse_transform(classifier.predict(vector))[0]
    confidence = float(classifier.predict_proba(vector).max())

    return {
        'predicted_category': predicted_category,
        'confidence': confidence
    }