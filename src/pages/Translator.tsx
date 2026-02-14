import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Copy, Check, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const quickExamplesEn = [
  "He never listens",
  "She doesn't care",
  "I'm always wrong",
  "They ignore me",
];

const quickExamplesHi = [
  "वह कभी नहीं सुनता",
  "उसे कोई परवाह नहीं है",
  "मैं हमेशा गलत होता हूँ",
  "वे मुझे नजरअंदाज करते हैं",
];

const sampleTransformationsEn = [
  {
    before: "He never understands me",
    after: "I feel unheard when my feelings are dismissed. Can we talk about what I need?",
    why: "Replaces blame with an 'I feel' statement and invites dialogue.",
  },
  {
    before: "She doesn't care about my problems",
    after: "I'm feeling overwhelmed right now and I really need some support. Are you available to listen?",
    why: "Directly asks for support instead of assuming a lack of care.",
  },
];

const sampleTransformationsHi = [
  {
    before: "वह मुझे कभी नहीं समझता",
    after: "जब मेरी भावनाओं को खारिज कर दिया जाता है तो मुझे अनसुना महसूस होता है। क्या हम इस बारे में बात कर सकते हैं कि मुझे क्या चाहिए?",
    why: "दोष को 'मुझे महसूस होता है' वाले बयान से बदलता है और बातचीत को आमंत्रित करता है।",
  },
  {
    before: "उसे मेरी समस्याओं की कोई परवाह नहीं है",
    after: "मैं अभी बहुत अभिभूत महसूस कर रहा हूँ और मुझे वास्तव में कुछ समर्थन की आवश्यकता है। क्या आपके पास सुनने का समय है?",
    why: "परवाह की कमी मानने के बजाय सीधे समर्थन मांगता है।",
  },
];

export default function Translator() {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const quickExamples = language === 'hi' ? quickExamplesHi : quickExamplesEn;
  const sampleTransformations = language === 'hi' ? sampleTransformationsHi : sampleTransformationsEn;

  const translate = () => {
    setLoading(true);
    // Simulation logic
    setTimeout(() => {
      let result = "";
      if (language === 'hi') {
        result = input.toLowerCase().includes("कभी नहीं") || input.toLowerCase().includes("हमेशा")
          ? "मुझे तब दुख होता है जब हमें संवाद करने में कठिनाई होती है। क्या हम इस बारे में बात कर सकते हैं कि हम इसे कैसे बेहतर बना सकते हैं?"
          : "मैं अभी अपनी वर्तमान स्थिति के बारे में थोड़ा असुरक्षित महसूस कर रहा हूँ। क्या हम इस बारे में खुलकर बात कर सकते हैं?";
      } else {
        result = input.toLowerCase().includes("never") || input.toLowerCase().includes("always")
          ? "I feel hurt when we have difficulty communicating. Can we talk about how we can make this better?"
          : "I'm feeling a bit vulnerable about our current situation. Can we talk openly about this?";
      }
      setOutput(result);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <img src="/logo.png" alt="HeartHeaven Logo" className="h-8 w-8 object-contain" />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "भावनात्मक अनुवादक" : "Emotional Translator"}</h1>
          <p className="mt-4 text-muted-foreground text-lg italic">
            {language === 'hi' ? "कच्ची भावनाओं और दोष को स्वस्थ संचार में बदलें।" : "Transform blame into understanding. Speak from the heart."}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Area */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-card">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 block">
                {language === 'hi' ? "आप क्या कहना चाहते हैं? (दोष या गुस्सा)" : "What do you want to say? (Blame or Anger)"}
              </label>
              <Textarea
                placeholder={language === 'hi' ? "उदाहरण: 'तुम कभी नहीं सुनते!'" : "Example: 'You never listen!'"}
                className="min-h-[150px] rounded-2xl border-border/50 bg-muted/30 p-4 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {quickExamples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInput(ex)}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    + {ex}
                  </button>
                ))}
              </div>
              <Button
                onClick={translate}
                disabled={loading || !input}
                className="mt-6 w-full h-12 text-lg rounded-xl gradient-primary border-0 text-primary-foreground shadow-soft"
              >
                {loading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
                {language === 'hi' ? "अनुवाद करें" : "Translate"}
              </Button>
            </div>
          </div>

          {/* Output Area */}
          <div className="space-y-6">
            <div className={`h-full min-h-[300px] flex flex-col rounded-3xl border ${output ? 'border-primary/20 bg-primary/5' : 'border-dashed border-border bg-muted/30'} p-8 shadow-card overflow-hidden relative`}>
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 block">
                {language === 'hi' ? "स्वस्थ संचार (क्या कहें)" : "Healthy Communication (What to say)"}
              </label>

              {output ? (
                <div className="flex-1 flex flex-col animate-fade-in">
                  <p className="text-xl font-medium leading-relaxed italic text-foreground mb-8">
                    "{output}"
                  </p>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="mt-auto w-fit rounded-full bg-background"
                  >
                    {copied ? <Check className="mr-2 h-4 w-4 text-success" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? (language === 'hi' ? "कॉपी हो गया!" : "Copied!") : (language === 'hi' ? "कॉपी करें" : "Copy to Clipboard")}
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                  <Sparkles className="h-12 w-12 opacity-10 mb-4" />
                  <p className="text-sm italic">{language === 'hi' ? "अपना विचार दर्ज करें और जादू देखें..." : "Enter your thought and see the magic happen..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Examples / Educational Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">{language === 'hi' ? "यह क्यों काम करता है?" : "Why does this work?"}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {sampleTransformations.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-card p-6 shadow-card hover:shadow-hover transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <span className="text-destructive text-sm font-bold">X</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{item.before}"</p>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-sm font-medium">"{item.after}"</p>
                </div>
                <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium flex items-center gap-2">
                  <Brain className="h-3 w-3 text-primary" /> {item.why}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/safe-space">
              <Button variant="ghost" className="text-primary hover:bg-primary/5 rounded-full">
                {language === 'hi' ? "सेफ स्पेस में गहराई से जाएँ" : "Go deeper in the Safe Space"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
