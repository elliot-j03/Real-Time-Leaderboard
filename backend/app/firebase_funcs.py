import firebase_admin
from firebase_admin import credentials, auth, db


def initialise_firebase(path):
    try:
        creds = credentials.Certificate(path)
        return firebase_admin.initialize_app(creds, {
            "databaseURL": "https://real-time-leaderboard-3c6d6-default-rtdb.europe-west1.firebasedatabase.app/"
        })
    except FileNotFoundError:
        print("[ERROR] firebase_funcs.py/initialise_firebase: File path is incorrect or the file does not exist")
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/initialise_firebase: {e}")


# Authenticates the JWT token
async def authenticate_token(token, app_firebase) -> bool:
    try:
        # Decoding without an error means it is verified :)
        decoded_token = auth.verify_id_token(token, app_firebase)
        return True
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/authenticate_token: {e}")
        return False


# Updates the score corresponding to the user uid
async def update_score_db(uid, score):
    data = {
        "score": score
    }
    ref = db.reference(f"/users/{uid}")
    try:
        ref.update(data)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/update_score_db.py: {e}")


# Sets the username of the corresponding user uid upon account creation
async def init_user_db(uid, email, user):
    data = {
        "username": user,
        "email": email,
        "score": 0
    }
    ref = db.reference(f"/users/{uid}")
    try:
        ref.set(data)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/init_user_db: {e}")


# Gets the username of the corresponding user uid
async def get_user_name_db(user_uid):
    ref = db.reference(f"/users/{user_uid}/username")
    try:
        return ref.get()
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/get_user_name_db: {e}")

