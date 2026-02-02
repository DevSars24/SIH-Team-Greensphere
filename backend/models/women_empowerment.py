from pydantic import BaseModel
from typing import Optional, List

# --- Schemes ---
class Scheme(BaseModel):
    title: str
    description: str
    eligibility: str
    benefits: str
    application_link: Optional[str] = None
    category: str = "Government Scheme"

# --- Training Programs ---
class TrainingProgram(BaseModel):
    title: str
    organizer: str
    description: str
    duration: str
    location: str
    contact_info: Optional[str] = None
    category: str = "Skill Training"

# --- Financial Aid ---
class FinancialAid(BaseModel):
    title: str
    provider: str
    amount_range: str
    interest_rate: Optional[str] = None
    eligibility: str
    application_process: str
    category: str = "Financial Aid"

# --- Self Help Groups (SHGs) ---
class SHG(BaseModel):
    name: str
    location: str # Keep for display formatted address
    state: str
    city: str
    district: str
    members_count: int
    focus_area: str  # e.g., "Organic Farming", "Handicrafts"
    contact_person: str
    contact_number: Optional[str] = None
    category: str = "SHG"

# --- Health & Safety ---
class HealthSafetyTip(BaseModel):
    title: str
    content: str
    category: str = "Health & Safety" 
