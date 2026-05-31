"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Calendar, Users, Award, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProgramsPage() {
  const [filter, setFilter] = useState("all");

  const programs = [
    {
      title: "Empowerment Initiative",
      project: "Entrepreneurship Scaling",
      category: "Empowerment",
      budget: "$45,000",
      reached: "1,200 students",
      progress: 75,
      status: "Active",
      icon: Award,
    },
    {
      title: "Clean Water Campaign",
      project: "Infrastructure Health",
      category: "Health",
      budget: "$32,000",
      reached: "450 households",
      progress: 90,
      status: "Active",
      icon: Heart,
    },
    {
      title: "Coding for Kids",
      project: "NextGen Tech Education",
      category: "Education",
      budget: "$25,000",
      reached: "300 children",
      progress: 40,
      status: "Active",
      icon: BookOpen,
    },
    {
      title: "Mobile Clinic Expansion",
      project: "Rural Health Outposts",
      category: "Health",
      budget: "$60,000",
      reached: "2,500 residents",
      progress: 15,
      status: "Planning",
      icon: Heart,
    },
  ];

  const filtered = filter === "all" ? programs : programs.filter(p => p.status.toLowerCase() === filter);

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Programs</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage development programs, tracked budgets, and community impact.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Plus className="w-4 h-4 mr-1.5" />
          Create Program
        </Button>
      </div>

      {/* Filters and search mock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search programs..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-[#335CFF]"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "active", "planning"].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                filter === btn
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p, index) => (
          <Card key={index} className="p-6 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-[#335CFF]/30 transition-all group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="p-3 rounded-xl bg-[#335CFF]/10 text-[#335CFF] block transition-transform group-hover:scale-105 duration-200">
                  <p.icon className="w-5 h-5" />
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  p.status === "Active"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                }`}>
                  {p.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                <p className="text-[11px] font-medium text-[#335CFF] mt-1">{p.project}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                  A program designed to implement targeted developmental interventions and track localized success indicators.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-50 dark:border-zinc-800/60 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Budget</p>
                  <p className="text-xs font-bold mt-1">{p.budget}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Category</p>
                  <p className="text-xs font-bold mt-1">{p.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Reached</p>
                  <p className="text-xs font-bold mt-1 whitespace-nowrap text-ellipsis overflow-hidden">{p.reached}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-zinc-400">Completion</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#335CFF] transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
