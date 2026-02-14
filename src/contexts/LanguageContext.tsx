import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "hi";

type Translations = {
    // Navigation
    nav_dashboard: string;
    nav_flags: string;
    nav_safe_space: string;
    nav_ai_companion: string;
    nav_translator: string;

    // Dashboard
    welcome: string;
    welcome_sub: string;
    check_in_btn: string;
    health_score: string;
    health_score_sub: string;
    metrics_conflicts: string;
    metrics_conflicts_sub: string;
    metrics_emotions: string;
    metrics_emotions_sub: string;
    metrics_red_flags: string;
    metrics_red_flags_sub: string;
    metrics_green_flags: string;
    metrics_green_flags_sub: string;
    chart_conflicts: string;
    chart_emotions: string;
    no_data_title: string;
    no_data_desc: string;
    ai_insights: string;
    quick_actions: string;
    quick_actions_sub: string;

    // General Buttons
    btn_signin: string;
    btn_signout: string;
    btn_release: string;

    // Page Titles & Descriptions
    title_flags: string;
    desc_flags: string;
    title_ai: string;
    desc_ai: string;
    title_safe: string;
    desc_safe: string;
    title_translator: string;
    desc_translator: string;

    // Common
    loading: string;
};

const translations: Record<Language, Translations> = {
    en: {
        nav_dashboard: "Dashboard",
        nav_flags: "Flag Detector",
        nav_safe_space: "Safe Space",
        nav_ai_companion: "AI Companion",
        nav_translator: "Translator",

        welcome: "Welcome back",
        welcome_sub: "Here is your relationship health overview.",
        check_in_btn: "Check-in Today",
        health_score: "Health Score",
        health_score_sub: "Based on your interactions",
        metrics_conflicts: "Conflicts",
        metrics_conflicts_sub: "Recorded",
        metrics_emotions: "Emotional Log",
        metrics_emotions_sub: "Check-ins",
        metrics_red_flags: "Red Flags",
        metrics_red_flags_sub: "Identified",
        metrics_green_flags: "Green Flags",
        metrics_green_flags_sub: "Discovered",
        chart_conflicts: "Conflict History",
        chart_emotions: "Emotion Trends",
        no_data_title: "No Data Yet",
        no_data_desc: "Start using tools like the Safe Space or Flag Detector to see your personalized trends appear here.",
        ai_insights: "AI Insights",
        quick_actions: "What do you want to do next?",
        quick_actions_sub: "Use these tools to work on your relationship step by step.",

        btn_signin: "Sign In",
        btn_signout: "Sign Out",
        btn_release: "Release",
        loading: "Loading...",

        title_flags: "Red & Green Flag Detector",
        desc_flags: "Identify healthy and toxic patterns in your relationship.",
        title_ai: "AI Relationship Companion",
        desc_ai: "Get objective, psychological advice on your situation.",
        title_safe: "Safe Space",
        desc_safe: "A place to vent, breathe, and find perspective.",
        title_translator: "Emotional Translator",
        desc_translator: "Transform blame into understanding."
    },
    hi: {
        nav_dashboard: "डैशबोर्ड",
        nav_flags: "फ्लैग डिटेक्टर",
        nav_safe_space: "सुरक्षित स्थान",
        nav_ai_companion: "AI साथी",
        nav_translator: "अनुवादक",

        welcome: "वापसी पर स्वागत है",
        welcome_sub: "यहाँ आपके रिश्ते के स्वास्थ्य का अवलोकन है।",
        check_in_btn: "आज का चेक-इन",
        health_score: "स्वास्थ्य स्कोर",
        health_score_sub: "आपकी बातचीत के आधार पर",
        metrics_conflicts: "संघर्ष",
        metrics_conflicts_sub: "दर्ज किया गया",
        metrics_emotions: "भावनात्मक लॉग",
        metrics_emotions_sub: "चेक-इन्स",
        metrics_red_flags: "रेड फ्लैग्स",
        metrics_red_flags_sub: "पहचाना गया",
        metrics_green_flags: "ग्रीन फ्लैग्स",
        metrics_green_flags_sub: "खोजा गया",
        chart_conflicts: "संघर्ष इतिहास",
        chart_emotions: "भावना के रुझान",
        no_data_title: "अभी तक कोई डेटा नहीं",
        no_data_desc: "अपने व्यक्तिगत रुझान देखने के लिए सेफ स्पेस या फ्लैग डिटेक्टर जैसे टूल का उपयोग शुरू करें।",
        ai_insights: "AI अंतर्दृष्टि",
        quick_actions: "आप आगे क्या करना चाहते हैं?",
        quick_actions_sub: "अपने रिश्ते पर कदम दर कदम काम करने के लिए इन टूल का उपयोग करें।",

        btn_signin: "साइन इन करें",
        btn_signout: "साइन आउट",
        btn_release: "छोड़ें",
        loading: "लोड हो रहा है...",

        title_flags: "रेड और ग्रीन फ्लैग डिटेक्टर",
        desc_flags: "अपने रिश्ते में स्वस्थ और जहरीले पैटर्न की पहचान करें।",
        title_ai: "AI रिलेशनशिप साथी",
        desc_ai: "अपनी स्थिति पर निष्पक्ष, मनोवैज्ञानिक सलाह प्राप्त करें।",
        title_safe: "सुरक्षित स्थान",
        desc_safe: "व्यक्त करने, सांस लेने और परिप्रेक्ष्य खोजने का स्थान।",
        title_translator: "भावनात्मक अनुवादक",
        desc_translator: "दोष को समझ में बदलें।"
    }
};

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof Translations) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        document.documentElement.lang = "en";
    }, []);

    const t = (key: keyof Translations) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
