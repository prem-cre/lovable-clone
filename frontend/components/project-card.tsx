"use client";

interface ProjectCardProps {
  title: string;
  description?: string;
  gradient?: string;
}

export function ProjectCard({ title, description, gradient = "from-indigo-500 to-purple-600" }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className={`relative h-40 rounded-xl bg-gradient-to-br ${gradient} overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium text-sm truncate">{title}</h3>
          {description && (
            <p className="text-white/70 text-xs mt-1 truncate">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
