"use client";

import React from "react";
import { Activity, Target, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImpactCategoryChart } from "@/components/CustomCharts";

export default function ImpactPage() {
  const metrics = [
    { label: "Water campaigns run", value: "8 campaigns", target: "10 target" },
    { label: "Coding students graduated", value: "340 kids", target: "500 target" },
    { label: "Community mentors active", value: "48 mentors", target: "60 target" },
    { label: "Total grants received", value: "$120k USD", target: "$150k target" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Community Impact</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Review overall goals performance, targets reach, and beneficiary distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, index) => (
          <Card key={index} className="p-4 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs">
            <span className="p-2 rounded-lg bg-[#335CFF]/10 text-[#335CFF] block w-fit">
              <Target className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">{m.label}</p>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">{m.value}</h4>
              <p className="text-[9px] text-[#335CFF] font-semibold mt-1">{m.target}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImpactCategoryChart />
        <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold">Goal Metrics & Targets</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Below represents operational objectives completion index calculated over target parameters.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            {[
              { label: "Community Water Sanitation Index", value: 90 },
              { label: "Youth Computer Literacy Campaign", value: 68 },
              { label: "Mentor Program Retention Rate", value: 80 },
            ].map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="text-[#335CFF] font-bold">{item.value}%</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#335CFF]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
