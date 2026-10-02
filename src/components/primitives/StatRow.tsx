import React from 'react';

export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface StatRowProps {
  stats: StatItem[];
  className?: string;
}

export const StatRow: React.FC<StatRowProps> = ({ stats, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="bg-surface border border-line rounded-[10px] p-4 flex flex-col justify-between"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {item.label}
          </span>
          <div className="mt-2 font-mono text-[22px] font-semibold text-ink tracking-tight tabular-nums">
            {item.value}
          </div>
          {item.subtext && (
            <span className="text-[12px] text-muted mt-1">{item.subtext}</span>
          )}
        </div>
      ))}
    </div>
  );
};
