"use client"

import Link from "next/link";
import fontInter from "@/app/font";
import useResult from "@/hooks/useResult";
import { Twitter, Info, Github } from "lucide-react";
import { useState } from "react";
import InfoModal from "./InfoModal";

export default function Footer() {
    const { result } = useResult();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    return (
        <footer className={`w-full flex flex-col gap-1 items-center transition-all duration-300 ${result ? 'hidden' : ''}`}>
            <div>
                <ul className="flex gap-8 items-center dark:text-gray-400 text-sm max-sm:text-xs">
                    <li>
                        <Link href="https://x.com/fardeen14693425" aria-label="X (formerly Twitter)" target="_blank" rel="noopener noreferrer">
                            <Twitter size={18} className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors" />
                        </Link>
                    </li>

                    <li>
                        <button 
                            aria-label="About Tweeter.AI" 
                            onClick={() => setIsInfoModalOpen(true)}
                            className="flex items-center justify-center focus:outline-none"
                        >
                            <Info size={18} className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors" />
                        </button>
                    </li>
                    
                    <li>
                        <Link href="https://github.com/Fardeen26" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <Github size={18} className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors" />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`${fontInter} text-xs text-gray-500 dark:text-gray-400`}>© 2025 Flick.AI from Sarthak</div>
            
            {/* Info Modal */}
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
        </footer>
    )
}