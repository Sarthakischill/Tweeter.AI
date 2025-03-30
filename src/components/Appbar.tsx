"use client";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import Profile from "./Profile";

export default function Appbar() {
    return (
        <header className="w-full">
            <nav className="w-[60vw] max-lg:w-[80vw] max-sm:w-full mx-auto flex items-center justify-between px-4">
                <h1>
                    <Link href="/" className={`font-extrabold text-xl max-sm:text-lg tracking-tight`}>
                        Tweeter.AI
                    </Link>
                </h1>

                <div className="flex items-center gap-3">
                    <ThemeToggleButton />
                    <Profile />
                </div>
            </nav>
        </header>
    )
}