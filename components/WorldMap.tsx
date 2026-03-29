import React, { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Agent nodes scattered across the globe (lng, lat)
const agentNodes: { coordinates: [number, number]; size: number }[] = [
  // North America
  { coordinates: [-118.24, 34.05], size: 4 },
  { coordinates: [-73.93, 40.73], size: 5 },
  { coordinates: [-87.62, 41.88], size: 3 },
  { coordinates: [-122.41, 37.77], size: 4 },
  { coordinates: [-95.36, 29.76], size: 3 },
  { coordinates: [-79.38, 43.65], size: 3 },
  // South America
  { coordinates: [-46.63, -23.55], size: 4 },
  { coordinates: [-58.38, -34.60], size: 3 },
  { coordinates: [-70.64, -33.44], size: 2 },
  // Europe
  { coordinates: [-0.12, 51.50], size: 5 },
  { coordinates: [2.35, 48.85], size: 4 },
  { coordinates: [13.40, 52.52], size: 4 },
  { coordinates: [12.49, 41.89], size: 3 },
  { coordinates: [-3.70, 40.41], size: 3 },
  { coordinates: [18.06, 59.33], size: 2 },
  { coordinates: [24.93, 60.17], size: 2 },
  // Africa
  { coordinates: [28.04, -26.20], size: 3 },
  { coordinates: [36.82, -1.29], size: 2 },
  { coordinates: [3.38, 6.52], size: 3 },
  { coordinates: [31.23, 30.04], size: 3 },
  // Middle East
  { coordinates: [55.27, 25.20], size: 3 },
  { coordinates: [51.53, 25.28], size: 2 },
  { coordinates: [46.67, 24.71], size: 2 },
  // South Asia
  { coordinates: [72.87, 19.07], size: 4 },
  { coordinates: [77.59, 12.97], size: 3 },
  { coordinates: [88.36, 22.57], size: 2 },
  // East Asia
  { coordinates: [116.40, 39.90], size: 5 },
  { coordinates: [121.47, 31.23], size: 4 },
  { coordinates: [114.16, 22.28], size: 4 },
  { coordinates: [126.97, 37.56], size: 4 },
  { coordinates: [139.69, 35.68], size: 5 },
  { coordinates: [135.50, 34.69], size: 3 },
  // Southeast Asia
  { coordinates: [106.66, 10.76], size: 5 },  // Ho Chi Minh
  { coordinates: [105.85, 21.02], size: 4 },  // Hanoi
  { coordinates: [108.22, 16.06], size: 3 },  // Da Nang
  { coordinates: [100.50, 13.75], size: 4 },
  { coordinates: [103.85, 1.35], size: 5 },
  { coordinates: [106.84, -6.21], size: 4 },
  { coordinates: [121.0, 14.6], size: 3 },
  // Oceania
  { coordinates: [151.20, -33.86], size: 4 },
  { coordinates: [144.96, -37.81], size: 3 },
  { coordinates: [174.77, -36.84], size: 2 },
];

// A few red (inactive) markers
const inactiveNodes: [number, number][] = [
  [-90.0, 15.5], [-75.0, -12.0], [10.0, 44.0], [35.0, 31.0],
  [90.0, 23.7], [125.0, -5.0], [149.0, -35.3], [-105.0, 40.0],
];

const WorldMap: React.FC = () => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto mb-8">
      <div className="relative bg-[#0a0c10] rounded-2xl overflow-hidden border border-[#1a1f1a]/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [20, 20] }}
          width={900}
          height={450}
          style={{ width: '100%', height: 'auto' }}
        >
          {/* Grid lines */}
          {Array.from({ length: 13 }, (_, i) => {
            const lat = -60 + i * 15;
            return (
              <line
                key={`glat${i}`}
                x1={0} y1={0} x2={900} y2={0}
                stroke="#1a2a1a"
                strokeWidth="0.5"
                opacity="0.3"
              />
            );
          })}

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a2a1a"
                  stroke="#0a0c10"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none', fill: '#1a2a1a' },
                    hover: { outline: 'none', fill: '#243824' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Active agent markers (green) */}
          {agentNodes.map((node, i) => (
            <Marker key={`agent-${i}`} coordinates={node.coordinates}>
              <circle r={node.size} fill="#4ade80" opacity={0.7}>
                <animate
                  attributeName="opacity"
                  values="0.5;0.9;0.5"
                  dur={`${3 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle r={node.size * 0.4} fill="#4ade80" opacity={0.9} />
            </Marker>
          ))}

          {/* Inactive markers (red) */}
          {inactiveNodes.map((coords, i) => (
            <Marker key={`inactive-${i}`} coordinates={coords}>
              <circle r={2} fill="#ef4444" opacity={0.5} />
            </Marker>
          ))}

          {/* Vietnam highlight — pulsing ring */}
          <Marker coordinates={[106.66, 10.76]}>
            <circle r={8} fill="none" stroke="#4ade80" strokeWidth={1.5} opacity={0.4}>
              <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
          </Marker>
        </ComposableMap>

        {/* Tooltip overlay — Vietnam */}
        <div className="absolute top-[22%] right-[6%] sm:right-[10%] bg-[#111]/95 border border-[#2a2a2a] rounded-xl px-4 py-3 backdrop-blur-md shadow-lg shadow-black/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🇻🇳</span>
            <span className="text-xs font-semibold text-white">Vietnam</span>
            <span className="text-[10px] text-[#9ca3af] ml-1">Asia</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-6 text-[11px]">
              <span className="text-[#9ca3af]">Agents:</span>
              <span className="text-white font-semibold">2,847</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px]">
              <span className="text-[#9ca3af]">Share:</span>
              <span className="text-white font-semibold">4.2%</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px]">
              <span className="text-[#9ca3af]">Rank:</span>
              <span className="text-white font-semibold">#8</span>
            </div>
          </div>
          {/* Dashed connector line */}
          <div className="absolute -left-8 top-1/2 w-8 border-t border-dashed border-[#4a4a4a]"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(WorldMap);
