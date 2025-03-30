"use client";

import ResultProvider from "@/context/ResultContext";
import TweetProvider from "@/context/TweetContext";
import { ThemeProvider } from "@/components/theme-provider";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, getSession, getUserProfile } from "@/lib/supabase";

// Create auth context
export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
}>({
  user: null,
  loading: true,
  refreshSession: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const { data, error } = await getSession();
      if (error) {
        console.error("Error refreshing session:", error);
        setUser(null);
        return;
      }
      
      const sessionUser = data.session?.user || null;
      
      if (sessionUser) {
        // Verify the user still exists in the database
        const { data: userProfile, error: profileError } = await getUserProfile(sessionUser.id);
        
        if (profileError || !userProfile) {
          console.error("User no longer exists in database:", profileError);
          // User was deleted, invalidate the session
          await supabase.auth.signOut();
          setUser(null);
          return;
        }
      }
      
      setUser(sessionUser);
    } catch (error) {
      console.error("Exception refreshing session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial session check
    refreshSession();

    // Set up auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        
        if (currentUser) {
          // Verify user exists in the database
          const { data: userProfile, error: profileError } = await getUserProfile(currentUser.id);
          
          if (profileError || !userProfile) {
            console.error("User no longer exists in database");
            // User was deleted, invalidate the session
            await supabase.auth.signOut();
            setUser(null);
            return;
          }
        }
        
        setUser(currentUser);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        storageKey="tweeter-theme"
      >
        <TweetProvider>
          <ResultProvider>
            {children}
          </ResultProvider>
        </TweetProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}