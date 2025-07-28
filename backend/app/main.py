from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def root(item_id: str):
    return {"item_id": item_id}