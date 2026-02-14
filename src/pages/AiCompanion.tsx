import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Brain, SmilePlus, AlertTriangle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserData } from "@/hooks/useUserData";

type Intensity = "low" | "medium" | "high";

function describeIntensity(label: string, value: Intensity, lang: 'en' | 'hi') {
  if (lang === 'hi') {
    const hiLabel = label === "Stress Level" ? "तनाव स्तर" : label === "Sadness Level" ? "उदासी स्तर" : "गुस्सा स्तर";
    if (value === "low") return `${hiLabel}: कम - मौजूद है लेकिन प्रबंधनीय है।`;
    if (value === "medium") return `${hiLabel}: मध्यम - स्पष्ट रूप से मनोदशा और ध्यान को प्रभावित कर रहा है।`;
    return `${hiLabel}: उच्च - महत्वपूर्ण भावनात्मक बोझ जिस पर ध्यान देने की आवश्यकता है।`;
  }
  if (value === "low") return `${label}: Low – Present but manageable.`;
  if (value === "medium") return `${label}: Medium – Clearly affecting mood and focus.`;
  return `${label}: High – Significant emotional burden requiring attention.`;
}

export default function AiCompanion() {
  const { language } = useLanguage();
  const { logEmotion } = useUserData();
  const [relationshipType, setRelationshipType] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [stress, setStress] = useState<Intensity>("medium");
  const [sadness, setSadness] = useState<Intensity>("low");
  const [anger, setAnger] = useState<Intensity>("low");
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<{ title: string; content: string[]; type: "info" | "success" | "warning" }[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Log for dashboard (Simplified logic for now)
    const isNegative = stress !== "low" || anger !== "low" || sadness !== "low";
    logEmotion(isNegative ? 'negative' : 'positive');

    // Simulated psych logic
    setTimeout(() => {
      const sections: { title: string; content: string[]; type: "info" | "success" | "warning" }[] = [];

      if (language === 'hi') {
        // Section 1: Validation
        sections.push({
          title: "आपके अनुभव की पुष्टि",
          content: [
            "आपकी भावनाएं आपकी वर्तमान परिस्थितियों के लिए एक मान्य प्रतिक्रिया हैं। अभिभूत महसूस करना समझ में आता है, और आप अति प्रतिक्रिया नहीं कर रहे हैं।",
            "अपनी भावनाओं को स्वीकार करना स्पष्टता और उपचार की दिशा में पहला कदम है।",
          ],
          type: "success",
        });

        // Section 2: Analysis based on levels
        const analysisPoints = [];
        analysisPoints.push(describeIntensity("तनाव स्तर", stress, 'hi'));
        analysisPoints.push(describeIntensity("उदासी स्तर", sadness, 'hi'));
        analysisPoints.push(describeIntensity("गुस्सा स्तर", anger, 'hi'));

        sections.push({
          title: "भावनात्मक पैटर्न विश्लेषण",
          content: analysisPoints,
          type: "info",
        });

        // Section 3: Actionable Advice
        const advice = [];
        if (anger === "high") advice.push("गहरी बातचीत करने से पहले 20 मिनट के 'कूल-डाउन' पीरियड की सलाह दी जाती है।");
        if (stress === "high") advice.push("निर्णय लेने या चर्चा करने से पहले अपनी ऊर्जा को फिर से संगठित करने के लिए 'सेफ स्पेस' ब्रीदिंग टूल का उपयोग करें।");
        if (sadness === "high") advice.push("अपने साथी के साथ साझा करें कि आपको अभी कैसा महसूस हो रहा है, बिना समाधान मांगे, बस सुनने के लिए कहें।");
        advice.push("आज की बातचीत में 'मैं' (I) बयानों का प्रयोग करें ताकि आप अपने साथी पर दोष लगाने के बजाय अपनी भावनाओं को साझा कर सकें।");

        sections.push({
          title: "मनोवैज्ञानिक सिफारिशें",
          content: advice,
          type: "warning",
        });
      } else {
        // ENGLISH LOGIC
        sections.push({
          title: "Validation of Your Experience",
          content: [
            "Your feelings are a valid response to your current circumstances. It is understandable to feel overwhelmed, and you are not overreacting.",
            "Acknowledging your emotions is the first step toward clarity and healing.",
          ],
          type: "success",
        });

        const analysisPoints = [];
        analysisPoints.push(describeIntensity("Stress Level", stress, 'en'));
        analysisPoints.push(describeIntensity("Sadness Level", sadness, 'en'));
        analysisPoints.push(describeIntensity("Anger Level", anger, 'en'));

        sections.push({
          title: "Emotional Pattern Analysis",
          content: analysisPoints,
          type: "info",
        });

        const advice = [];
        if (anger === "high") advice.push("A 20-minute 'cool-down' period is recommended before engaging in deep conversation.");
        if (stress === "high") advice.push("Use the 'Safe Space' breathing tool to recalibrate your nervous system before discussion.");
        if (sadness === "high") advice.push("Share with your partner how you are feeling without asking for a solution yet; just ask for a witness.");
        advice.push("Use 'I' statements in today's interactions to share your experience rather than projecting blame.");

        sections.push({
          title: "Psychological Recommendations",
          content: advice,
          type: "warning",
        });
      }

      setResult(sections);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="px-4 py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Brain className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "AI रिलेशनशिप साथी" : "AI Relationship Companion"}</h1>
          <p className="mt-4 text-muted-foreground text-lg italic">
            {language === 'hi' ? "एक सुरक्षित स्थान जहाँ आप अपनी भावनाओं को बिना किसी हिचकिचाहट के साझा कर सकते हैं।" : "Objective, psychological reflection for your shared journey."}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>{language === 'hi' ? "रिश्ते का प्रकार" : "Relationship Type"}</Label>
                  <Select value={relationshipType} onValueChange={setRelationshipType}>
                    <SelectTrigger className="rounded-xl border-border/50 bg-muted/30">
                      <SelectValue placeholder={language === 'hi' ? "चुनें..." : "Select type..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partner">{language === 'hi' ? "पार्टनर" : "Partner / Spouse"}</SelectItem>
                      <SelectItem value="parent">{language === 'hi' ? "माता-पिता" : "Parent"}</SelectItem>
                      <SelectItem value="friend">{language === 'hi' ? "मित्र" : "Friend"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{language === 'hi' ? "आज का मुख्य बिंदु" : "Main Focus Today"}</Label>
                  <Select value={focusArea} onValueChange={setFocusArea}>
                    <SelectTrigger className="rounded-xl border-border/50 bg-muted/30">
                      <SelectValue placeholder={language === 'hi' ? "चुनें..." : "Select focus..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conflict">{language === 'hi' ? "हालिया संघर्ष" : "Recent Conflict"}</SelectItem>
                      <SelectItem value="distance">{language === 'hi' ? "भावनात्मक दूरी" : "Emotional Distance"}</SelectItem>
                      <SelectItem value="growth">{language === 'hi' ? "रिश्ते में विकास" : "Desire for Growth"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-muted/30 p-6 border border-border/10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{language === 'hi' ? "आप वर्तमान में कैसा महसूस कर रहे हैं?" : "How are you feeling right now?"}</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs">{language === 'hi' ? "तनाव (Stress)" : "Stress"}</Label>
                    <Select value={stress} onValueChange={(v: Intensity) => setStress(v)}>
                      <SelectTrigger className="h-8 bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{language === 'hi' ? "कम" : "Low"}</SelectItem>
                        <SelectItem value="medium">{language === 'hi' ? "मध्यम" : "Medium"}</SelectItem>
                        <SelectItem value="high">{language === 'hi' ? "उच्च" : "High"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{language === 'hi' ? "उदासी (Sadness)" : "Sadness"}</Label>
                    <Select value={sadness} onValueChange={(v: Intensity) => setSadness(v)}>
                      <SelectTrigger className="h-8 bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{language === 'hi' ? "कम" : "Low"}</SelectItem>
                        <SelectItem value="medium">{language === 'hi' ? "मध्यम" : "Medium"}</SelectItem>
                        <SelectItem value="high">{language === 'hi' ? "उच्च" : "High"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">{language === 'hi' ? "गुस्सा (Anger)" : "Anger"}</Label>
                    <Select value={anger} onValueChange={(v: Intensity) => setAnger(v)}>
                      <SelectTrigger className="h-8 bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{language === 'hi' ? "कम" : "Low"}</SelectItem>
                        <SelectItem value="medium">{language === 'hi' ? "मध्यम" : "Medium"}</SelectItem>
                        <SelectItem value="high">{language === 'hi' ? "उच्च" : "High"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === 'hi' ? "स्थिति क्या है?" : "What's on your mind?"}</Label>
                <Textarea
                  placeholder={language === 'hi' ? "वह क्या हुआ या क्या महसूस हुआ साझा करें..." : "Share what happened or how you feel..."}
                  className="min-h-[150px] rounded-2xl border-border/50 bg-muted/30 p-4 transition-all focus:min-h-[200px]"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !situation}
                className="w-full h-12 text-lg rounded-xl gradient-primary border-0 text-primary-foreground shadow-soft"
              >
                {loading ? (language === 'hi' ? "विश्लेषण हो रहा है..." : "Analyzing Situation...") : (language === 'hi' ? "प्रतिबिंब प्राप्त करें" : "Receive Reflection")}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
                <SmilePlus className="h-5 w-5" />
                <span>{language === 'hi' ? "हम यहाँ क्यों हैं" : "Why we are here"}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === 'hi'
                  ? "HeartHeaven थेरेपी का विकल्प नहीं है, लेकिन यह आपको भावनाओं के उस पल में 'थर्ड-पर्सन' परिप्रेक्ष्य देने के लिए बनाया गया है जब सब कुछ धुंधला महसूस होता है।"
                  : "HeartHeaven isn't a replacement for therapy, but it is designed to give you a 'third-person' perspective in the heat of the moment when emotions cloud clarity."}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4 text-warning font-semibold">
                <AlertTriangle className="h-5 w-5" />
                <span>{language === 'hi' ? "प्राइवेसी नोट" : "Privacy Note"}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === 'hi'
                  ? "आपका डेटा आपके ब्राउज़र में ही रहता है। हम आपकी बातचीत को हमारे सर्वर पर स्थायी रूप से संगृहित नहीं करते हैं।"
                  : "Your data stays in your browser. We do not permanently store your conversations on our servers."}
              </p>
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-12 space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold px-2">{language === 'hi' ? "AI विश्लेषण" : "Your AI Reflection"}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {result.map((section, i) => (
                <div key={i} className={`rounded-3xl border border-border/50 bg-card p-6 shadow-card transition-all hover:shadow-hover`}>
                  <h3 className="mb-4 text-lg font-bold flex items-center gap-2 uppercase tracking-tight text-primary">
                    <Sparkles className="h-4 w-4" />
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.content.map((para, j) => (
                      <p key={j} className="text-sm text-muted-foreground leading-relaxed bg-muted/10 p-2 rounded-lg border border-border/5">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-8">
              <Link to="/translator">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  {language === 'hi' ? "इमोशनल अनुवादक आजमाएं" : "Try Emotional Translator"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
