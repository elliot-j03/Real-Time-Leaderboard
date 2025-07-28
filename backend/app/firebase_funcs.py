import firebase_admin
from firebase_admin import credentials, auth


def initialise_firebase(path):
    try:
        creds = credentials.Certificate(path)
        return firebase_admin.initialize_app(creds)
    except FileNotFoundError:
        print("[ERROR] initialise_firebase: File path is incorrect or the file does not exist")
    except Exception as e:
        print(f"[ERROR] initialise_firebase: {e}")


async def authenticate_token(token, firebase_app) -> bool:
    try:
        # Decoding without an error means it is verified :)
        decoded_token = auth.verify_id_token(token, firebase_app)
        return True
    except Exception as e:
        print(f"[ERROR] authenticate_token: {e}")
        return False

