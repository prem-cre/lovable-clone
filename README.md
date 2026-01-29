# 🛠️ Coder Buddy - Integrated Edition

**Coder Buddy** is an AI-powered coding assistant built with LangGraph. This version integrates a modern Next.js frontend with a powerful LangGraph backend.

---

## 🏗️ Project Structure

- **`backend/`** – FastAPI server and LangGraph agents.
- **`frontend/`** – Next.js web interface.
- **`run_app.py`** – Unified runner to start both services.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python 3.11+**
- **Node.js & npm** (for the frontend)
- **Groq API Key**: Get one at [console.groq.com](https://console.groq.com/keys).

### 2. Setup Environment
Set your Groq API key in your terminal or a `.env` file in the `backend/` folder:
```bash
# Windows
$env:GROQ_API_KEY="your_key_here"
# Linux/Mac
export GROQ_API_KEY="your_key_here"
```

### 3. Install Dependencies
```bash
# Backend
pip install -r backend/pyproject.toml

# Frontend
cd frontend
npm install
cd ..
```

### 4. Run the Full Application
Use the unified runner to start both the backend (port 8000) and frontend (port 3000):
```bash
python run_app.py
```

Now open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🧪 Example Prompts
- Create a modern todo list application with glassmorphism.
- Build a weather dashboard using a public API.
- Create a simple portfolio website for a developer.
