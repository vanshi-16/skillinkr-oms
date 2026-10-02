import React from 'react';
import { content } from '../../data/content';
import { Check } from 'lucide-react';

export const TimelineMock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const steps = content.flow.timelineMock;

  return (
    <div
      className={`bg-surface border border-line rounded-[12px] p-5 shadow-[0_1px_2px_rgba(11,18,32,0.04)] ${className}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-4 text-center sm:text-left">
        Opportunity Lifecycle State Machine
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[620px] flex items-center justify-between relative">
          {/* Connector Line */}
          <div
            className="absolute top-3 left-6 right-6 h-[1.5px] bg-line z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center flex-1 text-center"
              >
                {/* Node indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#15803D] border-[#15803D] text-white'
                      : isActive
                      ? 'bg-brand-600 border-brand-600 text-white shadow-[0_0_0_3px_rgba(23,107,82,0.18)]'
                      : 'bg-surface border-line-strong text-muted'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={13} strokeWidth={2.5} />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
                  )}
                </div>

                {/* Node Label */}
                <span
                  className={`mt-2 font-mono text-[11px] tracking-tight ${
                    isActive
                      ? 'text-brand-600 font-semibold'
                      : isCompleted
                      ? 'text-ink font-medium'
                      : 'text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
