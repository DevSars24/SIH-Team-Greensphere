from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
import certifi
from dotenv import load_dotenv
from pymongo.errors import OperationFailure

load_dotenv("backend/.env")

async def test_conn():
    uri = os.getenv("MONGODB_URL")
    print(f"Testing URI: {uri}")
    try:
        # Using the same connection logic as backend/database.py
        client = AsyncIOMotorClient(
            uri, 
            tlsCAFile=certifi.where(), 
            tlsAllowInvalidCertificates=True
        )
        await client.admin.command('ping')
        print("✅ Connection & Authentication Successful!")
        print("You can verify on Atlas: https://cloud.mongodb.com")
    except OperationFailure as e:
        print(f"\n❌ AUTHENTICATION FAILED: {e}")
        print("Double check your IP Whitelist in MongoDB Atlas -> Network Access")
    except Exception as e:
        print(f"\n❌ Connection Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_conn())
