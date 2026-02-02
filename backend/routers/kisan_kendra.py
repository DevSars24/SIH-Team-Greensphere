from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(
    prefix="/kisan-kendra",
    tags=["Kisan Seva Kendra"]
)

class KisanKendra(BaseModel):
    name: str
    city: str
    address: str
    contact: str
    services: List[str]

@router.get("/find", response_model=KisanKendra)
async def find_kendra(city: str):
    # Dummy logic: Return a Kendra for the requested city (or nearest dummy)
    city_lower = city.lower()
    
    if "bhagalpur" in city_lower:
        return KisanKendra(
            name="Krishi Vigyan Kendra, Bhagalpur",
            city="Bhagalpur",
            address="Sabour, Bhagalpur, Bihar 813210",
            contact="+91-641-2451000",
            services=["Soil Testing", "Seed Distribution", "Training", "Crop Advisory"]
        )
    elif "patna" in city_lower:
        return KisanKendra(
            name="ICAR Reseach Complex, Patna",
            city="Patna",
            address="P.O. Bihar Veterinary College, Patna 800014",
            contact="+91-612-2222222",
            services=["Research Support", "High Yield Seeds", "Technology Demo"]
        )
    else:
        # Generic Fallback
        return KisanKendra(
            name=f"District Kisan Seva Kendra ({city.title()})",
            city=city.title(),
            address=f"Near District Collectorate, {city.title()}",
            contact="1800-180-1551 (Kisan Call Center)",
            services=["General Advisory", "Scheme Enrollment", "Market Info"]
        )
