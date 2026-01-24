import random

# ==========================================
# 1. Market Price Tool (Mandi Bhav)
# ==========================================
def get_market_price(crop_name: str, location: str):
    """
    Retrieves current market prices (Mandi Bhav) for a specific crop in a given location.
    
    Args:
        crop_name: Name of the crop (e.g., Wheat, Tomato, Onion).
        location: Name of the district or state (e.g., Pune, Punjab).
    """
    # In a real app, this would call an API like data.gov.in or Agmarknet
    # For now, we simulate realistic data
    
    base_prices = {
        "wheat": 2200,
        "rice": 3000,
        "onion": 4500,
        "tomato": 1500,
        "potato": 1200,
        "cotton": 6000,
        "soybean": 4800
    }
    
    crop_lower = crop_name.lower()
    price = base_prices.get(crop_lower, 2000) # Default price if unknown
    
    # Add some random variation to make it feel real
    variation = random.randint(-200, 200)
    current_price = price + variation
    
    trend = random.choice(["up", "down", "stable"])
    trend_symbol = "↑" if trend == "up" else "↓" if trend == "down" else "↔"
    
    return {
        "crop": crop_name,
        "location": location,
        "price_per_quintal": current_price,
        "trend": trend,
        "trend_symbol": trend_symbol,
        "message": f"The current price of {crop_name} in {location} is ₹{current_price}/quintal. Trend is {trend} {trend_symbol}."
    }

# ==========================================
# 2. Government Schemes Tool
# ==========================================
def get_government_schemes(topic: str):
    """
    Returns government schemes related to a specific topic (e.g., 'organic', 'loans', 'insurance').
    
    Args:
        topic: The topic to search schemes for.
    """
    topic_lower = topic.lower()
    
    schemes = []
    
    if "organic" in topic_lower or "fertilizer" in topic_lower:
        schemes.append({
            "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
            "benefits": "₹50,000 per hectare for organic farming.",
            "link": "https://agricoop.nic.in/"
        })
    
    if "loan" in topic_lower or "credit" in topic_lower or "money" in topic_lower:
        schemes.append({
            "name": "Kisan Credit Card (KCC)",
            "benefits": "Short-term credit at 4% interest rate.",
            "link": "https://pmkisan.gov.in/"
        })
        
    if "insurance" in topic_lower or "loss" in topic_lower or "damage" in topic_lower:
        schemes.append({
            "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            "benefits": "Comprehensive crop insurance against non-preventable natural risks.",
            "link": "https://pmfby.gov.in/"
        })
        
    if not schemes:
        schemes.append({
            "name": "PM-KISAN",
            "benefits": "₹6,000 per year income support for all landholding farmers.",
            "link": "https://pmkisan.gov.in/"
        })
        
    return {
        "topic": topic,
        "found_schemes": schemes
    }

# ==========================================
# 3. Weather Forecast Tool
# ==========================================
def get_weather_forecast(location: str):
    """
    Provides a 3-day weather forecast for a given location.
    
    Args:
        location: The city or village name.
    """
    forecasts = [
        {"day": "Today", "temp": f"{random.randint(25, 35)}°C", "condition": random.choice(["Sunny", "Cloudy", "Light Rain"])},
        {"day": "Tomorrow", "temp": f"{random.randint(25, 35)}°C", "condition": random.choice(["Sunny", "Cloudy", "Heavy Rain"])},
        {"day": "Day After", "temp": f"{random.randint(24, 34)}°C", "condition": random.choice(["Sunny", "Partly Cloudy"])}
    ]
    
    alert = "None"
    for f in forecasts:
        if "Heavy Rain" in f["condition"]:
            alert = "⚠️ Heavy rain alert! Secure harvested crops."
            break
            
    return {
        "location": location,
        "forecast": forecasts,
        "alert": alert
    }

# ==========================================
# 4. Crop Recommendation Tool
# ==========================================
def recommend_crop(soil_type: str, season: str, location: str):
    """
    Recommends the best crop to plant based on soil, season, and location.
    
    Args:
        soil_type: Type of soil (e.g., Black, Red, Sandy, Loamy).
        season: Current season (e.g., Kharif, Rabi, Summer).
        location: Region/State.
    """
    recommendations = []
    soil_lower = soil_type.lower()
    season_lower = season.lower()
    
    if "black" in soil_lower:
        if "kharif" in season_lower or "monsoon" in season_lower:
            recommendations = ["Cotton", "Soybean", "Pigeon Pea (Tur)"]
        elif "rabi" in season_lower or "winter" in season_lower:
            recommendations = ["Wheat", "Gram (Chana)", "Sunflower"]
            
    elif "red" in soil_lower:
        recommendations = ["Groundnut", "Millets (Bajra/Jowar)", "Pulses"]
        
    else:
        recommendations = ["Vegetables (Tomato, Okra)", "Maize", "Flowers"]
        
    return {
        "soil": soil_type,
        "season": season,
        "recommendations": recommendations,
        "advice": "Ensure proper soil testing before sowing for better yield."
    }

# ==========================================
# 5. Disease Diagnosis Tool
# ==========================================
def diagnose_crop_disease(symptoms: str):
    """
    Identifies potential crop diseases based on described symptoms and suggests remedies.
    
    Args:
        symptoms: Description of the problem (e.g., 'yellow leaves with black spots').
    """
    diagnosis = "Unknown Issue"
    remedy = "Consult a local agricultural officer."
    
    symptoms_lower = symptoms.lower()
    
    if "yellow" in symptoms_lower and "leaf" in symptoms_lower:
        diagnosis = "Nitrogen Deficiency or Yellow Mosaic Virus"
        remedy = "Spray Imidacloprid (for virus) or apply Urea (for deficiency)."
        
    elif "black spot" in symptoms_lower or "brown spot" in symptoms_lower:
        diagnosis = "Fungal Infection (Early Blight/Late Blight)"
        remedy = "Spray Mancozeb or Carbendazim fungicide."
        
    elif "hole" in symptoms_lower or "eaten" in symptoms_lower:
        diagnosis = "Pest Attack (Caterpillar/Borer)"
        remedy = "Use Neem Oil spray or install Pheromone Traps."
        
    return {
        "symptoms": symptoms,
        "diagnosis": diagnosis,
        "remedy": remedy
    }
