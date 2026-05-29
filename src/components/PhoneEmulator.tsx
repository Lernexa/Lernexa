import { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Play, 
  Pause, 
  BookOpen, 
  CheckCircle, 
  Lock, 
  TrendingUp, 
  Sliders, 
  Smartphone, 
  ChevronRight, 
  Award, 
  ArrowLeft, 
  Volume2, 
  Download, 
  Coins, 
  ShieldAlert, 
  RotateCcw, 
  Camera, 
  Mic, 
  FileText, 
  Send, 
  Plus, 
  AlertCircle, 
  Search, 
  Sparkles,
  Bookmark,
  Users
} from 'lucide-react';
import { COURSES, SUBSCRIPTION_MODELS, DISCUSSION_FORUM_DATA, RBI_CIRCULARS, JOB_ALERTS } from '../data';
import { UserProfile, Topic, Question, DiscussionDoubt } from '../types';

interface PhoneEmulatorProps {
  onStateChangeByUser?: (profile: UserProfile) => void;
  overrideTheme?: 'light' | 'dark';
}

export default function PhoneEmulator({ onStateChangeByUser, overrideTheme }: PhoneEmulatorProps) {
  // ── Theme State ──
  const [phoneTheme, setPhoneTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (overrideTheme) {
      setPhoneTheme(overrideTheme);
    }
  }, [overrideTheme]);

  // ── Navigation States ──
  // Screens: 'splash' | 'onboarding-name' | 'onboarding-role' | 'onboarding-time' | 'dashboard' | 'curriculum' | 'study-center' | 'salary-roi' | 'readiness' | 'paywall' | 'discussions'
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  
  // ── Global User Data State ──
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    role: 'Junior Officer',
    dailyCommitment: 30,
    enrolledCourse: 'jaiib',
    examMonth: 'November 2026',
    streak: 5,
    todayStudyMinutes: 12,
    completedTopics: []
  });

  // ── Audiobook States ──
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(252); // in seconds = 4m12s
  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.25x' | '1.5x' | '2.0x'>('1.0x');
  const [audioExpanded, setAudioExpanded] = useState(false);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ── Study Center Specific State ──
  const activeTopic = COURSES[0].papers[0].modules[0].topics[0]; // KYC Guide (ppb_modA_kyc)
  const [studyTab, setStudyTab] = useState<'read' | 'key-points' | 'practice-test'>('read');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  
  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  // ── Salary ROI Inputs ──
  const [basicPay, setBasicPay] = useState<number>(41960);
  const [bankCategory, setBankCategory] = useState<'PSU' | 'Private' | 'Cooperative'>('PSU');
  const [selectedRoiExam, setSelectedRoiExam] = useState<'both' | 'jaiib' | 'caiib'>('both');
  const [dlStatus, setDlStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');

  // ── Hardware readiness testing simulations ──
  const [testStage, setTestStage] = useState<'idle' | 'running' | 'completed'>('idle');
  const [osPassed, setOsPassed] = useState<boolean | null>(null);
  const [cameraPassed, setCameraPassed] = useState<boolean | null>(null);
  const [micPassed, setMicPassed] = useState<boolean | null>(null);
  const [pingPassed, setPingPassed] = useState<boolean | null>(null);
  const [cameraFeed, setCameraFeed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Forums State ──
  const [forumDoubts, setForumDoubts] = useState<DiscussionDoubt[]>(DISCUSSION_FORUM_DATA);
  const [newDoubtText, setNewDoubtText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ── Subscription and Billing State ──
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);

  // ── Navigation Bar Tab State ──
  const [currentTab, setCurrentTab] = useState<'home' | 'syllabus' | 'roi' | 'readiness'>('home');

  // ── Auto transition for Splash Screen ──
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding-name');
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Audiobook ticking logic
  useEffect(() => {
    if (audioPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 765) { // 12:45
            setAudioPlaying(false);
            return 765;
          }
          const stepMultiplier = audioSpeed === '1.0x' ? 1 : audioSpeed === '1.25x' ? 1.25 : audioSpeed === '1.5x' ? 1.5 : 2;
          return prev + Math.floor(stepMultiplier);
        });
      }, 1000);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [audioPlaying, audioSpeed]);

  const toggleAudioPlaying = () => {
    setAudioPlaying(!audioPlaying);
  };

  const handleTabClick = (tab: 'home' | 'syllabus' | 'roi' | 'readiness') => {
    setCurrentTab(tab);
    setStudyTab('read'); // fallback focus
    if (tab === 'home') setCurrentScreen('dashboard');
    else if (tab === 'syllabus') setCurrentScreen('curriculum');
    else if (tab === 'roi') setCurrentScreen('salary-roi');
    else if (tab === 'readiness') setCurrentScreen('readiness');
  };

  const notifyStateChange = (updated: UserProfile) => {
    setProfile(updated);
    if (onStateChangeByUser) {
      onStateChangeByUser(updated);
    }
  };

  // Run hardware readiness diagnostics
  const handleStartReadinessTest = async () => {
    setTestStage('running');
    setOsPassed(null);
    setCameraPassed(null);
    setMicPassed(null);
    setPingPassed(null);

    // Phase 1: Operating System Check (Instantly passes)
    setTimeout(() => {
      setOsPassed(true);
    }, 600);

    // Phase 2: Network Latency Check
    setTimeout(() => {
      setPingPassed(true);
    }, 1200);

    // Phase 3: Webcam test
    setTimeout(async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setCameraPassed(true);
          setCameraFeed(true);
        } else {
          setCameraPassed(true); // Mock pass if no active API inside the iframe sandbox
        }
      } catch (err) {
        console.warn("Camera permission blocked in frame, simulating compliance check", err);
        setCameraPassed(true); // Mock pass for user preview robustness
      }
    }, 1800);

    // Phase 4: Mic test
    setTimeout(() => {
      setMicPassed(true);
      setTestStage('completed');
    }, 2400);
  };

  // Terminate camera stream safely
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Voice recording mock
  const startVoiceRecording = () => {
    setIsRecordingVoice(true);
    setRecordingSeconds(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 30) {
          stopVoiceRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopVoiceRecording = () => {
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    setIsRecordingVoice(false);
    
    // Auto-commit recorded voice note
    const newDoubt: DiscussionDoubt = {
      doubtId: `doubt_${Date.now()}`,
      userName: profile.name || 'Anonymous Banker',
      textMessage: '🎤 Shared a math question regarding Capital Budgeting',
      audioSnippetUrl: 'https://cdn.lernexa.com/audios/ppb_recorded_doubt.mp3',
      durationSeconds: recordingSeconds || 12,
      createdAt: new Date().toISOString(),
      upvoteCount: 0,
      isVerified: false
    };
    setForumDoubts([newDoubt, ...forumDoubts]);
  };

  const handlePostDoubt = () => {
    if (!newDoubtText.trim()) return;
    const newDoubt: DiscussionDoubt = {
      doubtId: `doubt_${Date.now()}`,
      userName: profile.name || 'Anonymous Banker',
      textMessage: newDoubtText,
      createdAt: new Date().toISOString(),
      upvoteCount: 1,
      isVerified: false
    };
    setForumDoubts([newDoubt, ...forumDoubts]);
    setNewDoubtText('');
  };

  const formatAudioTime = (sec: number) => {
    const mm = Math.floor(sec / 60).toString().padStart(2, '0');
    const ss = (sec % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Paywall action activator
  const handleMainSubscribe = () => {
    setShowSubscriptionConfirmation(true);
    setIsSubscribed(true);
    setTimeout(() => {
      setShowSubscriptionConfirmation(false);
      setCurrentScreen('dashboard');
      setCurrentTab('home');
    }, 2000);
  };

  // Salary Calculations mapping
  const calculateSalaryMetrics = () => {
    // Standard public sector bank (PSU) scale basic increment is roughly ₹1,490 to ₹1,980.
    // Let's assume JAIIB = 1 increment (approx ₹1,650 + DA/HRA allowances = ₹2,400 net monthly increase)
    // CAIIB = 2 increments (approx ₹3,300 + DA/HRA allowances = ₹4,800 net monthly increase)
    const factor = bankCategory === 'PSU' ? 1.0 : bankCategory === 'Private' ? 0.8 : 0.6;
    const baseIncrementValue = Math.floor(basicPay * 0.045 * factor); // ~4.5% of basic pay per increment
    
    let monthlyGain = 0;
    if (selectedRoiExam === 'jaiib') monthlyGain = baseIncrementValue;
    else if (selectedRoiExam === 'caiib') monthlyGain = baseIncrementValue * 2;
    else monthlyGain = baseIncrementValue * 3; // Both = 3 increments

    const annualGain = monthlyGain * 12;
    // Lifetime return on application cost: Cost of Banker Mahapack is ₹1999
    const investmentReturnPercent = Math.floor((annualGain / 1999) * 100);

    return {
      monthlyGain,
      annualGain,
      roi: investmentReturnPercent
    };
  };

  const salaryMetrics = calculateSalaryMetrics();

  const mockDownloadTempeDoc = (type: 'pdf' | 'doc') => {
    setDlStatus('downloading');
    setTimeout(() => {
      setDlStatus('completed');
      setTimeout(() => setDlStatus('idle'), 2200);
    }, 1500);
  };

  // CSS mappings for themes
  const colors = {
    bg: phoneTheme === 'light' ? 'bg-[#FAFAF8]' : 'bg-[#181615]',
    card: phoneTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]',
    grayContainer: phoneTheme === 'light' ? 'bg-[#EEEDE9]' : 'bg-[#2E2A27]',
    border: phoneTheme === 'light' ? 'border-[#E5E3DD]' : 'border-[#3D3B34]',
    text: phoneTheme === 'light' ? 'text-[#1A1816]' : 'text-[#FAFAF8]',
    textMuted: phoneTheme === 'light' ? 'text-[#6E6B63]' : 'text-[#9B9890]',
    accentText: phoneTheme === 'light' ? 'text-[#8C50B9]' : 'text-[#A880D6]',
    accentBg: phoneTheme === 'light' ? 'bg-[#8C50B9] text-white hover:bg-[#7A3FAA]' : 'bg-[#A880D6] text-black hover:bg-[#C4A8E6]',
  };

  return (
    <div className="relative w-full max-w-[390px] mx-auto select-none" id="lernexa-device-emulator">
      {/* ── Device Wrapper Card ── */}
      <div className={`relative h-[770px] w-full rounded-[42px] p-[10px] bg-neutral-900 border-4 border-neutral-800 shadow-2xl overflow-hidden flex flex-col justify-between transition-colors duration-300`}>
        
        {/* Physical Speaker and Camera Notch Mockup */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-[36px] h-[3px] bg-neutral-800 rounded-full"></div>
          <div className="w-[8px] h-[8px] bg-neutral-800 rounded-full"></div>
        </div>

        {/* Physical side keys indicators */}
        <div className="absolute -left-[4px] top-[140px] w-[4px] h-[45px] bg-neutral-700 rounded-r-md"></div>
        <div className="absolute -left-[4px] top-[200px] w-[4px] h-[45px] bg-neutral-700 rounded-r-md"></div>
        <div className="absolute -right-[4px] top-[170px] w-[4px] h-[58px] bg-neutral-700 rounded-l-md"></div>

        {/* ── Emulator Canvas Screen ── */}
        <div className={`relative flex-1 rounded-[32px] overflow-hidden flex flex-col ${colors.bg} ${colors.text} font-sans`}>
          
          {/* Status Bar */}
          <div className="h-[40px] px-6 pt-3 flex justify-between items-center text-[11px] font-medium tracking-wider select-none z-30">
            <span className={colors.textMuted}>06:07</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-[#EBB060]/10 text-[#EBB060] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">BDS-5G</span>
              <div className={`w-3.5 h-2 border ${phoneTheme === 'light' ? 'border-neutral-700' : 'border-neutral-300'} rounded-sm p-0.5 flex items-center`}>
                <div className={`w-full h-full bg-current`}></div>
              </div>
            </div>
          </div>

          {/* ── CONTENT SWITCHER SCREEN ROUTER ── */}
          <div className="flex-1 overflow-y-auto pb-24 px-4 pt-1 flex flex-col scrollbar-thin">
            
            {/* 1. SPLASH SCREEN */}
            {currentScreen === 'splash' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-10">
                {/* Gold Column Monogram logo vector shape markup */}
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg relative my-8 scale-95 animate-pulse">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  {/* Column pillars nested */}
                  <div className="flex gap-1.5 mb-2 select-none items-end h-[50px]">
                    <div className="w-2 h-10 bg-black/30 rounded-t-sm"></div>
                    <div className="w-2 h-12 bg-black/40 rounded-t-sm"></div>
                    <div className="w-2 h-14 bg-black/50 rounded-t-sm"></div>
                  </div>
                  {/* Styled Monogram glyph with active progress arrow */}
                  <div className="absolute bottom-2.5 right-2.5 w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">▲</span>
                  </div>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight font-sans mt-2">LERNEXA</h1>
                <p className={`text-xs ${colors.textMuted} tracking-[0.12em] uppercase font-semibold mt-1`}>
                  Learn with Directions
                </p>

                <div className="w-48 h-1 bg-neutral-500/10 rounded-full overflow-hidden mt-20 relative">
                  <div className="absolute top-0 left-0 bg-[#8C50B9] h-full w-[45%] animate-pulse"></div>
                </div>
                <span className={`text-[10px] uppercase font-mono tracking-widest ${colors.textMuted} mt-3`}>
                  Every banking exam. One app.
                </span>
              </div>
            )}

            {/* 2. ONBOARDING - NAME INPUT */}
            {currentScreen === 'onboarding-name' && (
              <div className="flex-1 flex flex-col justify-between py-4 animate-fade-in">
                <div>
                  <div className="flex gap-1 mb-8">
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                    <div className="h-1 flex-1 bg-neutral-500/20 rounded"></div>
                    <div className="h-1 flex-1 bg-neutral-500/20 rounded"></div>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">Welcome to Lernexa. Let's start with your name.</h2>
                  <p className={`text-sm ${colors.textMuted} mt-2`}>
                    This creates your salary ROI tracking ledger and personalized study program.
                  </p>

                  <div className="mt-8">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#CB9569] block mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8C50B9] ${phoneTheme === 'light' ? 'bg-white border-neutral-300' : 'bg-neutral-800 border-neutral-700'}`}
                    />
                    <span className="text-[11px] text-[#CB9569] flex items-center gap-1 mt-2.5 font-medium">
                      <Sparkles className="w-3 h-3" /> Secure local processing • BDS Enforced
                    </span>
                  </div>
                </div>

                <button 
                  disabled={profile.name.trim().length < 3}
                  onClick={() => {
                    notifyStateChange(profile);
                    setCurrentScreen('onboarding-role');
                  }}
                  className={`w-full py-3.5 font-bold rounded-xl text-center flex items-center justify-center gap-2 text-sm select-none transition-colors duration-200 ${
                    profile.name.trim().length >= 3 
                    ? colors.accentBg 
                    : 'bg-neutral-500/20 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 3. ONBOARDING - ROLE SELECTOR */}
            {currentScreen === 'onboarding-role' && (
              <div className="flex-1 flex flex-col justify-between py-4 animate-fade-in">
                <div>
                  <div className="flex gap-1 mb-8">
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                    <div className="h-1 flex-1 bg-neutral-500/20 rounded"></div>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">Select your professional banking role.</h2>
                  <p className={`text-sm ${colors.textMuted} mt-2`}>
                    Assists us with matching promotional courses and salary projections.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    {([
                      { id: 'Junior Officer', label: 'Junior Officer / Clerk', desc: '1–3 years tenure. Focused on JAIIB foundational scale increments.' },
                      { id: 'Experienced Banker', label: 'Experienced Banker / Officer', desc: '3+ years tenure. Looking to specialize in risk management (CAIIB, CTP, CCP).' },
                      { id: 'Aspirant', label: 'Aspirant / Non-Member', desc: 'Graduate seeking entry credentials to bypass shortlists.' }
                    ] as const).map((r) => (
                      <div 
                        key={r.id}
                        onClick={() => {
                          const updated = { ...profile, role: r.id };
                          setProfile(updated);
                          notifyStateChange(updated);
                        }}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                          profile.role === r.id 
                          ? 'border-[#8C50B9] bg-[#8C50B9]/5 shadow-sm' 
                          : `${colors.border} hover:bg-neutral-500/5`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{r.label}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${profile.role === r.id ? 'border-[#8C50B9] bg-[#8C50B9]' : 'border-neutral-400'}`}>
                            {profile.role === r.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                        </div>
                        <p className={`text-[11px] mt-1 ${colors.textMuted}`}>{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentScreen('onboarding-name')}
                    className={`flex-1 py-3.5 rounded-xl font-bold text-center border ${colors.border} text-xs flex items-center justify-center gap-1 hover:bg-neutral-500/5`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('onboarding-time')}
                    className={`flex-[2] py-3.5 font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1 ${colors.accentBg}`}
                  >
                    Continue <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 4. ONBOARDING - TIME COMMITMENT */}
            {currentScreen === 'onboarding-time' && (
              <div className="flex-1 flex flex-col justify-between py-4 animate-fade-in">
                <div>
                  <div className="flex gap-1 mb-8">
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                    <div className="h-1 flex-1 bg-[#8C50B9] rounded"></div>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">Set your daily study commitment goal.</h2>
                  <p className={`text-sm ${colors.textMuted} mt-2`}>
                    This coordinates the "Busy Banker" rebalancing schedule without study pileups.
                  </p>

                  <div className="mt-8 space-y-3">
                    {([
                      { val: 15, tag: 'Casual', desc: '15 mins daily. Best read during cash cabin breaks.' },
                      { val: 30, tag: 'Recommended', desc: '30 mins daily. Balanced chapters over metro transit.' },
                      { val: 45, tag: 'Dedicated', desc: '45 mins daily. Deep-dive into complex balance cases.' },
                      { val: 60, tag: 'Intensive', desc: '60 mins daily. Aggressive promotions strategy.' }
                    ] as const).map((t) => (
                      <div 
                        key={t.val}
                        onClick={() => {
                          const updated = { ...profile, dailyCommitment: t.val };
                          setProfile(updated);
                          notifyStateChange(updated);
                        }}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                          profile.dailyCommitment === t.val 
                          ? 'border-[#CB9569] bg-[#CB9569]/5 shadow-sm' 
                          : `${colors.border} hover:bg-neutral-500/5`
                        }`}
                      >
                        <div className="text-left">
                          <span className="font-bold text-sm block">{t.val} Minutes</span>
                          <span className={`text-[11px] ${colors.textMuted}`}>{t.desc}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          profile.dailyCommitment === t.val 
                          ? 'bg-[#CB9569]/20 text-[#CB9569]'
                          : 'bg-neutral-500/10 text-neutral-500'
                        }`}>
                          {t.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setCurrentScreen('dashboard');
                    setCurrentTab('home');
                    notifyStateChange({
                      ...profile,
                      enrolledCourse: 'jaiib'
                    });
                  }}
                  className={`w-full py-3.5 font-bold rounded-xl text-center text-sm ${colors.accentBg}`}
                >
                  Complete Setup & Launch Dashboard
                </button>
              </div>
            )}

            {/* ── 5. MAIN ACTIVE STUDENT DASHBOARD ── */}
            {currentScreen === 'dashboard' && (
              <div className="space-y-4 animate-fade-in text-left">
                {/* Streak Banner */}
                <div className={`p-3.5 rounded-2xl flex items-center justify-between bg-gradient-to-br from-[#CB9569]/20 to-[#CB9569]/5 border border-[#CB9569]/30 relative overflow-hidden`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-[#CB9569]/20 rounded-full flex items-center justify-center animate-pulse">
                      <Flame className="w-5 h-5 text-[#CB9569]" fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#CB9569] font-mono leading-tight">🔥 {profile.streak} Day Study Streak</h4>
                      <p className={`text-[11px] ${colors.textMuted}`}>Awesome work, {profile.name || 'Banker'}! Keep active.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-mono font-bold tracking-tight">{profile.todayStudyMinutes} / {profile.dailyCommitment}M</span>
                    <p className={`text-[9px] uppercase tracking-wider ${colors.textMuted}`}>Minutes Today</p>
                  </div>
                </div>

                {/* Primary Action Study Card */}
                <div className={`p-4 rounded-2xl border ${colors.card} relative overflow-hidden flex flex-col justify-between h-[178px] shadow-sm`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#CB9569] bg-[#CB9569]/10 px-2 py-0.5 rounded-full">
                        Flagship Prep
                      </span>
                      <h3 className="text-base font-bold tracking-tight mt-2.5 leading-snug">
                        JAIIB • Principles & Practices of Banking
                      </h3>
                      <p className={`text-[11px] font-mono ${colors.textMuted} mt-1 flex items-center gap-1`}>
                        🗓️ 22 Days to Exam Cycle
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-[#8C50B9]/20 bg-[#8C50B9]/5 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#8C50B9]" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center text-[11px] font-mono mb-1.5 font-bold">
                      <span>Course Complete Metrics:</span>
                      <span>{profile.completedTopics.length > 0 ? '60%' : '5%'}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-500/20 rounded-full overflow-hidden">
                      <div className="bg-[#8C50B9] h-full transition-all duration-300" style={{ width: profile.completedTopics.length > 0 ? '60%' : '5%' }}></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setCurrentScreen('study-center');
                      setStudyTab('read');
                    }}
                    className={`mt-4 w-full py-2 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 ${colors.accentBg}`}
                  >
                    Resume Active Unit <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Commute Quick Launch Pills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 text-[#CB9569]">
                    "Busy Banker" Commute Hub
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => {
                        setAudioExpanded(true);
                        setAudioPlaying(true);
                      }}
                      className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-colors duration-200 ${colors.grayContainer} ${colors.border}`}
                    >
                      <Volume2 className="w-4 h-4 text-[#8C50B9] mb-1" />
                      <span className="text-[10px] font-bold leading-tight">Commute Audio</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setCurrentScreen('study-center');
                        setStudyTab('practice-test');
                      }}
                      className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-colors duration-200 ${colors.grayContainer} ${colors.border}`}
                    >
                      <Sparkles className="w-4 h-4 text-[#CB9569] mb-1" />
                      <span className="text-[10px] font-bold leading-tight">Mock Center</span>
                    </button>

                    <button 
                      onClick={() => {
                        setCurrentScreen('salary-roi');
                        setCurrentTab('roi');
                      }}
                      className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-colors duration-200 ${colors.grayContainer} ${colors.border}`}
                    >
                      <Coins className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="text-[10px] font-bold leading-tight">Salary ROI</span>
                    </button>
                  </div>
                </div>

                {/* Live News & Ticker (RBI Circulars & HR Vacancy) */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#CB9569] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Compliance Bulletins & Job Board
                  </h4>

                  {/* RBI updates */}
                  <div className={`p-3 rounded-xl border ${colors.card} text-xs flex gap-2.5 items-start`}>
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <span className={`text-[9px] uppercase font-bold text-red-500 tracking-wide font-mono block`}>
                        RBI Critical Circular • {RBI_CIRCULARS[0].date}
                      </span>
                      <h5 className="font-bold text-xs leading-snug mt-0.5">{RBI_CIRCULARS[0].title}</h5>
                      <p className={`text-[11px] ${colors.textMuted} leading-relaxed mt-1`}>{RBI_CIRCULARS[0].summary}</p>
                    </div>
                  </div>

                  {/* Career Vacancies listings */}
                  <div className={`p-3 rounded-xl border ${colors.card} text-xs flex gap-2.5 items-start`}>
                    <div className="w-2 h-2 rounded-full bg-[#8C50B9] mt-1.5 flex-shrink-0"></div>
                    <div>
                      <span className={`text-[9px] uppercase font-bold text-[#8C50B9] tracking-wide font-mono block`}>
                        Specialist Placement • SBI
                      </span>
                      <h5 className="font-bold text-xs leading-snug mt-0.5">{JOB_ALERTS[0].postTitle}</h5>
                      <p className={`text-[11px] ${colors.textMuted} leading-relaxed mt-0.5`}>Deadline: {JOB_ALERTS[0].deadline}</p>
                      <p className="text-[10px] text-[#CB9569] font-bold mt-1 uppercase tracking-wide">💡 {JOB_ALERTS[0].minCertification}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. SYLLABUS CURRICULUM TREE */}
            {currentScreen === 'curriculum' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#8C50B9]/20 bg-[#8C50B9]/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#8C50B9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">JAIIB Syllabus Structure</h3>
                    <p className={`text-[11px] ${colors.textMuted}`}>Principles & Practices of Banking</p>
                  </div>
                </div>

                {/* Course papers tabs */}
                <div className="flex gap-1 border-b border-neutral-500/10 pb-2">
                  <span className="text-[11px] font-bold bg-[#8C50B9]/10 text-[#8C50B9] px-2.5 py-1 rounded-md">Paper 1: PPB</span>
                  <span className={`text-[11px] font-semibold ${colors.textMuted} px-2.5 py-1 rounded-md cursor-not-allowed opacity-50`}>Paper 2: AFM</span>
                  <span className={`text-[11px] font-semibold ${colors.textMuted} px-2.5 py-1 rounded-md cursor-not-allowed opacity-50`}>Paper 3: RBWM</span>
                </div>

                {/* Modules Accordion */}
                <div className="space-y-3">
                  {/* Module A */}
                  <div className={`p-1 rounded-xl border ${colors.border}`}>
                    <div className="p-2.5 flex justify-between items-center bg-neutral-500/5 rounded-t-lg">
                      <span className="text-xs font-bold text-[#CB9569] uppercase tracking-wide">
                        Module A: Indian Financial System
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${colors.textMuted}`}>15% Progress</span>
                    </div>

                    <div className="p-1 space-y-1">
                      {/* Topic 1 (Unlocked) */}
                      <div 
                        onClick={() => {
                          setCurrentScreen('study-center');
                          setStudyTab('read');
                        }}
                        className={`p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-neutral-500/5 transition-colors duration-150`}
                      >
                        <div className="text-left flex-1 pr-3">
                          <h4 className="text-xs font-bold leading-snug flex items-center gap-1.5">
                            {profile.completedTopics.includes('ppb_modA_kyc') ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-[#8C50B9] flex-shrink-0"></div>
                            )}
                            KYC & Customer Onboarding Guidelines
                          </h4>
                          <span className={`text-[10px] ${colors.textMuted} font-mono mt-0.5 block pl-5`}>
                            ⏱️ 20 mins study • Complete summary & mock ques
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      </div>

                      {/* Topic 2 (Unlocked) */}
                      <div 
                        onClick={() => {
                          setCurrentScreen('discussions');
                        }}
                        className={`p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-neutral-500/5 transition-colors duration-150`}
                      >
                        <div className="text-left flex-1 pr-3">
                          <h4 className="text-xs font-bold leading-snug flex items-center gap-1.5 pl-5">
                            Ask a Doubt & Collaborative Forum
                          </h4>
                          <span className={`text-[10px] ${colors.textMuted} font-mono mt-0.5 block pl-5`}>
                            💬 {forumDoubts.length} voice/text doubts from banking peers
                          </span>
                        </div>
                        <Users className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Module B (Locked for Mocking Free-Tier) */}
                  <div className={`p-1 rounded-xl border ${colors.border}`}>
                    <div className="p-2.5 flex justify-between items-center bg-neutral-500/5 rounded-t-lg">
                      <span className={`text-xs font-bold uppercase tracking-wide ${colors.textMuted}`}>
                        Module B: Banking Technology
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${colors.textMuted}`}>Locked</span>
                    </div>

                    <div className="p-1 space-y-1">
                      <div 
                        onClick={() => {
                          if (isSubscribed) {
                            setCurrentScreen('study-center');
                            setStudyTab('read');
                          } else {
                            setCurrentScreen('paywall');
                          }
                        }}
                        className={`p-3 rounded-lg flex items-center justify-between cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-colors duration-150`}
                      >
                        <div className="text-left flex-1 pr-3">
                          <h4 className={`text-xs font-bold leading-snug flex items-center gap-1.5 ${isSubscribed ? '' : 'text-red-400'}`}>
                            {isSubscribed ? <BookOpen className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 flex-shrink-0" />}
                            Core Electronic Payment Rails (UPI, IMPS)
                          </h4>
                          <span className={`text-[10px] ${colors.textMuted} font-mono mt-0.5 block pl-5`}>
                            ⚠️ Requires Pro Subscription Upgrade
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. TOPIC STUDY CENTER */}
            {currentScreen === 'study-center' && (
              <div className="flex-1 flex flex-col space-y-3 animate-fade-in text-left">
                {/* Back bar */}
                <div className="flex items-center justify-between pb-1 border-b border-neutral-500/10">
                  <button 
                    onClick={() => setCurrentScreen('curriculum')}
                    className={`text-xs font-bold flex items-center gap-1 ${colors.textMuted}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Syllabus List
                  </button>
                  <Bookmark className="w-4 h-4 text-[#CB9569] cursor-pointer" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm leading-snug">KYC & Onboarding Guidelines</h3>
                  <span className={`text-[10px] tracking-wide uppercase font-mono font-bold ${colors.textMuted}`}>
                    Principles of Banking • Module A Unit 1
                  </span>
                </div>

                {/* Triple tab selector */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-500/5 border border-neutral-500/10 rounded-xl text-center text-xs font-bold">
                  {(['read', 'key-points', 'practice-test'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setStudyTab(tab)}
                      className={`py-1.5 rounded-lg select-none capitalize ${
                        studyTab === tab 
                        ? phoneTheme === 'light' ? 'bg-[#FFFFFF] text-black shadow-sm' : 'bg-[#2E2A27] text-white shadow-sm font-extrabold'
                        : `${colors.textMuted}`
                      }`}
                    >
                      {tab === 'practice-test' ? 'Practice Mocks' : tab === 'key-points' ? 'Key Summaries' : 'Read Text'}
                    </button>
                  ))}
                </div>

                {/* Screen Content depending on tab */}
                <div className="flex-1 flex flex-col">
                  {studyTab === 'read' && (
                    <div className="space-y-3.5 text-xs pb-10 leading-relaxed font-sans">
                      <div className="p-3 bg-gradient-to-r from-[#8C50B9]/15 to-transparent rounded-lg border-l-2 border-[#8C50B9]">
                        <h4 className="font-extrabold text-xs mb-1">Preamble statutory guidelines:</h4>
                        <p className={colors.textMuted}>RBI issues KYC directions under <strong>Section 35A of the Banking Regulation Act, 1949</strong> in compliance with <strong>PMLA, 2002</strong>.</p>
                      </div>

                      <h4 className="font-bold text-sm tracking-tight border-b border-neutral-500/10 pb-1 mt-3">Periodic Re-Verification Cycles</h4>
                      <p className={colors.textMuted}>Accounts are grouped into three distinct risk tiers. Risk classification parameters must undergo rigid physical audits:</p>
                      
                      <div className="overflow-hidden border border-neutral-500/10 rounded-lg text-[11px] mt-1 text-left font-mono">
                        <div className="bg-neutral-500/10 p-1.5 grid grid-cols-3 gap-1 font-bold">
                          <span>Risk Profile</span>
                          <span>Audit Focus</span>
                          <span>Re-Check Cycle</span>
                        </div>
                        <div className="p-1 px-1.5 grid grid-cols-3 gap-1 border-t border-neutral-500/5 bg-emerald-500/5">
                          <span className="text-emerald-500 font-bold">Low</span>
                          <span>Salaried clerks</span>
                          <span>Every 10 yrs</span>
                        </div>
                        <div className="p-1 px-1.5 grid grid-cols-3 gap-1 border-t border-neutral-500/5 bg-amber-500/5">
                          <span className="text-amber-500 font-bold">Medium</span>
                          <span>Real estate list</span>
                          <span>Every 8 yrs</span>
                        </div>
                        <div className="p-1 px-1.5 grid grid-cols-3 gap-1 border-t border-neutral-500/10 bg-red-500/5 font-bold">
                          <span className="text-red-500">High Risk</span>
                          <span>PEPs, Bullion</span>
                          <span className="text-red-500">Every 2 yrs</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#CB9569]/10 rounded-lg text-[11px] text-[#CB9569]">
                        <strong>⚠️ CRITICAL EXAM POINT:</strong> High-risk accounts not audited and re-verified within the strict 2-year window face immediate freeze.
                      </div>

                      {/* Play audiobook commuted launcher */}
                      <button 
                        onClick={() => {
                          setAudioExpanded(true);
                          setAudioPlaying(true);
                        }}
                        className={`mt-4 w-full p-2.5 rounded-xl border border-[#8C50B9]/20 bg-[#8C50B9]/5 text-[#8C50B9] font-bold flex items-center justify-center gap-1.5 hover:bg-[#8C50B9]/10 transition-colors duration-150`}
                      >
                        <Volume2 className="w-4 h-4 animate-bounce" /> Play Chapter Audiobook (12:45)
                      </button>

                      {/* Mark completed tracker */}
                      <div className="mt-4 pt-3 border-t border-neutral-500/10 flex items-center justify-between">
                        <span className={`text-xs font-bold ${colors.textMuted}`}>Progress status:</span>
                        <button 
                          onClick={() => {
                            let completed = [...profile.completedTopics];
                            let todayMin = profile.todayStudyMinutes;
                            if (completed.includes('ppb_modA_kyc')) {
                              completed = completed.filter(t => t !== 'ppb_modA_kyc');
                            } else {
                              completed.push('ppb_modA_kyc');
                              todayMin += 20; // adding chapter minutes
                            }
                            const updated = {
                              ...profile,
                              completedTopics: completed,
                              todayStudyMinutes: todayMin,
                              streak: completed.includes('ppb_modA_kyc') ? profile.streak + 1 : profile.streak
                            };
                            setProfile(updated);
                            notifyStateChange(updated);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-none flex items-center gap-1 transition-colors duration-150 ${
                            profile.completedTopics.includes('ppb_modA_kyc')
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-500/10 hover:bg-neutral-500/15'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {profile.completedTopics.includes('ppb_modA_kyc') ? 'Marked Completed' : 'Mark as Read'}
                        </button>
                      </div>
                    </div>
                  )}

                  {studyTab === 'key-points' && (
                    <div className="flex-1 flex flex-col justify-between py-4 select-none">
                      <div className="flex-1 flex flex-col justify-center">
                        {/* Interactive Flashcard */}
                        <div className={`p-5 rounded-2xl border-2 ${colors.card} shadow-sm text-left relative flex flex-col justify-between min-h-[160px] animate-scale-up`}>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#CB9569] font-mono block">
                            Key Review Summary • {flashcardIndex + 1} of 3
                          </span>
                          
                          <p className={`text-[13px] leading-relaxed font-semibold mt-3 ${colors.text}`}>
                            {flashcardIndex === 0 && '"KYC statutory directions are issued under powers conferred by Section 35A of the Banking Regulation Act, 1949."'}
                            {flashcardIndex === 1 && '"The four key pillars of an institutional KYC Policy are Customer Acceptance, CIP Identification, Ongoing Transaction Monitoring, and Risk Audits."'}
                            {flashcardIndex === 2 && '"High-risk candidates (like Gold Bullion traders or politically exposed persons) must undergo full physical re-verification at least once in 2 years."'}
                          </p>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-neutral-500/10">
                            <span className={`text-[10px] ${colors.textMuted}`}>Tap arrows to swipe</span>
                            <div className="flex gap-2">
                              {flashcardIndex > 0 && (
                                <button 
                                  onClick={() => setFlashcardIndex(prev => prev - 1)}
                                  className="w-7 h-7 rounded-lg bg-neutral-500/10 flex items-center justify-center hover:bg-neutral-500/15"
                                >
                                  ◀
                                </button>
                              )}
                              {flashcardIndex < 2 && (
                                <button 
                                  onClick={() => setFlashcardIndex(prev => prev + 1)}
                                  className="w-7 h-7 rounded-lg bg-[#8C50B9]/15 text-[#8C50B9] flex items-center justify-center hover:bg-[#8C50B9]/20"
                                >
                                  ▶
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setStudyTab('practice-test')}
                        className={`w-full py-2.5 font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1 ${colors.accentBg}`}
                      >
                        Launch Mock Testing Mode <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {studyTab === 'practice-test' && (
                    <div className="space-y-4 py-2 pb-14">
                      {activeTopic.questions.map((q, idx) => (
                        <div key={idx} className={`p-3.5 rounded-xl border ${colors.card} text-left text-xs`}>
                          <span className="text-[10px] uppercase font-bold text-[#CB9569] tracking-wider leading-none">
                            Practice MCQ • Question {idx + 1}
                          </span>
                          <p className="font-bold leading-snug mt-1.5 pr-2">{q.questionText}</p>
                          
                          <div className="mt-3 space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedAnswers[idx] === oIdx;
                              const isSubmitted = submittedAnswers[idx];
                              const isCorrect = q.answerIndex === oIdx;

                              let choiceStyle = `${colors.border}`;
                              if (isSelected && !isSubmitted) choiceStyle = 'border-[#8C50B9] bg-[#8C50B9]/5 font-semibold';
                              if (isSubmitted) {
                                if (isCorrect) choiceStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-semibold';
                                else if (isSelected && !isCorrect) choiceStyle = 'border-red-500 bg-red-500/10 text-red-600';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isSubmitted}
                                  onClick={() => setSelectedAnswers({ ...selectedAnswers, [idx]: oIdx })}
                                  className={`w-full p-2.5 rounded-lg border text-left text-[11px] leading-tight transition-all duration-150 ${choiceStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!submittedAnswers[idx] && (
                            <button
                              disabled={selectedAnswers[idx] === undefined}
                              onClick={() => {
                                setSubmittedAnswers({ ...submittedAnswers, [idx]: true });
                                setShowExplanation(idx);
                              }}
                              className={`w-full py-2 rounded-lg text-center font-bold text-[11px] mt-3 tracking-wide capitalize ${
                                selectedAnswers[idx] !== undefined
                                ? colors.accentBg
                                : 'bg-neutral-500/10 text-neutral-400 cursor-not-allowed'
                              }`}
                            >
                              Check Correct Option
                            </button>
                          )}

                          {submittedAnswers[idx] && showExplanation === idx && (
                            <div className="mt-3 p-2.5 bg-neutral-500/5 border border-dashed border-neutral-500/20 rounded-lg text-[10px] leading-relaxed">
                              <p className="font-extrabold text-[#CB9569] uppercase tracking-wide">Instant Explanation Sheet:</p>
                              <p className={`${colors.textMuted} mt-1`}>{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 8. INCREMENT ROI CALCULATOR */}
            {currentScreen === 'salary-roi' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">Salary ROI Calculator</h3>
                    <p className={`text-[11px] ${colors.textMuted}`}>Project career acceleration returns</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${colors.card} space-y-3 text-xs`}>
                  {/* Basic Pay Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-bold">
                      <span>Current Basic Pay:</span>
                      <span className="font-mono text-[#8C50B9]">₹{basicPay.toLocaleString()} / mo</span>
                    </div>
                    <input 
                      type="range" 
                      min="36000" 
                      max="90000" 
                      step="1000" 
                      value={basicPay}
                      onChange={(e) => setBasicPay(Number(e.target.value))}
                      className="w-full accent-[#8C50B9]"
                    />
                    <div className={`flex justify-between text-[9px] ${colors.textMuted} font-mono`}>
                      <span>Clerk min (₹36,000)</span>
                      <span>Scale II Max (₹90,000)</span>
                    </div>
                  </div>

                  {/* Bank tier selection */}
                  <div>
                    <span className="font-bold block mb-1">Bank Category Type:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['PSU', 'Private', 'Cooperative'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setBankCategory(cat)}
                          className={`py-1.5 rounded-lg text-[11px] font-bold border ${
                            bankCategory === cat 
                            ? 'border-[#8C50B9] bg-[#8C50B9]/5 font-extrabold text-[#8C50B9]'
                            : `${colors.border}`
                          }`}
                        >
                          {cat} Bank
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal certification selection */}
                  <div>
                    <span className="font-bold block mb-1">Certification Goal:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {([
                        { id: 'jaiib', label: 'JAIIB (1 Incr)' },
                        { id: 'caiib', label: 'CAIIB (2 Incr)' },
                        { id: 'both', label: 'Both (3 Incr)' }
                      ] as const).map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => setSelectedRoiExam(exam.id)}
                          className={`py-1 rounded-lg text-[9px] font-bold border leading-tight ${
                            selectedRoiExam === exam.id 
                            ? 'border-[#CB9569] bg-[#CB9569]/5 font-extrabold text-[#CB9569]'
                            : `${colors.border}`
                          }`}
                        >
                          {exam.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashboard Results display */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-lime-500/5 border border-emerald-500/30 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Estimated Salary Increase</span>
                      <h4 className="text-xl font-extrabold text-emerald-600 font-mono mt-0.5">
                        {selectedRoiExam === 'both' ? '+3 Statutory Increments' : selectedRoiExam === 'caiib' ? '+2 Statutory Increments' : '+1 Statutory Increment'}
                      </h4>
                    </div>
                    <Coins className="w-6 h-6 text-emerald-500 flex-shrink-0 animate-bounce" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-emerald-500/10 font-mono">
                    <div>
                      <span className={`text-[9px] uppercase ${colors.textMuted} tracking-wider`}>Monthly Cash Gain:</span>
                      <p className="text-sm font-bold mt-0.5">₹{salaryMetrics.monthlyGain.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className={`text-[9px] uppercase ${colors.textMuted} tracking-wider`}>Annual Increase:</span>
                      <p className="text-sm font-extrabold mt-0.5 text-emerald-600">₹{salaryMetrics.annualGain.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3 p-2 bg-white/20 dark:bg-black/20 rounded-lg text-center">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Investment Gains Ratio:</span>
                    <p className="text-base font-black font-mono text-emerald-600 leading-tight">
                      🔥 {salaryMetrics.roi.toLocaleString()}% ROI
                    </p>
                    <span className={`text-[8px] ${colors.textMuted} tracking-wide`}>relative to application subscription tier expenditure</span>
                  </div>
                </div>

                {/* Document builder tools */}
                <div className="space-y-2">
                  <span className="text-xs font-bold block mb-1">HR Claims Form PDF Generator:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => mockDownloadTempeDoc('pdf')}
                      disabled={dlStatus !== 'idle'}
                      className={`p-2.5 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1 leading-none ${colors.grayContainer}`}
                    >
                      <Download className="w-3.5 h-3.5 text-red-500" />
                      {dlStatus === 'downloading' ? 'Building...' : dlStatus === 'completed' ? 'PDF Saved!' : 'Save Claims PDF'}
                    </button>
                    <button 
                      onClick={() => mockDownloadTempeDoc('doc')}
                      disabled={dlStatus !== 'idle'}
                      className={`p-2.5 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1 leading-none ${colors.grayContainer}`}
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      {dlStatus === 'downloading' ? 'Building...' : dlStatus === 'completed' ? 'DOC Saved!' : 'Save Word DOC'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 9. TESTING READINESS DIAGNOSTICS */}
            {currentScreen === 'readiness' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">Readiness Inspector</h3>
                    <p className={`text-[11px] ${colors.textMuted}`}>IIBF Remote-Proctored Exam Prep</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${colors.card} text-xs leading-relaxed space-y-3.5`}>
                  <p className={colors.textMuted}>
                    Mandatory checklist to ensure browser, webcam and microphones comply with statutory anti-impersonation rules.
                  </p>

                  <div className="space-y-2 font-mono">
                    {/* OS check */}
                    <div className="flex justify-between items-center p-1.5 border-b border-neutral-500/5">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Smartphone className="w-4 h-4 text-neutral-400" /> Mobile OS:
                      </span>
                      {osPassed === null ? (
                        <span className="text-neutral-400">Pending</span>
                      ) : (
                        <span className="text-emerald-500 font-bold">Passed (Android 14)</span>
                      )}
                    </div>

                    {/* Ping Latency check */}
                    <div className="flex justify-between items-center p-1.5 border-b border-neutral-500/5">
                      <span className="flex items-center gap-1.5 font-bold">
                        <TrendingUp className="w-4 h-4 text-neutral-400" /> Target Latency:
                      </span>
                      {pingPassed === null ? (
                        <span className="text-neutral-400">Pending</span>
                      ) : (
                        <span className="text-emerald-500 font-bold">Passed (16ms Ping)</span>
                      )}
                    </div>

                    {/* Camera verify */}
                    <div className="flex justify-between items-center p-1.5 border-b border-neutral-500/5">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Camera className="w-4 h-4 text-neutral-400" /> Webcam Stream:
                      </span>
                      {cameraPassed === null ? (
                        <span className="text-neutral-400">Pending</span>
                      ) : (
                        <span className="text-emerald-500 font-bold">Passed (Live Feed)</span>
                      )}
                    </div>

                    {/* Microphone decibels validation */}
                    <div className="flex justify-between items-center p-1.5 ">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Mic className="w-4 h-4 text-neutral-400" /> Mic Intake decibels:
                      </span>
                      {micPassed === null ? (
                        <span className="text-neutral-400">Pending</span>
                      ) : (
                        <span className="text-emerald-500 font-bold">Passed (Audio Sync)</span>
                      )}
                    </div>
                  </div>

                  {testStage === 'idle' && (
                    <button
                      onClick={handleStartReadinessTest}
                      className={`w-full py-2.5 rounded-xl font-bold text-center text-xs flex items-center justify-center gap-1.5 ${colors.accentBg}`}
                    >
                      Start System Diagnostics Check <Sparkles className="w-4 h-4" />
                    </button>
                  )}

                  {testStage === 'running' && (
                    <div className="flex items-center justify-center gap-2 py-2 text-[#CB9569] font-bold font-mono">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Executing Diagnostics Sweeps...
                    </div>
                  )}

                  {testStage === 'completed' && (
                    <div className="p-3 bg-emerald-500/10 border-l-2 border-emerald-500 rounded text-emerald-600 font-bold text-[11px] text-center">
                      ✓ System Fully Vetted & Approved for Remote Online Exams!
                    </div>
                  )}

                  {/* Camera visual feed box simulation */}
                  {cameraFeed && (
                    <div className="mt-3 relative w-full h-32 bg-black rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white font-bold px-1.5 py-0.5 text-[8px] uppercase tracking-wider rounded-md animate-pulse">
                        REC • Live Proctor
                      </div>
                      <div className="absolute bottom-2 right-2 flex gap-1 items-center bg-black/40 text-white font-bold p-1 rounded-md text-[9px] font-mono leading-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Secure Loop Active
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 10. PAYWALL SUBSCRIPTION SCREEN */}
            {currentScreen === 'paywall' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-[#CB9569] tracking-tight">Upgrade Preparation</h3>
                  <button 
                    onClick={() => setCurrentScreen('curriculum')}
                    className="p-1 text-neutral-400 hover:text-white"
                  >
                    Close ✕
                  </button>
                </div>

                <p className={`text-xs ${colors.textMuted} leading-relaxed`}>
                  You have encountered the <strong>Module A Guardrail</strong>. To unlock advanced regulatory lessons, commuted audiobooks, vector videos, and full mock testing suites, select a premium tier:
                </p>

                <div className="space-y-3.5">
                  {SUBSCRIPTION_MODELS.map((model) => (
                    <div 
                      key={model.id}
                      onClick={handleMainSubscribe}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 text-xs text-left relative overflow-hidden ${
                        model.isPopular 
                        ? 'border-[#CB9569] bg-[#CB9569]/5 shadow-sm'
                        : `${colors.card} hover:bg-neutral-500/5`
                      }`}
                    >
                      {model.isPopular && (
                        <div className="absolute top-0 right-0 bg-[#CB9569] text-white px-2.5 py-1 text-[8px] uppercase font-black tracking-widest rounded-bl-xl font-mono">
                          Best ROI Value
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${model.isPopular ? 'text-[#CB9569]' : 'text-[#8C50B9]'}`}>
                            {model.badge}
                          </span>
                          <h4 className="font-extrabold text-sm leading-snug mt-1">{model.name}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[17px] font-black tracking-tight text-emerald-600 font-mono">{model.price}</span>
                          <p className={`text-[9px] ${colors.textMuted}`}>{model.duration}</p>
                        </div>
                      </div>

                      <p className={`text-[11px] ${colors.textMuted} leading-normal mt-1.5`}>{model.desc}</p>
                      
                      <div className="mt-3.5 flex flex-wrap gap-1">
                        {model.highlights.slice(0, 2).map((hl, k) => (
                          <span key={k} className="text-[9px] bg-neutral-500/10 text-neutral-500 font-bold px-1.5 py-0.5 rounded">
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. DISCUSSION FORUM / DOUBT SPACE */}
            {currentScreen === 'discussions' && (
              <div className="flex-1 flex flex-col space-y-4 animate-fade-in text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8C50B9]/15 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#8C50B9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">Discussion doubts</h3>
                    <p className={`text-[11px] ${colors.textMuted}`}>Collaborative banking peer forum</p>
                  </div>
                </div>

                {/* Search doubt bar */}
                <div className={`flex items-center gap-2 p-2 rounded-xl border ${colors.card}`}>
                  <Search className="w-3.5 h-3.5 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search historical peer queries..." 
                    className="flex-1 bg-transparent border-none text-[11px] outline-none"
                    disabled
                  />
                </div>

                {/* Doubts list */}
                <div className="flex-1 space-y-3.5 overflow-y-auto">
                  {forumDoubts.map((doubt, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border ${colors.card} text-xs relative space-y-2`}>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-[#CB9569] flex items-center gap-1">
                          👤 {doubt.userName}
                        </span>
                        <span className={colors.textMuted}>
                          {new Date(doubt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className={`${colors.text} leading-relaxed`}>{doubt.textMessage}</p>

                      {/* Display audio snippets as playable cards */}
                      {doubt.audioSnippetUrl && (
                        <div className="p-2 bg-neutral-500/5 rounded-lg border border-neutral-500/10 flex items-center justify-between">
                          <button className="w-7 h-7 rounded-full bg-[#8C50B9] text-white flex items-center justify-center">
                            ▶
                          </button>
                          <div className="flex-1 px-2.5">
                            <div className="h-1 bg-neutral-500/20 rounded-full relative w-full">
                              <div className="absolute top-0 left-0 h-full w-[40%] bg-[#8C50B9] rounded-full"></div>
                            </div>
                            <span className={`text-[8px] font-mono ${colors.textMuted} mt-1 block`}>Voice snippet doubt ({doubt.durationSeconds ?? 0}s)</span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center border-t border-neutral-500/10 pt-2 text-[10px]">
                        <button className={`flex items-center gap-1 font-bold ${colors.textMuted} hover:text-[#8C50B9]`}>
                          ▲ Upvote ({doubt.upvoteCount})
                        </button>
                        {doubt.isVerified && (
                          <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                            ✓ Verified Banker Answer
                          </span>
                        )}
                      </div>

                      {doubt.isVerified && (
                        <div className="p-2.5 bg-emerald-500/5 border-l-2 border-emerald-500 rounded-lg text-[10px] mt-2 text-emerald-600 leading-normal">
                          <p className="font-bold">Officer Resolution:</p>
                          <p className="mt-0.5">{doubt.verifiedAnswerText}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom interaction area keyboard simulator */}
                <div className="sticky bottom-0 pt-2 border-t border-neutral-500/10 flex gap-2 items-center">
                  <input 
                    type="text" 
                    placeholder="Type doubt..." 
                    value={newDoubtText}
                    onChange={(e) => setNewDoubtText(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-xl text-xs border bg-transparent text-white outline-none ${colors.border}`}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostDoubt()}
                  />
                  
                  {isRecordingVoice ? (
                    <button 
                      onClick={stopVoiceRecording}
                      className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center animate-pulse text-xs font-mono font-bold"
                    >
                      {recordingSeconds}s
                    </button>
                  ) : (
                    <button 
                      onClick={startVoiceRecording}
                      className="w-8 h-8 rounded-full bg-[#8C50B9] text-white flex items-center justify-center hover:bg-[#7A3FAA]"
                      title="Hold to Record Voice note doubt"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  )}

                  <button 
                    onClick={handlePostDoubt}
                    className="w-8 h-8 rounded-full bg-[#CB9569] text-white flex items-center justify-center hover:bg-[#B67D4A]"
                    disabled={!newDoubtText.trim()}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ── 12. PERSISTENT AUDIO PLAYBACK SCRUBBER BAR ── */}
          {audioExpanded && (
            <div className={`absolute bottom-[56px] left-0 right-0 p-3.5 rounded-t-3xl border-t ${colors.card} shadow-lg z-40 animate-slide-up text-left`}>
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#8C50B9]/20 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-4 h-4 text-[#8C50B9]" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold leading-tight">PPB Unit 1: KYC Guidelines</h5>
                    <p className={`text-[9px] ${colors.textMuted}`}>Chapter 3 Audiobook stream</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAudioExpanded(false)}
                  className="p-1 text-xs text-neutral-400 hover:text-white"
                >
                  Minimize ✕
                </button>
              </div>

              {/* Scrubber tracker progress */}
              <div className="space-y-1">
                <input 
                  type="range" 
                  min="0" 
                  max="765" 
                  value={audioProgress}
                  onChange={(e) => setAudioProgress(Number(e.target.value))}
                  className="w-full accent-[#8C50B9]"
                />
                <div className="flex justify-between text-[8px] font-mono text-neutral-400 leading-none">
                  <span>{formatAudioTime(audioProgress)}</span>
                  <span>12:45</span>
                </div>
              </div>

              {/* Controls triggers row */}
              <div className="flex justify-between items-center mt-3 pt-1">
                {/* Speed Multiplier */}
                <div className="flex gap-1">
                  {(['1.0x', '1.5x', '2.0x'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setAudioSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded font-mono text-[8px] font-bold ${
                        audioSpeed === spd 
                        ? 'bg-[#8C50B9] text-white' 
                        : 'bg-neutral-500/10 text-neutral-400'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>

                {/* Major controls playback */}
                <div className="flex gap-3 items-center">
                  <button 
                    onClick={() => setAudioProgress(prev => Math.max(0, prev - 15))}
                    className="text-neutral-400 hover:text-white text-xs font-bold"
                    title="Rewind 15 sec"
                  >
                    -15s
                  </button>
                  <button 
                    onClick={toggleAudioPlaying}
                    className="w-8 h-8 rounded-full bg-[#8C50B9] text-white flex items-center justify-center hover:bg-[#7A3FAA]"
                  >
                    {audioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setAudioProgress(prev => Math.min(765, prev + 15))}
                    className="text-neutral-400 hover:text-white text-xs font-bold"
                    title="Skip 15 sec"
                  >
                    +15s
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── PERSISTENT SYSTEM NAVIGATION BAR ── */}
          {currentScreen !== 'splash' && currentScreen !== 'onboarding-name' && currentScreen !== 'onboarding-role' && currentScreen !== 'onboarding-time' && (
            <div className={`absolute bottom-0 left-0 right-0 h-[60px] border-t flex items-center justify-around text-center select-none z-30 ${colors.card}`}>
              <button 
                onClick={() => handleTabClick('home')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-opacity duration-150 ${currentTab === 'home' ? colors.accentText : 'opacity-50'}`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-1">Dashboard</span>
              </button>

              <button 
                onClick={() => handleTabClick('syllabus')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-opacity duration-150 ${currentTab === 'syllabus' ? colors.accentText : 'opacity-50'}`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-1">Syllabus</span>
              </button>

              <button 
                onClick={() => handleTabClick('roi')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-opacity duration-150 ${currentTab === 'roi' ? colors.accentText : 'opacity-50'}`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-1">Salary ROI</span>
              </button>

              <button 
                onClick={() => handleTabClick('readiness')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-opacity duration-150 ${currentTab === 'readiness' ? colors.accentText : 'opacity-50'}`}
              >
                <Award className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-1">Inspector</span>
              </button>
            </div>
          )}

          {/* Core System Home Indicator bar at the bottom */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-1 bg-neutral-600 rounded-full z-40"></div>
        </div>
      </div>

      {/* Subscription complete overlay success prompt */}
      {showSubscriptionConfirmation && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-8 text-center animate-fade-in z-50 rounded-[42px] m-[10px]">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-700/50 rounded-2xl p-6 space-y-4 animate-scale-up text-center col-span-1 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-emerald-500 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-500 uppercase tracking-wider font-mono">Payment Successful</h4>
              <p className="text-white text-xs mt-1.5 font-bold">The Banker Mahapack is now activated!</p>
              <p className="text-neutral-400 text-[10px] mt-1 leading-normal">All 18 comprehensive courses, professional audiobooks, vector animations, and proctored readiness calculators have been fully unlocked across your device.</p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded active visual indicator styling helper */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
