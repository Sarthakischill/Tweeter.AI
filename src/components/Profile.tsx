"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { IoApps } from "react-icons/io5";
import UsageCount from "./UsageCount"
import Link from "next/link";
import { signOut } from "@/lib/supabase";
import { useAuth } from "@/app/Providers";
import { AuthDialog } from "./auth/AuthDialog";

export default function Profile() {
    const { user, refreshSession } = useAuth();
    
    const handleSignOut = async () => {
        await signOut();
        refreshSession();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:border-none focus:outline-none">
                {
                    user ? (
                        <Avatar className="max-sm:w-6 max-sm:h-6">
                            <AvatarImage src="/p8.png" alt="profile" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    ) : <IoApps className="w-5 h-5 hover:scale-110 transition-all duration-300" />
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel><UsageCount /></DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    user ? (
                        <>
                            <Link href='/history'>
                                <DropdownMenuItem>
                                    History
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
                        </>
                    ) : (
                        <AuthDialog 
                            trigger={
                                <div className="flex w-full items-start pl-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                                    Sign In
                                </div>
                            }
                            onSuccessfulAuth={refreshSession}
                        />
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}