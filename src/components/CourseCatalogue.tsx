import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, AlertCircle, FileText, Award, Layers } from 'lucide-react';
import { COURSES } from '../data';
import { Course } from '../types';

export default function CourseCatalogue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<'All' | 'Flagship' | 'Professional' | 'Certificate' | 'Diploma'>('All');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Filter logic
  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = activeTier === 'All' || course.tier === activeTier;

    return matchesSearch && matchesTier;
  });

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Flagship': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Professional': return 'bg-[#8C50B9]/15 text-[#8C50B9] border-[#8C50B9]/20';
      case 'Certificate': return 'bg-amber-500/15 text-amber-500 border-amber-500/20';
      default: return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
    }
  };

  const toggleCourseExpand = (id: string) => {
    if (expandedCourse === id) setExpandedCourse(null);
    else setExpandedCourse(id);
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#242220] rounded-3xl border border-[#E5E3DD] dark:border-[#3D3B34] p-6 lg:p-8 shadow-sm text-left relative" id="exhaustive-course-taxonomy-container">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#CB9569] font-mono">
          Course Catalogue taxonomy
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-[#1A1816] dark:text-[#FAFAF8] mt-1.5 font-sans">
          Explore all 18 Active Financial Certifications
        </h3>
        <p className="text-sm text-[#6E6B63] dark:text-[#9B9890] mt-2 max-w-3xl leading-relaxed">
          Syllabi organized strictly according to official IIBF guides. Filter courses by tier to view statutory increments weights, paper dimensions, and minimum pre-commitment outlines.
        </p>
      </div>

      {/* Grid Filters Panel */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-neutral-500/10">
        
        {/* Tier filter pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {(['All', 'Flagship', 'Professional', 'Certificate', 'Diploma'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors duration-150 select-none ${
                activeTier === tier 
                ? 'border-[#8C50B9] bg-[#8C50B9]/5 text-[#8C50B9] font-extrabold'
                : 'border-[#E5E3DD] dark:border-[#3D3B34] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-500/5'
              }`}
            >
              {tier} {tier !== 'All' && 'Tier'}
            </button>
          ))}
        </div>

        {/* Input search */}
        <div className="flex items-center gap-2 px-3 py-2 border border-[#E5E3DD] dark:border-[#3D3B34] bg-neutral-50 dark:bg-black/10 rounded-xl w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search by keyword or Code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-xs border-none outline-none text-[#1A1816] dark:text-[#FAFAF8]"
          />
        </div>
      </div>

      {/* Result Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const isExp = expandedCourse === course.courseId;
            return (
              <div 
                key={course.courseId}
                className={`p-4 rounded-2xl border transition-all duration-200 text-xs text-left cursor-pointer flex flex-col justify-between ${
                  isExp 
                  ? 'border-[#8C50B9] bg-[#8C50B9]/5 shadow-sm ring-1 ring-[#8C50B9]'
                  : 'border-[#E5E3DD] dark:border-[#3D3B34] bg-[#FFFFFF] dark:bg-[#242220] hover:bg-neutral-500/5'
                }`}
                onClick={() => toggleCourseExpand(course.courseId)}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded border ${getTierColor(course.tier)}`}>
                      {course.tier} Tier
                    </span>
                    <span className="font-mono text-[10px] text-[#CB9569] font-bold">
                      {course.durationMonths} Mo. Duration
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold mt-2 leading-snug flex items-center gap-1 text-neutral-800 dark:text-neutral-100">
                    <span className="text-[#8C50B9] font-mono font-black">[{course.code}]</span> {course.name}
                  </h4>

                  <p className="text-[#6E6B63] dark:text-[#9B9890] mt-1.5 leading-relaxed text-[11px]">
                    {course.tagline}
                  </p>
                </div>

                {/* Additional syllabus data revealed on expand */}
                {isExp && (
                  <div className="mt-4 pt-3.5 border-t border-neutral-500/10 space-y-3 font-sans max-w-full animate-fade-in">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#CB9569] block">Course Summary:</span>
                      <p className="text-neutral-600 dark:text-[#9B9890] mt-1 pr-1 leading-normal text-[11px]">{course.description}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C50B9] block">Eligibility Requirements:</span>
                      <ul className="list-disc pl-4 text-neutral-500 mt-1 space-y-0.5 leading-snug text-[10px]">
                        {course.eligibility.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-1.5">
                      <span className="text-[9px] uppercase font-bold text-neutral-400">Content Syllabus State:</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${course.contentReady ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-500'}`}>
                        {course.contentReady ? '✓ Active Syllabus' : '⏳ Initial Rollout Stage'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center text-neutral-400 border-t border-neutral-500/5 pt-2 text-[10px] select-none">
                  <span>{isExp ? 'Tap to collapse profile' : 'Tap to expand syllabus details'}</span>
                  {isExp ? <ChevronUp className="w-4 h-4 text-[#8C50B9]" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center p-8 space-y-2 border border-dashed border-neutral-500/20 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-neutral-400" />
            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100">No Target Certification Found</p>
            <p className="text-[10px] text-[#6E6B63] dark:text-[#9B9890]">Adjust keyword filter chips to resolve conflict</p>
          </div>
        )}
      </div>

    </div>
  );
}
