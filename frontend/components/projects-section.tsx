"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";

const tabs = ["Recently viewed", "My projects", "Templates"];

const projects = [
  {
    title: "Student Management System",
    description: "Educational platform",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "E-commerce Dashboard",
    description: "Sales analytics",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "AI Chat Application",
    description: "Conversational AI",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Portfolio Website",
    description: "Personal branding",
    gradient: "from-pink-500 to-rose-600",
  },
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("Recently viewed");

  return (
    <div className="w-full bg-[#0f0f10] rounded-t-3xl border-t border-[#2a2a2c]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tabs header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#2a2a2c] text-white"
                    : "text-[#8e8e93] hover:text-white hover:bg-[#1a1a1c]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 text-sm text-[#8e8e93] hover:text-white transition-colors">
            <span>Browse all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              gradient={project.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
