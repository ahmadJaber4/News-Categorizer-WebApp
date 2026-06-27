from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import cleaned_text
import joblib
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

# create app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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