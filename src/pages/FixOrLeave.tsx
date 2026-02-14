import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Heart, Shield, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const stepsEn = [
  {
    title: "Emotional Safety",
    questions: [
      "Do you feel emotionally safe expressing your true feelings?",
      "Does your partner respect your boundaries?",
      "Can you be yourself without fear of judgment?",
      "Do you feel valued and appreciated?",
      "After conflicts, do you feel heard and understood?",
    ],
  },
  {
    title: "Trust & Respect",
    questions: [
      "Does your partner take accountability for mistakes?",
      "Is there mutual honesty even when it's difficult?",
      "Do you feel your partner genuinely wants the best for you?",
      "Is your partner supportive of your personal growth?",
      "Are you able to depend on your partner during hard times?",
    ],
  },
  {
    title: "Communication & Effort",
    questions: [
      "Do you feel like a team when solving problems?",
      "Is there more building up than tearing down in your talks?",
      "Does your partner make a consistent effort to connect?",
      "Are you both willing to compromise when needed?",
      "Do you feel hopeful about the future together?",
    ],
  },
];

const stepsHi = [
  {
    title: "भावनात्मक सुरक्षा",
    questions: [
      "क्या आप अपनी सच्ची भावनाओं को व्यक्त करते समय भावनात्मक रूप से सुरक्षित महसूस करते हैं?",
      "क्या आपका साथी आपकी सीमाओं का सम्मान करता है?",
      "क्या आप बिना किसी निर्णय के डर के खुद को अभिव्यक्त कर सकते हैं?",
      "क्या आप मूल्यवान और प्रशंसित महसूस करते हैं?",
      "संघर्षों के बाद, क्या आप सुना और समझा हुआ महसूस करते हैं?",
    ],
  },
  {
    title: "विश्वास और सम्मान",
    questions: [
      "क्या आपका साथी अपनी गलतियों की जिम्मेदारी लेता है?",
      "क्या कठिन होने पर भी आपसी ईमानदारी बनी रहती है?",
      "क्या आपको लगता है कि आपका साथी वास्तव में आपके लिए सबसे अच्छा चाहता है?",
      "क्या आपका साथी आपकी व्यक्तिगत वृद्धि का समर्थन करता है?",
      "क्या आप कठिन समय में अपने साथी पर निर्भर रह सकते हैं?",
    ],
  },
  {
    title: "संचार और प्रयास",
    questions: [
      "क्या आप समस्याओं को सुलझाते समय एक टीम की तरह महसूस करते हैं?",
      "क्या आपकी बातचीत में सकारात्मकता ज्यादा रहती है?",
      "क्या आपका साथी जुड़ने के लिए लगातार प्रयास करता है?",
      "क्या आप दोनों जरूरत पड़ने पर समझौता करने के लिए तैयार हैं?",
      "क्या आप एक साथ भविष्य के बारे में आशान्वित महसूस करते हैं?",
    ],
  },
];

const scaleLabelsEn = ["Never", "Rarely", "Sometime", "Often", "Always"];
const scaleLabelsHi = ["कभी नहीं", "शायद ही कभी", "कभी-कभी", "अक्सर", "हमेशा"];

export default function FixOrLeave() {
  const { language } = useLanguage();
  const steps = language === 'hi' ? stepsHi : stepsEn;
  const scaleLabels = language === 'hi' ? scaleLabelsHi : scaleLabelsEn;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = steps.reduce((acc, step) => acc + step.questions.length, 0);
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleAnswer = (question: string, value: number) => {
    setAnswers({ ...answers, [question]: value });
  };

  const getResult = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = totalQuestions * 4;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 80) {
      return {
        title: language === 'hi' ? "मजबूत नींव" : "Strong Foundation",
        desc: language === 'hi'
          ? "आपका रिश्ता स्वस्थ मूल्यों पर आधारित है। हर रिश्ते में चुनौतियां होती हैं, लेकिन आप दोनों के पास इसे सुलझाने के उपकरण हैं। संपर्क बढ़ाने पर ध्यान दें।"
          : "Your relationship is built on healthy values. Every bond has challenges, but you have the tools to navigate them. Focus on enhancing connection.",
        icon: CheckCircle,
        color: "text-success",
        action: language === 'hi' ? "14-दिवसीय सुधार योजना आज़माएं" : "Try the 14-Day Repair Plan",
      };
    } else if (percentage >= 50) {
      return {
        title: language === 'hi' ? "कार्य प्रगति पर है" : "Work in Progress",
        desc: language === 'hi'
          ? "कोशिश और समझ की जरूरत है। आपका रिश्ता टूट नहीं गया है, लेकिन इसके कुछ क्षेत्रों में सक्रिय मरम्मत की आवश्यकता है। संचार ही कुंजी है।"
          : "Effort and understanding are needed. Your relationship isn't broken, but it requires active repair in some areas. Communication is the key.",
        icon: Shield,
        color: "text-warning",
        action: language === 'hi' ? "भावनात्मक अनुवादक का प्रयोग करें" : "Use the Emotional Translator",
      };
    } else {
      return {
        title: language === 'hi' ? "गंभीर चिंता का विषय" : "Serious Concern",
        desc: language === 'hi'
          ? "आपका रिश्ता महत्वपूर्ण तनाव में है। अपनी सुरक्षा और कल्याण को प्राथमिकता दें। एक पेशेवर परामर्शदाता से बात करने पर विचार करें।"
          : "Your relationship is under significant strain. Prioritize your safety and well-being. Consider speaking with a professional counselor.",
        icon: AlertTriangle,
        color: "text-destructive",
        action: language === 'hi' ? "रेड फ्लैग डिटेक्टर देखें" : "Check the Red Flag Detector",
      };
    }
  };

  const result = getResult();

  if (showResult) {
    return (
      <div className="px-4 py-12 md:py-20 animate-fade-in">
        <div className="container mx-auto max-w-2xl text-center">
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-card shadow-card ${result.color} mb-8`}>
            <result.icon className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{result.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {result.desc}
          </p>

          <div className="mt-12 rounded-3xl border border-border/50 bg-card p-8 shadow-card">
            <h3 className="font-semibold mb-6">{language === 'hi' ? "अनुशंसित अगला कदम" : "Recommended Next Step"}</h3>
            <Link to="/repair-plan">
              <Button size="lg" className="w-full gradient-primary border-0 text-primary-foreground">
                {result.action}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setAnswers({});
              }}
            >
              {language === 'hi' ? "दोबारा शुरू करें" : "Start Over"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 md:py-20">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">{language === 'hi' ? "सुधारें या छोड़ें: मूल्यांकन" : "Fix or Leave: Assessment"}</h1>
          <p className="mt-3 text-muted-foreground">{language === 'hi' ? "अपनी स्थिति पर स्पष्टता पाने के लिए इन सवालों का ईमानदारी से जवाब दें।" : "Answer these questions honestly to gain clarity on your situation."}</p>

          <div className="mt-8 flex items-center justify-between text-sm font-medium text-muted-foreground">
            <span>{steps[currentStep].title}</span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="space-y-10 animate-fade-in">
          {steps[currentStep].questions.map((q, i) => (
            <div key={q} className="space-y-4">
              <p className="text-lg font-medium leading-tight">{q}</p>
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q, val)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${answers[q] === val
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border/50 bg-card hover:border-border hover:bg-muted/50"
                      }`}
                  >
                    <div className={`h-3 w-3 rounded-full ${answers[q] === val ? "bg-primary" : "bg-muted"}`} />
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{scaleLabels[val]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border/50 pt-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {language === 'hi' ? "पीछे" : "Back"}
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              className="gradient-primary border-0 text-primary-foreground"
              disabled={steps[currentStep].questions.some(q => answers[q] === undefined)}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              {language === 'hi' ? "अगला" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="gradient-primary border-0 text-primary-foreground"
              disabled={steps[currentStep].questions.some(q => answers[q] === undefined)}
              onClick={() => setShowResult(true)}
            >
              {language === 'hi' ? "परिणाम देखें" : "See Results"} <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
