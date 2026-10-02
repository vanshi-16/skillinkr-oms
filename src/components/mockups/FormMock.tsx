import React from 'react';
import { UploadCloud, CheckCircle2, ChevronRight } from 'lucide-react';

export const FormMock: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-surface border border-line rounded-[12px] shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)] overflow-hidden text-ink flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Chrome header */}
        <div className="bg-canvas border-b border-line px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-[11px] text-muted">
            Society Portal · New Opportunity Submission
          </span>
          <div className="w-6" />
        </div>

        {/* 4-Step Progress Rail */}
        <div className="bg-surface-sunk/60 border-b border-line px-4 py-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            {[
              { label: 'Details', completed: true },
              { label: 'Eligibility', completed: true },
              { label: 'Logistics', completed: true },
              { label: 'Poster', active: true },
            ].map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-semibold ${
                      step.completed
                        ? 'bg-[#15803D] text-white'
                        : step.active
                        ? 'bg-brand-600 text-white'
                        : 'bg-line-strong text-white'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </span>
                  <span
                    className={`${
                      step.active
                        ? 'text-brand-600 font-semibold'
                        : step.completed
                        ? 'text-ink font-medium'
                        : 'text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <ChevronRight size={12} className="text-muted/60" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Filled Text Field Pair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-muted mb-1">
                Opportunity Title
              </label>
              <input
                type="text"
                readOnly
                value="National Level Hackathon 2026"
                aria-label="Opportunity Title"
                className="w-full px-3 py-1.5 rounded-[6px] border border-line bg-surface text-[12px] text-ink font-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-muted mb-1">
                Organizing Society
              </label>
              <input
                type="text"
                readOnly
                value="KIIT Computer Science Society"
                aria-label="Organizing Society"
                className="w-full px-3 py-1.5 rounded-[6px] border border-line bg-surface text-[12px] text-ink font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-muted mb-1">
              Category
            </label>
            <select
              aria-label="Category"
              disabled
              className="w-full px-3 py-1.5 rounded-[6px] border border-line bg-surface text-[12px] text-ink font-medium cursor-not-allowed"
            >
              <option>Hackathons & Competitions</option>
            </select>
          </div>

          {/* 120x68 Poster Upload Zone with uploaded thumbnail + filename */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-muted mb-1">
              Poster / Supporting Image
            </label>
            <div className="border border-line rounded-[8px] p-2.5 bg-surface-sunk/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* 120x68 poster upload thumbnail */}
                <div className="w-[120px] h-[68px] rounded-[4px] bg-brand-900 border border-brand-700/40 relative overflow-hidden flex flex-col items-center justify-center p-1 text-center shadow-xs flex-shrink-0">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-white/70">
                    HACKATHON
                  </div>
                  <div className="text-[10px] font-serif italic text-white leading-tight mt-0.5">
                    KIIT 2026
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium text-ink truncate">
                      hackathon_banner_final.webp
                    </span>
                    <CheckCircle2 size={13} className="text-[#15803D]" />
                  </div>
                  <span className="text-[11px] text-muted block mt-0.5 font-mono">
                    1200×630 · 184 KB · Validated
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] text-brand-600 font-mono">
                <UploadCloud size={14} />
                <span>Replace</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky / Dedicated Footer */}
      <div className="bg-canvas border-t border-line px-4 py-3 flex items-center justify-between mt-2">
        <span className="text-[11px] text-muted font-mono">
          Autosaved draft · 12:44 PM
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-[6px] border border-line-strong text-ink bg-transparent hover:bg-surface text-[12px] font-medium transition-colors"
          >
            Save draft
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-[6px] bg-brand-600 text-white hover:bg-brand-700 text-[12px] font-semibold transition-colors"
          >
            Submit for review
          </button>
        </div>
      </div>
    </div>
  );
};
