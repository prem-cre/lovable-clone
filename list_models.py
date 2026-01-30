"""
Script to list available Groq models
"""
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

print("=" * 60)
print("AVAILABLE GROQ MODELS")
print("=" * 60)

try:
    models = client.models.list()
    print(f"\n ✅ Found {len(models.data)} models:\n")
    for model in models.data:
        print(f"  - {model.id}")
        if hasattr(model, 'active'):
            print(f"    Active: {model.active}")
    print("\n" + "=" * 60)
except Exception as e:
    print(f"❌ Error: {e}")
