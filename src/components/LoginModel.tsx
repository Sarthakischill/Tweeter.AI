import {
    CustomDialog,
    CustomDialogContent,
    CustomDialogTitle,
    CustomDialogDescription
} from "@/components/ui/custom-dialog"
import { LoginModelProps } from "@/types/LoginModelProps";
import { AuthDialog } from "./auth/AuthDialog";
import { useAuth } from "@/app/Providers";
import { X } from "lucide-react";

export default function LoginModal({ onClose, showLoginModal }: LoginModelProps) {
    const { refreshSession } = useAuth();
    
    return (
        <CustomDialog open={showLoginModal} onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}>
            <CustomDialogContent className="sm:max-w-md p-0 gap-0 border-0 shadow-lg overflow-hidden dark:bg-gray-900 bg-white">
                <div className="relative p-6">
                    {/* Header with adjusted padding for close button */}
                    <div className="pr-8">
                        <CustomDialogTitle className="text-xl font-semibold mb-3 dark:text-white text-gray-900">
                            Login to Continue
                        </CustomDialogTitle>
                        <CustomDialogDescription className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            You've reached the free tier usage limit. Sign in to unlock full access to our AI-powered features and continue your journey.
                        </CustomDialogDescription>
                    </div>
                    
                    {/* Close button - positioned to not overlap with content */}
                    <button 
                        onClick={onClose}
                        className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close dialog"
                    >
                        <X size={18} className="text-gray-500 dark:text-gray-400" />
                    </button>
                    
                    {/* Auth button */}
                    <AuthDialog 
                        trigger={
                            <button className="w-full rounded-md bg-gray-900 hover:bg-gray-800 px-4 py-2.5 text-sm font-medium text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                                Login or Sign Up
                            </button>
                        }
                        onSuccessfulAuth={() => {
                            refreshSession();
                            onClose();
                        }}
                    />
                </div>
            </CustomDialogContent>
        </CustomDialog>
    );
};