import React from 'react';
import { X, Mail, MapPin, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../primitives/Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open, but only if the mobile menu isn't also doing it
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
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-canvas rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted hover:text-ink transition-colors rounded-full hover:bg-surface-sunk focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2 z-10"
              aria-label="Close contact modal"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 md:mb-10 mt-2">
                <h2 id="contact-modal-title" className="text-3xl md:text-[44px] font-semibold tracking-tight text-ink font-sans">
                  We'd <span className="text-brand-600">Love to Hear</span> From You
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                {/* Left Side: Form */}
                <div className="flex-1 space-y-5">
                  <div>
                    <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-surface border border-line rounded-xl px-4 py-3.5 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="you@college.ac.in"
                      className="w-full bg-surface border border-line rounded-xl px-4 py-3.5 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-medium tracking-widest uppercase text-muted mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      className="w-full bg-surface border border-line rounded-xl px-4 py-3.5 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors resize-none shadow-sm"
                    ></textarea>
                  </div>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full mt-2"
                  >
                    Send Message
                  </Button>
                </div>

                {/* Right Side: Info Cards */}
                <div className="flex-1 flex flex-col gap-4 md:pt-6">
                  <div className="bg-surface rounded-2xl p-5 md:p-6 border border-line flex items-center gap-4 shadow-sm h-full max-h-[88px]">
                    <div className="text-brand-600 bg-brand-100 p-2.5 rounded-xl flex-shrink-0">
                      <Mail size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-muted mb-0.5">
                        EMAIL
                      </div>
                      <div className="text-[15px] text-ink-2 font-medium">skillinkr@gmail.com</div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-2xl p-5 md:p-6 border border-line flex items-center gap-4 shadow-sm h-full max-h-[88px]">
                    <div className="text-brand-600 bg-brand-100 p-2.5 rounded-xl flex-shrink-0">
                      <MapPin size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-muted mb-0.5">
                        BASED IN
                      </div>
                      <div className="text-[15px] text-ink-2 font-medium">India <span className="text-[11px] text-muted">IN</span></div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-2xl p-5 md:p-6 border border-line flex items-center gap-4 shadow-sm h-full max-h-[88px]">
                    <div className="text-brand-600 bg-brand-100 p-2.5 rounded-xl flex-shrink-0">
                      <Globe size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-muted mb-0.5">
                        WEBSITE
                      </div>
                      <div className="text-[15px] text-ink-2 font-medium">skillinkr.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
