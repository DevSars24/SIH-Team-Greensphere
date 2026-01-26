from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB URL
MONGO_URL = os.getenv("MONGODB_URL")
if not MONGO_URL:
    print("Warning: MONGODB_URL not found in environment variables.")

# Create AsyncIOMotorClient with certifi and tlsAllowInvalidCertificates
# Only using tlsAllowInvalidCertificates because user had SSL issues before
client = AsyncIOMotorClient(
    MONGO_URL,
    tlsCAFile=certifi.where(),
    tlsAllowInvalidCertificates=True
)
database = client.krishi_mitra  # Database name

def get_database():
    return database
