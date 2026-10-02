import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, XCircle, AlertCircle, Eye, CheckCircle2 } from 'lucide-react';

const queue = [
  { title: 'Open Source Weekend 2026', society: 'Coding Club', tag: 'Pending' },
  { title: 'Annual Design Sprint', society: 'UX Collective', tag: 'Changes' },
  { title: 'Winter RoboWars Expo', society: 'Robotics Soc.', tag: 'Pending' },
];

export const AmbassadorMock: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [decision, setDecision] = useState<'approved' | 'rejected' | 'correction' | null>(null);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const handleDecision = (d: 'approved' | 'rejected' | 'correction') => {
    setDecision(d);
    setTimeout(() => {
      setDismissed((prev) => [...prev, selected]);
      setDecision(null);
      const next = queue.findIndex((_, i) => i !== selected && !dismissed.includes(i));
      if (next !== -1) setSelected(next);
    }, 1800);
  };

  const visible = queue.filter((_) => !dismissed.includes(queue.indexOf(_)));

  return (
    <div className="bg-surface border border-line rounded-[12px] shadow-[0_4px_24px_rgba(11,18,32,0.08)] overflow-hidden">
      {/* Header */}
      <div className="bg-canvas border-b border-line px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="font-mono text-[11px] text-ink ml-2 font-medium">Ambassador Portal · Review Queue</span>
        </div>
        <span className="font-mono text-[10px] bg-brand-100 text-brand-600 border border-brand-600/20 px-2 py-0.5 rounded-full">KIIT Only</span>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line bg-surface-sunk/40">
        {[
          { label: 'Pending', val: Math.max(0, 3 - dismissed.length), color: 'text-warn' },
          { label: 'Approved', val: dismissed.filter(i => decision === 'approved').length, color: 'text-ok' },
          { label: 'Total', val: 6, color: 'text-ink' },
        ].map((s) => (
          <div key={s.label} className="py-2.5 px-3 text-center">
            <p className={`text-[18px] font-bold font-mono ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-ink font-mono uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 sm:divide-x divide-line" style={{ minHeight: 220 }}>
        {/* Queue list */}
        <div className="col-span-1 sm:col-span-5 divide-y divide-line border-b sm:border-b-0">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 gap-2">
              <CheckCircle2 size={28} className="text-brand-600" />
              <p className="text-[12px] font-medium text-ink">Queue cleared!</p>
            </div>
          ) : (
            visible.map((item) => {
              const origIdx = queue.indexOf(item);
              const isSelected = origIdx === selected;
              return (
                <button
                  key={origIdx}
                  type="button"
                  onClick={() => { setSelected(origIdx); setDecision(null); }}
                  className={`w-full p-3 text-left transition-colors ${isSelected ? 'bg-brand-100/50 border-l-2 border-brand-600' : 'hover:bg-canvas/60'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] uppercase text-ink">{item.society}</span>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold ${item.tag === 'Pending' ? 'bg-warn/10 text-warn' : 'bg-brand-100 text-brand-600'}`}>{item.tag}</span>
                  </div>
                  <p className="text-[12px] font-semibold text-ink truncate">{item.title}</p>
                </button>
              );
            })
          )}
        </div>

        {/* Detail pane */}
        <div className="col-span-1 sm:col-span-7 p-4 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye size={13} className="text-brand-600" />
              <span className="font-mono text-[11px] uppercase text-brand-600 font-semibold tracking-wide">Preview</span>
              <span className="ml-auto font-mono text-[10px] text-ink">#OPP-{892 + selected}</span>
            </div>
            <p className="text-[13px] font-bold text-ink mb-2">{queue[selected]?.title}</p>
            <div className="space-y-1.5">
              {[
                { k: 'Society', v: queue[selected]?.society },
                { k: 'Category', v: 'Hackathon & Competition' },
                { k: 'Date', v: 'Oct 12–14, 2026' },
              ].map((r) => (
                <div key={r.k} className="flex gap-2 text-[11px]">
                  <span className="font-mono text-ink w-16 flex-shrink-0">{r.k}</span>
                  <span className="text-ink font-medium">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-line">
            <button type="button" onClick={() => handleDecision('rejected')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] bg-danger/10 text-danger font-mono text-[10px] font-semibold hover:bg-danger/20 transition-colors">
              <XCircle size={11} /> Reject
            </button>
            <button type="button" onClick={() => handleDecision('correction')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] bg-warn/10 text-warn font-mono text-[10px] font-semibold hover:bg-warn/20 transition-colors">
              <AlertCircle size={11} /> Correct
            </button>
            <button type="button" onClick={() => handleDecision('approved')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] bg-ok/10 text-ok font-mono text-[10px] font-semibold hover:bg-ok/20 transition-colors ml-auto">
              <ShieldCheck size={11} /> Approve
            </button>
          </div>

          {/* Decision overlay */}
          <AnimatePresence>
            {decision && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`absolute inset-3 rounded-[10px] flex flex-col items-center justify-center gap-2 border ${
                  decision === 'approved' ? 'bg-ok/10 border-ok/30' :
                  decision === 'rejected' ? 'bg-danger/10 border-danger/30' :
                  'bg-warn/10 border-warn/30'
                }`}
              >
                {decision === 'approved' && <><ShieldCheck size={28} className="text-ok" /><p className="font-bold text-ok text-[14px]">Approved & Published</p></>}
                {decision === 'rejected' && <><XCircle size={28} className="text-danger" /><p className="font-bold text-danger text-[14px]">Rejected</p></>}
                {decision === 'correction' && <><AlertCircle size={28} className="text-warn" /><p className="font-bold text-warn text-[14px]">Correction Requested</p></>}
                <p className="font-mono text-[10px] text-ink">Notifying society…</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
