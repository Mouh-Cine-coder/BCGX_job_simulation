from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def chatbot():
    # get the company name  either Apple, Microsoft, Tesla
    # get the query (very specified ones)
    
    return {'Hello': 'World'}