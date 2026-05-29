import { useState } from 'react';
import { Coins, TrendingUp, Award, HelpCircle, FileText, Check } from 'lucide-react';

interface Scenario {
  name: string;
  allowance: number; // monthly
  totalIncr: number;
  monthsToRecover: number;
}

export default function ROICalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(45000);
  const [allowanceDA, setAllowanceDA] = useState<number>(46); // ~46% DA (Dearness Allowance)
  const [bankType, setBankType] = useState<'PSU' | 'Private' | 'Cooperative'>('PSU');

  const calculateIncrements = (incCount: number) => {
    // 1 standard statutory increment is worth roughly 3.5% - 4.5% of basic salary in standard bi-partite settlements
    const settlementFactor = bankType === 'PSU' ? 1.0 : bankType === 'Private' ? 0.85 : 0.65;
    const incrementRate = 0.042 * settlementFactor; // ~4.2% per increment average
    const incrementBaseValue = basicSalary * incrementRate;
    
    // Add dearness allowance + HRA multipliers (usually averages 1.5x of the increment value)
    const netMultiplier = 1 + allowanceDA/100 + 0.09; // basic + DA + ~9% average HRA
    const singleIncrNetValue = incrementBaseValue * netMultiplier;

    const monthlyIncrease = Math.floor(singleIncrNetValue * incCount);
    const annualIncrease = monthlyIncrease * 12;
    const completeCareerFiveYearValue = annualIncrease * 5;

    // recovered relative to Mahapack cost of ₹1999
    const monthsToRecover = Number((1999 / monthlyIncrease).toFixed(1));

    return {
      monthly: monthlyIncrease,
      annual: annualIncrease,
      fiveYear: completeCareerFiveYearValue,
      monthsToRecover
    };
  };

  const jaiibResult = calculateIncrements(1);
  const caiibResult = calculateIncrements(2);
  const combinedResult = calculateIncrements(3);

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#242220] rounded-3xl border border-[#E5E3DD] dark:border-[#3D3B34] p-6 lg:p-8 shadow-sm flex flex-col md:flex-row gap-8" id="interactive-salary-calculator-container">
      
      {/* Parameters Panel */}
      <div className="flex-1 space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono">
            ROI Calculator Tool
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-[#1A1816] dark:text-[#FAFAF8] mt-1.5 font-sans">
            Calculate your Statutory Increment Return on Investment
          </h3>
          <p className="text-sm text-[#6E6B63] dark:text-[#9B9890] mt-2 leading-relaxed">
            Standard bipartite settlements dictate mandatory salary adjustments for commercial and public sector bankers immediately upon passing IIBF examinations. Adjust inputs to see your customized return.
          </p>
        </div>

        <div className="space-y-4">
          {/* Basic Pay Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold font-sans">
              <span className="text-[#1A1816] dark:text-[#FAFAF8]">Your Current Basic Pay (Monthly)</span>
              <span className="font-mono text-[#8C50B9] text-sm">₹{basicSalary.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="30000" 
              max="100000" 
              step="1000" 
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#8C50B9]"
            />
            <div className="flex justify-between text-[10px] text-[#6E6B63] dark:text-[#9B9890] font-mono mt-1">
              <span>Clerk Min (₹30K)</span>
              <span>Off. Scale III Max (₹100K)</span>
            </div>
          </div>

          {/* Dearness Allowance (DA) Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold font-sans">
              <span className="text-[#1A1816] dark:text-[#FAFAF8]">Active Dearness Allowance (DA) Rate</span>
              <span className="font-mono text-[#CB9569] text-sm">{allowanceDA}%</span>
            </div>
            <input 
              type="range" 
              min="30" 
              max="55" 
              step="1" 
              value={allowanceDA}
              onChange={(e) => setAllowanceDA(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CB9569]"
            />
            <div className="flex justify-between text-[10px] text-[#6E6B63] dark:text-[#9B9890] font-mono mt-1">
              <span>Minimum (30%)</span>
              <span>Active Peak (55%)</span>
            </div>
          </div>

          {/* Bank Segment Type Selector */}
          <div>
            <span className="text-xs font-bold text-[#1A1816] dark:text-[#FAFAF8] block mb-2 font-sans">
              Bipartite Settlement Agreement Category:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {([
                { id: 'PSU', label: 'Public Sector (100% Rate)', desc: 'Rigid statutory bipartite schedule' },
                { id: 'Private', label: 'Private (85% Avg)', desc: 'Adaptive bank-specific adjustments' },
                { id: 'Cooperative', label: 'Cooperative (65% Avg)', desc: 'Local rural board scale criteria' }
              ] as const).map((block) => (
                <button
                  key={block.id}
                  onClick={() => setBankType(block.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 ${
                    bankType === block.id 
                    ? 'border-[#8C50B9] bg-[#8C50B9]/5 shadow-sm ring-1 ring-[#8C50B9]' 
                    : 'border-[#E5E3DD] dark:border-[#3D3B34] hover:bg-neutral-500/5'
                  }`}
                >
                  <span className="text-xs font-extrabold block text-neutral-800 dark:text-neutral-100">{block.id} Bank</span>
                  <span className="text-[9px] text-[#6E6B63] dark:text-[#9B9890] leading-none block mt-1">{block.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projection Display Board */}
      <div className="flex-1 bg-gradient-to-br from-[#8C50B9]/10 via-[#F5F0FB]/10 to-transparent rounded-2xl border border-[#E5E3DD] dark:border-[#3D3B34] p-6 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#8C50B9] font-mono flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" /> Payout Gain Projections (Calculated ledger)
          </h4>

          {/* Table Metrics */}
          <div className="mt-5 space-y-4 font-sans">
            {/* JAIIB */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/40 dark:bg-black/30 border border-neutral-500/10">
              <div>
                <span className="text-xs font-extrabold text-[#1A1816] dark:text-[#FAFAF8] block">JAIIB Certification (1 Increment)</span>
                <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-0.5">Approx. recover time: {jaiibResult.monthsToRecover} Months</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-bold text-emerald-600 block">+₹{jaiibResult.monthly.toLocaleString()} / mo</span>
                <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-0.5">+₹{jaiibResult.annual.toLocaleString()} / yr</span>
              </div>
            </div>

            {/* CAIIB */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/40 dark:bg-black/30 border border-neutral-500/10">
              <div>
                <span className="text-xs font-extrabold text-[#1A1816] dark:text-[#FAFAF8] block">CAIIB Certification (2 Increments)</span>
                <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-0.5">Approx. recover time: {caiibResult.monthsToRecover} Months</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-bold text-emerald-600 block">+₹{caiibResult.monthly.toLocaleString()} / mo</span>
                <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-0.5">+₹{caiibResult.annual.toLocaleString()} / yr</span>
              </div>
            </div>

            {/* Total Career Combined */}
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#8C50B9]/5 border border-[#8C50B9]/20">
              <div>
                <span className="text-xs font-black text-[#8C50B9] block tracking-tight">JAIIB + CAIIB Combined (3 Increments)</span>
                <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-0.5">Recovery: {combinedResult.monthsToRecover} Months</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-lg font-black text-[#8C50B9] block">+₹{combinedResult.monthly.toLocaleString()} / mo</span>
                <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">+₹{combinedResult.annual.toLocaleString()} / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic ROI Banner */}
        <div className="mt-6 pt-5 border-t border-[#E5E3DD] dark:border-[#3D3B34] text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-bold leading-tight uppercase tracking-wider font-mono">
            <TrendingUp className="w-4 h-4 animate-bounce" /> 
            Cumulative 5-Year Return: +₹{combinedResult.fiveYear.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#6E6B63] dark:text-[#9B9890] block mt-2.5 font-sans leading-relaxed">
            *Compared to the single lifetime subscription price of <strong>₹1,999</strong> for "The Banker Mahapack"
          </span>
        </div>
      </div>

    </div>
  );
}
