import firebase_admin
from firebase_admin import credentials, auth, db


def initialise_firebase(path):
    try:
        creds = credentials.Certificate(path)
        return firebase_admin.initialize_app(creds, {
            "databaseURL": "https://real-time-leaderboard-3c6d6-default-rtdb.europe-west1.firebasedatabase.app/"
        })
    except FileNotFoundError:
        print("[ERROR] initialise_firebase: File path is incorrect or the file does not exist")
    except Exception as e:
        print(f"[ERROR] initialise_firebase: {e}")


async def authenticate_token(token, app_firebase) -> bool:
    try:
        # Decoding without an error means it is verified :)
        decoded_token = auth.verify_id_token(token, app_firebase)
        return True
    except Exception as e:
        print(f"[ERROR] authenticate_token: {e}")
        return False


async def update_score_db(uid, score):
    data = {
        "userUID": uid,
        "score": score
    }
    ref = db.reference("/scores")
    entry_ref = ref.push(data)
    print(f"Success: {entry_ref.key}")

async def update_user_db(uid, user):
    data = {
        "userUID": uid,
        "username": user
    }
    ref = db.reference("/users")
    entry_ref = ref.push(data)
    print(f"Success: {entry_ref}")
