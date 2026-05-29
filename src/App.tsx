import { useState, useEffect } from 'react';
import { 
  Flame, 
  Coins, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Smartphone, 
  Search, 
  Award, 
  FileText, 
  Volume2, 
  Lock, 
  Moon, 
  Sun, 
  RefreshCw, 
  BookOpen, 
  Laptop, 
  Layers, 
  HelpCircle,
  Activity,
  ArrowUpRight,
  User,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import PhoneEmulator from './components/PhoneEmulator';
import ROICalculator from './components/ROICalculator';
import SchedulerTool from './components/SchedulerTool';
import CourseCatalogue from './components/CourseCatalogue';
import { SUBSCRIPTION_MODELS, FAQS, COURSES } from './data';

export default function App() {
  // ── Global Theme Toggle (BDS Base: Warm Light Cream vs Matte Dark Charcoal) ──
  const [globalTheme, setGlobalTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (globalTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [globalTheme]);

  // ── Mock CMS Interactive Form States ──
  const [cmsMcqQuestion, setCmsMcqQuestion] = useState('Which section of the Banking Regulation Act powers the RBI to issue official KYC guidelines?');
  const [cmsMcqAnswer, setCmsMcqAnswer] = useState(1); // Option index
  const [cmsPublishStatus, setCmsPublishStatus] = useState<'idle' | 'publishing' | 'done'>('idle');
  
  const [cmsAlertTitle, setCmsAlertTitle] = useState('RBI increases UPI transaction limits for educational institutes.');
  const [cmsAlertStatus, setCmsAlertStatus] = useState<'idle' | 'broadcasting' | 'done'>('idle');

  // ── Accordion States for FAQs ──
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleTheme = () => {
    setGlobalTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Mock handlers
  const handlePublishCmsMcq = () => {
    setCmsPublishStatus('publishing');
    setTimeout(() => {
      setCmsPublishStatus('done');
      setTimeout(() => setCmsPublishStatus('idle'), 2500);
    }, 1500);
  };

  const handleBroadcastCmsAlert = () => {
    setCmsAlertStatus('broadcasting');
    setTimeout(() => {
      setCmsAlertStatus('done');
      setTimeout(() => setCmsAlertStatus('idle'), 2500);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      globalTheme === 'light' 
      ? 'bg-[#FAFAF8] text-[#1A1816]' 
      : 'bg-[#181615] text-[#FAFAF8]'
    } font-sans`}>
      
      {/* ── TOP HEADER BAR ── */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        globalTheme === 'light' 
        ? 'bg-[#FAFAF8]/95 border-[#E5E3DD]' 
        : 'bg-[#181615]/95 border-[#3D3B34]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            {/* Geometric SVG Monogram Column Landmark logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md relative">
              <div className="flex gap-1 items-end h-[24px]">
                <div className="w-1 h-4 bg-black/40 rounded-t-sm"></div>
                <div className="w-1.5 h-5 bg-black/50 rounded-t-sm"></div>
                <div className="w-1 h-6 bg-black/60 rounded-t-sm"></div>
              </div>
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-neutral-900 rounded-full flex items-center justify-center">
                <span className="text-white text-[7px]">▲</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-[0.05em] block leading-none font-sans">LERNEXA</span>
              <span className={`text-[9px] uppercase tracking-wider font-bold ${
                globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>Learn with Directions</span>
            </div>
          </div>

          {/* Nav Destinations */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#brand-identity" className="hover:text-[#8C50B9] transition-colors">Philosophy</a>
            <a href="#interactive-simulator" className="hover:text-[#8C50B9] transition-colors">App Simulator</a>
            <a href="#syllabus-catalog" className="hover:text-[#8C50B9] transition-colors">18 Courses</a>
            <a href="#salary-roi-utility" className="hover:text-[#8C50B9] transition-colors">Salary ROI</a>
            <a href="#admin-cms-preview" className="hover:text-[#8C50B9] transition-colors">Admin CMS</a>
          </nav>

          {/* Active theme toggle & Mock Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                globalTheme === 'light' 
                ? 'border-[#E5E3DD] hover:bg-neutral-100 text-[#1A1816]' 
                : 'border-[#3D3B34] hover:bg-neutral-800 text-[#FAFAF8]'
              }`}
              title="Toggle Page Theme"
            >
              {globalTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline-flex px-3 py-1 bg-gradient-to-r from-red-500/10 to-amber-500/10 text-[#CB9569] hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-[#CB9569]/30 text-[10px] font-bold uppercase tracking-wide rounded-full">
              Kotlin Native • BDS Spec v1.0
            </span>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER & SIMULATOR GRID ── */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        
        {/* Abstract background ambient grids */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8C50B9]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#CB9569]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8C50B9]/10 border border-[#8C50B9]/20 text-[#8C50B9] dark:text-[#A880D6] text-xs font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" /> Unmatched Career Valuation
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-sans">
                Every Banking Exam.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8C50B9] via-[#CB9569] to-[#8C50B9]">
                  Learn with Directions.
                </span>
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
              }`}>
                Lernexa is the premium, native career-acceleration platform designed strictly for active and aspiring banking professionals. We transform complex statutory exam syllabi into guaranteed pay increases and certified promotions.
              </p>

              {/* Highlight metrics pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
                <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                  globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
                }`}>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight">Statutory Scale-Ups</h4>
                    <p className={`text-[11px] mt-0.5 ${globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      JAIIB (1 Increment) + CAIIB (2 Increments)
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                  globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
                }`}>
                  <div className="w-10 h-10 rounded-lg bg-[#8C50B9]/15 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-[#8C50B9]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight">"Busy Banker" Engine</h4>
                    <p className={`text-[11px] mt-0.5 ${globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Auto-rebalance targets around shifts & audits
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                <a 
                  href="#interactive-simulator" 
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8C50B9] text-white font-bold text-center text-sm shadow-md hover:bg-[#7A3FAA] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" /> Try Live App Simulator
                </a>
                <a 
                  href="#syllabus-catalog" 
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border text-center font-bold text-sm transition-all duration-150 ${
                    globalTheme === 'light' 
                    ? 'border-[#E5E3DD] bg-white hover:bg-neutral-50 text-neutral-800' 
                    : 'border-[#3D3B34] bg-neutral-900 hover:bg-neutral-800 text-neutral-100'
                  }`}
                >
                  Browse 18 Syllabus Tiers
                </a>
              </div>

              {/* Regulatory Assurance indicator */}
              <div className={`text-xs ${
                globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              } flex items-center gap-1.5 pt-4`}>
                <ShieldCheck className="w-4 h-4 text-[#CB9569]" /> Jointly aligned with IIBF & ICSI statutory guidelines. No simulated mock data limitations.
              </div>

            </div>

            {/* Right Emulator Column */}
            <div className="lg:col-span-5 flex justify-center relative animate-fade-in" id="interactive-simulator">
              <div className="absolute inset-x-0 -top-12 -bottom-12 bg-gradient-to-tr from-[#8C50B9]/10 to-[#CB9569]/5 blur-3xl rounded-full z-0"></div>
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#CB9569] mb-3 bg-[#CB9569]/10 px-3 py-1 rounded-full font-mono flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> Fully Tappable Android Simulator
                </span>
                
                {/* Embedded dynamic responsive mock device emulator */}
                <PhoneEmulator overrideTheme={globalTheme} />
                
                <span className={`text-[10px] mt-3.5 ${
                  globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                } leading-relaxed max-w-xs text-center`}>
                  💡 <strong>Simulator Guide:</strong> Tap "Complete Setup" to access the Syllabus list, Audiobooks, and Mock tests on the phone device.
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── LERNEXA MONOGRAM DESIGN SHOWCASE ── */}
      <section className={`py-12 lg:py-16 transition-colors duration-300 ${
        globalTheme === 'light' ? 'bg-[#EEEDE9]/40' : 'bg-[#1D1B1A]'
      }`} id="brand-identity">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono">
              The Brand Foundation
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-sans">
              The Lernexa Progress Monogram
            </h2>
            <p className={`text-sm ${globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-300'} leading-relaxed`}>
              Our identity fuses structural stability with professional upward trajectory. The column speaks of regulatory institutional trust, and the ridges represent our core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Compliance */}
            <div className={`p-6 rounded-2xl border text-left flex flex-col justify-between ${
              globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
            }`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-sans">1. Compliance Pillar</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Directly mapped to raw RBI circular updates, legislative amendments, and official statutory guidelines. If the central bank pushes a banking update at midnight, our editors propagate the change immediately.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#CB9569] font-bold uppercase block mt-6 tracking-wide">
                Strict Statutory Alignment
              </span>
            </div>

            {/* Pillar 2: Integrity */}
            <div className={`p-6 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden ${
              globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
            }`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#8C50B9]/15 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#8C50B9]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-sans">2. Integrity Pillar</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                     A secure, native Android workspace without telemetry clutter, popups, or notification interruptions. Enables banking officers to prepare in a zero-distraction layout during high-intensity workspace breaks.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#8C50B9] font-bold uppercase block mt-6 tracking-wide">
                BDS Spec Security Certified
              </span>
            </div>

            {/* Pillar 3: Mastery */}
            <div className={`p-6 rounded-2xl border text-left flex flex-col justify-between ${
              globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
            }`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-sans">3. Mastery Pillar</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Concrete concept benchmarks utilizing mathematical balance sheet evaluations, high-yield practice mocks, and automated weakness mapping ("SpeedLab") linking errors back to theoretical components.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase block mt-6 tracking-wide">
                Verified Performance Metrics
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── CORE STAGED TOOLS HUB SECTION (ROIs & Planners) ── */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Interactive Salary ROI Tool Container */}
        <div id="salary-roi-utility" className="scroll-mt-20">
          <ROICalculator />
        </div>

        {/* Interactive Planner Generator Container */}
        <div>
          <SchedulerTool />
        </div>

      </section>

      {/* ── EXHAUSTIVE 18 COURSE SYLLABUS SECTION ── */}
      <section className={`py-12 lg:py-20 transition-colors duration-300 ${
        globalTheme === 'light' ? 'bg-[#EEEDE9]/30' : 'bg-[#181615]'
      }`} id="syllabus-catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <CourseCatalogue />
        </div>
      </section>

      {/* ── MOCK ADMIN CMS CENTRAL INTERACTION (admin.trybanker.com) ── */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left" id="admin-cms-preview">
        
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono flex items-center gap-1">
            <Laptop className="w-4 h-4" /> Web Admin Portal Preview
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight font-sans">
            CMS back-office control panel: admin.trybanker.com
          </h2>
          <p className={`text-sm ${globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} leading-relaxed`}>
            To showcase how non-technical administrators operate Lernexa behind the scenes, experience our simulated content-injection console below. Adding items updates databases instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CMS panel 1: Visual MCQ creator */}
          <div className={`p-6 rounded-3xl border ${
            globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
          } space-y-4`}>
            <div>
              <span className="text-[10px] font-mono text-[#8C50B9] font-black uppercase tracking-wider block">
                Module 1 • High-Yield MCQ Generator
              </span>
              <h4 className="text-base font-extrabold mt-1">Direct mock question publisher</h4>
            </div>

            <div className="space-y-3 text-xs leading-none">
              <div>
                <label className={`block mb-1.5 font-bold ${globalTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  Dynamic Quiz Question Text:
                </label>
                <textarea 
                  value={cmsMcqQuestion}
                  onChange={(e) => setCmsMcqQuestion(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border outline-none font-semibold focus:ring-1 focus:ring-[#8C50B9] ${
                    globalTheme === 'light' ? 'bg-neutral-50' : 'bg-neutral-900 border-neutral-700'
                  }`}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono leading-none">
                <span className="p-2 border border-neutral-500/10 rounded-lg bg-neutral-500/5">Option A: Sec 35A Banking Act</span>
                <span className="p-2 border border-neutral-500/10 rounded-lg bg-neutral-500/5 col-span-1">Option B: Negotiation Act 1881</span>
                <span className="p-2 border border-neutral-500/10 rounded-lg bg-neutral-500/5">Option C: FEMA Policy 1999</span>
                <span className="p-2 border border-neutral-500/10 rounded-lg bg-neutral-500/5">Option D: PMLA Regulations 2002</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="font-bold text-neutral-400 uppercase text-[9px] block">Target Paper Routing ID:</span>
                  <span className="font-mono text-[10px] font-bold text-[#CB9569] mt-0.5 block">/jaiib/ppb_modA_kyc</span>
                </div>

                <button
                  onClick={handlePublishCmsMcq}
                  disabled={cmsPublishStatus !== 'idle'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1 ${
                    globalTheme === 'light' 
                    ? 'bg-[#8C50B9] text-white hover:bg-[#7A3FAA]' 
                    : 'bg-[#A880D6] text-black hover:bg-[#C4A8E6]'
                  }`}
                >
                  {cmsPublishStatus === 'publishing' ? (
                    <span className="flex items-center gap-1.5 font-mono">
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div> Adding...
                    </span>
                  ) : cmsPublishStatus === 'done' ? (
                    '✓ Published!'
                  ) : (
                    'Publish MCQ Option'
                  )}
                </button>
              </div>

              {cmsPublishStatus === 'done' && (
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 font-bold text-[10px] leading-relaxed animate-fade-in border border-emerald-500/20">
                  ⚡ <strong>SUCCESS:</strong> Propagated question indices to active Firestore topic collections. Android device client simulator will now render this quiz during study mode checks!
                </div>
              )}
            </div>
          </div>

          {/* CMS panel 2: Alerts & Regulatory circulars board broadcaster */}
          <div className={`p-6 rounded-3xl border ${
            globalTheme === 'light' ? 'bg-[#FFFFFF] border-[#E5E3DD]' : 'bg-[#242220] border-[#3D3B34]'
          } space-y-4`}>
            <div>
              <span className="text-[10px] font-mono text-[#CB9569] font-black uppercase tracking-wider block">
                Module 2 • Alerts Broadcaster
              </span>
              <h4 className="text-base font-extrabold mt-1">RBI statutory circular updater ticker</h4>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className={`block mb-1.5 font-bold ${globalTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  Broadcast Alert Title:
                </label>
                <input 
                  type="text" 
                  value={cmsAlertTitle}
                  onChange={(e) => setCmsAlertTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border outline-none font-semibold focus:ring-1 focus:ring-[#8C50B9] ${
                    globalTheme === 'light' ? 'bg-neutral-50' : 'bg-neutral-900 border-neutral-700'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-neutral-500/10">
                <div>
                  <span className="font-bold text-neutral-400 uppercase text-[9px] block">Broadcast Priority Level:</span>
                  <span className="font-mono text-[10px] font-bold text-red-500 mt-1 block">CRITICAL URGENT (Alert banner)</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-400 uppercase text-[9px] block">Syllabus Tag Linkage:</span>
                  <span className="font-mono text-[10px] font-bold text-blue-500 mt-1 block">/digital_banking/payment_rails</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className={globalTheme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}>
                  Sends real-time push notice to all installed Android devices
                </span>

                <button 
                  onClick={handleBroadcastCmsAlert}
                  disabled={cmsAlertStatus !== 'idle'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold leading-none select-none ${
                    cmsAlertStatus === 'broadcasting' ? 'bg-neutral-400' 
                    : cmsAlertStatus === 'done' ? 'bg-emerald-600 text-white' 
                    : 'bg-[#CB9569] hover:bg-[#B67D4A] text-white'
                  }`}
                >
                  {cmsAlertStatus === 'broadcasting' ? 'Broadcasting...' : cmsAlertStatus === 'done' ? '✓ Alert Live!' : 'Broadcast Ticker'}
                </button>
              </div>

              {cmsAlertStatus === 'done' && (
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 font-bold text-[10px] leading-relaxed animate-fade-in border border-emerald-500/20">
                  ✓ Broadcast successfully deployed! Android lockscreen notification channels triggered globally. Tickers refreshed on active subscriber feeds.
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── COHESIVE SYSTEM FAQ ACCORDIONS ── */}
      <section className={`py-12 lg:py-20 transition-colors duration-300 ${
        globalTheme === 'light' ? 'bg-[#EEEDE9]/30' : 'bg-[#1D1B1A]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono">
              FAQs & Answers
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-sans">
              Frequently Asked Banking Questions
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {FAQS.map((faq, i) => {
              const op = openFaq === i;
              return (
                <div 
                  key={i} 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    op 
                    ? 'border-[#8C50B9] bg-white dark:bg-[#242220] shadow-sm'
                    : `border-[#E5E3DD] dark:border-[#3D3B34] ${
                      globalTheme === 'light' ? 'bg-white/50' : 'bg-[#242220]/40'
                    }`
                  }`}
                >
                  <button 
                    onClick={() => setOpenFaq(op ? null : i)}
                    className="w-full p-4.5 text-left font-extrabold text-sm sm:text-base flex justify-between items-center gap-4 text-neutral-800 dark:text-neutral-100"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-neutral-400">{op ? '−' : '+'}</span>
                  </button>

                  {op && (
                    <div className={`p-4.5 pt-0 text-xs sm:text-sm leading-relaxed border-t border-neutral-500/10 ${
                      globalTheme === 'light' ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <footer className={`py-12 text-center border-t text-xs leading-relaxed ${
        globalTheme === 'light' 
        ? 'bg-[#FAFAF8] border-[#E5E3DD] text-neutral-500' 
        : 'bg-[#181615] border-[#3D3B34] text-neutral-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Brand symbol footer */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-md flex items-center justify-center">
              <span className="text-black text-[7px] font-black">▲</span>
            </div>
            <span className="font-extrabold text-[#1A1816] dark:text-[#FAFAF8] uppercase tracking-wider font-sans">Lernexa</span>
          </div>

          <p className="max-w-2xl mx-auto">
            Lernexa is an independent career preparation system. Any promotional titles, certification codes (JAIIB, CAIIB, etc.), and banking bimonthly circular summaries mentioned correspond strictly to standard educational curriculum outlines, as structured in IIBF (Indian Institute of Banking & Finance) bylaws. No structural affiliation exists.
          </p>

          <p className="text-[10px] tracking-wider uppercase font-mono text-[#CB9569] font-bold">
            © {new Date().getFullYear()} Lernexa Platform Inc. • Built to BDS Design Token Constraints.
          </p>
        </div>
      </footer>

    </div>
  );
}
