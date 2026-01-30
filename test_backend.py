"""
Test script to verify CoderBuddy backend works correctly
"""
import requests
import json
import time

print("=" * 50)
print("CoderBuddy Backend Test")
print("=" * 50)

# Test configuration
API_URL = "http://localhost:8000/chat"
TEST_PROMPT = "create a simple HTML page with a red button that says Click Me"

print(f"\n1. Testing POST to {API_URL}")
print(f"2. Prompt: {TEST_PROMPT}")
print("\nSending request...")

try:
    start_time = time.time()
    response = requests.post(
        API_URL,
        json={"prompt": TEST_PROMPT},
        timeout=120  # 2 minute timeout
    )
    elapsed = time.time() - start_time
    
    print(f"\n✅ Response received in {elapsed:.2f} seconds")
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Status: {data.get('status')}")
        print(f"Files generated: {len(data.get('files', {}))}")
        
        print("\nGenerated files:")
        for filename in data.get('files', {}).keys():
            print(f"  - {filename}")
            
        # Show a preview of index.html if it exists
        if 'index.html' in data.get('files', {}):
            html_content = data['files']['index.html']
            print(f"\n--- Preview of index.html (first 200 chars) ---")
            print(html_content[:200])
            print("...")
        
        print("\n" + "=" * 50)
        print("✅ BACKEND TEST PASSED - Ready to deploy!")
        print("=" * 50)
    else:
        print(f"\n❌ FAILED with status {response.status_code}")
        print(f"Response: {response.text[:500]}")
        
except requests.exceptions.Timeout:
    print("\n❌ Request timed out after 120 seconds")
except requests.exceptions.ConnectionError:
    print("\n❌ Cannot connect to backend. Is it running on port 8000?")
except Exception as e:
    print(f"\n❌ Error: {e}")
