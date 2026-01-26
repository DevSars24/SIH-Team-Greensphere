from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import database
from models.women_empowerment import Scheme, TrainingProgram, FinancialAid, SHG, HealthSafetyTip

router = APIRouter(
    prefix="/women",
    tags=["Women Empowerment"]
)

# --- Schemes ---
@router.get("/schemes", response_model=List[Scheme])
async def get_schemes():
    schemes = await database.schemes.find().to_list(100)
    # If empty, return dummy data for demo
    if not schemes:
        return [
            Scheme(title="Mahila Kisan Sashaktikaran Pariyojana (MKSP)", description="Empowering women in agriculture.", eligibility="Women farmers in SHGs", benefits="Sustainable agriculture training", application_link="https://mksp.gov.in"),
            Scheme(title="Pradhan Mantri Matru Vandana Yojana", description="Maternity benefit program.", eligibility="Pregnant women", benefits="Cash incentive of ₹5000", application_link="https://wcd.nic.in"),
        ]
    return schemes

@router.post("/schemes", response_model=Scheme)
async def create_scheme(scheme: Scheme):
    new_scheme = await database.schemes.insert_one(scheme.dict())
    return scheme

# --- Training ---
@router.get("/training", response_model=List[TrainingProgram])
async def get_training():
    programs = await database.training.find().to_list(100)
    if not programs:
        return [
            TrainingProgram(title="Organic Farming Workshop", organizer="Krishi Vigyan Kendra", description="Learn organic farming techniques.", duration="3 Days", location="Village Hall"),
        ]
    return programs

@router.post("/training", response_model=TrainingProgram)
async def create_training(program: TrainingProgram):
    await database.training.insert_one(program.dict())
    return program

# --- Financial Aid ---
@router.get("/financial-aid", response_model=List[FinancialAid])
async def get_financial_aid():
    aid = await database.financial_aid.find().to_list(100)
    if not aid:
        return [
             FinancialAid(title="Kisan Credit Card for Women", provider="SBI", amount_range="₹50,000 - ₹3,00,000", eligibility="Land-holding women farmers", application_process="Visit nearest SBI branch"),
        ]
    return aid

@router.post("/financial-aid", response_model=FinancialAid)
async def create_financial_aid(aid: FinancialAid):
    await database.financial_aid.insert_one(aid.dict())
    return aid

# --- SHGs ---
@router.get("/shgs", response_model=List[SHG])
async def get_shgs():
    shgs = await database.shgs.find().to_list(100)
    if not shgs:
        return [
            SHG(name="Laxmi SHG", location="Pune, Maharashtra", members_count=15, focus_area="Dairy Farming", contact_person="Rukmini Devi"),
        ]
    return shgs

@router.post("/shgs", response_model=SHG)
async def create_shg(shg: SHG):
    await database.shgs.insert_one(shg.dict())
    return shg

# --- Health & Safety ---
@router.get("/health-safety", response_model=List[HealthSafetyTip])
async def get_health_safety():
    tips = await database.health_safety.find().to_list(100)
    if not tips:
        return [
            HealthSafetyTip(title="Pesticide Safety", content="Always wear a mask and gloves while spraying pesticides."),
        ]
    return tips

@router.post("/health-safety", response_model=HealthSafetyTip)
async def create_health_safety(tip: HealthSafetyTip):
    await database.health_safety.insert_one(tip.dict())
    return tip
