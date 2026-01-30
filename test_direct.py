"""
Direct test - hit the backend directly without Next.js proxy
"""
import requests
import json

print("=" * 60)
print("TESTING BACKEND DIRECTLY (bypassing Next.js)")
print("=" * 60)

# Hit the backend directly
url = "http://localhost:8000/chat"
payload = {"prompt": "create a todo list app"}

print(f"\n1. Testing POST to {url}")
print(f"2. Payload: {payload}")

try:
    response = requests.post(url, json=payload, timeout=120)
    
    print(f"\n✅ Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        try:
            data =response.json()
            print(f"\n✅ JSON parsed successfully")
            print(f"Status: {data.get('status')}")
            print(f"Files: {list(data.get('files', {}).keys())}")
        except Exception as e:
            print(f"\n❌ Failed to parse JSON: {e}")
            print(f"Raw response: {response.text[:500]}")
    else:
        print(f"\n❌ Error response:")
        print(response.text[:500])
        
except Exception as e:
    print(f"\n❌ Request failed: {e}")
    import traceback
    traceback.print_exc()
