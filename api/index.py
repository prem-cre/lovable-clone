import sys
import os
from pathlib import Path

# Add the root and backend directory to path
root_dir = Path(__file__).parent.parent
backend_dir = root_dir / "backend"
sys.path.append(str(root_dir))
sys.path.append(str(backend_dir))

# Import the FastAPI app from backend/server.py
try:
    from server import app
except ImportError:
    # Fallback if the path structure is different on Vercel
    sys.path.append("/var/task/backend")
    from server import app
