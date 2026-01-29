---
description: Run the Lovable Clone application (Backend + Frontend)
---

1. Install backend dependencies (if not already done):
   ```bash
   cd lovable-clone
   pip install -r pyproject.toml
   # or manually: pip install fastapi uvicorn python-dotenv langchain langchain-groq langgraph pydantic groq
   ```

2. Start the backend server:
   ```bash
   cd lovable-clone
   python api.py
   ```
   The backend will run on http://localhost:8000.

3. Install frontend dependencies (if not already done):
   ```bash
   cd frontend-design
   npm install
   ```

4. Start the frontend server (in a new terminal):
   ```bash
   cd frontend-design
   npm run dev
   ```
   The frontend will run on http://localhost:3000.
