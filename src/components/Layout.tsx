import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/AuthDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const { t } = useLanguage();

  const mainNavItems = [
    { label: "Home", path: "/" },
    { label: t("nav_safe_space"), path: "/safe-space" },
    { label: "How it Works", path: "/how-it-works" },
    { label: t("nav_dashboard"), path: "/dashboard" },
  ];

  const moreNavItems = [
    { label: t("nav_ai_companion"), path: "/ai-companion" },
    { label: t("nav_translator"), path: "/translator" },
    { label: t("nav_flags"), path: "/flags" },
    { label: "Fix or Leave", path: "/fix-or-leave" },
    { label: "Repair Plan", path: "/repair-plan" },
  ];

  const openSignIn = () => {
    setAuthTab("signin");
    setAuthOpen(true);
  };
  const openSignUp = () => {
    setAuthTab("signup");
    setAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg">
            <img src="/logo.png" alt="HeartHeaven Logo" className="h-8 w-8 object-contain" />
            <div className="flex flex-col gap-0">
              <span className="text-gradient text-xl leading-none">HeartHeaven</span>
              <span className="text-[0.5rem] tracking-widest text-muted-foreground font-normal uppercase">Understanding before reacting.</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${location.pathname === item.path
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted flex items-center gap-1 ${moreNavItems.some((i) => location.pathname === i.path)
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                    }`}
                >
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {moreNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground max-w-[140px] truncate">
                  {user.name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-destructive hover:bg-destructive/10">
                  {t('btn_signout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={openSignIn}>
                  {t('btn_signin')}
                </Button>
                <Button
                  size="sm"
                  className="rounded-full px-5 gradient-primary border-0 text-primary-foreground shadow-soft"
                  onClick={openSignUp}
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-1">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border/50 bg-card p-4 md:hidden animate-in slide-in-from-top duration-300">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${location.pathname === item.path
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
              More features
            </div>
            {moreNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${location.pathname === item.path
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-2 p-4 border-t border-border/30">
              {isAuthenticated && user ? (
                <>
                  <p className="px-4 text-sm text-muted-foreground truncate mb-2">
                    {user.name || user.email}
                  </p>
                  <Button variant="outline" className="w-full rounded-xl" onClick={() => { signOut(); setOpen(false); }}>
                    {t('btn_signout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full rounded-xl" onClick={() => { openSignIn(); setOpen(false); }}>
                    {t('btn_signin')}
                  </Button>
                  <Button
                    className="w-full rounded-xl gradient-primary border-0 text-primary-foreground"
                    onClick={() => { openSignUp(); setOpen(false); }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg">
            <img src="/logo.png" alt="HeartHeaven Logo" className="h-8 w-8 object-contain" />
            <div className="flex flex-col gap-0">
              <span className="text-gradient text-xl leading-none">HeartHeaven</span>
              <span className="text-[0.5rem] tracking-widest text-muted-foreground font-normal uppercase">Understanding before reacting.</span>
            </div>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/translator" className="hover:text-foreground transition-colors">Translator</Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Made with 💜 for healthier relationships. Easy to use, safe, and free for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
