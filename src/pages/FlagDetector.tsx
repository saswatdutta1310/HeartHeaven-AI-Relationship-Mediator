import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Flag, Search, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserData } from "@/hooks/useUserData";
import { useLanguage } from "@/contexts/LanguageContext";

type FlagData = {
    name: string;
    keywords: string[];
    description: string;
    signs?: string[];
    harm?: string;
    severity?: string;
    example?: string;
    type?: 'red' | 'green';
};

// --- Data ---
const redFlagsEn = [
    {
        name: "Gaslighting",
        keywords: ["crazy", "imagining", "sensitive", "never happened", "memory", "confusion", "reality", "doubt", "lying"],
        description: "Manipulating someone into doubting their own reality or sanity.",
        signs: ['"You\'re too sensitive"', '"That never happened"', '"You\'re imagining things"'],
        harm: "Makes you doubt your reality and memory",
        severity: "High",
    },
    {
        name: "Silent Treatment",
        keywords: ["ignore", "ignoring", "silence", "blocked", "shut out", "ghosting", "cold shoulder", "punish"],
        description: "Refusing to communicate or withholding affection as punishment.",
        signs: ["Ignoring for days", "Refusing to communicate", "Withdrawing all affection"],
        harm: "Emotional manipulation and control tactic",
        severity: "Medium",
    },
    {
        name: "Excessive Jealousy",
        keywords: ["jealous", "who are you with", "location", "follow", "checking phone", "phone", "passwords", "accuse", "cheating", "insecure", "tracking"],
        description: "Possessiveness that limits freedom and indicates lack of trust.",
        signs: ["Checking phone constantly", "Isolating from friends", "Accusing without reason"],
        harm: "Suffocates independence and trust",
        severity: "High",
    },
    {
        name: "Controlling Behavior",
        keywords: ["wear", "money", "friends", "allowed", "forbid", "permission", "bossy", "rules", "social", "finances"],
        description: "Dictating personal choices, finances, or social interactions.",
        signs: ["Dictates what you wear", "Controls finances entirely", "Monitors location"],
        harm: "Removes autonomy and freedom",
        severity: "High",
    },
    {
        name: "Love Bombing",
        keywords: ["too fast", "soulmate", "perfect", "overwhelming", "gifts", "obsessed", "rushing", "intensity"],
        description: "Overwhelming affection early on to gain rapid trust/control.",
        signs: ["Excessive affection at start", "Sudden coldness later", "Moves very fast"],
        harm: "Creates emotional dependency/addiction",
        severity: "Medium",
    },
    {
        name: "Lack of Accountability",
        keywords: ["sorry", "fault", "blame", "defensive", "apologize", "excuses", "denial", "shift blame"],
        description: "Refusal to take responsibility for actions or feelings.",
        signs: ["Never apologizes", "Always your fault", "Deflects responsibility"],
        harm: "Prevents growth and resolution",
        severity: "Medium",
    },
    {
        name: "Isolation",
        keywords: ["family", "friends", "lonely", "stay home", "don't go", "keeps me", "badmouth"],
        description: "Cutting you off from support systems like friends and family.",
        signs: ["Dislikes your friends/family", "Guilt-trips you for going out", "Makes you feel guilty for time away"],
        harm: "Makes you entirely dependent on them",
        severity: "High",
    },
    {
        name: "Emotional Volatility",
        keywords: ["scared", "eggshells", "anger", "rage", "mood swings", "snapping", "yelling", "fear"],
        description: "Unpredictable emotional outbursts that create a climate of fear.",
        signs: ["Explosive anger", "Drastic mood shifts", "You feel like you're walking on eggshells"],
        harm: "Creates chronic anxiety and instability",
        severity: "High",
    }
];

const redFlagsHi = [
    {
        name: "गैसलाइटिंग (Gaslighting)",
        keywords: ["पागल", "कल्पना", "संवेदनशील", "कभी नहीं हुआ", "याददाश्त", "भ्रम", "वास्तविकता", "झूठ"],
        description: "किसी को अपनी वास्तविकता या मानसिक स्थिति पर संदेह करने के लिए हेरफेर करना।",
        signs: ['"तुम बहुत संवेदनशील हो"', '"ऐसा कभी नहीं हुआ"', '"तुम चीजों की कल्पना कर रहे हो"'],
        harm: "आपको अपनी वास्तविकता और याददाश्त पर संदेह कराता है",
        severity: "High",
    },
    {
        name: "मौन उपचार (Silent Treatment)",
        keywords: ["अनदेखा", "चुप", "ब्लॉक", "बात नहीं करना", "सजा"],
        description: "सजा के रूप में संवाद करने से इनकार करना या स्नेह रोकना।",
        signs: ["दिनों तक अनदेखा करना", "बात करने से मना करना", "सारा स्नेह वापस लेना"],
        harm: "भावनात्मक हेरफेर और नियंत्रण रणनीति",
        severity: "Medium",
    },
    {
        name: "अत्यधिक ईर्ष्या (Excessive Jealousy)",
        keywords: ["ईर्ष्या", "किसके साथ हो", "लोकेशन", "फोन चेक", "शक", "धोखा", "असुरक्षित"],
        description: "अधिकार जो स्वतंत्रता को सीमित करता है और विश्वास की कमी को दर्शाता है।",
        signs: ["लगातार फोन चेक करना", "दोस्तों से अलग करना", "बिना कारण आरोप लगाना"],
        harm: "स्वतंत्रता और विश्वास का दम घोंटता है",
        severity: "High",
    },
    {
        name: "नियंत्रित व्यवहार (Controlling Behavior)",
        keywords: ["कपड़े", "पैसा", "दोस्त", "अनुमति", "नियम", "रोकना"],
        description: "व्यक्तिगत पसंद, वित्त, या सामाजिक मेलजोल को निर्देशित करना।",
        signs: ["क्या पहनना है यह तय करना", "पैसे को पूरी तरह नियंत्रित करना", "लोकेशन पर नजर रखना"],
        harm: "स्वायत्तता और स्वतंत्रता को छीन लेता है",
        severity: "High",
    },
    {
        name: "लव बॉम्बिंग (Love Bombing)",
        keywords: ["बहुत तेज", "सोलमेट", "परफेक्ट", "उपहार", "जुनूनी"],
        description: "तेजी से विश्वास/नियंत्रण पाने के लिए शुरुआत में अत्यधिक स्नेह।",
        signs: ["शुरुआत में अत्यधिक स्नेह", "बाद में अचानक बेरुखी", "बहुत तेजी से आगे बढ़ना"],
        harm: "भावनात्मक निर्भरता पैदा करता है",
        severity: "Medium",
    },
    {
        name: "जवाबदेही की कमी (Lack of Accountability)",
        keywords: ["माफी", "गलती", "दोष", "बहाना", "इनकार"],
        description: "कार्यों या भावनाओं की जिम्मेदारी लेने से इनकार करना।",
        signs: ["कभी माफी नहीं मांगता", "हमेशा आपकी गलती", "जिम्मेदारी से बचता है"],
        harm: "विकास और समाधान को रोकता है",
        severity: "Medium",
    },
    {
        name: "अलगाव (Isolation)",
        keywords: ["परिवार", "दोस्त", "अकेला", "घर पर रहो", "मत जाओ"],
        description: "आपको दोस्तों और परिवार जैसे समर्थन प्रणालियों से काट देना।",
        signs: ["दोस्तों/परिवार को नापसंद करना", "बाहर जाने पर दोषी महसूस कराना", "दूर रहने के लिए दोषी बनाना"],
        harm: "आपको पूरी तरह उन पर निर्भर बनाता है",
        severity: "High",
    },
    {
        name: "भावनात्मक अस्थिरता (Emotional Volatility)",
        keywords: ["दरा हुआ", "गुस्सा", "चिल्लाना", "डर", "मूड"],
        description: "अप्रत्याशित भावनात्मक विस्फोट जो डर का माहौल बनाते हैं।",
        signs: ["विस्फोटक गुस्सा", "मूड में भारी बदलाव", "डर के साये में जीना"],
        harm: "दीर्घकालिक चिंता और अस्थिरता पैदा करता है",
        severity: "High",
    }
];

const greenFlagsEn = [
    {
        name: "Respectful Communication",
        keywords: ["listen", "understand", "talk", "calm", "valid", "heard", "voice", "gentle"],
        description: "Listening to understand, not just to reply. Validating feelings.",
        signs: ["Listens without interrupting", "Validates feelings", 'Uses "I" statements'],
        example: '"I see you\'re upset. Help me understand."',
    },
    {
        name: "Healthy Boundaries",
        keywords: ["space", "no", "friends", "hobby", "alone time", "respect", "privacy", "autonomy"],
        description: "Respecting individual needs, space, and the word 'no'.",
        signs: ['Respects your "no"', "Has own friends/hobbies", "Gives you space"],
        example: '"Take your time with friends. I\'ll see you later!"',
    },
    {
        name: "Accountability",
        keywords: ["sorry", "my bad", "wrong", "change", "apology", "own it", "repair", "make up"],
        description: "Owning mistakes and actively working to make them right.",
        signs: ["Apologizes sincerely", "Admits mistakes", "Makes amends"],
        example: '"I was wrong. I\'m sorry I hurt you."',
    },
    {
        name: "Support & Safety",
        keywords: ["safe", "support", "proud", "cheer", "care", "comfort", "cry", "encouragement"],
        description: "Celebrating wins and providing comfort during losses.",
        signs: ["Comforts during hard times", "Celebrates your wins", "Safe to be vulnerable"],
        example: "Holds you when you cry, no judgment",
    },
    {
        name: "Growth Mindset",
        keywords: ["grow", "learn", "better", "therapy", "improve", "work on it", "feedback"],
        description: "Willingness to learn, adapt, and grow together.",
        signs: ["Wants to improve", "Open to feedback", "Not defensive"],
        example: '"You\'re right. I want to work on that."',
    },
    {
        name: "Equality",
        keywords: ["fair", "share", "team", "decision", "partner", "equal", "balance"],
        description: "Sharing power, decisions, and responsibilities.",
        signs: ["Shared decisions", "Equal effort", "Values your input"],
        example: '"What do you think we should do?"',
    }
];

const greenFlagsHi = [
    {
        name: "सम्मानजनक संचार (Respectful Communication)",
        keywords: ["सुनना", "समझना", "बात", "शांत", "सम्मान"],
        description: "केवल जवाब देने के लिए नहीं, बल्कि समझने के लिए सुनना। भावनाओं को मान्य करना।",
        signs: ["बिना टोके सुनता है", "भावनाओं को मान्य करता है", '"मैं" बयानों का उपयोग करता है'],
        example: '"मैं देख रहा हूँ कि तुम परेशान हो। मुझे समझने में मदद करो।"',
    },
    {
        name: "स्वस्थ सीमाएं (Healthy Boundaries)",
        keywords: ["जगह", "नहीं", "दोस्त", "शौक", "अकेले समय", "सम्मान"],
        description: "व्यक्तिगत जरूरतों, स्थान और 'नहीं' शब्द का सम्मान करना।",
        signs: ['आपकी "नहीं" का सम्मान करता है', "अपने दोस्त/शौक हैं", "आपको जगह देता है"],
        example: '"दोस्तों के साथ समय बिताओ। मैं बाद में मिलता हूँ!"',
    },
    {
        name: "जवाबदेही (Accountability)",
        keywords: ["माफी", "गलती", "सुधार", "जिम्मेदारी"],
        description: "गलतियों को स्वीकार करना और उन्हें सुधारने के लिए सक्रिय रूप से काम करना।",
        signs: ["ईमानदारी से माफी मांगता है", "गलतियां मानता है", "सुधार करता है"],
        example: '"मैं गलत था। मुझे खेद है कि मैंने तुम्हें चोट पहुँचाई।"',
    },
    {
        name: "समर्थन और सुरक्षा (Support & Safety)",
        keywords: ["सुरक्षित", "समर्थन", "गर्व", "देखभाल", "आराम"],
        description: "जीत का जश्न मनाना और हार के दौरान आराम प्रदान करना।",
        signs: ["मुश्किल समय में दिलासा देता है", "आपकी जीत का जश्न मनाता है", "कमजोर होने में सुरक्षित"],
        example: "जब आप रोते हैं तो आपको थामता है, कोई निर्णय नहीं",
    },
    {
        name: "विकास की मानसिकता (Growth Mindset)",
        keywords: ["बढ़ना", "सीखना", "बेहतर", "सुधार"],
        description: "साथ में सीखने, अनुकूलित होने और बढ़ने की इच्छा।",
        signs: ["सुधार करना चाहता है", "फीडबैक के लिए खुला", "बचावकारी नहीं"],
        example: '"आप सही हैं। मैं उस पर काम करना चाहता हूँ।"',
    },
    {
        name: "समानता (Equality)",
        keywords: ["निष्पक्ष", "साझा", "टीम", "निर्णय", "बराबर"],
        description: "शक्ति, निर्णय और जिम्मेदारियों को साझा करना।",
        signs: ["साझा निर्णय", "समान प्रयास", "आपकी राय को महत्व देता है"],
        example: '"तुम्हें क्या लगता है हमें क्या करना चाहिए?"',
    }
];

// --- Sub-components ---

const FlagSearch = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<FlagData[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const { language } = useLanguage();

    // Use current language flags
    const currentRedFlags = language === 'hi' ? redFlagsHi : redFlagsEn;
    const currentGreenFlags = language === 'hi' ? greenFlagsHi : greenFlagsEn;

    const suggestions = language === 'hi'
        ? ["फोन चेक", "चुप रहना", "चिल्लाना", "माफी", "समर्थन", "ईर्ष्या"]
        : ["Checking phone", "Silent treatment", "Yelling", "Apologizes", "Supports my dreams", "Jealousy"];

    const runSearch = (term: string) => {
        if (!term.trim()) return;
        const q = term.toLowerCase();

        const searchFn = (list: FlagData[], type: 'red' | 'green') =>
            list.filter(f =>
                f.name.toLowerCase().includes(q) ||
                f.description.toLowerCase().includes(q) ||
                (f.keywords && f.keywords.some((k: string) => q.includes(k) || k.includes(q)))
            ).map(f => ({ ...f, type }));

        const redMatches = searchFn(currentRedFlags, 'red');
        const greenMatches = searchFn(currentGreenFlags, 'green');

        setResult([...redMatches, ...greenMatches]);
        setHasSearched(true);
    };

    const handleManualSearch = () => {
        runSearch(query);
    };

    const clickSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        runSearch(suggestion);
    };

    return (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-semibold">Flag Identifier</h2>
                <p className="text-muted-foreground">{language === 'hi' ? 'किसी व्यवहार को टाइप करें जैसे "फ़ोन चेक" या "समर्थन" यह देखने के लिए कि क्या आता है।' : 'Type a behavior like "checks my phone" or "supports me" to see what checks out.'}</p>

                <div className="flex gap-2">
                    <Input
                        placeholder={language === 'hi' ? "व्यवहार का वर्णन करें..." : "Describe a behavior..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                        className="h-12 text-lg"
                    />
                    <Button onClick={handleManualSearch} size="lg" className="h-12 px-8">{language === 'hi' ? "विश्लेषण" : "Analysis"}</Button>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">{language === 'hi' ? "इसके लिए खोजने का प्रयास करें:" : "Try searching for:"}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {suggestions.map((s, i) => (
                            <Badge
                                key={i}
                                variant="secondary"
                                className="cursor-pointer hover:bg-secondary/80 px-3 py-1 text-sm font-normal"
                                onClick={() => clickSuggestion(s)}
                            >
                                {s}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 mt-8">
                {result.length > 0 ? (
                    result.map((flag, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-xl border-l-4 shadow-sm ${flag.type === 'red' ? 'bg-red-50 border-red-500 dark:bg-red-900/10' : 'bg-green-50 border-green-500 dark:bg-green-900/10'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className={`text-xl font-bold flex items-center gap-2 ${flag.type === 'red' ? 'text-red-700' : 'text-green-700'}`}>
                                        {flag.type === 'red' ? <Shield className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                                        {flag.name}
                                    </h3>
                                    <p className="mt-2 text-foreground/80">{flag.description}</p>
                                    {flag.type === 'red' && <p className="mt-2 text-sm text-red-600 font-medium">{language === 'hi' ? "जोखिम स्तर: " : "Risk Level: "}{flag.severity}</p>}
                                    {flag.type === 'green' && <p className="mt-2 text-sm text-green-600 font-medium">{language === 'hi' ? "यह क्यों मदद करता है: " : "Why it helps: "}{flag.description}</p>}
                                </div>
                                <Badge variant={flag.type === 'red' ? "destructive" : "default"} className={flag.type === 'green' ? "bg-green-600 hover:bg-green-700" : ""}>
                                    {flag.type === 'red' ? (language === 'hi' ? 'रेड फ्लैग' : 'Red Flag') : (language === 'hi' ? 'ग्रीन फ्लैग' : 'Green Flag')}
                                </Badge>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    hasSearched && query && <div className="text-center mt-8 space-y-2">
                        <p className="text-muted-foreground">{language === 'hi' ? `"${query}" के लिए कोई सटीक मेल नहीं मिला।` : `No exact matches found for "${query}".`}</p>
                        <p className="text-sm text-muted-foreground">{language === 'hi' ? 'सरल शब्दों का प्रयोग करें जैसे "फोन", "पैसा", या "चिल्लाना"।' : 'Try using simpler keywords like "phone", "money", or "yelling".'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const RedFlagChecklist = () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [expanded, setExpanded] = useState<string | null>(null);
    const { updateFlags, stats } = useUserData();
    const { language } = useLanguage();

    const flags = language === 'hi' ? redFlagsHi : redFlagsEn;

    // Sync with global stats on change
    useEffect(() => {
        if (selected.size > 0 || stats.toxicPatternsFound > 0) {
            updateFlags(selected.size, stats.greenFlagsFound);
        }
    }, [selected.size, stats.toxicPatternsFound, stats.greenFlagsFound, updateFlags]);

    const toggle = (name: string) => {
        const next = new Set(selected);
        if (next.has(name)) {
            next.delete(name);
        } else {
            next.add(name);
        }
        setSelected(next);
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                {flags.map((flag) => (
                    <div key={flag.name} className={`rounded-xl border transition-all ${selected.has(flag.name) ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-border bg-card'}`}>
                        <div
                            className="p-4 cursor-pointer flex items-start gap-4"
                            onClick={() => setExpanded(expanded === flag.name ? null : flag.name)}
                        >
                            <input
                                type="checkbox"
                                checked={selected.has(flag.name)}
                                onChange={() => toggle(flag.name)}
                                onClick={(e) => e.stopPropagation()}
                                className="mt-1 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-600"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-lg">{flag.name}</h4>
                                    {expanded === flag.name ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>

                                <AnimatePresence>
                                    {expanded === flag.name && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-3"
                                        >
                                            <ul className="text-sm space-y-1 mb-2">
                                                {flag.signs?.map((sign, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-red-700/80 dark:text-red-400">
                                                        <AlertTriangle className="h-3 w-3" /> {sign}
                                                    </li>
                                                ))}
                                            </ul>
                                            {flag.harm && <p className="text-xs font-semibold text-red-600">{language === 'hi' ? "नुकसान:" : "Harm:"} {flag.harm}</p>}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10 border-t-0 border-r-0 border-b-0">
                <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">{language === 'hi' ? "विश्लेषण" : "Analysis"}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {language === 'hi' ? (
                            <>
                                आपने <strong>{selected.size}</strong> संभावित रेड फ्लैग चुने हैं।
                                {selected.size > 2
                                    ? " यह गहरे अस्वस्थ पैटर्न का सुझाव देता है। कृपया अपनी भावनात्मक सुरक्षा को प्राथमिकता दें।"
                                    : " इन व्यवहारों पर नज़र रखें। स्वस्थ रिश्तों के लिए सम्मान आवश्यक है।"}
                            </>
                        ) : (
                            <>
                                You have selected <strong>{selected.size}</strong> potential red flags.
                                {selected.size > 2
                                    ? " This suggests deeper unhealthy patterns. Please prioritize your emotional safety and consider speaking to a professional."
                                    : " Keep an eye on these behaviors. Healthy relationships require safety and respect at all times."}
                            </>
                        )}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

const GreenFlagChecklist = () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const { updateFlags, stats } = useUserData();
    const { language } = useLanguage();

    const flags = language === 'hi' ? greenFlagsHi : greenFlagsEn;

    // Sync with global stats on change
    useEffect(() => {
        if (selected.size > 0 || stats.greenFlagsFound > 0) {
            updateFlags(stats.toxicPatternsFound, selected.size);
        }
    }, [selected.size, stats.toxicPatternsFound, stats.greenFlagsFound, updateFlags]);

    const toggle = (name: string) => {
        const next = new Set(selected);
        if (next.has(name)) {
            next.delete(name);
        } else {
            next.add(name);
        }
        setSelected(next);
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                {flags.map((flag) => (
                    <div key={flag.name} className={`rounded-xl border transition-all ${selected.has(flag.name) ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-border bg-card'}`}>
                        <div
                            className="p-4 cursor-pointer flex items-start gap-4"
                            onClick={() => toggle(flag.name)}
                        >
                            <div className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${selected.has(flag.name) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                {selected.has(flag.name) && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">{flag.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>
                                <div className="mt-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-md inline-block">
                                    <p className="text-xs italic text-green-800 dark:text-green-300">"{flag.example}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/10 border-t-0 border-r-0 border-b-0">
                <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">{language === 'hi' ? "रिश्ते की ताकत" : "Relationship Strength"}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {language === 'hi' ? (
                            <>
                                आपने <strong>{selected.size}</strong> स्वस्थ पैटर्न पहचाने हैं!
                                {selected.size > 3
                                    ? " आपका रिश्ता सम्मान और देखभाल की एक मजबूत नींव दिखाता है। इन व्यवहारों को पोषित करते रहें!"
                                    : " इन आदतों को बनाने पर ध्यान केंद्रित करने से रिश्ते की संतुष्टि में काफी सुधार हो सकता है।"}
                            </>
                        ) : (
                            <>
                                You have recognized <strong>{selected.size}</strong> healthy patterns!
                                {selected.size > 3
                                    ? " Your relationship demonstrates a strong foundation of respect and care. Keep nurturing these behaviors!"
                                    : " Focusing on building these habits can significantly improve relationship satisfaction."}
                            </>
                        )}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};


// --- Main Page ---

export default function FlagDetector() {
    const { t } = useLanguage();
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-background border-b">
            <div className="px-4 py-12 md:py-20 animate-fade-in">
                <div className="container mx-auto max-w-5xl space-y-8">
                    <header className="text-center space-y-4">
                        <h1 className="text-4xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500">
                            {t('title_flags')}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('desc_flags')}
                        </p>
                    </header>

                    <Tabs defaultValue="search" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-12 mb-8">
                            <TabsTrigger value="search" className="text-base"><Search className="mr-2 h-4 w-4" /> {language === 'hi' ? "फ्लैग पहचानें" : "Identify Flags"}</TabsTrigger>
                            <TabsTrigger value="red" className="text-base text-red-600 data-[state=active]:text-red-700"><Shield className="mr-2 h-4 w-4" /> {language === 'hi' ? "जहरीले पैटर्न" : "Toxic Patterns"}</TabsTrigger>
                            <TabsTrigger value="green" className="text-base text-green-600 data-[state=active]:text-green-700"><Flag className="mr-2 h-4 w-4" /> {language === 'hi' ? "ग्रीन फ्लैग्स" : "Green Flags"}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="search" className="space-y-8">
                            <FlagSearch />
                        </TabsContent>

                        <TabsContent value="red">
                            <Card className="border-none shadow-none bg-transparent">
                                <CardHeader className="px-0">
                                    <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                                        <AlertTriangle className="h-6 w-6" /> {language === 'hi' ? "रेड फ्लैग्स (जहरीले पैटर्न)" : "Red Flags (Toxic Patterns)"}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {language === 'hi'
                                            ? "ये व्यवहार सुरक्षा, विश्वास और आत्मसम्मान को कमजोर करते हैं। ये अक्सर रुकने और मूल्यांकन करने के संकेत होते हैं।"
                                            : "These behaviors undermine safety, trust, and self-esteem. They are often signs to pause and evaluate."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <RedFlagChecklist />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="green">
                            <Card className="border-none shadow-none bg-transparent">
                                <CardHeader className="px-0">
                                    <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                                        <CheckCircle className="h-6 w-6" /> {language === 'hi' ? "ग्रीन फ्लैग्स (स्वस्थ पैटर्न)" : "Green Flags (Healthy Patterns)"}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {language === 'hi'
                                            ? "ये भावनात्मक परिपक्वता, सम्मान और सुरक्षा के संकेत हैं। ये जश्न मनाने और निर्माण करने योग्य हैं।"
                                            : "These are signs of emotional maturity, respect, and safety. They are worth celebrating and building upon."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <GreenFlagChecklist />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
