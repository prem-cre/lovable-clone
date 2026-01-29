
import subprocess
import sys
import os
import time
import threading

def run_backend(root_dir):
    print("--- Starting Backend (FastAPI) ---")
    backend_dir = os.path.join(root_dir, "backend")
    try:
        # The backend requires GROQ_API_KEY. It's loaded from .env inside api.py
        subprocess.run([sys.executable, "server.py"], cwd=backend_dir, check=True)
    except Exception as e:
        print(f"Backend Error: {e}")

def run_frontend(root_dir):
    print("--- Starting Frontend (Next.js) ---")
    frontend_dir = os.path.join(root_dir, "frontend")
    try:
        # On Windows, we use shell=True to help find npm
        # Next.js projects run with 'npm run dev'
        subprocess.run("npm run dev", cwd=frontend_dir, shell=True, check=True)
    except Exception as e:
        print(f"\n[FRONTEND ERROR]: {e}")
        print("-" * 50)
        print("POSSIBLE FIXES:")
        print("1. Install Node.js from https://nodejs.org/")
        print("2. Ensure 'npm' is in your system PATH.")
        print("3. Run 'npm install' inside the 'frontend' folder before running this script.")
        print("-" * 50)

if __name__ == "__main__":
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Kill any existing process on port 8000 (Windows specific)
    print("Cleaning up ports...")
    try:
        # This finds the PID of the process on 8000 and kills it
        port_find = subprocess.check_output('netstat -ano | findstr :8000', shell=True).decode()
        for line in port_find.strip().split('\n'):
            pid = line.strip().split()[-1]
            if pid != '0':
                print(f"Closing existing process on port 8000 (PID: {pid})...")
                subprocess.run(f"taskkill /F /PID {pid}", shell=True, capture_output=True)
    except:
        # No process found on port 8000, which is good
        pass

    backend_thread = threading.Thread(target=run_backend, args=(root_dir,))
    frontend_thread = threading.Thread(target=run_frontend, args=(root_dir,))
    
    backend_thread.daemon = True
    frontend_thread.daemon = True
    
    backend_thread.start()
    time.sleep(2) # Wait for backend to bind
    frontend_thread.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down services...")
