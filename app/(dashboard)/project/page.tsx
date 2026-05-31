"use client";

import React from "react";
import { Plus, FolderOpen, Calendar, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProjectsPage() {
  const projects = [
    {
      name: "Entrepreneurship Scaling",
      desc: "Teaching skills for the people in Ohio community environs, empowering local startups and youth.",
      status: "Active",
      location: "Ohio community",
      date: "May 2026 - Present",
      manager: "Sarah Johnson",
      managerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64&auto=format&fit=crop",
      progress: 80,
    },
    {
      name: "Infrastructure Health Initiative",
      desc: "Water filtration systems and health outposts constructions in vulnerable regions.",
      status: "Active",
      location: "Sub-Saharan Hubs",
      date: "Jan 2026 - Dec 2026",
      manager: "Mike Davis",
      managerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=64&auto=format&fit=crop",
      progress: 60,
    },
    {
      name: "NextGen Tech Education Hubs",
      desc: "Setting up computer science labs and coding resource centers across public libraries.",
      status: "Completed",
      location: "Multilocation",
      date: "Sep 2025 - Mar 2026",
      manager: "Alicia Smith",
      managerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64&auto=format&fit=crop",
      progress: 100,
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Browse and monitor projects that group your development programs.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Plus className="w-4 h-4 mr-1.5" />
          Create Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((p, index) => (
          <Card key={index} className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row gap-6 md:items-center justify-between hover:border-[#335CFF]/30 transition-all">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#335CFF] rounded-xl shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{p.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-400 font-semibold uppercase mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {p.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {p.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {p.desc}
              </p>
            </div>

            {/* Timelines and progress bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:w-80 shrink-0">
              <div className="flex-1 w-full space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-zinc-400">Progress</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#335CFF] transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-40 shrink-0">
                <img
                  src={p.managerAvatar}
                  alt={p.manager}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-150 dark:border-zinc-800"
                />
                <div>
                  <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Manager</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">{p.manager}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
