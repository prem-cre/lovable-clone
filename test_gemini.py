"""
Test Gemini API key and list models
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("=" * 60)
print("TESTING GEMINI API KEY")
print("=" * 60)

try:
    # List available models
    print("\n✅ Available Gemini models:\n")
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"  - {model.name}")
            print(f"    Display Name: {model.display_name}")
    
    print("\n" + "=" * 60)
    print("Testing simple generation...")
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Say hello")
    print(f"✅ Response: {response.text}")
    print("=" * 60)
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
