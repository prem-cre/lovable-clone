import sys
import os
from pathlib import Path

# Add backend to Python path
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

# Import FastAPI app
from server import app

# Vercel requires a handler function
def handler(request, context):
    return app(request, context)

# For Vercel's ASGI support
app = app
