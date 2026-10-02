import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Network, Users, Building2, TrendingUp } from 'lucide-react';

const colleges = ['KIIT', 'VIT', 'SRM', 'Manipal', 'LPU', 'BITS'];
const barData = [65, 82, 48, 91, 57, 74];

export const AdminMock: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const [activeCollege, setActiveCollege] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    const cycle = setInterval(() => setActiveCollege((c) => (c + 1) % colleges.length), 1800);
    return () => { clearTimeout(t); clearInterval(cycle); };
  }, []);

  return (
    <div className="bg-surface border border-line rounded-[12px] shadow-[0_4px_24px_rgba(11,18,32,0.08)] overflow-hidden">
      {/* Window chrome */}
      <div className="bg-canvas border-b border-line px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="font-mono text-[11px] text-ink ml-3 font-medium">Admin Console · Network Overview</span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {[
          { label: 'Colleges', val: 24, icon: Building2, color: 'text-brand-600', bg: 'bg-brand-100/60' },
          { label: 'Ambassadors', val: 48, icon: Users, color: 'text-ink', bg: 'bg-surface-sunk' },
          { label: 'Published', val: 312, icon: TrendingUp, color: 'text-ok', bg: 'bg-ok/10' },
        ].map((s) => (
          <div key={s.label} className="p-3 flex flex-col items-center text-center gap-1">
            <div className={`w-7 h-7 rounded-[6px] ${s.bg} flex items-center justify-center`}>
              <s.icon size={14} className={s.color} />
            </div>
            <motion.p
              className={`text-[20px] font-bold font-mono ${s.color}`}
              initial={{ opacity: 0, y: 4 }}
              animate={animated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {s.val}
            </motion.p>
            <p className="text-[10px] text-ink font-mono uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-brand-600" />
            <span className="font-mono text-[11px] text-ink font-semibold uppercase tracking-wide">Opportunities by College</span>
          </div>
          <span className="font-mono text-[10px] text-ink bg-brand-100 px-2 py-0.5 rounded-full">This month</span>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-[90px]">
          {colleges.map((college, i) => (
            <div key={college} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className={`w-full rounded-t-[4px] ${i === activeCollege ? 'bg-brand-600' : 'bg-brand-100 border border-brand-600/20'} transition-colors duration-500`}
                initial={{ height: 0 }}
                animate={animated ? { height: `${barData[i]}%` } : { height: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ alignSelf: 'flex-end' }}
              />
              <span className={`font-mono text-[9px] uppercase ${i === activeCollege ? 'text-brand-600 font-bold' : 'text-ink'} transition-colors duration-300`}>{college}</span>
            </div>
          ))}
        </div>

        {/* Active college pop-up badge */}
        <motion.div
          key={activeCollege}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-[8px] bg-brand-900 text-white"
        >
          <Network size={13} className="text-brand-100" />
          <p className="font-mono text-[11px]">
            <span className="font-bold text-brand-100">{colleges[activeCollege]}</span>
            <span className="text-white/60"> · {barData[activeCollege]} opportunities this month</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
