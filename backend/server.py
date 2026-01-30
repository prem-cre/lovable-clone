from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import glob
from pathlib import Path
from agent.graph import agent
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
async def health():
    return {"status": "ok", "message": "CoderBuddy Backend is live"}

@app.post("/chat")
async def chat(request: PromptRequest):
    try:
        # Clear previous generated project contents if it exists
        if os.environ.get("VERCEL"):
            import tempfile
            project_root = Path(tempfile.gettempdir()) / "generated_project"
        else:
            project_root = Path.cwd() / "generated_project"
            
        if project_root.exists():
            print(f"Cleaning up {project_root}...")
            for root, dirs, files_in_dir in os.walk(project_root, topdown=False):
                for name in files_in_dir:
                    try:
                        (Path(root) / name).unlink()
                    except Exception as e:
                        print(f"Could not delete file {name}: {e}")
                for name in dirs:
                    try:
                        (Path(root) / name).rmdir()
                    except Exception as e:
                        print(f"Could not delete dir {name}: {e}")
        else:
            project_root.mkdir(exist_ok=True)

        print(f"Received prompt: {request.prompt}")
        result = agent.invoke({"user_prompt": request.prompt}, {"recursion_limit": 100})
        print("Agent finished")

        files = {}
        if project_root.exists():
            for filepath in project_root.rglob("*"):
                if filepath.is_file():
                    try:
                        relative_path = str(filepath.relative_to(project_root)).replace("\\", "/")
                        
                        # Handle images and other binary files
                        binary_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp']
                        if filepath.suffix.lower() in binary_extensions:
                            import base64
                            import mimetypes
                            mime_type, _ = mimetypes.guess_type(str(filepath))
                            if not mime_type:
                                mime_type = 'application/octet-stream'
                            with open(filepath, "rb") as f:
                                binary_data = f.read()
                                b64_content = base64.b64encode(binary_data).decode('utf-8')
                                files[relative_path] = f"data:{mime_type};base64,{b64_content}"
                        else:
                            # Text files
                            with open(filepath, "r", encoding="utf-8") as f:
                                files[relative_path] = f.read()
                    except Exception as e:
                        print(f"Error reading file {filepath}: {e}")
        
        print(f"Returning {len(files)} files")
        return {"status": "success", "files": files}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
