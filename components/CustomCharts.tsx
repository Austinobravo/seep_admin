"use client";

import React, { useState } from "react";

// Types
interface AreaChartData {
  name: string;
  raised: number;
  spend: number;
}

interface BarChartData {
  name: string;
  impact: number;
}

export function FundsRaisedChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(2); // Default to project X to replicate image state

  const data: AreaChartData[] = [
    { name: "Tech-2-school", raised: 30000, spend: 38000 },
    { name: "Innov8ion", raised: 55000, spend: 82000 },
    { name: "Project X", raised: 40000, spend: 50000 },
    { name: "Project Y", raised: 45000, spend: 40000 },
    { name: "Project Z", raised: 35000, spend: 55000 },
    { name: "Project A", raised: 28000, spend: 32000 },
  ];

  // SVG Chart bounds
  const width = 500;
  const height = 220;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 90000;

  // Convert data points to SVG coordinates
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const yRaised = paddingTop + chartHeight - (d.raised / maxVal) * chartHeight;
    const ySpend = paddingTop + chartHeight - (d.spend / maxVal) * chartHeight;
    return { x, yRaised, ySpend, ...d };
  });

  // Generate cubic bezier paths for smooth curves
  const getCurvePath = (coords: { x: number; y: number }[], closeToBottom = false) => {
    if (coords.length === 0) return "";
    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const current = coords[i];
      const next = coords[i + 1];
      const cpX1 = current.x + (next.x - current.x) / 2;
      const cpY1 = current.y;
      const cpX2 = current.x + (next.x - current.x) / 2;
      const cpY2 = next.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    if (closeToBottom) {
      path += ` L ${coords[coords.length - 1].x} ${paddingTop + chartHeight}`;
      path += ` L ${coords[0].x} ${paddingTop + chartHeight} Z`;
    }
    return path;
  };

  const raisedCoords = points.map((p) => ({ x: p.x, y: p.yRaised }));
  const spendCoords = points.map((p) => ({ x: p.x, y: p.ySpend }));

  const raisedLinePath = getCurvePath(raisedCoords);
  const raisedAreaPath = getCurvePath(raisedCoords, true);

  const spendLinePath = getCurvePath(spendCoords);
  const spendAreaPath = getCurvePath(spendCoords, true);

  // Grid lines
  const yTicks = [0, 20000, 40000, 60000, 80000, 90000];

  return (
    <div className="relative w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Funds Raised vs Program Spend</h3>
        </div>
        <select className="text-xs font-medium text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[450px] overflow-visible">
          <defs>
            <linearGradient id="raisedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#335CFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#335CFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y Axis Labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E4E4E7"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="dark:stroke-zinc-800"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-zinc-400 font-medium"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Areas */}
          <path d={raisedAreaPath} fill="url(#raisedGrad)" />
          <path d={spendAreaPath} fill="url(#spendGrad)" />

          {/* Lines */}
          <path d={raisedLinePath} fill="none" stroke="#335CFF" strokeWidth="2" />
          <path d={spendLinePath} fill="none" stroke="#10B981" strokeWidth="2" />

          {/* Interactive Hover Guides & Dots */}
          {points.map((p, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="cursor-pointer"
            >
              {/* Hotspot line */}
              {hoveredIndex === idx && (
                <line
                  x1={p.x}
                  y1={paddingTop}
                  x2={p.x}
                  y2={paddingTop + chartHeight}
                  stroke="#335CFF"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
              )}

              {/* Data dots */}
              <circle
                cx={p.x}
                cy={p.yRaised}
                r={hoveredIndex === idx ? 5 : 3.5}
                fill="#335CFF"
                stroke="#FFF"
                strokeWidth="1.5"
                className="transition-all duration-150"
              />
              <circle
                cx={p.x}
                cy={p.ySpend}
                r={hoveredIndex === idx ? 5 : 3.5}
                fill="#10B981"
                stroke="#FFF"
                strokeWidth="1.5"
                className="transition-all duration-150"
              />

              {/* Invisible touch target column */}
              <rect
                x={p.x - chartWidth / (data.length - 1) / 2}
                y={paddingTop}
                width={chartWidth / (data.length - 1)}
                height={chartHeight}
                fill="transparent"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 15}
              textAnchor="middle"
              className="text-[10px] fill-zinc-400 font-medium"
            >
              {p.name}
            </text>
          ))}
        </svg>

        {/* Custom Rich Tooltip positioned nicely above the active point */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2.5 flex items-center gap-4 transition-all pointer-events-none text-xs"
            style={{
              left: `${Math.min(Math.max(points[hoveredIndex].x - 90, 10), width - 180)}px`,
              top: `${Math.min(points[hoveredIndex].yRaised, points[hoveredIndex].ySpend) - 40}px`,
            }}
          >
            <div>
              <span className="block text-[10px] text-zinc-400 font-semibold uppercase">Fund raised</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">₦{(points[hoveredIndex].raised / 2000).toFixed(1)}M</span>
            </div>
            <div className="w-[1px] h-6 bg-zinc-200 dark:bg-zinc-700" />
            <div>
              <span className="block text-[10px] text-zinc-400 font-semibold uppercase">Program Spend</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">₦{(points[hoveredIndex].spend / 2000).toFixed(1)}M</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#335CFF]" />
          <span>Funds Raised ₦14.8M</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          <span>Program Spend ₦18.4M</span>
        </div>
      </div>
    </div>
  );
}

export function ImpactCategoryChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(2); // Default matching screenshot to Project 3

  const data: BarChartData[] = [
    { name: "Tech-2-school", impact: 900 },
    { name: "Innov8ion", impact: 1100 },
    { name: "Project 3", impact: 1250 },
    { name: "Project 4", impact: 1650 },
    { name: "Project 5", impact: 1450 },
    { name: "Project 6", impact: 1300 },
    { name: "Project 7", impact: 1150 },
  ];

  const width = 500;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 2000;
  const yTicks = [0, 400, 800, 1200, 1600, 2000];

  return (
    <div className="relative w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Impact by Program Category</h3>
        </div>
        <select className="text-xs font-medium text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[450px] overflow-visible">
          {/* Grid lines */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#E4E4E7"
                  strokeWidth="1"
                  className="dark:stroke-zinc-800"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-zinc-400 font-medium"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Bar Chart Bars */}
          {data.map((d, idx) => {
            const x = paddingLeft + (idx / data.length) * chartWidth + (chartWidth / data.length) * 0.15;
            const barWidth = (chartWidth / data.length) * 0.7;
            const barHeight = (d.impact / maxVal) * chartHeight;
            const y = paddingTop + chartHeight - barHeight;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="cursor-pointer"
              >
                {/* Visual bar with top corners rounded */}
                <path
                  d={`
                    M ${x} ${y + 6}
                    A 6 6 0 0 1 ${x + 6} ${y}
                    L ${x + barWidth - 6} ${y}
                    A 6 6 0 0 1 ${x + barWidth} ${y + 6}
                    L ${x + barWidth} ${paddingTop + chartHeight}
                    L ${x} ${paddingTop + chartHeight}
                    Z
                  `}
                  fill={hoveredIndex === idx ? "#3B82F6" : "#335CFF"}
                  opacity={hoveredIndex === idx ? 0.9 : 0.8}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {data.map((d, idx) => {
            const x = paddingLeft + (idx / data.length) * chartWidth + (chartWidth / data.length) * 0.5;
            return (
              <text
                key={idx}
                x={x}
                y={height - 15}
                textAnchor="middle"
                className="text-[10px] fill-zinc-400 font-medium"
              >
                {d.name}
              </text>
            );
          })}
        </svg>

        {/* Custom Tooltip positioned above the active bar */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg px-2.5 py-1.5 transition-all pointer-events-none text-[11px]"
            style={{
              left: `${paddingLeft + (hoveredIndex / data.length) * chartWidth + (chartWidth / data.length) * 0.5 - 55}px`,
              top: `${paddingTop + chartHeight - (data[hoveredIndex].impact / maxVal) * chartHeight - 35}px`,
            }}
          >
            <div className="text-center font-medium">
              <span className="block text-[9px] text-zinc-400 uppercase font-semibold">{data[hoveredIndex].name}</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-100">Impact: {data[hoveredIndex].impact}</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#335CFF]" />
          <span>Impact distribution across programs</span>
        </div>
      </div>
    </div>
  );
}
