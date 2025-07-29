from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import backend.app.firebase_funcs as firebase_funcs

app_firebase = firebase_funcs.initialise_firebase("./key/real-time-leaderboard.json")
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
    user_uid: str

# If someone runs a POST request at /score, run this function
@app.post("/score")
async def score_submission(data: ScoreSubmission):
    score_submitted = data.score_submitted
    token = data.auth_token
    uid = data.user_uid

    auth: bool = await firebase_funcs.authenticate_token(token, app_firebase)
    if auth:
        await firebase_funcs.update_score_db(uid, score_submitted)
        return {"status": "success", "receivedScore": score_submitted}
    else:
        return {"status": "false", "receivedScore": score_submitted}
    
class UserNameSubmission(BaseModel):
    user_name: str
    user_uid: str

@app.post("/add-username")
async def add_user_name(data: UserNameSubmission):
    user = data.user_name
    uid = data.user_uid
    try:
        await firebase_funcs.update_user_db(uid, user)
        return {"status": "worked", "user": user}
    except Exception as e:
        print(f"[ERROR] add_user_name: {e}")


# Endpoint
@app.get("/")
async def root():
    return {"message": "API is running"}