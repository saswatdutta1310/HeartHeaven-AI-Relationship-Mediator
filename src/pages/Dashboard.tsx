import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingDown, AlertTriangle, Flag, Brain, Heart, ArrowRight, UserPlus, LogIn } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { useLanguage } from "@/contexts/LanguageContext";

function HealthScore({ score }: { score: number }) {
  const { t, language: lang } = useLanguage();

  const getColor = () => {
    if (score <= 40) return "text-destructive";
    if (score <= 65) return "text-warning";
    if (score <= 85) return "text-success";
    return "text-greenflag";
  };
  const getLabel = () => {
    if (score <= 40) return lang === 'hi' ? "गंभीर" : "Critical";
    if (score <= 65) return lang === 'hi' ? "ध्यान देने की आवश्यकता" : "Needs Attention";
    if (score <= 85) return lang === 'hi' ? "स्वस्थ" : "Healthy";
    return lang === 'hi' ? "समृद्ध" : "Thriving";
  };
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${getColor()} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getColor()}`}>{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className={`mt-3 font-semibold ${getColor()}`}>{getLabel()}</span>
      <span className="text-sm text-muted-foreground">{t('health_score_sub')}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user, isAuthenticated, signInWithGoogle } = useAuth();
  const { stats } = useUserData();
  const { t, language: lang } = useLanguage();

  const hasData = stats && (stats.conflicts.length > 0 || stats.emotions.length > 0);

  const calculateScore = () => {
    if (!hasData) return 50;
    let score = 50;
    score += (stats.greenFlagsFound || 0) * 5;
    score -= (stats.toxicPatternsFound || 0) * 10;
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateScore();

  const metrics = [
    {
      icon: TrendingDown,
      title: t('metrics_conflicts'),
      value: stats.conflicts.length > 0 ? `${stats.conflicts.length} ${lang === 'hi' ? 'प्रविष्टियाँ' : 'entries'}` : "0",
      sub: t('metrics_conflicts_sub'),
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      icon: Heart,
      title: t('metrics_emotions'),
      value: stats.emotions.length > 0 ? `${stats.emotions.length} ${lang === 'hi' ? 'लॉग्स' : 'logs'}` : "0",
      sub: t('metrics_emotions_sub'),
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: AlertTriangle,
      title: t('metrics_red_flags'),
      value: stats.toxicPatternsFound.toString(),
      sub: t('metrics_red_flags_sub'),
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Flag,
      title: t('metrics_green_flags'),
      value: stats.greenFlagsFound.toString(),
      sub: t('metrics_green_flags_sub'),
      color: "text-greenflag",
      bg: "bg-greenflag/10",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md bg-card rounded-3xl border border-border/50 p-10 shadow-card animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your relationship dashboard and track your progress.
          </p>
          <Button onClick={signInWithGoogle} size="lg" className="w-full gradient-primary border-0 text-primary-foreground shadow-soft">
            <LogIn className="mr-2 h-4 w-4" /> Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{t('welcome')}, {user?.name?.split(' ')[0] || 'Friend'}!</h1>
            <p className="mt-2 text-muted-foreground">{t('welcome_sub')}</p>
          </div>
          <Link to="/safe-space">
            <Button className="gradient-primary border-0 text-primary-foreground shadow-soft">
              {t('check_in_btn')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </header>

        {!hasData ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border/50 bg-card p-5 shadow-card transition-all hover:shadow-hover">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${m.bg} ${m.color} mb-4`}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{m.title}</p>
                    <h3 className="mt-1 text-2xl font-bold">{m.value}</h3>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border p-12 text-center bg-muted/30">
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                  <Brain className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('no_data_title')}</h3>
                <p className="max-w-md text-muted-foreground mb-8">
                  {t('no_data_desc')}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/safe-space"><Button variant="outline">Try Safe Space</Button></Link>
                  <Link to="/translator"><Button variant="outline">Try Translator</Button></Link>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                <h3 className="font-semibold mb-4">{t('health_score')}</h3>
                <HealthScore score={healthScore} />
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border/50 bg-card p-5 shadow-card transition-all hover:shadow-hover">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${m.bg} ${m.color} mb-4`}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{m.title}</p>
                    <h3 className="mt-1 text-2xl font-bold">{m.value}</h3>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                  <h3 className="mb-6 font-semibold">{t('chart_conflicts')}</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.conflicts.slice(-7)}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}
                          cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                  <h3 className="mb-6 font-semibold">{t('chart_emotions')}</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.emotions.slice(-7)}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}
                        />
                        <Line type="monotone" dataKey="positive" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="negative" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                <h3 className="mb-4 font-semibold">{t('health_score')}</h3>
                <HealthScore score={healthScore} />
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{t('ai_insights')}</h3>
                </div>
                <div className="space-y-3">
                  {stats.insights.map((insight, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-muted-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                <h3 className="mb-1 font-semibold">{t('quick_actions')}</h3>
                <p className="mb-4 text-xs text-muted-foreground">{t('quick_actions_sub')}</p>
                <div className="space-y-2">
                  <Link to="/translator">
                    <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                      Try Translator
                    </Button>
                  </Link>
                  <Link to="/flags">
                    <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                      Detect Flags
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
