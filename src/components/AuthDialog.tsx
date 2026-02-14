import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
};

export function AuthDialog({ open, onOpenChange, defaultTab = "signin" }: AuthDialogProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error(language === 'hi' ? "कृपया अपना ईमेल और पासवर्ड दर्ज करें।" : "Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      toast.success(language === 'hi' ? "वापसी पर स्वागत है!" : "Welcome back!");
      onOpenChange(false);
      setEmail("");
      setPassword("");
    } catch {
      toast.error(language === 'hi' ? "कुछ गलत हो गया। कृपया पुन: प्रयास करें।" : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error(language === 'hi' ? "कृपया अपना ईमेल और पासवर्ड दर्ज करें।" : "Please enter your email and a password.");
      return;
    }
    if (password.length < 6) {
      toast.error(language === 'hi' ? "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" : "Password should be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password, name.trim() || undefined);
      toast.success(language === 'hi' ? "खाता बनाया गया! HeartHeaven में आपका स्वागत है।" : "Account created! Welcome to HeartHeaven.");
      onOpenChange(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch {
      toast.error(language === 'hi' ? "कुछ गलत हो गया। कृपया पुन: प्रयास करें।" : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success(language === 'hi' ? "गूगल के साथ साइन इन किया गया!" : "Signed in with Google!");
      onOpenChange(false);
    } catch {
      toast.error(language === 'hi' ? "कुछ गलत हो गया। कृपया पुन: प्रयास करें।" : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{language === 'hi' ? "HeartHeaven में आपका स्वागत है" : "Welcome to HeartHeaven"}</DialogTitle>
          <DialogDescription>
            {language === 'hi' ? "अपनी प्रगति को बचाने और डैशबोर्ड का उपयोग करने के लिए साइन इन करें या खाता बनाएं।" : "Sign in or create an account to save your progress and use your dashboard."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} key={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{language === 'hi' ? "साइन इन" : "Sign In"}</TabsTrigger>
            <TabsTrigger value="signup">{language === 'hi' ? "साइन अप" : "Sign Up"}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogle}
              disabled={loading}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {language === 'hi' ? "गूगल के साथ जारी रखें" : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{language === 'hi' ? "या ईमेल के साथ" : "Or with email"}</span>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">{language === 'hi' ? "ईमेल" : "Email"}</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">{language === 'hi' ? "पासवर्ड" : "Password"}</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" className="w-full gradient-primary border-0" disabled={loading}>
                  {loading ? (language === 'hi' ? "साइन इन हो रहा है…" : "Signing in…") : (language === 'hi' ? "साइन इन" : "Sign In")}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogle}
              disabled={loading}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {language === 'hi' ? "गूगल के साथ जारी रखें" : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{language === 'hi' ? "या ईमेल के साथ" : "Or with email"}</span>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">{language === 'hi' ? "नाम (वैकल्पिक)" : "Name (optional)"}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder={language === 'hi' ? "आपका नाम" : "Your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">{language === 'hi' ? "ईमेल" : "Email"}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{language === 'hi' ? "पासवर्ड (कम से कम 6 अक्षर)" : "Password (min 6 characters)"}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" className="w-full gradient-primary border-0" disabled={loading}>
                  {loading ? (language === 'hi' ? "खाता बन रहा है…" : "Creating account…") : (language === 'hi' ? "खाता बनाएँ" : "Create Account")}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
