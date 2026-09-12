import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Question, TestAttempt } from '../types';
import { REASONING_TOPICS_LIST, SAMPLE_QUESTIONS } from '../data/mockData';
import { DataService } from '../lib/db';

interface ReasoningPageProps {
  onTestCompleted?: () => void;
}

export const ReasoningPage: React.FC<ReasoningPageProps> = ({ onTestCompleted }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(600);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [previousAttempts, setPreviousAttempts] = useState<TestAttempt[]>(() => 
    DataService.getTestAttempts().filter(t => t.category === 'Reasoning')
  );

  useEffect(() => {
    let interval: any = null;
    if (testMode && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testMode, isSubmitted]);

  const startTest = (topicSlug: string | null = null) => {
    setSelectedTopic(topicSlug);
    let pool = SAMPLE_QUESTIONS.filter(q => q.category === 'Reasoning');
    if (topicSlug) {
      const filtered = pool.filter(q => q.topic.toLowerCase().includes(topicSlug.toLowerCase()));
      if (filtered.length > 0) pool = filtered;
    }
    setQuestions(pool);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setTimerSeconds(pool.length * 80);
    setElapsedSeconds(0);
    setIsSubmitted(false);
    setTestMode(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const topicTitle = selectedTopic
      ? REASONING_TOPICS_LIST.find(t => t.slug === selectedTopic)?.name || 'Logical Reasoning'
      : 'Comprehensive Reasoning Mock';

    const saved = DataService.saveTestAttempt({
      category: 'Reasoning',
      topic: topicTitle,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      scorePercentage,
      timeSpentSeconds: elapsedSeconds
    });

    setPreviousAttempts([saved, ...previousAttempts]);
    setIsSubmitted(true);
    if (onTestCompleted) onTestCompleted();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-7 h-7 text-violet-600" />
            <span>Logical & Analytical Reasoning</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Master all 12 key placement reasoning modules: patterns, deductions, arrangements, and syllogisms.
          </p>
        </div>

        {!testMode && (
          <button
            onClick={() => startTest(null)}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Take Comprehensive Reasoning Mock</span>
          </button>
        )}
      </div>

      {testMode ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                {selectedTopic ? REASONING_TOPICS_LIST.find(t => t.slug === selectedTopic)?.name : 'Logical Reasoning Simulator'}
              </span>
              <h2 className="text-base font-black text-slate-900">
                Question {currentIndex + 1} of {questions.length}
              </h2>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-bold ${
              timerSeconds < 60 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-800'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Difficulty: {questions[currentIndex]?.difficulty}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Topic: {questions[currentIndex]?.topic}
                  </span>
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                  {questions[currentIndex]?.questionText}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[currentIndex]?.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-violet-50 border-violet-500 text-violet-900 ring-2 ring-violet-200'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1 overflow-x-auto max-w-xs px-2">
                  {questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        currentIndex === idx
                          ? 'bg-violet-600 text-white'
                          : selectedAnswers[idx] !== undefined
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 text-center space-y-3">
                <Award className="w-12 h-12 text-violet-600 mx-auto" />
                <h3 className="text-2xl font-black text-slate-900">
                  Score: {Math.round((Object.entries(selectedAnswers).filter(([idx, ans]) => ans === questions[Number(idx)].correctAnswer).length / questions.length) * 100)}%
                </h3>
                <p className="text-xs text-slate-600">
                  Completed in {Math.floor(elapsedSeconds / 60)} minutes and {elapsedSeconds % 60} seconds. Results saved to your placement profile.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => startTest(selectedTopic)}
                    className="px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Test</span>
                  </button>
                  <button
                    onClick={() => setTestMode(false)}
                    className="px-4 py-2 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm">Detailed Solutions & Logical Proofs</h4>
                {questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <div key={idx} className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/30 border-rose-200'}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          Q{idx + 1}. {q.questionText}
                        </p>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md shrink-0">
                            <XCircle className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-400 font-medium block">Your Choice:</span>
                          <span className={isCorrect ? 'font-bold text-emerald-700' : 'font-bold text-rose-600'}>
                            {userAnswer !== undefined ? q.options[userAnswer] : 'Not Answered'}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-emerald-200">
                          <span className="text-slate-400 font-medium block">Correct Answer:</span>
                          <span className="font-bold text-emerald-700">{q.options[q.correctAnswer]}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <strong className="text-slate-900 block mb-1">Deductive Proof:</strong>
                        <p className="leading-relaxed font-mono text-[11px] text-slate-800">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REASONING_TOPICS_LIST.map((topic) => (
              <div 
                key={topic.slug}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-violet-400 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-700">
                      {topic.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-violet-600 transition">
                    {topic.name}
                  </h3>

                  <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Core Shortcut / Rule</span>
                    {topic.rule}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {topic.count} Questions
                  </span>
                  <button
                    onClick={() => startTest(topic.slug)}
                    className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800"
                  >
                    <span>Practice Topic</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {previousAttempts.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-600" />
                <span>Previous Reasoning Test Attempts</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Topic</th>
                      <th className="py-2.5 px-3">Accuracy</th>
                      <th className="py-2.5 px-3">Score</th>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Completed On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previousAttempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{attempt.topic}</td>
                        <td className="py-2.5 px-3 text-slate-600">{attempt.correctAnswers}/{attempt.totalQuestions}</td>
                        <td className="py-2.5 px-3">
                          <span className={`font-black ${attempt.scorePercentage >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {attempt.scorePercentage}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">
                          {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
