import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileCheck2, 
  RefreshCw, 
  Download, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ResumeAudit } from '../types';
import { DataService } from '../lib/db';

interface ResumePageProps {
  onScoreUpdated?: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onScoreUpdated }) => {
  const [audit, setAudit] = useState<ResumeAudit>(() => DataService.getResumeAudit());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(audit.fileName);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let file: File | null = null;
    if (e.target?.files && e.target.files[0]) {
      file = e.target.files[0];
    } else if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      file = e.dataTransfer.files[0];
    }
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    // Simulate intelligent multi-factor ATS parsing
    setTimeout(() => {
      const studentSkills = DataService.getStudentSkills();
      const hasDocker = studentSkills.some(s => s.skillName.toLowerCase() === 'docker');
      const hasSystemDesign = studentSkills.some(s => s.skillName.toLowerCase() === 'system design');

      const updatedAudit: ResumeAudit = {
        ...audit,
        fileName: file?.name || 'Resume_Updated.pdf',
        fileSize: `${Math.round(file?.size ? file.size / 1024 : 210)} KB`,
        uploadedAt: new Date().toISOString(),
        readinessScore: 86,
        atsScore: 84,
        missingSkills: hasDocker && hasSystemDesign ? ['Kubernetes', 'CI/CD Pipelines'] : ['Docker', 'System Design', 'Redis'],
        missingSections: ['Open Source Contributions & Hackathons (Recommended for Product Companies)'],
        suggestedImprovements: [
          'Add quantifiable outcomes to project descriptions: e.g. "Optimized API response time by 40% using Redis caching".',
          'Ensure contact details include your verified GitHub repository links and LinkedIn vanity URL.',
          'Align technical skill keywords with target company job descriptions (e.g. AWS EC2, Spring Boot, React 18).',
          'Maintain a clean single-column structure to maximize parsing rate on Workday and Greenhouse ATS platforms.'
        ],
        checklist: [
          { category: 'Contact Information & Links', passed: true, description: 'Email, Phone, LinkedIn, and GitHub links present.' },
          { category: 'Education & CGPA Details', passed: true, description: 'Undergraduate university, degree, department and CGPA clearly listed.' },
          { category: 'Technical Skills Categorization', passed: true, description: 'Languages, Frameworks, Tools, and Core CS organized into clear sub-headings.' },
          { category: 'Action Verbs & Impact Metrics', passed: true, description: 'Projects use active verbs (Architected, Implemented, Deployed) with metrics.' },
          { category: 'Work Experience / Internships', passed: false, description: 'Industrial internship absent. Highlight academic capstone or open-source projects.' },
          { category: 'ATS Friendly Formatting', passed: true, description: 'Standard sans-serif font, no images or complicated tables.' },
        ]
      };

      DataService.saveResumeAudit(updatedAudit);
      setAudit(updatedAudit);
      setIsAnalyzing(false);
      if (onScoreUpdated) onScoreUpdated();
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FileText className="w-7 h-7 text-rose-600" />
            <span>Resume & ATS Verification Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audit your resume against applicant tracking systems (ATS) used by TCS, Infosys, Amazon, and Google.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
            ATS Score: {audit.atsScore}%
          </span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileUpload(e); }}
        className={`p-8 rounded-3xl border-2 border-dashed text-center transition-all bg-white ${
          dragOver ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 hover:border-rose-400'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            {isAnalyzing ? (
              <RefreshCw className="w-7 h-7 animate-spin text-rose-600" />
            ) : (
              <UploadCloud className="w-7 h-7" />
            )}
          </div>

          <h3 className="font-extrabold text-slate-900 text-base">
            {isAnalyzing ? 'Analyzing Resume Content & ATS Parser...' : 'Upload your Resume to Begin Audit'}
          </h3>

          <p className="text-xs text-slate-500">
            Supports PDF, DOCX, or TXT format (Max 10MB). Scans for keyword density, formatting structure, and section completeness.
          </p>

          <label className="inline-block mt-2 cursor-pointer">
            <input 
              type="file" 
              accept=".pdf,.docx,.txt" 
              onChange={handleFileUpload}
              className="hidden" 
            />
            <span className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow-sm inline-flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              <span>Select File from Computer</span>
            </span>
          </label>

          <p className="text-[11px] text-slate-400">
            Currently loaded: <strong className="text-slate-700">{fileName}</strong> ({audit.fileSize})
          </p>
        </div>
      </div>

      {/* Audit Results Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ATS Score Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">ATS Match Index</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Passing Tier
              </span>
            </div>

            <div className="py-8 text-center">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-8 border-slate-100 relative">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-rose-500 border-t-transparent border-l-transparent"
                  style={{ transform: `rotate(${(audit.atsScore / 100) * 360}deg)` }}
                />
                <span className="text-4xl font-black text-slate-900">{audit.atsScore}%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Readiness</span>
              </div>
              <p className="text-xs text-slate-500 mt-4 px-2">
                Your resume parses cleanly across standard campus recruitment parsing engines with an estimated 84% keyword coverage.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Contact & Profiles:</span>
              <strong className="text-emerald-600">Passed</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Section Hierarchy:</span>
              <strong className="text-emerald-600">Passed</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Experience Section:</span>
              <strong className="text-amber-600">Needs Enrichment</strong>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Missing Skills & Suggested Improvements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Missing Skills & Missing Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Missing In-Demand Keywords</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">High-frequency terms requested by campus recruiters that are missing:</p>
              <div className="flex flex-wrap gap-1.5">
                {audit.missingSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                    + {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-amber-800">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Recommended Sections</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">Consider inserting these sections to stand out:</p>
              <div className="space-y-1.5">
                {audit.missingSections.map((sec, i) => (
                  <p key={i} className="text-xs text-slate-700 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-100">
                    • {sec}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Suggestions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Suggested Bullet Point Improvements</span>
              </h3>
              <span className="text-xs text-slate-400">Actionable Feedback</span>
            </div>

            <div className="space-y-2.5">
              {audit.suggestedImprovements.map((sug, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">{sug}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Checklist Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Full ATS Compliance Checklist</h3>
            <div className="divide-y divide-slate-100">
              {audit.checklist.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.category}</p>
                      <p className="text-[11px] text-slate-500">{item.description}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.passed ? 'Verified' : 'Check'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
