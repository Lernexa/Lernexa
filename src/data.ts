import { Course, DiscussionDoubt, JobAlert, RbiCircular } from './types';

export const COURSES: Course[] = [
  // ── Flagship Tier ──
  {
    courseId: 'jaiib',
    code: 'JAIIB',
    name: 'Junior Associate of the IIBF',
    tier: 'Flagship',
    tagline: 'Mandatory foundational exam unlocking instant salary increments for in-service bankers.',
    durationMonths: 6,
    description: 'Foundational 4-paper mandatory examination for active banking professionals. Covers Indian Financial System, Principles of Banking, Accounting & Financial Management, and Retail Banking.',
    eligibility: ['Active in-service employees of IIBF institutional member banks', 'Passed 10+2 examinations or equivalent'],
    contentReady: true,
    papers: [
      {
        paperId: 'ppb',
        name: 'Principles & Practices of Banking',
        modules: [
          {
            moduleId: 'mod_a',
            name: 'Module A: Indian Financial System',
            topics: [
              {
                topicId: 'ppb_modA_kyc',
                name: 'KYC & Customer Onboarding Guidelines',
                paperId: 'ppb',
                moduleId: 'mod_a',
                masterTopicId: 'kyc-master',
                order: 1,
                duration: 20,
                contentMarkdown: `# KYC / AML Guidelines in Banking

## 1. Introduction & Regulatory Foundation
The Reserve Bank of India (RBI) issues **Key Your Customer (KYC)** directions under **Section 35A of the Banking Regulation Act, 1949**. These rules are strictly aligned with the **Prevention of Money-Laundering Act (PMLA), 2002**.

## 2. Four Key Pillars of a KYC Policy
Every bank must structure its KYC compliance centered upon the following four essential components:
1. **Customer Acceptance Policy (CAP):** Strict criteria for opening accounts, ensuring no accounts are opened in anonymous or fictitious names.
2. **Customer Identification Procedures (CIP):** Verification using core Officially Valid Documents (OVDs).
3. **Monitoring of Transactions:** Ongoing verification of risk profile vs actual transaction patterns.
4. **Risk Management:** Periodic audit of accounts, categorizing them into risk buckets.

## 3. Customer Risk Classification Matrix
Banks are required to classify their customer base into three main risk tiers based on background, nature of business, and location:

| Risk Tier | Risk Parameters | Periodic Re-Verification Cycle |
|---|---|---|
| **Low Risk** | Salaried employees with clear sources, local retail customers, government entities. | Once in every **10 years** |
| **Medium Risk** | Petrol pump owners, real estate agents, non-resident clients, trading firms. | Once in every **8 years** |
| **High Risk** | Politically Exposed Persons (PEPs), high-net-worth accounts, bullion dealers, non-face-to-face entities. | Once in every **2 years** |

> ⚠️ **CRITICAL REGULATORY COMPLIANCE:** High-risk customer accounts require complete regulatory re-verification (fresh KYC documents and biometric verifications) at least once in every 2 years. Non-compliance triggers automatic account freezes.`,
                keyPoints: [
                  'KYC Guidelines are issued under Section 35A of the Banking Regulation Act, 1949 and PMLA, 2002.',
                  'The four core pillars of KYC are Customer Acceptance, identification (CIP), Ongoing Monitoring, and Risk Management.',
                  'Customers are categorized into Low Risk, Medium Risk, and High Risk profiles.',
                  'Low-risk accounts require full re-verification every 10 years, medium-risk every 8 years, and high-risk every 2 years.',
                  'Standard Officially Valid Documents (OVDs) include Aadhaar card, Passport, Voter ID, Driving Licence, and NREGA job card.'
                ],
                questions: [
                  {
                    questionText: 'As per RBI Master Directions, how frequently must a bank complete full KYC re-verification for a customer classified as "High Risk"?',
                    options: [
                      'At least once every 2 years',
                      'At least once every 5 years',
                      'At least once every 8 years',
                      'At least once every 10 years'
                    ],
                    answerIndex: 0,
                    explanation: 'High-risk customer accounts require complete re-verification (including submitting fresh OVDs and risk reviews) at least once in every 2 years to prevent compliance failures under anti-money laundering (AML) protocols.'
                  },
                  {
                    questionText: 'Which of the following acts empowers the Reserve Bank of India to issue binding KYC directives to commercial banks?',
                    options: [
                      'Prevention of Money Laundering Act, 2002',
                      'Section 35A of the Banking Regulation Act, 1949',
                      'Section 45 of the Reserve Bank of India Act, 1934',
                      'Negotiable Instruments Act, 1881'
                    ],
                    answerIndex: 1,
                    explanation: 'The RBI issues KYC directives as binding statutory guidelines under the powers conferred by Section 35A of the Banking Regulation Act, 1949, read in conjunction with the PMLA, 2002 rules.'
                  }
                ],
                audiobookUrl: 'https://cdn.lernexa.com/audios/ppb_modA_kyc.mp3',
                conceptVideoUrl: 'https://cdn.lernexa.com/videos/ppb_modA_kyc.mp4',
                recordedClassUrl: 'https://cdn.lernexa.com/classes/ppb_modA_kyc_master.mp4'
              },
              {
                topicId: 'ppb_modA_negotiable',
                name: 'Negotiable Instruments Act (Cheques & Bills)',
                paperId: 'ppb',
                moduleId: 'mod_a',
                masterTopicId: 'ni-master',
                order: 2,
                duration: 25,
                contentMarkdown: `# Negotiable Instruments Act, 1881...`,
                keyPoints: [],
                questions: [],
                audiobookUrl: null,
                conceptVideoUrl: null,
                recordedClassUrl: null
              }
            ]
          },
          {
            moduleId: 'mod_b',
            name: 'Module B: Banking Technology',
            topics: [
              {
                topicId: 'ppb_modB_payment',
                name: 'Core Electronic Payment Rails (UPI, IMPS, RTGS)',
                paperId: 'ppb',
                moduleId: 'mod_b',
                masterTopicId: 'payment-rails',
                order: 1,
                duration: 30,
                contentMarkdown: '',
                keyPoints: [],
                questions: [],
                audiobookUrl: null,
                conceptVideoUrl: null,
                recordedClassUrl: null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    courseId: 'caiib',
    code: 'CAIIB',
    name: 'Certified Associate of Indian Bankers',
    tier: 'Flagship',
    tagline: 'Advanced course unlocking duplicate scale promotions and senior role qualifications.',
    durationMonths: 6,
    description: 'Advanced 5-paper exam providing deep mastery over risk management, credit architecture, and central banking. Unlocked exclusively after passing JAIIB.',
    eligibility: ['Completed and passed the JAIIB certification exam', 'Currently active in-service bank employee'],
    contentReady: true,
    papers: []
  },

  // ── Professional Tier ──
  {
    courseId: 'ccp',
    code: 'CCP',
    name: 'Certified Credit Professional',
    tier: 'Professional',
    tagline: 'Commercial loan evaluations, corporate balance-sheet stress, and underwriting controls.',
    durationMonths: 3,
    description: 'Covers practical corporate lending mechanisms, working capital assessments, loan appraisal matrices, term evaluations, and resolution of Non-Performing Assets (NPAs).',
    eligibility: ['Bank employees working or aspiring to work in Credit Departments'],
    contentReady: true,
    papers: []
  },
  {
    courseId: 'ctp',
    code: 'CTP',
    name: 'Certified Treasury Professional',
    tier: 'Professional',
    tagline: 'Money markets, liquidity desk optimizations, and integrated forex operations.',
    durationMonths: 3,
    description: 'Deals explicitly with money markets, central bank cash reserve management, integrated forex trading desks, derivative exposures, and risk mitigation tools.',
    eligibility: ['Treasury, investment, and international banking desk officers'],
    contentReady: true,
    papers: []
  },
  {
    courseId: 'cbcp',
    code: 'CBCP',
    name: 'Certified Banking Compliance Professional',
    tier: 'Professional',
    tagline: 'Legal frameworks, statutory mandates, and regulator correspondence.',
    durationMonths: 4,
    description: 'State-of-the-art compliance management certification run jointly with the Institute of Company Secretaries of India (ICSI). Enforces corporate governance rules across banks.',
    eligibility: ['Officers handling compliance audits, legal desks, or corporate secretary roles'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'cwmp',
    code: 'CWMP',
    name: 'Certified Wealth Management Professional',
    tier: 'Professional',
    tagline: 'Personalized retail assets, tax models, estate succession, and distribution grids.',
    durationMonths: 3,
    description: 'Focuses on wealth planning, retail mutual fund distribution regulations, portfolio management algorithms, personal taxation policies, and succession laws in India.',
    eligibility: ['Relationship managers, private bankers, and wealth division specialists'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'smb',
    code: 'SMB',
    name: 'Strategic Management & Banking',
    tier: 'Professional',
    tagline: 'Corporate strategy, organizational governance, and macro-policy designs.',
    durationMonths: 3,
    description: 'Targeted course for upcoming senior staff in commercial banking, analyzing competitive landscapes, corporate structure mergers, and public policies.',
    eligibility: ['Scale III officers and above looking to enter corporate strategy planning teams'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'orm',
    code: 'ORM',
    name: 'Operational Risk Management',
    tier: 'Professional',
    tagline: 'Institutional business continuity planning and operational risk metrics.',
    durationMonths: 3,
    description: 'Specialized risk assessment methodologies detailing cybersecurity insurance, physical disaster recoveries, cash transit security protocols, and operational loss modeling.',
    eligibility: ['Risk management officers, internal auditors, and branch operational controllers'],
    contentReady: false,
    papers: []
  },

  // ── Certificate Tier ──
  {
    courseId: 'aml-kyc',
    code: 'AML-KYC',
    name: 'Certificate in AML / KYC',
    tier: 'Certificate',
    tagline: 'Strict regulatory audits, suspicious transactions tracking, and client due diligence.',
    durationMonths: 1.5,
    description: 'Deep dive into anti-money laundering legislation (PMLA), Financial Intelligence Unit (FIU-IND) reporting standards, and KYC audits.',
    eligibility: ['Branch managers, front-office compliance executives, and customer onboarding team leads'],
    contentReady: true,
    papers: []
  },
  {
    courseId: 'digital-banking',
    code: 'Digital Banking',
    name: 'Certificate in Digital Banking',
    tier: 'Certificate',
    tagline: 'Electronic payment rails, security base controls, UPI/RTGS protocols, and digital currency.',
    durationMonths: 2,
    description: 'Covers NEFT/RTGS settlement loops, UPI switch frameworks, card processing rails, mobile banking cryptography, and Central Bank Digital Currency (CBDC) standards.',
    eligibility: ['IT operations, alternate channel managers, fintech specialists'],
    contentReady: true,
    papers: []
  },
  {
    courseId: 'cyber-fraud',
    code: 'Cyber Fraud Management',
    name: 'Certificate in Cyber Crimes & Fraud Management',
    tier: 'Certificate',
    tagline: 'Complex electronic fraud analyses, containing controls, and forensic audit trails.',
    durationMonths: 2,
    description: 'Core security certification handling digital phishing tracking, ATM cloning audits, loan application frauds, identity theft, and forensic examination workflows.',
    eligibility: ['Vigilance officers, cyber security cells, and risk audit personnel'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'msme',
    code: 'MSME',
    name: 'Certificate in MSME Banking',
    tier: 'Certificate',
    tagline: 'Priority sector lending, government schema allocations, and risk rating guidelines.',
    durationMonths: 1.5,
    description: 'Focuses on SIDBI lines, CGTMSE credit guarantees, mudra financing channels, cluster diagnostics, and MSME revival policies.',
    eligibility: ['MSME loan heads, rural and agricultural relationship officers'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'ethics-banking',
    code: 'Ethics in Banking',
    name: 'Certificate in Ethics in Banking',
    tier: 'Certificate',
    tagline: 'Professional behavior, institutional transparency values, and systemic whistleblowing.',
    durationMonths: 1,
    description: 'Evaluates conflicts of interest in financial underwriting, anti-bribery policies, institutional transparency values, and professional codes of conduct.',
    eligibility: ['All grades of staff inside commercial, public and rural cooperative banks'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'it-security',
    code: 'IT Security',
    name: 'Certificate in IT Security',
    tier: 'Certificate',
    tagline: 'Data encryption, firewall engineering, and information systems asset audits.',
    durationMonths: 2,
    description: 'Pragmatic technical evaluation handling secure socket layers, cryptographic key standards, core banking database backups, and IS audits.',
    eligibility: ['System administrators, network operations team members, digital product developers'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'risk-financial',
    code: 'RFS',
    name: 'Risk in Financial Services (with CISI, UK)',
    tier: 'Certificate',
    tagline: 'Global risk paradigms, market volatility, and operational stability vectors.',
    durationMonths: 2,
    description: 'An internationally benchmarked certification delivered alongside the Chartered Institute for Securities & Investment (CISI), London, covering baseline Basel III elements.',
    eligibility: ['Risk specialists, derivatives analysts, investment officers'],
    contentReady: false,
    papers: []
  },
  {
    courseId: 'forex-ops',
    code: 'Forex Operations',
    name: 'Certificate in Foreign Exchange Operations',
    tier: 'Certificate',
    tagline: 'FEMA guidelines, letter of credits documentation, and SWIFT message rules.',
    durationMonths: 1.5,
    description: 'Detailed study of import-export documentation audits, bills collection, exchange rate calculations, SWIFT MT700 standards, and FEMA provisions.',
    eligibility: ['Foreign trade back-offices, international business desk dealers'],
    contentReady: false,
    papers: []
  },

  // ── Diploma Tier ──
  {
    courseId: 'dtirm',
    code: 'DTIRM',
    name: 'Diploma in Treasury, Investment & Risk Management',
    tier: 'Diploma',
    tagline: 'Post-graduate level certification for advanced derivatives and stress testing.',
    durationMonths: 12,
    description: 'In-depth comprehensive study covering corporate treasury operations, financial investment portfolios, advanced derivative strategies, and portfolio mathematical stress-testing methodologies.',
    eligibility: ['Post-graduates, CA/CS/ICWA professionals, or bank officers with 2+ years treasury desk service'],
    contentReady: true,
    papers: []
  },
  {
    courseId: 'dibf',
    code: 'DIBF',
    name: 'Diploma in International Banking & Finance',
    tier: 'Diploma',
    tagline: 'Cross-border clearing networks, international trade financing, and multi-currency laws.',
    durationMonths: 12,
    description: 'Examines international commercial networks, cross-border lending, structured product underwriting, and global capital market access mechanisms.',
    eligibility: ['Working officers at foreign branches, international treasury divisions, or foreign bank branches'],
    contentReady: false,
    papers: []
  }
];

export const SUBSCRIPTION_MODELS = [
  {
    id: 'pro_text',
    name: 'Pro (Text)',
    desc: 'Pointwise Summaries + Review Cheat Sheets + High-Yield PYQ Mock Tests.',
    price: '₹499',
    duration: '3 Months Validity',
    badge: 'Foundational',
    highlights: ['All 18 Courses Chapter Summary Guides', '10,000+ Mock Center Interactive Questions', 'Daily Target Active Study Planner Reset', 'Instant Sliding Tray Explanations']
  },
  {
    id: 'pro_audio',
    name: 'Pro Audio',
    desc: 'Everything in Pro Text + Full Narrated Audiobooks for Hands-free Commute Prep.',
    price: '₹699',
    duration: '3 Months Validity',
    badge: 'Commute-Friendly',
    highlights: ['All Features of Pro Text Tier', 'Professional Voice Audiobook Stream desking', 'Downloadable chapters for offline subway commutes', 'Background play in Android lockscreen']
  },
  {
    id: 'pro_video',
    name: 'Pro Video',
    desc: 'Everything in Pro Text + Agile Vector Animations highlighting calculations & legal guidelines.',
    price: '₹999',
    duration: '3 Months Validity',
    badge: 'Visual Clarity',
    highlights: ['All Features of Pro Text Tier', '5-to-15 Minute high-yield vector explanations', 'Step-by-step mathematical board illustrations', 'Weekly Live Ask-a-Doubt Webinars']
  },
  {
    id: 'pro_class',
    name: 'Pro Class Masterclass',
    desc: 'Everything in Pro Text + Full Recorded Classes focused on heavy numbers and complex balance sheets.',
    price: '₹1,299',
    duration: '3 Months Validity',
    badge: 'In-Depth',
    highlights: ['All Features of Pro Text Tier', '200+ hours of veteran business school masterclasses', 'Specific modules on JAIIB AFM balance sheet analysis', 'Direct downloadable PDF calculation worksheets']
  },
  {
    id: 'banker_mahapack',
    name: 'The Banker Mahapack',
    desc: 'Uncompromised unrestricted access. Everything we build, including personal interactive AI doubts support.',
    price: '₹1,999',
    duration: '12 Months Validity',
    badge: 'Best Value / Recommended',
    isPopular: true,
    highlights: ['Text summaries + Premium Audiobooks + Interactive Videos + Masterclass videos', 'Full 1-Year access (Supports subsequent exam cycles if needed)', 'Exclusive Android Widget: Habit Launcher', 'Priority premium WhatsApp support desk link']
  }
];

export const DISCUSSION_FORUM_DATA: DiscussionDoubt[] = [
  {
    doubtId: 'doubt_101',
    userName: 'Amit Patel',
    textMessage: 'Can anyone clarify if the 2-year threshold for high-risk accounts applies to non-face-to-face onboarding?',
    audioSnippetUrl: 'https://cdn.lernexa.com/audios/ppb_kyc_amit.mp3',
    durationSeconds: 24,
    createdAt: '2026-05-28T14:32:00Z',
    upvoteCount: 18,
    isVerified: true,
    verifiedAnswerText: 'Yes. As per the RBI Master Directions, all high-risk accounts, including those opened non-face-to-face, require complete physical re-verification and fresh biometric matches at least once in every 2 years.'
  },
  {
    doubtId: 'doubt_102',
    userName: 'Kalyani Sharma',
    textMessage: 'Under what circumstances can a Passport with expired validity be accepted as an Officially Valid Document (OVD) for low-risk customers?',
    createdAt: '2026-05-29T02:11:00Z',
    upvoteCount: 7,
    isVerified: true,
    verifiedAnswerText: 'Under no circumstances. Any Officially Valid Document listed under AML laws must possess current validity at the time of onboarding. No expired document is valid as an OVD.'
  }
];

export const JOB_ALERTS: JobAlert[] = [
  {
    id: 'job_01',
    bankName: 'SBI (State Bank of India)',
    postTitle: 'Specialist Credit Officer (Manager Grade / Scale II)',
    deadline: 'June 15, 2026',
    minCertification: 'JAIIB Preferred, CCP (Certified Credit Professional) Mandatory'
  },
  {
    id: 'job_02',
    bankName: 'Bank of Baroda',
    postTitle: 'Senior Treasury Analyst & Dealer',
    deadline: 'June 22, 2026',
    minCertification: 'CTP (Certified Treasury Professional) or CAIIB Treasury Elective Mandatory'
  }
];

export const RBI_CIRCULARS: RbiCircular[] = [
  {
    id: 'cir_01',
    title: 'RBI enhances Limits for UPI Lite wallets to ₹1,000',
    date: 'May 2026',
    summary: 'To promote electronic payments in low-connectivity areas, the wallet threshold is elevated. The per-transaction limit remains ₹500, while the overall cumulative wallet cap rises from ₹2,000 to ₹5,000.',
    targetTopics: ['Digital Banking Paper 1, Module B']
  },
  {
    id: 'cir_02',
    title: 'Biometric Authentications mandated for High-Value Cash Withdrawals',
    date: 'April 2026',
    summary: 'A new safety circular establishes mandatory fingerprint or face validation for single cash OTC payouts exceeding ₹5,00,000 to counter cyber impersonations.',
    targetTopics: ['AML & KYC rules, Fraud containment controls']
  }
];

export const FAQS = [
  {
    q: 'What is Lernexa? In what way is "Learn with Directions" beneficial?',
    a: 'Lernexa is an premium, career-acceleration platform designed exclusively for active banking and financial professionals. Our tagline "Learn with Directions" represents a disciplined, zero-distraction interactive preparation layout that connects your academic milestones directly with promotions and salary increments, tracking return of investment.'
  },
  {
    q: 'How does the "Busy Banker" Auto-Rebalance Scheduling Engine work?',
    a: 'We understand that cash transactions, corporate audits, or sudden branch cash counts can disrupt study. If you miss a daily target in your study planner, Lernexa detects this at midnight. It automatically divides and re-distributes that uncompleted unit evenly across your remaining days leading up to the exam — without resetting your active flame streaks or requiring manual rescheduling!'
  },
  {
    q: 'Is there a Free Tier? What is the "Module A Guardrail"?',
    a: 'Yes! Anyone can register for free and fully access the educational material (text, audiobooks, flashcards, mock tests) for all topics located in Module A of each licensing paper. This lets you trial every course. Accessing Modules B, C, or D will prompt our subscription upgrade paywall.'
  },
  {
    q: 'Can non-members or graduates use this platform to find job placement?',
    a: 'Absolutely! Graduates and fresh aspirants can enroll in the "Certificate Tier" (like KYC/AML or Digital Banking) to acquire credentials. Our live Job Board highlights vacancies at major PSU/private banks where having these specific certifications unlocks shortlisting and weightage advantages.'
  },
  {
    q: 'How does the Salary Tracker calculate ROI?',
    a: 'In Indian public sector banking, clearing JAIIB unlocks 1 immediate statutory scale increment in basic pay, and CAIIB unlocks 2 increments. The calculator takes your basic pay band and computes your monthly, annual, and cumulative compound returns vs. the simple expense of our application subscription, immediately showing you the direct return on investment.'
  },
  {
    q: 'Are the study materials compliant with active regulatory circulars?',
    a: 'Yes, 100%. Our compliance division constantly monitors RBI press releases and circulars. Updates (such as changes in UPI transaction limits or risk management parameters) are edited dynamically in our system and instantly pushed to active topics in the learning modules, triggering notice alerts to affected users.'
  }
];
