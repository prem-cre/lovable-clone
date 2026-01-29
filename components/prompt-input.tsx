"use client";

import { useState } from "react";
import { Plus, Paperclip, Palette, ChevronDown, BarChart3, ArrowUp } from "lucide-react";

interface PromptInputProps {
  onSubmit?: (prompt: string) => void;
}

export function PromptInput({ onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt);
      setPrompt("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-2xl border border-[#2a2a2c]">
        {/* Input area */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Ask Lovable to create a prototype..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white placeholder-[#6b6b6d] text-base outline-none"
          />
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Plus button */}
            <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2a2a2c] hover:bg-[#3a3a3c] transition-colors">
              <Plus className="w-4 h-4 text-[#8e8e93]" />
            </button>

            {/* Attach button */}
            <button className="flex items-center gap-2 px-3 h-9 rounded-lg bg-[#2a2a2c] hover:bg-[#3a3a3c] transition-colors">
              <Paperclip className="w-4 h-4 text-[#8e8e93]" />
              <span className="text-sm text-[#8e8e93]">Attach</span>
            </button>

            {/* Theme button */}
            <button className="flex items-center gap-2 px-3 h-9 rounded-lg bg-[#2a2a2c] hover:bg-[#3a3a3c] transition-colors">
              <Palette className="w-4 h-4 text-[#8e8e93]" />
              <span className="text-sm text-[#8e8e93]">Theme</span>
              <ChevronDown className="w-3 h-3 text-[#8e8e93]" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Plan button */}
            <button className="flex items-center justify-center px-4 h-9 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] transition-colors">
              <span className="text-sm font-medium text-white">Plan</span>
            </button>

            {/* Equalizer button */}
            <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#2a2a2c] transition-colors">
              <BarChart3 className="w-4 h-4 text-[#8e8e93]" />
            </button>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3a3a3c] hover:bg-[#4a4a4c] transition-colors border border-[#4a4a4c]"
            >
              <ArrowUp className="w-4 h-4 text-[#8e8e93]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
