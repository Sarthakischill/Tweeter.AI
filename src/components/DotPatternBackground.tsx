"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DotPatternBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDarkMode = theme === "dark";
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-white dark:bg-black">
        {/* Base gradient layer */}
        <div 
          className="absolute inset-0 animate-gradient-slow"
          style={{
            backgroundImage: isDarkMode 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(245, 158, 11, 0.08) 25%, rgba(236, 72, 153, 0.08) 50%, rgba(59, 130, 246, 0.08) 75%, rgba(37, 99, 235, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(245, 158, 11, 0.15) 25%, rgba(236, 72, 153, 0.15) 50%, rgba(59, 130, 246, 0.15) 75%, rgba(37, 99, 235, 0.15) 100%)',
            backgroundSize: '400% 400%',
          }}
        />
        
        {/* First radial gradient layer */}
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 25% 15%, rgba(252, 165, 165, 0.12) 0%, transparent 35%), radial-gradient(circle at 75% 85%, rgba(37, 99, 235, 0.12) 0%, transparent 35%)'
              : 'radial-gradient(circle at 25% 15%, rgba(252, 165, 165, 0.2) 0%, transparent 35%), radial-gradient(circle at 75% 85%, rgba(37, 99, 235, 0.2) 0%, transparent 35%)'
          }}
        />
        
        {/* Second radial gradient layer */}
        <div 
          className="absolute inset-0 animate-pulse-slower"
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 85% 25%, rgba(37, 99, 235, 0.08) 0%, transparent 35%), radial-gradient(circle at 15% 65%, rgba(250, 204, 21, 0.08) 0%, transparent 35%)'
              : 'radial-gradient(circle at 85% 25%, rgba(37, 99, 235, 0.15) 0%, transparent 35%), radial-gradient(circle at 15% 65%, rgba(250, 204, 21, 0.15) 0%, transparent 35%)'
          }}
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 mix-blend-overlay animate-gradient-reverse"
          style={{
            backgroundImage: isDarkMode
              ? 'linear-gradient(45deg, rgba(254, 240, 138, 0.04) 0%, rgba(236, 72, 153, 0.04) 35%, rgba(239, 68, 68, 0.04) 70%, rgba(59, 130, 246, 0.04) 100%)'
              : 'linear-gradient(45deg, rgba(254, 240, 138, 0.1) 0%, rgba(236, 72, 153, 0.1) 35%, rgba(239, 68, 68, 0.1) 70%, rgba(59, 130, 246, 0.1) 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Moving dot grid */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-3 animate-slide-slow"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Dot pattern overlay */}
      <DotPattern
        glow={true}
        width={25}
        height={25}
        cr={1.5}
        className={cn(
          "[mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]",
          isDarkMode ? "opacity-45" : "opacity-60", 
          "z-10"
        )}
      />

      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes gradient-reverse {
          0% { background-position: 100% 50% }
          50% { background-position: 0% 50% }
          100% { background-position: 100% 50% }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 1 }
          50% { opacity: 0.7 }
          100% { opacity: 1 }
        }
        
        @keyframes pulse-slower {
          0% { opacity: 0.7 }
          50% { opacity: 1 }
          100% { opacity: 0.7 }
        }
        
        @keyframes slide-slow {
          0% { transform: translateY(0) translateX(0) }
          50% { transform: translateY(20px) translateX(20px) }
          100% { transform: translateY(0) translateX(0) }
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }
        
        .animate-gradient-reverse {
          animation: gradient-reverse 12s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 15s ease-in-out infinite;
        }
        
        .animate-slide-slow {
          animation: slide-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 