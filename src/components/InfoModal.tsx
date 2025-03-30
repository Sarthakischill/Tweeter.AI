"use client";

import { X, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen || !mounted) return null;
  
  const isDarkMode = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with animated particles */}
      <div 
        className={cn(
          "absolute inset-0 backdrop-blur-sm particles-container",
          isDarkMode ? "bg-black/60" : "bg-white/60"
        )} 
        onClick={handleClose}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "particle absolute rounded-full", 
              isDarkMode ? "bg-white/20" : "bg-gray-900/10"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div 
        className={cn(
          "relative max-w-sm w-full transition-all duration-300 ease-out",
          isClosing ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card with double border effect */}
        <div className="p-[2px] rounded-2xl overflow-hidden relative">
          {/* Animated border - using the freeform gradient colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 opacity-80"></div>
          
          {/* Inner card */}
          <div className={cn(
            "relative rounded-2xl overflow-hidden",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-900 to-black" 
              : "bg-gradient-to-br from-white to-gray-50"
          )}>
            {/* Blurred orbs using freeform gradient colors - expanded and moved to borders */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-2xl"></div>

            {/* Content container */}
            <div className="relative px-6 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-400 to-pink-600 flex items-center justify-center">
                    <Info size={12} className="text-white" />
                  </div>
                  <h2 className={cn(
                    "font-bold text-xl",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    About Tweeter.AI
                  </h2>
                </div>
                <button 
                  onClick={handleClose}
                  className={cn(
                    "group h-7 w-7 rounded-full border flex items-center justify-center transition-colors",
                    isDarkMode 
                      ? "border-gray-700 hover:border-gray-500" 
                      : "border-gray-300 hover:border-gray-400"
                  )}
                >
                  <X 
                    size={14} 
                    className={cn(
                      "transition-colors",
                      isDarkMode 
                        ? "text-gray-500 group-hover:text-white" 
                        : "text-gray-400 group-hover:text-gray-800"
                    )} 
                  />
                </button>
              </div>

              {/* Content sections */}
              <div className="space-y-5">
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">✨</span>
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-medium mb-1",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      AI-Enhanced Tweets
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Transform your ideas into perfectly crafted messages with our AI-powered suggestions.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-yellow-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-medium mb-1",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Multiple Styles
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Choose from various tones and styles to match your voice and audience preferences.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-medium mb-1",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Instant Results
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Get immediate suggestions to iterate quickly and find the perfect version.
                    </p>
                  </div>
                </div>
              </div>

              {/* Credits and links */}
              <div className={cn(
                "mt-8 pt-5 border-t",
                isDarkMode ? "border-gray-800" : "border-gray-200"
              )}>
                <div className="flex justify-between items-center">
                  <div className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Made with <span className="text-red-500">❤️</span> by{" "}
                    <Link 
                      href="https://linktr.ee/sarthaknarang" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(
                        "transition-colors",
                        isDarkMode 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-700"
                      )}
                    >
                      Sarthak
                    </Link>
                  </div>
                  <Link 
                    href="https://github.com/Fardeen26/tweeter-ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border transition-colors",
                      isDarkMode 
                        ? "text-gray-500 hover:text-gray-300 border-gray-800 hover:border-gray-600" 
                        : "text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400"
                    )}
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(5px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(-10px); }
        }

        .particles-container {
          overflow: hidden;
        }

        .particle {
          opacity: 0;
          animation: float linear infinite, 
                    fadeInOut 5s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 