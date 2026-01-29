export function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Main gradient orb */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[120%] h-[80%]"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 60%,
              rgba(59, 130, 246, 0.4) 0%,
              rgba(139, 92, 246, 0.3) 25%,
              rgba(236, 72, 153, 0.5) 50%,
              rgba(244, 63, 94, 0.4) 70%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Blue glow at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%]"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 50% at 50% 0%,
              rgba(59, 130, 246, 0.3) 0%,
              rgba(30, 64, 175, 0.2) 40%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Pink/magenta glow at bottom */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[60%]"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 100%,
              rgba(236, 72, 153, 0.5) 0%,
              rgba(244, 63, 94, 0.4) 30%,
              rgba(251, 113, 133, 0.3) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Center bright spot */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[60%] h-[40%]"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 40% at 50% 50%,
              rgba(59, 130, 246, 0.2) 0%,
              transparent 70%
            )
          `,
        }}
      />
    </div>
  );
}
