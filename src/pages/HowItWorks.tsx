import { Link } from "react-router-dom";
import {
  MessageCircle,
  Brain,
  CheckCircle,
  Shield,
  Flag,
  Target,
  Heart,
  Gauge,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const processStepsEn = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Share what you feel",
    desc: "Type your feelings or describe a situation in your own words. No judgment — this is your safe space.",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI understands and translates",
    desc: "Our AI reads the emotions behind your words and turns them into clear, kind ways to say things.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Get ideas you can use",
    desc: "You get simple suggestions: what to say, how to say it, and when might be a good time to talk.",
  },
];

const processStepsHi = [
  {
    step: 1,
    icon: MessageCircle,
    title: "आप कैसा महसूस करते हैं, साझा करें",
    desc: "अपनी भावनाओं को टाइप करें या अपने शब्दों में स्थिति का वर्णन करें। कोई निर्णय नहीं - यह आपकी सुरक्षित जगह है।",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI समझता है और अनुवाद करता है",
    desc: "हमारा AI आपके शब्दों के पीछे की भावनाओं को पढ़ता है और उन्हें कहने के स्पष्ट, दयालु तरीकों में बदल देता है।",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "उपयोगी विचार प्राप्त करें",
    desc: "आपको सरल सुझाव मिलते हैं: क्या कहना है, कैसे कहना है, और बात करने के लिए अच्छा समय कब हो सकता है।",
  },
];

const toolsEn = [
  {
    icon: Brain,
    title: "Emotional Translator",
    path: "/translator",
    desc: "Turn raw feelings into calm, clear words your partner can hear.",
  },
  {
    icon: Shield,
    title: "Relationship Flags Detector",
    path: "/flags",
    desc: "Identify both toxic red flags and healthy green flags in your relationship.",
  },
  {
    icon: Target,
    title: "Fix or Leave",
    path: "/fix-or-leave",
    desc: "Get help thinking through whether to work on the relationship or move on.",
  },
  {
    icon: Heart,
    title: "14-Day Repair Plan",
    path: "/repair-plan",
    desc: "A step-by-step plan to heal and reconnect over two weeks.",
  },
  {
    icon: Gauge,
    title: "Health Dashboard",
    path: "/dashboard",
    desc: "Track how things are going and see your progress in one place.",
  },
];

const toolsHi = [
  {
    icon: Brain,
    title: "भावनात्मक अनुवादक",
    path: "/translator",
    desc: "कच्ची भावनाओं को शांत, स्पष्ट शब्दों में बदलें जो आपका साथी सुन सके।",
  },
  {
    icon: Shield,
    title: "रिश्ते के फ्लैग डिटेक्टर",
    path: "/flags",
    desc: "अपने रिश्ते में जहरीले रेड फ्लैग और स्वस्थ ग्रीन फ्लैग दोनों की पहचान करें।",
  },
  {
    icon: Target,
    title: "सुधारें या छोड़ें",
    path: "/fix-or-leave",
    desc: "रिश्ते पर काम करना है या आगे बढ़ना है, इस बारे में सोचने में मदद लें।",
  },
  {
    icon: Heart,
    title: "14-दिवसीय सुधार योजना",
    path: "/repair-plan",
    desc: "दो सप्ताह में चंगा करने और फिर से जुड़ने के लिए एक चरण-दर-चरण योजना।",
  },
  {
    icon: Gauge,
    title: "स्वास्थ्य डैशबोर्ड",
    path: "/dashboard",
    desc: "ट्रैक करें कि चीजें कैसी चल रही हैं और अपनी प्रगति को एक ही स्थान पर देखें।",
  },
];

const whoIsItForEn = [
  "Couples who want to talk without fighting",
  "Anyone who finds it hard to put feelings into words",
  "People wondering if their relationship is healthy",
  "Those who want to fix things but don’t know where to start",
];

const whoIsItForHi = [
  "जोड़े जो बिना लड़े बात करना चाहते हैं",
  "कोई भी जिसे भावनाओं को शब्दों में पिरोना मुश्किल लगता है",
  "लोग जो सोच रहे हैं कि क्या उनका रिश्ता स्वस्थ है",
  "वे जो चीजों को ठीक करना चाहते हैं लेकिन नहीं जानते कि कहाँ से शुरू करें",
];

export default function HowItWorks() {
  const { t, language } = useLanguage();
  const processSteps = language === 'hi' ? processStepsHi : processStepsEn;
  const tools = language === 'hi' ? toolsHi : toolsEn;
  const whoIsItFor = language === 'hi' ? whoIsItForHi : whoIsItForEn;

  return (
    <div className="px-4 py-12 md:py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Intro */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <BookOpen className="h-4 w-4" />
            {language === 'hi' ? "हर्टसिंक कैसे काम करता है" : "How HeartHeaven works"}
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
            {language === 'hi' ? "प्रक्रिया को समझें। इसे अपने जीवन में उपयोग करें।" : "Understand the process. Use it in your life."}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'hi'
              ? "हर्टसिंक एक मुफ्त, उपयोग में आसान टूल है जो आपको बेहतर ढंग से संवाद करने और अपने रिश्ते को समझने में मदद करता है। यहाँ सब कुछ कैसे काम करता है, चरण दर चरण।"
              : "HeartHeaven is a free, easy-to-use tool that helps you communicate better and understand your relationship. Here’s how everything works, step by step."}
          </p>
        </section>

        {/* The 3-step process */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold md:text-3xl mb-2">{language === 'hi' ? "3-चरणीय प्रक्रिया" : "The 3-step process"}</h2>
          <p className="text-muted-foreground mb-10">
            {language === 'hi' ? "हर्टसिंक का हर टूल एक ही सरल प्रवाह का अनुसरण करता है।" : "Every tool on HeartHeaven follows the same simple flow."}
          </p>
          <div className="space-y-10">
            {processSteps.map((s, i) => (
              <div
                key={s.step}
                className="flex flex-col md:flex-row gap-6 items-start rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-card"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-primary shadow-soft">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-primary">{language === 'hi' ? `चरण ${s.step}` : `Step ${s.step}`}</span>
                  <h3 className="text-xl font-semibold mt-1">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-border self-center" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* All tools */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold md:text-3xl mb-2">{language === 'hi' ? "हमारे सभी उपकरण एक ही स्थान पर" : "All our tools in one place"}</h2>
          <p className="text-muted-foreground mb-10">
            {language === 'hi' ? "प्रत्येक उपकरण का एक काम है। उस उपकरण का उपयोग करें जो आपकी अभी की आवश्यकता के अनुरूप हो।" : "Each tool has one job. Use the one that fits what you need right now."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.path}
                to={t.path}
                className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <t.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {language === 'hi' ? "इसे आजमाएं" : "Try it"} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Who is it for */}
        <section className="mb-20 rounded-2xl border border-border/50 bg-card p-8 md:p-10 shadow-card">
          <h2 className="text-2xl font-bold md:text-3xl mb-2">{language === 'hi' ? "हर्टसिंक किसके लिए है?" : "Who is HeartHeaven for?"}</h2>
          <p className="text-muted-foreground mb-8">
            {language === 'hi' ? "कोई भी जो स्पष्ट संचार और एक स्वस्थ रिश्ता चाहता है।" : "Anyone who wants clearer communication and a healthier relationship."}
          </p>
          <ul className="space-y-4">
            {whoIsItFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{language === 'hi' ? "शुरू करने के लिए तैयार हैं?" : "Ready to start?"}</h2>
          <p className="mt-2 text-muted-foreground">
            {language === 'hi' ? "भावनात्मक अनुवादक को आज़माने के लिए किसी साइन-अप की आवश्यकता नहीं है।" : "No sign-up required to try the Emotional Translator."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/translator">
              <Button size="lg" className="gradient-primary border-0 text-primary-foreground shadow-soft">
                {language === 'hi' ? "भावनात्मक अनुवादक आज़माएं" : "Try Emotional Translator"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                {language === 'hi' ? "डैशबोर्ड खोलें" : "Open Dashboard"}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
