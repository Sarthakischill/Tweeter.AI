import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn, signUp } from '@/lib/supabase';
import { toast } from 'sonner';
import { X, AlertCircle } from 'lucide-react';
import { 
  CustomDialog,
  CustomDialogContent,
  CustomDialogTrigger,
  CustomDialogTitle,
  CustomDialogDescription
} from "@/components/ui/custom-dialog";

type AuthMode = 'login' | 'signup';

export function AuthDialog({ trigger, onSuccessfulAuth }: { 
  trigger: React.ReactNode, 
  onSuccessfulAuth?: () => void 
}) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Reset fields and errors when switching modes
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || 'Login failed. Please check your credentials.');
          return;
        }
        toast.success('Logged in successfully');
      } else {
        // Validate password length
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        const { error } = await signUp(email, password, name);
        if (error) {
          // Handle specific error cases
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else if (error.message.includes('database')) {
            setError('There was an issue with the registration. Please try again later.');
          } else {
            setError(error.message || 'Sign up failed. Please try again.');
          }
          return;
        }
        
        toast.success('Please check your email for a confirmation link to complete your registration');
        setOpen(false);
        if (onSuccessfulAuth) onSuccessfulAuth();
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (open) {
        // Reset error when dialog opens
        setError(null);
      }
    }}>
      <CustomDialogTrigger asChild>
        {trigger}
      </CustomDialogTrigger>
      <CustomDialogContent className="sm:max-w-md p-0 gap-0 border-0 shadow-lg overflow-hidden dark:bg-gray-900 bg-white">
        <div className="relative">
          {/* Header */}
          <div className="p-6 pb-0 pr-12">
            <CustomDialogTitle className="text-xl font-semibold mb-2 dark:text-white text-gray-900">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </CustomDialogTitle>
            <CustomDialogDescription className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {mode === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Create a new account to get started'}
            </CustomDialogDescription>
          </div>
          
          {/* Close button */}
          <button 
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
          
          {/* Form */}
          <form onSubmit={handleAuth} className="p-6 pt-4">
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-300 text-sm flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {mode === 'signup' && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                  Name
                </label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  required 
                  className="w-full dark:bg-gray-800 dark:border-gray-700 border-gray-300 px-4"
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email" 
                required 
                className="w-full dark:bg-gray-800 dark:border-gray-700 border-gray-300 px-4"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Your password" 
                required 
                minLength={6}
                className="w-full dark:bg-gray-800 dark:border-gray-700 border-gray-300 px-4"
              />
              {mode === 'signup' && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
            
            {/* Actions */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
            </Button>
            
            {/* Footer */}
            <div className="mt-6 pt-4 text-center border-t border-gray-100 dark:border-gray-800">
              <button 
                type="button" 
                onClick={toggleMode} 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </CustomDialogContent>
    </CustomDialog>
  );
} 