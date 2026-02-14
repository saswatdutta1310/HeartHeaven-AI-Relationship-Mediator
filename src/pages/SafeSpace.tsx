import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Wind, Moon, Sun, Trash2, Send, Sparkles, Brain, CloudRain, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserData } from "@/hooks/useUserData";
import { useLanguage } from "@/contexts/LanguageContext";

const feelingsEn = [
  { id: "anxious", label: "Anxious", color: "bg-yellow-100 dark:bg-yellow-900/30", icon: Wind },
  { id: "sad", label: "Sad", color: "bg-blue-100 dark:bg-blue-900/30", icon: CloudRain },
  { id: "angry", label: "Angry", color: "bg-red-100 dark:bg-red-900/30", icon: Sparkles },
  { id: "lonely", label: "Lonely", color: "bg-indigo-100 dark:bg-indigo-900/30", icon: Moon },
  { id: "overwhelmed", label: "Overwhelmed", color: "bg-purple-100 dark:bg-purple-900/30", icon: Brain },
];

const feelingsHi = [
  { id: "anxious", label: "चिंतित", color: "bg-yellow-100 dark:bg-yellow-900/30", icon: Wind },
  { id: "sad", label: "उदास", color: "bg-blue-100 dark:bg-blue-900/30", icon: CloudRain },
  { id: "angry", label: "गुस्सा", color: "bg-red-100 dark:bg-red-900/30", icon: Sparkles },
  { id: "lonely", label: "अकेला", color: "bg-indigo-100 dark:bg-indigo-900/30", icon: Moon },
  { id: "overwhelmed", label: "लाचार/परेशान", color: "bg-purple-100 dark:bg-purple-900/30", icon: Brain },
];

const genderPerspectivesEn = {
  boy: {
    anxious: "It's okay to feel pressure. Society often expects you to be 'tough', but true strength is acknowledging your limits. Take a step back. Focus on one small task.",
    sad: "Allow yourself to feel this. You don't have to 'fix' it immediately. Sometimes, just sitting with the feeling is part of the process.",
    angry: "Anger is often a guardian for sadness or fear. Use that energy for detailed physical activity like a run or gym session, rather than suppressing it.",
    lonely: "Reach out to a friend, even if it feels awkward. Connection is a human need, not a weakness. Do something you enjoy alone, too.",
    overwhelmed: "Break it down. Logic is your friend here. List specific tasks and tackle them one by one. You are capable."
  },
  girl: {
    anxious: "Your feelings are valid. You might be carrying the emotional load for others. Put yourself first for a moment. Breathe deeply.",
    sad: "Cry if you need to. It releases stress hormones. Treat yourself with the same kindness you'd offer a best friend.",
    angry: "Your anger is a signal that a boundary was crossed. Trust it. Express it constructively—write it down or speak your truth clearly.",
    lonely: "Connect with your community or spend time in nature. Remember that you are whole on your own. Self-love is the first step.",
    overwhelmed: "It's okay to say 'no'. You don't have to be everything to everyone. Prioritize what truly matters to you right now."
  },
  other: {
    anxious: "Ground yourself in the present. Your experience is unique, but your need for calm is universal. Focus on your breath.",
    sad: "Gentleness is key. Honor your emotions as they come. You are allowed to take up space with your feelings.",
    angry: "Channel this energy into creative expression or advocacy. Your voice matters.",
    lonely: "Seek spaces where you are seen and understood. You are not alone in your journey.",
    overwhelmed: "Take a pause. The world can wait. Reconnect with your center."
  }
};

const genderPerspectivesHi = {
  boy: {
    anxious: "दबाव महसूस करना ठीक है। समाज अक्सर आपसे 'कठोर' होने की उम्मीद करता है, लेकिन सच्ची ताकत अपनी सीमाओं को स्वीकार करना है। एक कदम पीछे हटें। एक छोटे काम पर ध्यान दें।",
    sad: "खुद को यह महसूस करने दें। आपको हमेशा इसे तुरंत 'ठीक' करने की ज़रूरत नहीं है। कभी-कभी, बस भावना के साथ बैठना प्रक्रिया का हिस्सा होता है।",
    angry: "गुस्सा अक्सर उदासी या डर का रक्षक होता है। उस ऊर्जा का उपयोग दौड़ने या जिम जैसे शारीरिक कार्यों के लिए करें, न कि उसे दबाने के लिए।",
    lonely: "किसी दोस्त से संपर्क करें, भले ही यह अजीब लगे। जुड़ाव एक मानवीय आवश्यकता है, कमजोरी नहीं। कुछ ऐसा करें जिसका आप अकेले भी आनंद लेते हों।",
    overwhelmed: "इसे तोड़ें। तर्क यहाँ आपका मित्र है। विशिष्ट कार्यों की सूची बनाएं और उन्हें एक-एक करके निपटाएं। आप सक्षम हैं।"
  },
  girl: {
    anxious: "आपकी भावनाएं मान्य हैं। आप दूसरों का भावनात्मक बोझ उठा रहे होंगे। एक पल के लिए खुद को पहले रखें। गहरी सांस लें।",
    sad: "अगर ज़रूरत हो तो रोएं। यह तनाव हार्मोन छोड़ता है। अपने साथ उसी दयालुता से पेश आएं जो आप किसी सबसे अच्छे दोस्त को देंगे।",
    angry: "आपका गुस्सा एक संकेत है कि एक सीमा पार हो गई थी। इस पर भरोसा करें। इसे रचनात्मक रूप से व्यक्त करें—इसे लिख लें या अपनी सच्चाई स्पष्ट रूप से बोलें।",
    lonely: "अपने समुदाय से जुड़ें या प्रकृति में समय बिताएं। याद रखें कि आप अपने आप में पूर्ण हैं। आत्म-प्रेम पहला कदम है।",
    overwhelmed: "'नहीं' कहना ठीक है। आपको हर किसी के लिए सब कुछ होने की ज़रूरत नहीं है। अभी आपके लिए जो वास्तव में मायने रखता है उसे प्राथमिकता दें।"
  },
  other: {
    anxious: "वर्तमान में खुद को स्थिर करें। आपका अनुभव अद्वितीय है, लेकिन शांति की आपकी आवश्यकता सार्वभौमिक है। अपनी सांस पर ध्यान दें।",
    sad: "कोमलता महत्वपूर्ण है। अपनी भावनाओं का सम्मान करें जैसे वे आती हैं। आपको अपनी भावनाओं के साथ जगह लेने की अनुमति है।",
    angry: "इस ऊर्जा को रचनात्मक अभिव्यक्ति या वकालत में लगाएं। आपकी आवाज़ मायने रखती है।",
    lonely: "ऐसे स्थान खोजें जहाँ आपको देखा और समझा जाए। आप अपनी यात्रा में अकेले नहीं हैं।",
    overwhelmed: "एक विराम लें। दुनिया इंतजार कर सकती है। अपने केंद्र से फिर से जुड़ें।"
  }
};

const SafeSpace = () => {
  const [ventText, setVentText] = useState("");
  const [isVenting, setIsVenting] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [gender, setGender] = useState<"boy" | "girl" | "other">("girl");
  const [breathingStep, setBreathingStep] = useState<"inhale" | "hold" | "exhale">("inhale");
  const { logEmotion } = useUserData();
  const { t, language } = useLanguage();

  const feelings = language === 'hi' ? feelingsHi : feelingsEn;
  const perspectives = language === 'hi' ? genderPerspectivesHi : genderPerspectivesEn;

  // Breathing animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingStep((prev) => {
        if (prev === "inhale") return "hold";
        if (prev === "hold") return "exhale";
        return "inhale";
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleVentRelease = () => {
    setIsVenting(true);
    setTimeout(() => {
      setVentText("");
      setIsVenting(false);
      logEmotion('positive');
      toast.success(language === 'hi' ? "लौटा दिया गया" : "Released", {
        description: language === 'hi' ? "आपके विचार ब्रह्मांड को सौंप दिए गए हैं।" : "Your thoughts have been released to the universe.",
      });
    }, 2000);
  };

  const handleFeelingSelect = (id: string) => {
    setSelectedFeeling(id);
    logEmotion('negative');
    toast.info(language === 'hi' ? "मूड डैशबोर्ड पर दर्ज किया गया" : "Mood logged to Dashboard");
  };

  const handleCalm = () => {
    logEmotion('positive');
    toast.success(language === 'hi' ? "प्रगति दर्ज की गई!" : "Progress recorded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6 md:p-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-8">

        <header className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {t('title_safe')}
            </h1>
            <p className="text-muted-foreground text-lg mt-2 max-w-2xl mx-auto">
              {t('desc_safe')}
            </p>
          </motion.div>
        </header>

        <Tabs defaultValue="vent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
            <TabsTrigger value="vent" className="text-md">{language === 'hi' ? "व्यक्त करें" : "Express Yourself"}</TabsTrigger>
            <TabsTrigger value="understand" className="text-md">{language === 'hi' ? "परिप्रेक्ष्य प्राप्त करें" : "Get Perspective"}</TabsTrigger>
            <TabsTrigger value="heal" className="text-md">{language === 'hi' ? "सांस लें और ठीक हों" : "Breathe & Heal"}</TabsTrigger>
          </TabsList>

          <TabsContent value="vent">
            <Card className="border-none shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-purple-500" />
                  {language === 'hi' ? "वेंटिंग बॉक्स" : "The Venting Box"}
                </CardTitle>
                <CardDescription>
                  {language === 'hi' ? "जो भी दिल पर भारी है उसे लिखें। जब आप तैयार हों, तो इसे छोड़ दें। हम इसे सहेजते नहीं हैं।" : "Write down what's heavy on your heart. When you're ready, release it. We don't save this."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {!isVenting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Textarea
                        placeholder={language === 'hi' ? "मुझे लग रहा है..." : "I feel..."}
                        className="min-h-[200px] text-lg resize-none border-purple-100 focus:border-purple-300 bg-white/80 dark:bg-gray-900/80"
                        value={ventText}
                        onChange={(e) => setVentText(e.target.value)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="h-[200px] flex items-center justify-center flex-col gap-4 text-purple-600"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Sparkles className="h-12 w-12 animate-spin" />
                      <p className="text-lg font-medium">{language === 'hi' ? "नकारात्मक ऊर्जा छोड़ रहा है..." : "Releasing negative energy..."}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="ghost" onClick={() => setVentText("")} disabled={isVenting || !ventText}>
                  <Trash2 className="mr-2 h-4 w-4" /> {language === 'hi' ? "साफ़ करें" : "Clear"}
                </Button>
                <Button
                  onClick={handleVentRelease}
                  disabled={isVenting || !ventText}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {language === 'hi' ? "ब्रह्मांड को छोड़ दें" : "Release to the Universe"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="understand">
            <div className="grid gap-6">
              <Card className="border-none shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    {language === 'hi' ? "आप कैसा महसूस कर रहे हैं?" : "How are you feeling?"}
                  </CardTitle>
                  <CardDescription>{language === 'hi' ? "सलाह पाने के लिए एक भावना चुनें।" : "Select an emotion to get tailored advice."}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {feelings.map((f) => (
                      <Button
                        key={f.id}
                        variant={selectedFeeling === f.id ? "default" : "outline"}
                        className={`h-auto py-2 px-4 gap-2 transition-all ${selectedFeeling === f.id ? "scale-105" : "hover:scale-105"
                          }`}
                        onClick={() => handleFeelingSelect(f.id)}
                      >
                        <f.icon className="h-4 w-4" />
                        {f.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedFeeling && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-primary/20 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {language === 'hi' ? `${feelings.find(f => f.id === selectedFeeling)?.label} महसूस करने के लिए सलाह` : `Advice for feeling ${feelings.find(f => f.id === selectedFeeling)?.label}`}
                      </CardTitle>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <Button
                          size="sm"
                          variant={gender === "boy" ? "default" : "ghost"}
                          onClick={() => setGender("boy")}
                          className="rounded-full"
                        >
                          {language === 'hi' ? "लड़के का नजरिया" : "Boy's Perspective"}
                        </Button>
                        <Button
                          size="sm"
                          variant={gender === "girl" ? "default" : "ghost"}
                          onClick={() => setGender("girl")}
                          className="rounded-full"
                        >
                          {language === 'hi' ? "लड़की का नजरिया" : "Girl's Perspective"}
                        </Button>
                        <Button
                          size="sm"
                          variant={gender === "other" ? "default" : "ghost"}
                          onClick={() => setGender("other")}
                          className="rounded-full"
                        >
                          {language === 'hi' ? "सामान्य" : "General"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert">
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        {perspectives[gender][selectedFeeling as keyof typeof perspectives["boy"]]}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="heal">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-blue-400/30 blur-xl absolute top-0 left-0"
                    animate={{
                      scale: breathingStep === "inhale" ? 1.5 : breathingStep === "hold" ? 1.5 : 1,
                      opacity: breathingStep === "exhale" ? 0.5 : 1
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-32 h-32 rounded-full border-4 border-blue-500/50 flex items-center justify-center relative z-10"
                    animate={{ scale: breathingStep === "inhale" ? 1.2 : breathingStep === "hold" ? 1.2 : 1 }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  >
                    <span className="text-lg font-bold capitalize text-blue-700 dark:text-blue-300">{breathingStep}</span>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{language === 'hi' ? "4-4-4 श्वास" : "4-4-4 Breathing"}</h3>
                <p className="text-muted-foreground mb-6">{language === 'hi' ? "कोर्टिसोल के स्तर को तुरंत कम करने के लिए अपनी सांस को सर्कल के साथ सिंक करें।" : "Sync your breath with the circle to lower cortisol levels immediately."}</p>
                <Button onClick={handleCalm} variant="outline" className="border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-900">
                  {language === 'hi' ? "मैं अब शांत महसूस कर रहा हूँ" : "I feel calmer now"}
                </Button>
              </Card>

              <Card className="border-none shadow-lg bg-green-50/50 dark:bg-green-900/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{language === 'hi' ? "शारीरिक और मानसिक चेक-इन" : "Physical & Mental Check-in"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(language === 'hi' ? [
                    "एक गिलास पानी पिएं",
                    "अपने जबड़े को ढीला करें",
                    "अपने कंधों को नीचे करें",
                    "ताजी हवा के लिए बाहर निकलें",
                    "3 चीजें लिखें जिनके लिए आप आभारी हैं"
                  ] : [
                    "Drink a glass of water",
                    "Unclench your jaw",
                    "Drop your shoulders",
                    "Step outside for fresh air",
                    "List 3 things you are grateful for"
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default SafeSpace;
