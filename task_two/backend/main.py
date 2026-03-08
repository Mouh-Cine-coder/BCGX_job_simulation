from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class FormData(BaseModel):
    company: str
    question :str



origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def chatbot(data: FormData):
    # get the company name  either Apple, Microsoft, Tesla
    # get the query (very specified ones)
    print(data.company)
    print(data.question)
    
    return {
        "company": data.company,
        "question": data.question,
        "answer": "Your answer here"
    }