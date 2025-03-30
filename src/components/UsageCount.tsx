"use client"

import { MAX_FREE_USES, useUsageTracker } from "@/hooks/useUsageTracker";
import { useAuth } from "@/app/Providers";
import { CgInfinity } from "react-icons/cg";

export default function UsageCount() {
    const { usageCount } = useUsageTracker();
    const { user } = useAuth();
    
    return (
        <p className="text-xs flex items-center">
            Credit Left:&nbsp;&nbsp;{user ? <span><CgInfinity className="w-4 h-4" /></span> : MAX_FREE_USES - usageCount}
        </p>
    )
}