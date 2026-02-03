# Krishi Mitra 🌱 | AI-Powered Smart Farming Assistant

**Krishi Mitra** is a comprehensive digital platform designed to empower Indian farmers with real-time, data-driven insights. It leverages Artificial Intelligence to provide crop recommendations, disease diagnosis, market analysis, and specialized support for women farmers.

---

## 🚀 Key Features

### 1. **AI Friend (Krishi Sathi)**
   - A multilingual, voice-enabled chatbot powered by **Google Gemini**.
   - **Agentic Capabilities**: Unlike standard chatbots, Krishi Sathi can *do* things. It uses custom tools to fetch real-time market prices, weather forecasts, and government schemes.
   - **Context Aware**: Detects language (Hindi, English, Marathi, etc.) and responds accordingly.

### 2. **Women Empowerment Module**
   - **Government Schemes**: Curated list of schemes for women in agriculture.
   - **Training Programs**: 6-week entrepreneurship courses with an AI Tutor ("Krishi Vidya").
   - **SHG Network**: Connect with Self-Help Groups for micro-finance and community support.
   - **Financial Aid**: Direct access to loans and insurance tailored for women.

### 3. **Crop Doctor (Disease Diagnosis)**
   - Upload photos or describe symptoms to identify crop diseases instantly.
   - Provides organic and chemical remedies.

### 4. **Smart Community**
   - **Mandi Prices**: Real-time market rates for crops across different states.
   - **Video Feed**: Short-form educational content for farmers.

---

## 🛠️ Tech Stack

### **Frontend (Client-Side)**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Shadcn UI
- **Authentication**: [Clerk](https://clerk.com/)
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Intersection Observers

### **Backend (Server-Side)**
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (High-performance Python web framework)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) (NoSQL Database)
- **AI Engine**: [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/)
- **ORM**: Motor (Async MongoDB driver) + Pydantic (Data validation)

---

## 📂 Project Structure & Explanation

The project is divided into two main directories: `backend` and `frontend`.

### **1. Backend (`/backend`)**

The brain of the operation. It handles API requests, DB connections, and AI logic.

| File / Folder | Description |
| :--- | :--- |
| `main.py` | **Entry Point**. Initializes `FastAPI`, connects to MongoDB, configures CORS, and registers routers. Also hosts the `/chat` endpoint for the Agent. |
| `tools.py` | **Agent Tools**. Defines python functions (tools) that the AI can call. functioning as the "hands" of the agent (e.g., `get_market_price`, `diagnose_crop_disease`). |
| `database.py` | **DB Connection**. Handles asynchronous connection to MongoDB using `Motor`. |
| `routers/` | **API Routes**. Breaks down the API into modules: <br> - `women_empowerment.py`: Handles schemes, SHGs, training APIs. <br> - `crop_doctor.py`: Logic for disease diagnosis. <br> - `community.py`: Forum and posts logic. |
| `models/` | **Pydantic Models**. Defines the shape of data for requests and responses (Schema validation). |

### **2. Frontend (`/frontend`)**

The user interface. Built with Next.js for server-side rendering and speed.

| File / Folder | Description |
| :--- | :--- |
| `app/` | **App Router**. Uses file-system based routing. <br> - `page.tsx`: Landing page. <br> - `(auth)/`: Authentication pages (Login/Signup). <br> - `dashboard/`: User dashboard. <br> - `women-empowerment/`: Dedicated section for women farmers. |
| `components/` | **UI Components**. Reusable blocks like `Navbar`, `Footer`, `SHGNetwork` cards, etc. |
| `lib/` | **Utilities**. Helper functions (e.g., `utils.ts` for styling implementation). |
| `public/` | **Static Assets**. Images, icons, and fonts. |

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Python 3.9+
- Node.js 18+
- MongoDB Atlas Connection String
- Gemini API Key

### **Step 1: Backend Setup**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in `backend/`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
5. Run the server:
   ```bash
   python main.py
   ```
   *Server will start at `http://localhost:8000`*

### **Step 2: Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in `frontend/`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   *App will start at `http://localhost:3000`*

---

## 📐 System Design Overview

1. **User Request**: User interacts with the Next.js Frontend.
2. **API Call**: Frontend sends an HTTP request to the FastAPI Backend.
3. **Agentic Layer (for Chat)**:
   - If the request is for the chatbot, `main.py` initializes the Gemini Agent.
   - The Agent analyzes the user prompt.
   - If data is needed (e.g., "Price of onion in Nasik"), the Agent calls a function from `tools.py`.
   - The result is fed back to the Agent, which generates a natural language response.
4. **Database Layer**:
   - For static data (Schemes, Users, Posts), FastAPI queries MongoDB via `database.py`.
5. **Response**: JSON response is sent back to Frontend and rendered.

---

# Future Roadmap: ML & Agentic Integration 🚀

This document outlines the strategic plan to transition **Krishi Mitra** from a generative AI-based application to a robust, model-backed **Agentic System**.

## 🎯 Goal
To integrate specialized Machine Learning models (Computer Vision, Regression) and make them accessible via the conversational Agent, enabling "Action-Oriented" assistance rather than just "Information-Oriented" chat.

---

## phase 1: Moving Beyond "Mock" Tools

Currently, `backend/tools.py` uses simulated logic for crop recommendation and disease diagnosis. The first step is to replace these with real ML inference.

### **1. Crop Disease Detection (Computer Vision)**
*   **Current State**: Keyword matching (e.g., user types "yellow leaves").
*   **Future State**: Image-based diagnosis.
*   **Implementation**:
    *   **Model**: Train a **ResNet50** or **MobileNetV2** on the *PlantVillage* dataset (38 classes of crop diseases).
    *   **Deployment**: Export model to **ONNX** format for fast CPU inference or serve via TensorFlow Serving.
    *   **Integration**:
        *   Create a new tool `detect_disease_from_image(image_url: str)`.
        *   When user uploads an image, the Agent calls this tool.
        *   The tool runs inference and returns `{disease: "Tomato Early Blight", confidence: 98%}`.

### **2. Price Prediction (TimeSeries)**
*   **Current State**: Random variation around base price.
*   **Future State**: LSTM or ARIMA model for forecasting.
*   **Implementation**:
    *   **Data**: Scrape historical Agmarknet data.
    *   **Model**: Train a Time-Series forecasting model.
    *   **Integration**: Update `get_market_price` to query this model for "next week's predicted price".

---

## Phase 2: The Agentic Architecture 🤖

We will upgrade the current Gemini setup to a **ReAct (Reason + Act)** loop or use **LangGraph** for complex workflows.

### **1. Workflow: "The Crop Doctor Agent"**
Instead of a simple Q&A, the agent will follow a diagnostic protocol:
1.  **User**: "My plants are dying."
2.  **Agent (Thought)**: User is vague. I need to ask for symptoms or a photo.
3.  **Agent (Action)**: Ask "Can you describe the spots on the leaves or upload a photo?"
4.  **User**: Uploads photo.
5.  **Agent (Action)**: Calls `VisionModel_Tool(image)`.
6.  **Tool Output**: "Corn Common Rust".
7.  **Agent (Action)**: Calls `Database_Remedy_Tool("Corn Common Rust")`.
8.  **Agent (Response)**: "Your corn has Rust. You should spray X fungicide..."

### **2. Workflow: "The Market Agent"**
1.  **User**: "Should I sell my onions now?"
2.  **Agent (Action)**: Call `Price_Prediction_Tool("Onion")`.
3.  **Tool Output**: "Projected to rise by 15% in 3 days."
4.  **Agent (Response)**: "No, hold for 3 days. Prices are expected to rise."

---

## 🏗️ System Design for ML Integration

```mermaid
graph TD
    A[User Frontend] -->|Chat/Image| B(FastAPI Backend)
    B -->|Text Query| C{Gemini Agent}
    
    subgraph "Agent Toolbelt"
        D[Market API Tool]
        E[Weather API Tool]
        F[ML Inference Tool]
    end
    
    C -->|Decides to Call| F
    
    subgraph "ML Model Server"
        G[Disease Detection Model (ONNX)]
        H[Price Prediction Model (sklearn)]
    end
    
    F -->|Input| G
    F -->|Input| H
    G -->|Prediction| F
    H -->|Prediction| F
    
    F -->|Result| C
    C -->|Final Response| B
    B -->|Reply| A
```

## 📋 Implementation Checklist

- [ ] **Data Collection**: Gather datasets for local crop diseases and local mandi prices.
- [ ] **Model Training**: Train lightweight models (optimize for latency).
- [ ] **API Wrapping**: Wrap models in Python functions inside `backend/tools.py`.
- [ ] **Agent Prompting**: Update `SYSTEM_INSTRUCTION` in `main.py` to teach the agent *when* to use these new tools.
- [ ] **Frontend Update**: Add file upload support in the chat interface for image-based tools.

