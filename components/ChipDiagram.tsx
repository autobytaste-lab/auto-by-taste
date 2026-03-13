import React, { useState, useRef } from 'react';
import { chips } from './data/chips';
import { useInView } from './hooks/useInView';
import { useCountUp } from './hooks/useCountUp';
import { useReducedMotion } from './hooks/useReducedMotion';

const M4_CHIPS = chips.filter(c => c.generation === 'M4' && c.variant !== 'Ultra');

type M4Variant = 'base' | 'Pro' | 'Max';

const VARIANT_LABELS: Record<M4Variant, string> = {
  base: 'M4',
  Pro: 'M4 Pro',
  Max: 'M4 Max',
};

export const ChipDiagram: React.FC<{ className?: string }> = ({ className }) => {
  const [activeVariant, setActiveVariant] = useState<M4Variant>('base');
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const reducedMotion = useReducedMotion();

  const chip = M4_CHIPS.find(c => c.variant === activeVariant)!;
  const shouldAnimate = inView && !reducedMotion;

  const cpuCount = useCountUp(chip.cpuCores.total, 1200, inView);
  const gpuCount = useCountUp(chip.gpuCores, 1200, inView);
  const topsCount = useCountUp(chip.tops ?? 0, 1200, inView);
  const bwCount = useCountUp(chip.memoryBandwidth, 1200, inView);

  const cpu = reducedMotion ? chip.cpuCores.total : cpuCount;
  const gpu = reducedMotion ? chip.gpuCores : gpuCount;
  const tops = reducedMotion ? (chip.tops ?? 0) : topsCount;
  const bw = reducedMotion ? chip.memoryBandwidth : bwCount;

  return (
    <div ref={containerRef} className={`w-full max-w-2xl mx-auto px-4${className ? ` ${className}` : ''}`}>
      {/* Apple-style segmented control */}
      <div role="tablist" aria-label="M4 chip variant selector" className="flex gap-1 mb-6 justify-center bg-white rounded-full p-1 max-w-xs mx-auto">
        {(['base', 'Pro', 'Max'] as M4Variant[]).map(variant => (
          <button
            key={variant}
            role="tab"
            aria-selected={activeVariant === variant}
            onClick={() => setActiveVariant(variant)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeVariant === variant
                ? 'bg-black/[0.05] text-[#2C2C2C]'
                : 'text-[#6B7280] hover:text-[#2C2C2C]'
            }`}
          >
            {VARIANT_LABELS[variant]}
          </button>
        ))}
      </div>

      {/* SVG diagram */}
      <svg
        viewBox="0 0 400 300"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${VARIANT_LABELS[activeVariant]} chip architecture diagram`}
      >
        <defs>
          <rect id="chip-block-lg" width="185" height="120" rx="12" />
          <rect id="chip-block-sm" width="185" height="90" rx="12" />
          <rect id="chip-block-bar" width="380" height="40" rx="12" />
        </defs>

        {/* CPU block */}
        <g>
          <use
            href="#chip-block-lg"
            x="10"
            y="10"
            fill="#D4AF37"
            fillOpacity={0.08}
            stroke="#D4AF37"
            strokeOpacity={0.15}
            className={shouldAnimate ? 'animate-core-glow' : ''}
          />
          <text x="102" y="50" fill="#2C2C2C" fontSize="15" textAnchor="middle" fontWeight="600" fontFamily="Inter, -apple-system, sans-serif">
            CPU
          </text>
          <text x="102" y="75" fill="#78716C" fontSize="13" textAnchor="middle" fontFamily="Inter, -apple-system, sans-serif">
            {cpu}-core ({chip.cpuCores.performance}P+{chip.cpuCores.efficiency}E)
          </text>
        </g>

        {/* GPU block */}
        <g>
          <use
            href="#chip-block-lg"
            x="205"
            y="10"
            fill="#C0C0C0"
            fillOpacity={0.08}
            stroke="#C0C0C0"
            strokeOpacity={0.15}
            className={shouldAnimate ? 'animate-core-glow' : ''}
          />
          <text x="297" y="50" fill="#2C2C2C" fontSize="15" textAnchor="middle" fontWeight="600" fontFamily="Inter, -apple-system, sans-serif">
            GPU
          </text>
          <text x="297" y="75" fill="#78716C" fontSize="13" textAnchor="middle" fontFamily="Inter, -apple-system, sans-serif">
            {gpu}-core
          </text>
        </g>

        {/* Neural Engine block */}
        <g>
          <use
            href="#chip-block-sm"
            x="10"
            y="145"
            fill="#30D158"
            fillOpacity={0.08}
            stroke="#30D158"
            strokeOpacity={0.15}
          />
          <text x="102" y="180" fill="#2C2C2C" fontSize="15" textAnchor="middle" fontWeight="600" fontFamily="Inter, -apple-system, sans-serif">
            Neural Engine
          </text>
          <text x="102" y="205" fill="#78716C" fontSize="13" textAnchor="middle" fontFamily="Inter, -apple-system, sans-serif">
            {tops} TOPS
          </text>
        </g>

        {/* Unified Memory block */}
        <g>
          <use
            href="#chip-block-sm"
            x="205"
            y="145"
            fill="#F5D76E"
            fillOpacity={0.08}
            stroke="#F5D76E"
            strokeOpacity={0.15}
            className={shouldAnimate ? 'animate-memory-shimmer' : ''}
          />
          <text x="297" y="180" fill="#2C2C2C" fontSize="15" textAnchor="middle" fontWeight="600" fontFamily="Inter, -apple-system, sans-serif">
            Memory
          </text>
          <text x="297" y="205" fill="#78716C" fontSize="13" textAnchor="middle" fontFamily="Inter, -apple-system, sans-serif">
            {chip.maxMemory}GB Unified
          </text>
        </g>

        {/* Spec bar */}
        <g>
          <use
            href="#chip-block-bar"
            x="10"
            y="250"
            fill="#F5F5F5"
            fillOpacity={1}
            stroke="#E5E5E5"
            strokeOpacity={0.5}
          />
          <text x="200" y="275" fill="#78716C" fontSize="13" textAnchor="middle" fontFamily="Inter, -apple-system, sans-serif">
            {bw} GB/s bandwidth
          </text>
        </g>
      </svg>
    </div>
  );
};
