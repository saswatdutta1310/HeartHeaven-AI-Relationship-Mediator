import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Heart, Ear, Shield, ScanFace, Calendar, Thermometer, Gift, BookOpen, HeartHandshake, Handshake, Telescope, Bird, Star, Trophy, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const daysEn = [
  { icon: Heart, title: "Appreciation Foundation", task: "Share 3 things you appreciate about your partner", tip: "Be specific — focus on character, not just actions." },
  { icon: Ear, title: "Active Listening", task: "Have a 15-minute conversation where you ONLY listen", tip: "No interrupting. Summarize what you heard." },
  { icon: Shield, title: "Boundary Setting", task: 'Share one boundary you need respected', tip: 'Use "I need..." statements. Be clear and specific.' },
  { icon: ScanFace, title: "Accountability Moment", task: "Apologize for one thing you did wrong", tip: 'No "but" or excuses. Name the action and its impact.' },
  { icon: Calendar, title: "Quality Time", task: "Plan a distraction-free date (no phones, 2+ hours)", tip: "Do something you both enjoy." },
  { icon: Thermometer, title: "Emotional Check-In", task: "Rate how you feel about the relationship (0-10)", tip: "Both partners rate independently, then share." },
  { icon: Gift, title: "Love Language Discovery", task: "Identify and speak each other's love language", tip: "Words, Quality Time, Touch, Acts of Service, or Gifts." },
  { icon: BookOpen, title: "Gratitude Journal", task: "Write 5 things going well in your relationship", tip: "Be specific. Include small moments." },
  { icon: HeartHandshake, title: "Conflict Repair", task: "Address one unresolved issue with healthy communication", tip: 'Use "I feel" statements. Seek to understand, not win.' },
  { icon: Handshake, title: "Physical Connection", task: "Increase non-sexual physical touch", tip: "Hold hands, long hugs, cuddling while talking." },
  { icon: Telescope, title: "Future Visioning", task: "Discuss what you want in 6 months", tip: "Share fears and dreams. Find common vision." },
  { icon: Bird, title: "Forgiveness Practice", task: "Choose to forgive one past hurt", tip: "Forgiveness ≠ forgetting. It releases resentment." },
  { icon: Star, title: "Appreciation Ritual", task: "Create a weekly appreciation ritual", tip: "Weekly check-ins, gratitude sharing, or date nights." },
  { icon: Trophy, title: "Commitment & Celebration", task: "Celebrate your progress and commit to next steps", tip: "Review the 14 days together. What changed?" },
];

const daysHi = [
  { icon: Heart, title: "प्रशंसा की नींव", task: "3 चीजें साझा करें जिनकी आप अपने साथी के बारे में सराहना करते हैं", tip: "विशिष्ट बनें - चरित्र पर ध्यान दें, केवल कार्यों पर नहीं।" },
  { icon: Ear, title: "सक्रिय श्रवण", task: "15 मिनट की बातचीत करें जहाँ आप केवल सुनते हैं", tip: "कोई बाधा नहीं। जो आपने सुना उसका सारांश दें।" },
  { icon: Shield, title: "सीमा निर्धारण", task: 'एक सीमा साझा करें जिसे आप सम्मान चाहते हैं', tip: '"मुझे चाहिए..." बयानों का प्रयोग करें। स्पष्ट और विशिष्ट रहें।' },
  { icon: ScanFace, title: "जवाबदेही का क्षण", task: "एक गलत काम के लिए माफी मांगें", tip: 'कोई "लेकिन" या बहाना नहीं। कार्रवाई और उसके प्रभाव का नाम लें।' },
  { icon: Calendar, title: "गुणवत्ता समय", task: "एक व्याकुलता-मुक्त डेट की योजना बनाएं (कोई फोन नहीं, 2+ घंटे)", tip: "कुछ ऐसा करें जिसका आप दोनों आनंद लें।" },
  { icon: Thermometer, title: "भावनात्मक चेक-इन", task: "रिश्ते के बारे में आप कैसा महसूस करते हैं (0-10) रेट करें", tip: "दोनों साथी स्वतंत्र रूप से रेट करें, फिर साझा करें।" },
  { icon: Gift, title: "प्रेम भाषा की खोज", task: "एक-दूसरे की प्रेम भाषा को पहचानें और बोलें", tip: "शब्द, गुणवत्ता समय, स्पर्श, सेवा के कार्य, या उपहार।" },
  { icon: BookOpen, title: "कृतज्ञता जर्नल", task: "अपने रिश्ते में अच्छी चल रही 5 चीजें लिखें", tip: "विशिष्ट बनें। छोटे पलों को शामिल करें।" },
  { icon: HeartHandshake, title: "संघर्ष मरम्मत", task: "स्वस्थ संचार के साथ एक अनसुलझे मुद्दे को संबोधित करें", tip: '"मुझे लगता है" बयानों का प्रयोग करें। समझने की कोशिश करें, जीतने की नहीं।' },
  { icon: Handshake, title: "शारीरिक संबंध", task: "गैर-यौन शारीरिक स्पर्श बढ़ाएं", tip: "हाथ पकड़ना, लंबे समय तक गले लगना, बात करते समय गले मिलना।" },
  { icon: Telescope, title: "भविष्य की दृष्टि", task: "चर्चा करें कि आप 6 महीने में क्या चाहते हैं", tip: "डर और सपनों को साझा करें। सामान्य दृष्टि खोजें।" },
  { icon: Bird, title: "क्षमा अभ्यास", task: "एक पिछले चोट को माफ करने के लिए चुनें", tip: "क्षमा ≠ भूलना। यह आक्रोश को मुक्त करता है।" },
  { icon: Star, title: "प्रशंसा अनुष्ठान", task: "एक साप्ताहिक प्रशंसा अनुष्ठान बनाएं", tip: "साप्ताहिक चेक-इन्स, कृतज्ञता साझा करना, या डेट नाइट्स।" },
  { icon: Trophy, title: "प्रतिबद्धता और उत्सव", task: "अपनी प्रगति का जश्न मनाएं और अगले कदमों के लिए प्रतिबद्ध हों", tip: "एक साथ 14 दिनों की समीक्षा करें। क्या बदला?" },
];

export default function RepairPlan() {
  const { t, language } = useLanguage();
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [expanded, setExpanded] = useState<number | null>(null);

  const days = language === 'hi' ? daysHi : daysEn;

  const toggleComplete = (i: number) => {
    const next = new Set(completed);
    if (next.has(i)) {
      next.delete(i);
    } else {
      next.add(i);
    }
    setCompleted(next);
  };

  const streak = () => {
    let count = 0;
    for (let i = 0; i < days.length; i++) {
      if (completed.has(i)) count++;
      else break;
    }
    return count;
  };

  const progress = Math.round((completed.size / days.length) * 100);

  return (
    <div className="px-4 py-12 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "14-दिवसीय संबंध सुधार योजना" : "14-Day Relationship Repair Plan"}</h1>
          <p className="mt-3 text-muted-foreground">{language === 'hi' ? "छोटे दैनिक कार्य जो स्थायी परिवर्तन लाते हैं" : "Small daily actions that create lasting change"}</p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border/50 bg-card p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-gradient">{completed.size}/14</div>
            <p className="text-xs text-muted-foreground">{language === 'hi' ? "दिन पूरे हुए" : "Days Complete"}</p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-4 text-center shadow-card">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <Flame className="h-6 w-6 text-warning" /> {streak()}
            </div>
            <p className="text-xs text-muted-foreground">{language === 'hi' ? "दिन की स्ट्रीक" : "Day Streak"}</p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-4 text-center shadow-card">
            <div className="text-2xl font-bold text-gradient">{progress}%</div>
            <p className="text-xs text-muted-foreground">{language === 'hi' ? "पूरी" : "Complete"}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Day cards */}
        <div className="mt-8 space-y-3">
          {days.map((day, i) => {
            const Icon = day.icon;
            const isExpanded = expanded === i;
            const isDone = completed.has(i);

            return (
              <div
                key={i}
                className={`rounded-2xl border bg-card shadow-card overflow-hidden transition-all duration-300 ${isDone ? "border-success/30" : "border-border/50"
                  }`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${isDone ? "bg-success/10" : "bg-primary/10"
                    }`}>
                    {isDone ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Icon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary">{language === 'hi' ? `दिन ${i + 1}` : `Day ${i + 1}`}</span>
                      {isDone && <span className="text-xs text-success">{language === 'hi' ? "✓ पूर्ण" : "✓ Complete"}</span>}
                    </div>
                    <h3 className="font-semibold truncate">{day.title}</h3>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border/50 p-5 animate-fade-in">
                    <div className="rounded-xl bg-primary/5 p-4">
                      <p className="font-medium text-sm">{language === 'hi' ? "📋 आज का काम" : "📋 Today's Task"}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{day.task}</p>
                    </div>
                    <div className="mt-3 rounded-xl bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">💡 {day.tip}</p>
                    </div>
                    <div className="mt-4">
                      <label className="text-xs font-medium text-muted-foreground">{language === 'hi' ? "प्रतिबिंब नोट्स" : "Reflection Notes"}</label>
                      <Textarea
                        value={notes[i] || ""}
                        onChange={(e) => setNotes({ ...notes, [i]: e.target.value })}
                        placeholder={language === 'hi' ? "यह कैसा रहा? आपने क्या सीखा?" : "How did this go? What did you learn?"}
                        className="mt-1 min-h-[80px] resize-none rounded-xl"
                      />
                    </div>
                    <Button
                      onClick={() => toggleComplete(i)}
                      className={`mt-4 w-full ${isDone ? "bg-muted text-muted-foreground hover:bg-muted/80" : "gradient-primary border-0 text-primary-foreground"}`}
                    >
                      {isDone
                        ? (language === 'hi' ? "अपूर्ण चिह्नित करें" : "Mark Incomplete")
                        : (language === 'hi' ? "पूर्ण चिह्नित करें ✓" : "Mark Complete ✓")}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {completed.size === 14 && (
          <div className="mt-8 animate-fade-in rounded-2xl gradient-primary p-8 text-center text-primary-foreground">
            <Trophy className="mx-auto h-12 w-12" />
            <h2 className="mt-4 text-2xl font-bold">{language === 'hi' ? "🎉 बधाई हो!" : "🎉 Congratulations!"}</h2>
            <p className="mt-2">{language === 'hi' ? "आपने 14-दिवसीय मरम्मत योजना पूरी की। इसमें वास्तविक प्रतिबद्धता लगती है।" : "You completed the 14-Day Repair Plan. That takes real commitment."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
