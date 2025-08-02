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


@app.get("/ping")
async def backend_check():
    return True


class UserNameSubmission(BaseModel):
    user_name: str
    email: str
    user_uid: str

@app.post("/username/add")
async def init_user(data: UserNameSubmission):
    user = data.user_name
    email = data.email
    uid = data.user_uid
    try:
        await firebase_funcs.init_user_db(uid, email, user)
        return {user}
    except Exception as e:
        print(f"[ERROR] main.py/init_user: {e}")


class Token(BaseModel):
    auth_token: str

@app.post("/username/get/{user_uid}")
async def get_user_name(user_uid: str, data: Token):
    token = data.auth_token
    uid = user_uid
    auth: bool = await firebase_funcs.authenticate_token(token, app_firebase)
    if auth:
        try:
            user = await firebase_funcs.get_user_name_db(uid)
            return {"username": user}
        except Exception as e:
            print(f"[ERROR] main.py/get_user_name: {e}")
    else:
        return "failure to verify token"


class CheckUser(BaseModel):
    user_name: str


@app.post("/username/check")
async def check_user_name(data: CheckUser):
    user = data.user_name
    exists = await firebase_funcs.check_user_name_db(user)
    return {"success": exists}


class ScoreSubmission(BaseModel):
    score_submitted: int
    auth_token: str
    user_uid: str

# If someone runs a POST request at /score, run this function
@app.post("/score")
async def score_submission(data: ScoreSubmission):
    score_submitted = data.score_submitted
    token = data.auth_token
    uid = data.user_uid

    auth: bool = await firebase_funcs.authenticate_token(token, app_firebase)
    if auth:
        try:
            await firebase_funcs.update_score_db(uid, score_submitted)
            return {"status": "success", "receivedScore": score_submitted}
        except Exception as e:
            print(f"[ERROR] main.py/score_submission: {e}")
    else:
        return {"status": "false", "receivedScore": score_submitted}


# Endpoint
@app.get("/")
async def root():
    return {"message": "API is running"}

    