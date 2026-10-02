import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, FileText, Clock, Sparkles } from 'lucide-react';

const steps = [
  { label: 'Draft saved', icon: FileText, done: true },
  { label: 'Details filled', icon: FileText, done: true },
  { label: 'Poster uploaded', icon: FileText, done: true },
  { label: 'Submitting…', icon: Send, done: false, active: true },
];

export const SocietyMock: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar filling
    const t = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setSubmitted(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }, 300);
        }
      }, 30);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative bg-surface border border-line rounded-[12px] shadow-[0_4px_24px_rgba(11,18,32,0.08)] overflow-hidden">
      {/* Window chrome */}
      <div className="bg-canvas border-b border-line px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="font-mono text-[11px] text-ink ml-3 font-medium">Society Portal · Submit Opportunity</span>
      </div>

      {/* Form preview */}
      <div className="p-5 space-y-3">
        {/* Opportunity card */}
        <div className="bg-surface-sunk rounded-[10px] border border-line p-4 flex items-start gap-3">
          <div className="w-12 h-12 rounded-[8px] bg-brand-900 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">National Level Hackathon 2026</p>
            <p className="text-[12px] text-ink mt-0.5">KIIT Computer Science Society · Hackathon</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-mono text-[10px] bg-brand-100 text-brand-600 border border-brand-600/20 px-2 py-0.5 rounded-full">Oct 12–14</span>
              <span className="font-mono text-[10px] bg-surface text-ink border border-line px-2 py-0.5 rounded-full">Auditorium Hall 2</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-[11px] text-ink">Submission progress</span>
            <span className="font-mono text-[11px] text-brand-600 font-bold">{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 bg-surface-sunk rounded-full overflow-hidden border border-line">
            <motion.div
              className="h-full bg-brand-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Status steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-[8px] border text-[12px] font-medium ${step.active && !submitted ? 'border-brand-600/40 bg-brand-100/40 text-brand-600' : step.done || submitted ? 'border-line bg-surface text-ink' : 'border-line bg-surface-sunk text-ink'}`}>
              <CheckCircle2 size={13} className={step.done || (step.active && submitted) ? 'text-brand-600' : 'text-line-strong'} />
              {step.label}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <motion.button
          type="button"
          className="w-full py-2.5 rounded-[8px] bg-brand-600 text-white font-semibold text-[13px] flex items-center justify-center gap-2 cursor-default"
          animate={submitted ? { scale: [1, 0.97, 1] } : {}}
        >
          {submitted ? (
            <><CheckCircle2 size={15} /> Submitted for review</>
          ) : (
            <><Send size={14} /> Submit for review</>
          )}
        </motion.button>
      </div>

      {/* Animated toast pop-up */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-4 right-4 bg-brand-900 text-white rounded-[10px] px-4 py-3 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 size={18} className="text-brand-100 flex-shrink-0" />
            <div>
              <p className="text-[13px] font-semibold">Submitted successfully!</p>
              <p className="text-[11px] text-white/70 font-mono">Now in Ambassador review queue</p>
            </div>
            <Clock size={14} className="text-white/40 ml-auto flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
