import React, { useState } from 'react';
import { Search, Eye, History, ShieldCheck, AlertCircle, XCircle } from 'lucide-react';

export const ReviewQueueMock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'history'>('preview');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'changes'>('pending');

  return (
    <div
      className={`bg-surface border border-line rounded-[12px] shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)] overflow-hidden text-ink ${className}`}
    >
      {/* Top Bar with Scope & Search */}
      <div className="bg-canvas border-b border-line p-3 sm:px-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Scope Chip */}
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 font-semibold border border-brand-600/20">
            Scope: &#123;&#123;COLLEGE_01&#125;&#125; only
          </span>
        </div>

        {/* Search input mock */}
        <div className="relative flex-1 max-w-[200px]">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="text"
            readOnly
            value="Filter listings..."
            className="w-full pl-7 pr-2.5 py-1 rounded-[6px] border border-line bg-surface text-[12px] text-muted focus:outline-none"
            aria-label="Filter submissions"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-surface-sunk/60 px-4 py-2 border-b border-line flex items-center gap-2">
        {(['all', 'pending', 'changes'] as const).map((filter) => {
          const labels = {
            all: 'All (6)',
            pending: 'Pending (3)',
            changes: 'Changes requested (2)',
          };
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-[6px] transition-colors ${
                activeFilter === filter
                  ? 'bg-surface text-ink border border-line font-semibold shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {labels[filter]}
            </button>
          );
        })}
      </div>

      {/* Main Grid: 3-row queue on left, preview pane on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-line min-h-[300px]">
        {/* Left Queue List (5 cols) */}
        <div className="md:col-span-5 divide-y divide-line bg-surface">
          {[
            {
              title: 'Open Source Weekend 2026',
              society: 'Coding Club',
              status: 'Pending',
              statusColor: 'warn',
              active: true,
            },
            {
              title: 'Annual Design Sprint',
              society: 'UX Collective',
              status: 'Changes requested',
              statusColor: 'warn',
              active: false,
            },
            {
              title: 'Winter RoboWars Expo',
              society: 'Robotics Society',
              status: 'Pending',
              statusColor: 'warn',
              active: false,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3 text-left transition-colors cursor-pointer ${
                item.active ? 'bg-surface-sunk/70 border-l-2 border-l-brand-600' : 'hover:bg-canvas/50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  {item.society}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-warn/10 text-warn font-semibold">
                  {item.status}
                </span>
              </div>
              <div className="text-[13px] font-medium text-ink truncate">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between bg-surface p-4">
          <div>
            {/* Tab strip: Preview vs History */}
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] pb-1 border-b-2 transition-colors ${
                    activeTab === 'preview'
                      ? 'border-brand-600 text-brand-600 font-semibold'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  <Eye size={13} />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] pb-1 border-b-2 transition-colors ${
                    activeTab === 'history'
                      ? 'border-brand-600 text-brand-600 font-semibold'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  <History size={13} />
                  History
                </button>
              </div>
              <span className="font-mono text-[10px] text-muted">ID: #OPP-892</span>
            </div>

            {/* Tab Content */}
            {activeTab === 'preview' ? (
              <div className="space-y-3 text-[12px]">
                <div>
                  <span className="font-mono text-[10px] uppercase text-muted block mb-0.5">
                    Listing Title
                  </span>
                  <p className="font-semibold text-ink text-[14px]">
                    Open Source Weekend 2026 — KIIT Chapter
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface-sunk p-2 rounded border border-line">
                    <span className="font-mono text-[9px] uppercase text-muted block">
                      Organizer
                    </span>
                    <span className="font-medium text-ink">Coding Club (Verified)</span>
                  </div>
                  <div className="bg-surface-sunk p-2 rounded border border-line">
                    <span className="font-mono text-[9px] uppercase text-muted block">
                      Eligibility
                    </span>
                    <span className="font-medium text-ink">Open to All Branches</span>
                  </div>
                </div>
                <div className="bg-surface-sunk p-2 rounded border border-line">
                  <span className="font-mono text-[9px] uppercase text-muted block">
                    Venue & Date
                  </span>
                  <span className="font-medium text-ink">Auditorium Hall 2 · Oct 12-14, 2026</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center justify-between text-muted text-[11px] pb-1 border-b border-line">
                  <span>Version 1.2 resubmitted</span>
                  <span className="font-mono">1h ago</span>
                </div>
                <div className="flex items-center justify-between text-muted text-[11px] pb-1 border-b border-line">
                  <span>Field correction requested by Ambassador</span>
                  <span className="font-mono">Yesterday</span>
                </div>
                <div className="flex items-center justify-between text-muted text-[11px]">
                  <span>Initial draft submitted</span>
                  <span className="font-mono">2 days ago</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Buttons: Reject / Request correction / Approve */}
          <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-line">
            <button
              type="button"
              className="px-2.5 py-1.5 rounded-[6px] bg-[#B42318]/10 hover:bg-[#B42318]/15 text-[#B42318] font-mono text-[10px] font-semibold tracking-wide flex items-center gap-1 transition-colors"
            >
              <XCircle size={12} />
              Reject
            </button>
            <button
              type="button"
              className="px-2.5 py-1.5 rounded-[6px] bg-[#B45309]/10 hover:bg-[#B45309]/15 text-[#B45309] font-mono text-[10px] font-semibold tracking-wide flex items-center gap-1 transition-colors"
            >
              <AlertCircle size={12} />
              Request correction
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-[6px] bg-[#15803D]/10 hover:bg-[#15803D]/15 text-[#15803D] font-mono text-[10px] font-semibold tracking-wide flex items-center gap-1 transition-colors"
            >
              <ShieldCheck size={12} />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
