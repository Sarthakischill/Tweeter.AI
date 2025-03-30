"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()
    
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    
    return (
        <Button 
            variant='outline' 
            className="hover:scale-110 transition-all duration-300"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun className="w-4 h-4 p-0 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
            <Moon className="absolute w-4 h-4 p-0 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}