from fastapi import FastAPI
from pydantic import BaseModel
from utils import cleaned_text
import joblib

# create app
app = FastAPI()

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