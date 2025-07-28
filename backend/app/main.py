from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allows POST requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is running"}


class ScoreSubmission(BaseModel):
    score_submitted: int
    auth_token: object

@app.post("/score")
async def root(data: ScoreSubmission):
    score_submitted = data.score_submitted
    token = data.auth_token

    # if authenticated(token):
    if score_submitted < 6:
        return {"status": "success", "receivedScore": score_submitted}
    else:
        return {"status": "false", "receivedScore": score_submitted}

def authenticate_token(token) -> bool:
    pass