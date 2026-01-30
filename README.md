# CoderBuddy - AI-Powered Code Generation Platform

<div align="center">

**Transform natural language into full-stack applications with AI-driven multi-agent architecture**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14+-3776AB)](https://python.org/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4)](https://ai.google.dev/)

</div>

## Overview

CoderBuddy leverages **Google Gemini AI** and **LangGraph's multi-agent architecture** to transform text prompts into complete, working applications. Built with FastAPI and Next.js, it orchestrates specialized AI agents to plan, architect, and implement full-stack projects autonomously.

### Key Features

- 🤖 **Multi-Agent AI System**: Coordinated planning, architecture, and coding agents
- ⚡ **Real-time Generation**: Complete projects in under 3 minutes
- 🎨 **Modern UI**: Beautiful interface with shadcn/ui components
- 📦 **Full-Stack Support**: HTML, CSS, JavaScript, React, and more
- 🔄 **Live Preview**: Instant visualization of generated applications

## Architecture

The system uses three specialized AI agents working in sequence:

1. **Planner Agent** - Analyzes prompts, defines tech stack and features
2. **Architect Agent** - Breaks down plan into ordered implementation tasks
3. **Coder Agent** - Executes tasks using LangGraph's ReAct framework with file I/O tools

Each agent uses Google Gemini AI with structured outputs via Pydantic models.

## Tech Stack

**Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui  
**Backend**: FastAPI, Python 3.14, LangChain, LangGraph, Google Gemini AI  
**Deployment**: Vercel (Serverless)

## Project Structure

```
lovable-clone/
├── app/                    # Next.js pages
├── components/             # React components + shadcn/ui
├── backend/
│   ├── server.py          # FastAPI API server
│   └── agent/
│       ├── graph.py       # LangGraph workflow
│       ├── states.py      # Pydantic models
│       ├── tools.py       # File I/O tools
│       └── prompts.py     # System prompts
├── api/                    # Vercel serverless functions
└── run_app.py             # Local dev runner
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Google Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/coderbuddy.git
cd coderbuddy

# Install dependencies
npm install
pip install -r requirements.txt

# Configure environment
echo "GEMINI_API_KEY=your_api_key_here" > backend/.env

# Run application
python run_app.py

# Open browser
# http://localhost:3000
```

## Usage

1. Enter a prompt: `"Create a todo list app with a modern UI"`
2. Click **"Plan"** button
3. Wait for AI agents to generate code
4. View live preview

### Example Prompts

```
Create a landing page for a food delivery service with hero section and restaurant listings
Build a responsive calculator with a clean interface
Design a portfolio website with project cards and contact form
```

## Deployment

### Vercel

1. Push to GitHub
2. Import to Vercel (Framework: Next.js)
3. Set environment variable: `GEMINI_API_KEY=your_key`
4. Deploy (auto-deploys on push)

Backend runs as Python serverless function.

## Configuration

**Timeouts**:
- Frontend: 180s fetch timeout
- Backend: 60s LLM timeout
- Vercel: 25s function timeout

**Body Limits**: 10MB (configured in `next.config.mjs`)

## How It Works

1. User submits prompt → Next.js frontend
2. POST to `/api/chat` (proxied to FastAPI)
3. LangGraph workflow executes:
   - Planner creates project plan
   - Architect generates task list
   - Coder implements each task
4. Generated files returned as JSON
5. Frontend displays preview

## Security

- Path validation: All writes sandboxed to `generated_project/`
- API keys in environment variables
- CORS configured for dev/production
- Pydantic validation on all AI outputs

## Troubleshooting

**500 Error**: Check Gemini API key, verify `langchain-google-genai` installed  
**Timeout**: Complex prompts may exceed 180s, simplify or increase timeout  
**File Errors**: Clear `generated_project/` folder and restart backend

## Testing

```bash
python test_backend.py      # Test backend
python test_gemini.py       # Test Gemini connection
python test_direct.py       # Test API directly
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

## License

MIT License

## Contact

**Project**: [https://github.com/your-username/coderbuddy](https://github.com/your-username/coderbuddy)  
**Demo**: [https://coderbuddy.vercel.app]([https://lovable-clone-lyart.vercel.app/])
**Email** : mahantypremkumar2007@gmail.com

---
