"use client";

import { useState } from "react";
import { GradientBackground } from "@/components/gradient-background";
import { PromptInput } from "@/components/prompt-input";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<Record<string, string> | null>(null);

  const handlePromptSubmit = async (prompt: string) => {
    setLoading(true);
    setGeneratedFiles(null);
    // Use proxy or relative URL for production, localhost for dev
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const endpoint = apiUrl ? `${apiUrl}/api/chat` : "/api/chat";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error (${res.status}): ${text.slice(0, 100)}`);
      }

      const data = await res.json();
      if (data.status === "success") {
        setGeneratedFiles(data.files);
      } else {
        throw new Error(data.detail || "Generation failed");
      }
    } catch (error: any) {
      console.error("DEBUG - API Error:", error);
      const isVercel = window.location.hostname.includes('vercel.app');
      alert(`CoderBuddy Debug Error: ${error.message}. \n\nEnvironment: ${isVercel ? 'Production (Vercel)' : 'Local'}\nEndpoint: ${endpoint}\n\nIf on Vercel, please check logs in dashboard.`);
    } finally {
      setLoading(false);
    }
  };

  const getPreviewContent = () => {
    if (!generatedFiles) return "";

    // 1. Find the entry point (index.html is preferred)
    let entryFile = "index.html";
    if (!generatedFiles[entryFile]) {
      entryFile = Object.keys(generatedFiles).find(f => f.endsWith('.html')) || Object.keys(generatedFiles)[0];
    }

    let content = generatedFiles[entryFile] || "";

    // 2. Create a map of files to their content/blob URLs
    // For text files we can use them directly or via Blobs
    // For binary/images (if they were sent as base64 or similar, though here they are strings)

    const fileMap = { ...generatedFiles };

    // 3. Process the content to replace relative paths with actual content
    // We'll use a more robust regex-based injection for CSS and JS

    // Inject all CSS files found in the project into the <head>
    const cssFiles = Object.keys(fileMap).filter(f => f.endsWith('.css'));
    let cssInjection = "";
    cssFiles.forEach(path => {
      cssInjection += `\n/* From ${path} */\n${fileMap[path]}\n`;
    });

    if (cssInjection) {
      if (content.includes('</head>')) {
        content = content.replace('</head>', `<style>${cssInjection}</style></head>`);
      } else {
        content = `<style>${cssInjection}</style>` + content;
      }
    }

    // Inject all JS files found in the project into the end of <body>
    const jsFiles = Object.keys(fileMap).filter(f => f.endsWith('.js'));
    let jsInjection = "";
    jsFiles.forEach(path => {
      jsInjection += `\n// From ${path}\n${fileMap[path]}\n`;
    });

    if (jsInjection) {
      if (content.includes('</body>')) {
        content = content.replace('</body>', `<script>${jsInjection}</script></body>`);
      } else {
        content += `<script>${jsInjection}</script>`;
      }
    }

    // 4. Handle Images and Assets & Cleanup
    // We'll replace relative paths in the HTML with their corresponding data URLs
    // AND remove original <link> and <script> tags to prevent 404s
    Object.keys(fileMap).forEach(path => {
      const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Replace asset references
      if (path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) {
        const srcRegex = new RegExp(`(src=["'])(${escapedPath})(["'])`, 'g');
        content = content.replace(srcRegex, `$1${fileMap[path]}$3`);
      }

      // Cleanup CSS links and Script tags for files we've already injected
      if (path.endsWith('.css')) {
        const hrefRegex = new RegExp(`<link[^>]*href=["'](?:\\.\\/)?${escapedPath}["'][^>]*>`, 'gi');
        content = content.replace(hrefRegex, `<!-- Injected ${path} -->`);
      }
      if (path.endsWith('.js')) {
        const scriptRegex = new RegExp(`<script[^>]*src=["'](?:\\.\\/)?${escapedPath}["'][^>]*><\\/script>`, 'gi');
        content = content.replace(scriptRegex, `<!-- Injected ${path} -->`);
      }
    });

    return content;
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Gradient background */}
      <GradientBackground />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col">
        {/* Hero section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full rounded-[14px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                <img src="/icon.png" alt="CoderBuddy Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center tracking-tight">
            Got an idea, Vibe Coder? (Deploy V8 FINAL)
          </h1>

          {/* Prompt input */}
          <PromptInput onSubmit={handlePromptSubmit} />

          {loading && (
            <div className="flex items-center justify-center mt-8 text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
              Generating your project...
            </div>
          )}

          {generatedFiles && (
            <div className="w-full max-w-5xl mt-12 bg-[#1c1c1e] rounded-xl overflow-hidden border border-[#2a2a2c] shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500">
              <div className="bg-[#2a2a2c] px-4 py-2 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-400">CoderBuddy Preview</span>
                <div></div>
              </div>
              <iframe
                srcDoc={getPreviewContent()}
                className="w-full h-[600px] border-none bg-white"
                title="Project Preview"
                sandbox="allow-scripts"
              />
            </div>
          )}
        </div>

        {/* Projects section */}
        <ProjectsSection />
      </div>
    </main>
  );
}
