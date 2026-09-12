import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Filter,
  DollarSign
} from 'lucide-react';
import { JobOpening, JobApplication } from '../types';
import { SAMPLE_JOB_OPENINGS } from '../data/mockData';
import { DataService } from '../lib/db';

interface JobsPageProps {
  onStatusUpdated?: () => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ onStatusUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Full Time' | 'Internship'>('All');
  const [applications, setApplications] = useState<JobApplication[]>(() => DataService.getApplications());
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  const appMap = new Map<string, JobApplication>();
  applications.forEach(a => appMap.set(a.jobId, a));

  const handleToggleBookmark = (jobId: string) => {
    DataService.toggleBookmark(jobId);
    setApplications([...DataService.getApplications()]);
    if (onStatusUpdated) onStatusUpdated();
  };

  const handleUpdateStatus = (jobId: string, status: JobApplication['status']) => {
    DataService.updateApplicationStatus(jobId, status);
    setApplications([...DataService.getApplications()]);
    if (onStatusUpdated) onStatusUpdated();
  };

  const filteredJobs = SAMPLE_JOB_OPENINGS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (typeFilter !== 'All' && job.jobType !== typeFilter) return false;
    if (roleFilter !== 'All' && !job.title.toLowerCase().includes(roleFilter.toLowerCase())) return false;

    return true;
  });

  const bookmarkedJobsCount = applications.filter(a => a.bookmarked).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-emerald-600" />
            <span>Campus Drives & Active Vacancies</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Verified campus hiring announcements, national qualifier tests, eligibility cutoffs, and direct portal links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            {filteredJobs.length} Openings Active
          </span>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
            {bookmarkedJobsCount} Saved
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['All', 'Software', 'Engineer', 'Developer', 'Analyst', 'Cloud'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                roleFilter === role ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {role === 'All' ? 'All Roles' : role}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search role, company, skill or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const app = appMap.get(job.id);
          const isSaved = app?.bookmarked;
          const status = app?.status || 'Not Applied';

          return (
            <div 
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 font-black text-sm flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition">
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                        {job.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600">{job.company}</p>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(job.id)}
                    className={`p-2 rounded-xl border transition ${
                      isSaved
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Job'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Salary & Location Strip */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-emerald-900 font-bold flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 font-medium flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                {/* Eligibility & Deadline */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="line-clamp-1">
                    <strong className="text-slate-700">Eligibility:</strong> {job.eligibility}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-rose-600 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </p>
                </div>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1">
                  {job.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Selector & Apply Button */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    My Status:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => handleUpdateStatus(job.id, e.target.value as any)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none ${
                      status === 'Applied' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      status === 'Online Assessment' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                      status === 'Interview' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      status === 'Offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      status === 'Saved' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <option value="Not Applied">Not Applied</option>
                    <option value="Saved">Saved for Later</option>
                    <option value="Applied">Applied</option>
                    <option value="Online Assessment">Online Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Job Offer Received 🎉</option>
                    <option value="Rejected">Archived</option>
                  </select>
                </div>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
