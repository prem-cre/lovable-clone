import sys
from pathlib import Path

# Add backend to Python path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

# Import and export FastAPI app for Vercel
# This file will be accessible at /api/chat
from server import app
