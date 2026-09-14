from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import os
import dns.resolver
from dotenv import load_dotenv

# Configure robust DNS resolver for MongoDB Atlas SRV connection strings
try:
    dns.resolver.default_resolver = dns.resolver.Resolver(configure=False)
    dns.resolver.default_resolver.nameservers = ['8.8.8.8', '1.1.1.1', '8.8.4.4']
except Exception as e:
    print(f"DNS resolver setup note: {e}")

# Load environment variables
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path=ENV_PATH)
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
