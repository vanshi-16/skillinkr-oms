import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../primitives/Button';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'society' | 'ambassador'>('society');

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-canvas rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted hover:text-ink transition-colors rounded-full hover:bg-surface-sunk focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 z-10"
              aria-label="Close registration modal"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 id="register-modal-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink font-sans mb-1">
                  Request Registration
                </h2>
                <p className="text-sm text-muted">
                  Register your society or apply as a Campus Ambassador for your college.
                </p>
              </div>

              {/* Role selector tabs */}
              <div className="flex bg-surface-sunk p-1 rounded-xl mb-6 border border-line">
                <button
                  type="button"
                  onClick={() => setRole('society')}
                  className={`flex-1 py-2 text-xs font-mono font-medium tracking-wider uppercase rounded-lg transition-all ${
                    role === 'society'
                      ? 'bg-surface text-ink shadow-xs font-semibold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Society
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ambassador')}
                  className={`flex-1 py-2 text-xs font-mono font-medium tracking-wider uppercase rounded-lg transition-all ${
                    role === 'ambassador'
                      ? 'bg-surface text-ink shadow-xs font-semibold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Ambassador
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-1.5">
                    {role === 'society' ? 'SOCIETY NAME' : 'YOUR FULL NAME'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={role === 'society' ? 'e.g. Turing AI Club' : 'Your Name'}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-1.5">
                    COLLEGE EMAIL / DOMAIN
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. society@vit.edu or vit.edu"
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-1.5">
                      BRANCH
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-1.5">
                      STREAM
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech"
                      className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-1.5">
                    COLLEGE NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VIT Vellore"
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-line mt-6">
                  <Button variant="secondary" size="sm" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
