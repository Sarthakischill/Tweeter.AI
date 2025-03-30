import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import DotPatternBackground from "@/components/DotPatternBackground";
import { Toaster } from 'sonner'
import Providers from "./Providers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tweeter.AI",
  description: "Refine your tweet with AI",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage_grotesque_init.className} antialiased h-screen dark:bg-black bg-white`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <Toaster />
            <DotPatternBackground />
            <SidebarTrigger />
            {children}
            <Analytics />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
