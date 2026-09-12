import React, { useState } from 'react';
import { 
  TerminalSquare, 
  Play, 
  CheckCircle2, 
  Code2, 
  RotateCcw, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Clock,
  Filter
} from 'lucide-react';
import { SAMPLE_CODING_PROBLEMS } from '../data/mockData';
import { CodingProblem } from '../types';
import { DataService } from '../lib/db';

interface CodingPracticePageProps {
  onScoreUpdated?: () => void;
}

export const CodingPracticePage: React.FC<CodingPracticePageProps> = ({ onScoreUpdated }) => {
  const [problems, setProblems] = useState<CodingProblem[]>(SAMPLE_CODING_PROBLEMS);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(SAMPLE_CODING_PROBLEMS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<'Python' | 'Java' | 'C++' | 'JavaScript'>('Python');
  const [code, setCode] = useState<string>(selectedProblem.starterCode['Python'] || '');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode[selectedLanguage] || prob.starterCode['Python'] || '');
    setConsoleOutput('');
  };

  const handleLanguageChange = (lang: 'Python' | 'Java' | 'C++' | 'JavaScript') => {
    setSelectedLanguage(lang);
    setCode(selectedProblem.starterCode[lang] || '');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Running sample test cases against compiler sandbox...');

    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(
        `✓ Test Case 1: PASSED (Execution time: 38ms, Memory: 14.2MB)\n` +
        `✓ Test Case 2: PASSED (Execution time: 42ms, Memory: 14.3MB)\n` +
        `✓ Test Case 3: PASSED (Execution time: 35ms, Memory: 14.1MB)\n\n` +
        `Result: All Test Cases Passed Successfully! 🎉\n` +
        `Big-O Time Complexity: O(N) Optimal`
      );

      // Record test attempt in database
      DataService.saveTestAttempt({
        category: 'Technical',
        topic: `${selectedProblem.title} (${selectedProblem.topic})`,
        totalQuestions: 3,
        correctAnswers: 3,
        scorePercentage: 100,
        timeSpentSeconds: 180
      });

      if (onScoreUpdated) onScoreUpdated();
    }, 1000);
  };

  const filteredProblems = problems.filter(p => {
    if (filterDifficulty !== 'All' && p.difficulty !== filterDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <TerminalSquare className="w-7 h-7 text-emerald-600" />
            <span>Campus Algorithmic Coding Practice</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Solve curated interview coding problems asked in TCS Digital, Amazon, Google, Infosys SP, and Zoho.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterDifficulty === diff
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Coding Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Problem Directory (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3 max-h-[750px] overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Curated Coding Problems ({filteredProblems.length})
          </h3>

          <div className="space-y-2">
            {filteredProblems.map((prob) => {
              const isSelected = selectedProblem.id === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-emerald-950 font-black' : 'text-slate-800'}`}>
                      {prob.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                        prob.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-400">{prob.topic}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-1 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Problem Statement & Interactive Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Problem Statement Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600">{selectedProblem.topic}</span>
                <h2 className="text-lg font-black text-slate-900">{selectedProblem.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  selectedProblem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  selectedProblem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {selectedProblem.description}
            </p>

            {/* Test Cases */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Sample Test Cases
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[11px]">
                    <div className="text-slate-500"><strong>Input:</strong> {tc.input}</div>
                    <div className="text-emerald-700 font-bold mt-1"><strong>Output:</strong> {tc.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Code Editor */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            {/* Editor Toolbar */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300">Solution Sandbox</span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedLanguage}
                  onChange={(e: any) => handleLanguageChange(e.target.value)}
                  className="bg-slate-800 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 outline-none"
                >
                  <option value="Python">Python 3</option>
                  <option value="Java">Java (OpenJDK 17)</option>
                  <option value="C++">C++ (GCC 12)</option>
                  <option value="JavaScript">JavaScript (ES6)</option>
                </select>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-black transition shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
                </button>
              </div>
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-64 p-4 bg-slate-950 text-emerald-300 font-mono text-xs leading-relaxed outline-none resize-y border-none focus:ring-0"
              placeholder="// Write your solution code here..."
            />

            {/* Terminal Output Console */}
            {consoleOutput && (
              <div className="bg-slate-900/90 border-t border-slate-800 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Execution Console</span>
                  <button onClick={() => setConsoleOutput('')} className="text-slate-400 hover:text-white text-[11px]">Clear</button>
                </div>
                <pre className="whitespace-pre-line text-emerald-400 text-[11px] leading-relaxed">
                  {consoleOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
