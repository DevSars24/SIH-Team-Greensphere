import os
import uuid
from fastapi import APIRouter, HTTPException
from livekit import api

router = APIRouter(
    prefix="/community",
    tags=["Community"]
)

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")

@router.get("/token")
async def get_token(room: str, username: str):
    if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET:
        raise HTTPException(status_code=500, detail="LiveKit credentials not configured")

    token = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET) \
        .with_identity(username) \
        .with_name(username) \
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room,
        ))

    return {"token": token.to_jwt()}
