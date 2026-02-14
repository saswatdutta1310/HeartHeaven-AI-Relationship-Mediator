import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Flag, Gauge, Target, Users, MessageCircle, ArrowRight, Star, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const painPointsEn = [
  { icon: "🗣️", title: "Unspoken Expectations", desc: "Partners don't express what they need" },
  { icon: "💔", title: "Miscommunication", desc: "Words create wounds instead of understanding" },
  { icon: "🚫", title: "Ego & Timing", desc: "Pride prevents healthy discussions" },
  { icon: "❓", title: "Fix or Leave?", desc: "Couples don't know when to fight for it" },
  { icon: "🚩", title: "Toxic Blindness", desc: "Can't tell normal conflict from abuse" },
];

const painPointsHi = [
  { icon: "🗣️", title: "अनकही उम्मीदें", desc: "साथी यह व्यक्त नहीं करते कि उन्हें क्या चाहिए" },
  { icon: "💔", title: "गलतफहमी", desc: "शब्द समझ के बजाय घाव बनाते हैं" },
  { icon: "🚫", title: "अहंकार और समय", desc: "गर्व स्वस्थ चर्चाओं को रोकता है" },
  { icon: "❓", title: "सुधारें या छोड़ें?", desc: "जोड़े यह नहीं जानते कि कब संघर्ष करना है" },
  { icon: "🚩", title: "विषाक्त अंधापन", desc: "सामान्य संघर्ष और दुर्व्यवहार के बीच अंतर नहीं बता सकते" },
];

const featuresEn = [
  { icon: Brain, title: "Emotional Translator", desc: "Convert raw feelings into healthy communication" },
  { icon: Users, title: "Neutral Mediator", desc: "No judgment, just understanding" },
  { icon: Shield, title: "Toxic Pattern Detector", desc: "Identify harmful behaviors early" },
  { icon: Flag, title: "Green Flag Analyzer", desc: "Celebrate what's working" },
  { icon: Target, title: "Fix or Leave Assistant", desc: "Get clarity on your next step" },
  { icon: Gauge, title: "Health Dashboard", desc: "Track relationship progress" },
];

const featuresHi = [
  { icon: Brain, title: "भावनात्मक अनुवादक", desc: "कच्ची भावनाओं को स्वस्थ संचार में बदलें" },
  { icon: Users, title: "तटस्थ मध्यस्थ", desc: "कोई निर्णय नहीं, बस समझ" },
  { icon: Shield, title: "विषाक्त पैटर्न डिटेक्टर", desc: "हानिकारक व्यवहारों को जल्दी पहचानें" },
  { icon: Flag, title: "ग्रीन फ्लैग एनालाइजर", desc: "देखें कि क्या अच्छा काम कर रहा है" },
  { icon: Target, title: "सुधारें या छोड़ें सहायक", desc: "अपने अगले कदम पर स्पष्टता प्राप्त करें" },
  { icon: Gauge, title: "स्वास्थ्य डैशबोर्ड", desc: "रिश्ते की प्रगति को ट्रैक करें" },
];

const testimonialsEn = [
  { quote: "HeartSync helped me explain my boundaries without starting a fight. It's like having a therapist in my pocket.", author: "Sarah J." },
  { quote: "I finally realized that what I thought was 'normal' was actually a series of red flags. This tool saved me years of pain.", author: "Michael R." },
  { quote: "The 14-day repair plan actually brought us closer. It gave us things to talk about besides chores and stress.", author: "Priya & Amit" },
];

const testimonialsHi = [
  { quote: "HeartSync ने मुझे लड़ाई शुरू किए बिना अपनी सीमाओं को समझाने में मदद की। यह मेरी जेब में एक थेरेपिस्ट रखने जैसा है।", author: "सारा जे." },
  { quote: "मुझे आखिरकार एहसास हुआ कि जिसे मैं 'सामान्य' समझता था वह वास्तव में रेड फ्लैग थे। इस टूल ने मुझे सालों के दर्द से बचा लिया।", author: "माइकल आर." },
  { quote: "14-दिवसीय सुधार योजना वास्तव में हमें करीब ले आई। इसने हमें काम और तनाव के अलावा अन्य चीजों के बारे में बात करने का मौका दिया।", author: "प्रिया और अमित" },
];

const stepsEn = [
  { title: "Input raw emotion", desc: "Type what's bothering you, exactly how you feel it." },
  { title: "AI analyzes pattern", desc: "Our system identifies the core need and any hidden red flags." },
  { title: "Get healthy output", desc: "Receive a translated response and actionable advice." },
];

const stepsHi = [
  { title: "कच्ची भावना दर्ज करें", desc: "जो आपको परेशान कर रहा है उसे टाइप करें, बिल्कुल वैसा ही जैसा आप महसूस करते हैं।" },
  { title: "AI पैटर्न का विश्लेषण करता है", desc: "हमारा सिस्टम मुख्य आवश्यकता और किसी भी छिपे हुए रेड फ्लैग की पहचान करता है।" },
  { title: "स्वस्थ आउटपुट प्राप्त करें", desc: "एक अनुवादित प्रतिक्रिया और कार्रवाई योग्य सलाह प्राप्त करें।" },
];

const statsEn = [
  { label: "Active Users", value: "10,000+" },
  { label: "Conflicts Resolved", value: "45,000+" },
  { label: "Success Rate", value: "92%" },
];

const statsHi = [
  { label: "सक्रिय उपयोगकर्ता", value: "10,000+" },
  { label: "सुलझाए गए संघर्ष", value: "45,000+" },
  { label: "सफलता दर", value: "92%" },
];

export default function Landing() {
  const { t, language } = useLanguage();
  const painPoints = language === 'hi' ? painPointsHi : painPointsEn;
  const features = language === 'hi' ? featuresHi : featuresEn;
  const steps = language === 'hi' ? stepsHi : stepsEn;
  const testimonials = language === 'hi' ? testimonialsHi : testimonialsEn;
  const stats = language === 'hi' ? statsHi : statsEn;

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {language === 'hi' ? "भावनाओं का अनुवाद करें। " : "Translate Emotions. "}
                <span className="text-gradient">{language === 'hi' ? "मन को चंगा करें। " : "Heal Minds. "}</span>
                {language === 'hi' ? "स्पष्टता खोजें।" : "Find Clarity."}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                {language === 'hi'
                  ? "हर्टसिंक आपका 24/7 AI मध्यस्थ है जो संघर्ष को समझ में बदल देता है। हम गुस्से वाले शब्दों को स्वस्थ संचार में अनुवाद करते हैं और विषाक्त पैटर्न का पता लगाते हैं।"
                  : "HeartHeaven is your 24/7 AI mediator that turns conflict into understanding. We translate angry words into healthy communication and detect toxic patterns before they break you."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/translator">
                  <Button size="xl" className="gradient-primary border-0 text-primary-foreground shadow-soft group">
                    {language === 'hi' ? "अनुवाद शुरू करें" : "Start Translating"} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="xl" variant="outline" className="bg-background/50 backdrop-blur-sm">
                    {language === 'hi' ? "यह कैसे काम करता है" : "How it Works"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-float md:block">
              <div className="relative z-10 rounded-3xl border border-white/20 bg-white/5 p-4 backdrop-blur-md shadow-2xl">
                <img
                  src={heroImage}
                  alt="AI Relationship Guidance"
                  className="rounded-2xl shadow-inner w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border-0 bg-secondary/20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full border-0 bg-primary/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-y border-border/50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gradient md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "क्या यह परिचित लगता है?" : "Does this feel familiar?"}</h2>
            <p className="mt-4 text-muted-foreground text-lg">{language === 'hi' ? "ज्यादातर रिश्ते बड़े मुद्दों के कारण नहीं, बल्कि छोटे-छोटे गलत संचारों के कारण टूटते हैं।" : "Most relationships break not because of big issues, but because of small miscommunications that pile up."}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {painPoints.map((point, i) => (
              <div key={i} className="group rounded-2xl border border-border/50 bg-card p-6 text-center shadow-card transition-all hover:shadow-hover hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{point.icon}</div>
                <h3 className="font-bold text-lg">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-primary opacity-20 mb-6" />
          <h2 className="text-2xl md:text-3xl font-light italic leading-relaxed text-muted-foreground">
            {language === 'hi'
              ? "\"समस्या यह नहीं है कि हम बात नहीं कर रहे हैं। समस्या यह है कि हम एक-दूसरे को नहीं सुन रहे हैं।\""
              : "\"The problem isn't that we're not talking. The problem is that we're not being heard.\""}
          </h2>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "उपचार के लिए उपकरण" : "Tools for Healing"}</h2>
            <p className="mt-4 text-muted-foreground text-lg">{language === 'hi' ? "वैज्ञानिक रूप से समर्थित और सहानुभूति के साथ डिज़ाइन किया गया।" : "Scientifically backed and designed with empathy."}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col rounded-3xl border border-border/50 bg-card p-8 shadow-card hover:shadow-hover transition-all group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 w-full">
              <h2 className="text-3xl font-bold md:text-4xl mb-12">{language === 'hi' ? "अपनी स्पष्टता का मार्ग खोजें" : "Find Your Path to Clarity"}</h2>
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start relative">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold shadow-soft">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.desc}</p>
                    </div>
                    {i < steps.length - 1 && <div className="absolute left-[23px] top-[48px] w-0.5 h-12 bg-border"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-card">
                  <img
                    src="https://images.unsplash.com/photo-1516589174184-c68500114b63?auto=format&fit=crop&q=80&w=800"
                    alt="Understanding"
                    className="w-full max-w-[400px] rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl animate-float">
                  <img src="/logo.png" alt="HeartHeaven Logo" className="h-8 w-8 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold md:text-4xl mb-16">{language === 'hi' ? "सच्ची कहानियाँ, सच्चा उपचार" : "Real Stories, Real Healing"}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl bg-card p-8 shadow-card border border-border/50 relative">
                <Star className="absolute top-8 right-8 h-5 w-5 text-warning fill-warning opacity-30" />
                <p className="italic text-lg text-muted-foreground mb-6">"{t.quote}"</p>
                <p className="font-bold text-primary">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto rounded-[3rem] gradient-primary p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
                {language === 'hi' ? "अपने रिश्ते का भविष्य बदलें" : "Change the future of your relationship"}
              </h2>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-10">
                {language === 'hi' ? "आज ही अपनी भावनात्मक यात्रा शुरू करें। किसी क्रेडिट कार्ड की आवश्यकता नहीं है।" : "Start your emotional journey today. No credit card required."}
              </p>
              <Link to="/translator">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl px-12 rounded-full font-bold">
                  {language === 'hi' ? "मुफ्त में शुरू करें" : "Get Started for Free"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like simple credits */}
      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <p>© 2024 HeartHeaven. {language === 'hi' ? "सहानुभूति के साथ बनाया गया।" : "Built with empathy."}</p>
      </footer>
    </div>
  );
}
