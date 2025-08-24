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
    data_users = {
        "username": user,
        "email": email,
        "score": 0
    }
    ref_users = db.reference(f"/users/{uid}")
    try:
        ref_users.set(data_users)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/init_user_db -> data_users: {e}")
    
    ref_names = db.reference(f"/names/{user}")
    try:
        ref_names.set(True)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/init_user_db -> data_name: {e}")


# Checks if a username is taken
async def check_user_name_db(user_name):
    ref = db.reference(f"/names/{user_name}")
    if ref.get() is True:
        return True
    return False


# Gets the username of the corresponding user uid
async def get_user_name_db(user_uid):
    ref = db.reference(f"/users/{user_uid}/username")
    try:
        return ref.get()
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/get_user_name_db: {e}")


# Updates the requests node for the users in this interaction
# TODO: add check for if already sent or if already friends maybe?
async def send_friend_req_db(uid, fuid):
    updates = {
        f"/requests/{uid}/sent/{fuid}": True,
        f"/requests/{fuid}/incoming/{uid}": True
    }
    ref = db.reference("/")
    try:
        ref.update(updates)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/send_friend_req_db: {e}")


async def accept_friend_req_db(uid, fuid):
    updates = {
        f"/friends/{uid}/{fuid}": True,
        f"/friends/{fuid}/{uid}": True,
        f"/requests/{uid}/sent/{fuid}": None,
        f"/requests/{fuid}/incoming/{uid}": None
    }
    ref = db.reference("/")
    try:
        ref.update(updates)
    except Exception as e:
        print(f"[ERROR] firebase_funcs.py/accept_friend_req_db: {e}")

