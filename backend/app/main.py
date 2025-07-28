from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import backend.app.firebase_funcs as firebase_funcs

firebase_app = firebase_funcs.initialise_firebase("./key/real-time-leaderboard.json")

app = FastAPI()



# Allows POST requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScoreSubmission(BaseModel):
    score_submitted: int
    auth_token: object

@app.post("/score")
async def score_submission(data: ScoreSubmission):
    score_submitted = data.score_submitted
    token = data.auth_token

    auth: bool = await firebase_funcs.authenticate_token(token, firebase_app)
    if auth:
        return {"status": "success", "receivedScore": score_submitted}
    else:
        return {"status": "false", "receivedScore": score_submitted}


# Endpoint
@app.get("/")
async def root():
    return {"message": "API is running"}