import { useState } from 'react';
import { Calendar, Sliders, RefreshCw, Sparkles, CheckCircle2, RotateCcw, Flame } from 'lucide-react';

interface Task {
  date: string;
  topic: string;
  minutes: number;
  completed: boolean;
}

export default function SchedulerTool() {
  const [examType, setExamType] = useState<'jaiib' | 'caiib' | 'ccp'>('jaiib');
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState<number>(5);
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [examCycle, setExamCycle] = useState<'Nov2026' | 'Jun2027'>('Nov2026');

  const [activePlan, setActivePlan] = useState<Task[] | null>(null);
  const [rebalanceCount, setRebalanceCount] = useState<number>(0);
  const [completedList, setCompletedList] = useState<Record<number, boolean>>({});

  // Mock schedule compiler logic
  const handleGeneratePlan = () => {
    const dates = ['2026-06-01', '2026-06-02', '2026-06-03', '2026-06-04', '2026-06-05'];
    let topicsLookup: string[] = [];
    if (examType === 'jaiib') {
      topicsLookup = [
        'KYC statutory guidelines & OVD checks',
        'Principles of Banking Module A: Bank customer relation',
        'AFM Module B: High-yield compound depreciation math',
        'PPB Module B: RTGS, IMPS & payment settlement circulars',
        'Negotiable Instruments Act: Crossing & endorsements rules'
      ];
    } else if (examType === 'caiib') {
      topicsLookup = [
        'Risk Management Module A: Basel III liquidity risk metrics',
        'Advanced Risk: Stress testing & portfolio asset evaluations',
        'Treasury Systems: Arbitrage forex trading desk structures',
        'Special Asset Resolutions: SARFAESI circular audit controls',
        'Strategic Human Resource models in Commercial Banks'
      ];
    } else {
      topicsLookup = [
        'Credit Operations Module B: Appraisal of balance sheets',
        'Working Capital Assessments: Mpbf calculations & ratios',
        'Credit Risk: DSCR, Debt-Equity leverage parameters',
        'Insolvency Bankruptcy (IBC) statutory definitions',
        'Underwriting commercial loans: Loan covenant structures'
      ];
    }

    const compiled: Task[] = dates.map((d, index) => ({
      date: d,
      topic: topicsLookup[index],
      minutes: dailyMinutes,
      completed: false
    }));

    setActivePlan(compiled);
    setCompletedList({});
    setRebalanceCount(0);
  };

  const handleToggleComplete = (index: number) => {
    const updated = { ...completedList, [index]: !completedList[index] };
    setCompletedList(updated);
  };

  // The Busy Banker Auto-Rebalance Trigger Simulation
  const handleTriggerRebalance = () => {
    if (!activePlan) return;

    // Check which topics are not complete (let's assume they missed a target)
    // We will visually show how the remaining units are recalibrated
    setRebalanceCount(prev => prev + 1);
    
    // Simulate re-distribution
    const recalibratedPlan = activePlan.map((task, index) => {
      const isDone = completedList[index];
      if (isDone) return task;

      // Uncompleted tasks get recalibrated in daily chunks
      return {
        ...task,
        topic: `🔄 Rebalanced: ${task.topic}`,
        minutes: Math.round(task.minutes + 8) // Distributed addition
      };
    });

    setActivePlan(recalibratedPlan);
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#242220] rounded-3xl border border-[#E5E3DD] dark:border-[#3D3B34] p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row gap-8" id="interactive-scheduler-tool-panel">
      
      {/* Parameter Panel */}
      <div className="flex-1 space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono">
            AI Study Planner Tool
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-[#1A1816] dark:text-[#FAFAF8] mt-1.5 font-sans">
            "Daily Targets" Custom Schedule Compiler
          </h3>
          <p className="text-sm text-[#6E6B63] dark:text-[#9B9890] mt-2 leading-relaxed">
            Bankers work unpredictable hours. Our automated scheduler creates your custom preparation timeline and dynamically rebalances uncompleted topics to avoid exam-prep burnout.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Exam selection */}
            <div>
              <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAFAF8] block mb-1.5">Certification Core Goal:</span>
              <select 
                value={examType}
                onChange={(e) => setExamType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-1 focus:ring-[#8C50B9]"
              >
                <option value="jaiib">JAIIB Flagship (4 Papers)</option>
                <option value="caiib">CAIIB Flagship (5 Papers)</option>
                <option value="ccp">CCP Professional (1 Paper)</option>
              </select>
            </div>

            {/* Exam month selection */}
            <div>
              <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAFAF8] block mb-1.5">Exam Target Cycle:</span>
              <select 
                value={examCycle}
                onChange={(e) => setExamCycle(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-1 focus:ring-[#8C50B9]"
              >
                <option value="Nov2026">November 2026 Cycle</option>
                <option value="Jun2027">June 2027 Cycle</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Days selection */}
            <div>
              <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAFAF8] block mb-1.5">Study Days Active / Wk:</span>
              <select 
                value={studyDaysPerWeek}
                onChange={(e) => setStudyDaysPerWeek(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-1 focus:ring-[#8C50B9]"
              >
                <option value="4">4 Days (Weekend heavy)</option>
                <option value="5">5 Days (Recommended)</option>
                <option value="6">6 Days (Aggressive review)</option>
              </select>
            </div>

            {/* Daily minutes slider selection */}
            <div>
              <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAFAF8] block mb-1.5 font-sans">
                Target Daily study minutes:
              </span>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="15" 
                  max="60" 
                  step="15" 
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="flex-1 accent-[#8C50B9] h-1"
                />
                <span className="font-mono text-[#8C50B9] text-xs font-bold w-[45px] text-right">{dailyMinutes} mins</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            className="w-full py-3 rounded-xl font-bold text-center text-xs text-white bg-[#8C50B9] hover:bg-[#7A3FAA] flex items-center justify-center gap-1.5 transition-colors duration-150 shadow-sm"
          >
            <Sparkles className="w-4 h-4" /> Compile Target Study Calendar
          </button>
        </div>
      </div>

      {/* Compiled schedule calendar view */}
      <div className="flex-1 bg-neutral-50 dark:bg-black/20 border border-[#E5E3DD] dark:border-[#3D3B34] rounded-2xl p-4 flex flex-col justify-between min-h-[300px]">
        {activePlan ? (
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center pb-2.5 border-b border-neutral-500/10">
              <div>
                <h4 className="text-xs font-extrabold text-[#1A1816] dark:text-[#FAFAF8] font-sans">
                  Compiled Prep-Calendar Schedule map
                </h4>
                <p className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] mt-0.5">
                  Exam type: <span className="font-bold underline text-[#8C50B9]">{examType.toUpperCase()}</span> • Commit: {studyDaysPerWeek} days/wk
                </p>
              </div>

              {rebalanceCount > 0 && (
                <span className="text-[9px] bg-[#CB9569]/15 text-[#CB9569] font-mono px-2 py-0.5 font-semibold rounded-full flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" /> {rebalanceCount}x Auto-Rebalanced
                </span>
              )}
            </div>

            {/* List entries */}
            <div className="space-y-2 max-h-[178px] overflow-y-auto pr-1">
              {activePlan.map((task, idx) => {
                const isCom = completedList[idx];
                return (
                  <div 
                    key={idx}
                    onClick={() => handleToggleComplete(idx)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-150 text-xs flex justify-between items-center ${
                      isCom 
                      ? 'border-emerald-500 bg-emerald-500/5 text-emerald-700 font-medium'
                      : 'border-neutral-500/10 hover:bg-neutral-500/5 bg-white dark:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isCom ? 'text-emerald-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
                      <div className="truncate text-[11px]">
                        <p className={`font-semibold ${isCom ? 'line-through text-emerald-600/50' : 'text-neutral-800 dark:text-neutral-100'}`}>
                          {task.topic}
                        </p>
                        <span className="text-[9px] text-[#6E6B63] dark:text-[#9B9890] font-mono block">Date: {task.date}</span>
                      </div>
                    </div>
                    
                    <span className={`text-[10px] pl-2 font-mono font-bold flex-shrink-0 ${isCom ? 'text-emerald-600' : 'text-[#8C50B9]'}`}>
                      ⏱️ {task.minutes} Mins
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulation controls */}
            <div className="pt-3 border-t border-neutral-500/10 flex flex-col md:flex-row items-center justify-between gap-3">
              <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] leading-tight text-center md:text-left">
                💡 Pass late branch closures or audit shifts? Try the auto-rebalance engine simulation:
              </span>
              <button 
                onClick={handleTriggerRebalance}
                className="py-1.5 px-3 rounded-lg border border-[#CB9569]/30 text-[10px] font-bold text-[#CB9569] bg-[#CB9569]/5 hover:bg-[#CB9569]/10 flex items-center gap-1 flex-shrink-0"
                title="Divides unfinished tasks amongst remaining calendar dates"
              >
                <RefreshCw className="w-3.5 h-3.5" /> "Busy Banker" Auto-Rebalance
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-12 h-12 bg-[#8C50B9]/15 border border-[#8C50B9]/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#8C50B9]" />
            </div>
            <div>
              <p className="text-xs font-bold font-sans text-neutral-800 dark:text-neutral-100">No Target Schedule Generated</p>
              <p className="text-[11px] text-[#6E6B63] dark:text-[#9B9890] mt-1 max-w-xs mx-auto">
                Select your desired certification, weekly available study days, and daily target hours, then click "Compile" to generate your custom program!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
