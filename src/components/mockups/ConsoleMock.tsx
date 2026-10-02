import React from 'react';
import { motion } from 'motion/react';


export interface ConsoleMockProps {
  mode?: 'hero' | 'admin' | 'roles';
  activeRole?: string;
  className?: string;
}

export const ConsoleMock: React.FC<ConsoleMockProps> = ({
  mode = 'hero',
  activeRole = 'admin',
  className = '',
}) => {

  // Admin Mode Content (for Portals and Roles Admin view)
  if (mode === 'admin' || (mode === 'roles' && activeRole === 'admin')) {
    return (
      <div
        className={`bg-surface border border-line rounded-[12px] shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)] overflow-hidden text-ink relative ${className}`}
      >
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-brand-600 z-10" />

        {/* Chrome header */}
        <div className="bg-canvas border-b border-line px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
            <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
          </div>
          <div className="font-mono text-[11px] text-muted">
            oms.skilllinkr.com/admin/overview
          </div>
          <div className="w-8" />
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-600 font-medium">
              SYSTEM OVERVIEW · ALL COLLEGES
            </span>
            <span className="font-mono text-[11px] text-muted">
              LIVE NETWORK
            </span>
          </div>

          {/* 4-Tile Stat Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            {[
              { label: 'Colleges', value: '{{COUNT}}' },
              { label: 'Ambassadors', value: '{{COUNT}}' },
              { label: 'Societies', value: '{{COUNT}}' },
              { label: 'Live opportunities', value: '{{COUNT}}' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-surface-sunk border border-line rounded-[8px] p-2.5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  {stat.label}
                </div>
                <div className="font-mono text-[16px] font-semibold text-ink mt-1 tabular-nums">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* 3-bar sparkline row drawn in inline SVG */}
          <div className="bg-surface border border-line rounded-[8px] p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                Weekly Opportunity Inflow Activity
              </span>
              <span className="font-mono text-[10px] text-brand-600">30-day velocity</span>
            </div>
            <svg
              className="w-full h-12"
              viewBox="0 0 300 48"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect x="10" y="24" width="80" height="24" fill="#176B52" fillOpacity="0.25" rx="2" />
              <rect x="110" y="14" width="80" height="34" fill="#176B52" fillOpacity="0.55" rx="2" />
              <rect x="210" y="4" width="80" height="44" fill="#176B52" fillOpacity="0.95" rx="2" />
            </svg>
          </div>

          {/* Audit Log Table */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2">
              Recent System Audit Log
            </div>
            <div className="border border-line rounded-[8px] overflow-hidden">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-surface-sunk border-b border-line font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">Actor</th>
                    <th className="py-2 px-3">Action</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="py-2 px-3 font-mono text-[11px] text-muted">
                      {`{{TIMESTAMP}}`}
                    </td>
                    <td className="py-2 px-3 font-medium text-ink">Ambassador KIIT</td>
                    <td className="py-2 px-3 text-ink-2">Approved Listing #1042</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] font-mono text-[10px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        APPROVED
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-[11px] text-muted">
                      {`{{TIMESTAMP}}`}
                    </td>
                    <td className="py-2 px-3 font-medium text-ink">Ambassador VIT</td>
                    <td className="py-2 px-3 text-ink-2">Requested Correction #1041</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B45309]/10 text-[#B45309] font-mono text-[10px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                        CORRECTION
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hero Review-Queue Mock
  return <HeroConsoleMock className={className} />;
};

const HeroConsoleMock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [queue, setQueue] = React.useState([
    { tag: 'HACKATHON', title: 'Open Source Weekend — KIIT', org: 'Coding Club', time: '2h ago', img: '/images/card-hackathon.jpg' },
    { tag: 'WORKSHOP', title: 'Autonomous Robotics Bootcamp', org: 'Robotics Society', time: '4h ago', img: '/images/card-robotics.jpg' },
    { tag: 'INTERNSHIP', title: 'Summer Research Drive', org: 'Dept. of CS', time: '1d ago', img: '/images/card-research.jpg' },
  ]);
  const [hoverApprove, setHoverApprove] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (queue.length === 0) return;
    
    const sequence = async () => {
      // Wait for a bit
      await new Promise(r => setTimeout(r, 1500));
      // Hover the button
      setHoverApprove(true);
      await new Promise(r => setTimeout(r, 600));
      // Click and animate out
      setHoverApprove(false);
      setAnimating(true);
      await new Promise(r => setTimeout(r, 400));
      
      // Remove first item
      setQueue(prev => prev.slice(1));
      setAnimating(false);
    };
    
    sequence();
  }, [queue.length]);

  return (
    <div
      className={`bg-surface border border-line rounded-[12px] shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)] overflow-hidden text-ink relative ${className}`}
    >
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-brand-600 z-10" />

      {/* Chrome header strip */}
      <div className="bg-canvas border-b border-line px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
          <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
          <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
        </div>
        <div className="font-mono text-[11px] text-muted tracking-tight">
          oms.skilllinkr.com/review
        </div>
        <div className="w-8" />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 overflow-hidden min-h-[260px]">
        {/* Header row */}
        <div className="flex items-center justify-between pb-3.5 border-b border-line mb-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-ink flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warn animate-pulse" />
            <span>PENDING · KIIT · {queue.length} awaiting you</span>
          </div>
          <span className="font-mono text-[11px] text-muted">QUEUE ID #04</span>
        </div>

        {/* Opportunity Rows Container */}
        <div className="flex flex-col gap-3 relative">
          {queue.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ok/10 text-ok mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <p className="font-mono text-[11px] text-ink font-semibold">Queue cleared!</p>
            </motion.div>
          ) : (
            queue.map((item, index) => {
              const isActive = index === 0;
              const isSecond = index === 1;
              const isHidden = index > 1;
              if (isHidden) return null;

              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isActive && animating ? 0 : (isActive ? 1 : 0.6),
                    x: isActive && animating ? 30 : 0,
                    scale: isActive && animating ? 0.95 : 1
                  }}
                  transition={{ duration: 0.4, ease: "anticipate" }}
                  className={`bg-surface border ${isActive ? 'border-line-strong' : 'border-line'} rounded-[10px] p-4 transition-all duration-160 ${isSecond ? 'pointer-events-none select-none -mb-6' : ''}`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded border border-line flex-shrink-0 overflow-hidden">
                      <img src={item.img} alt="" className="w-full h-full object-cover bg-line-strong/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-sunk text-ink-2 font-medium border border-line">
                          {item.tag}
                        </span>
                        <span className="text-[12px] text-muted truncate">
                          Submitted by {item.org} · {item.time}
                        </span>
                      </div>
                      <h4 className="font-sans font-semibold text-[15px] text-ink truncate">
                        {item.title}
                      </h4>

                      {/* Action buttons (only on active row) */}
                      {isActive && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line/60">
                          <motion.button
                            animate={hoverApprove ? { scale: 1.05, backgroundColor: 'rgba(21, 128, 61, 0.2)' } : { scale: 1, backgroundColor: 'rgba(21, 128, 61, 0.1)' }}
                            className="px-3 py-1.5 rounded-[6px] text-[#15803D] font-mono text-[11px] font-semibold tracking-wide transition-colors"
                          >
                            Approve
                          </motion.button>
                          <button className="px-3 py-1.5 rounded-[6px] bg-[#B45309]/10 text-[#B45309] font-mono text-[11px] font-semibold tracking-wide">
                            Request correction
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
