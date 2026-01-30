import sys
from pathlib import Path

# Add the root directory to path so we can import from backend/
root_dir = Path(__file__).parent.parent
sys.path.append(str(root_dir / "backend"))

# Import the FastAPI app from backend/server.py
from server import app
