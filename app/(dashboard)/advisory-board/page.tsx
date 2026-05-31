"use client";

import React from "react";
import { Award, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdvisoryBoardPage() {
  const members = [
    {
      name: "Dr. Catherine Bennett",
      role: "Board Chairperson",
      affiliation: "Professor of Social Innovation, MIT",
      bio: "Focuses on scaling microfinance and grassroots entrepreneurial systems across underdeveloped local communities.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Abiodun Michael",
      role: "Financial Advisor",
      affiliation: "Director, West African Capital Reserve",
      bio: "Manages governance, audits oversight, and compliance frameworks for global philanthropic donations.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop",
    },
    {
      name: "Elizabeth Thorne",
      role: "Strategic Growth Partner",
      affiliation: "VP of Impact Operations, Google.org",
      bio: "Specializes in digital literacy initiatives, coding bootcamp setups, and technical sponsorships.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advisory Board</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Governing members providing oversight, strategic frameworks, and funding compliance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((m, index) => (
          <Card key={index} className="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#335CFF]/30 transition-all text-center">
            <div className="space-y-4">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border border-zinc-100 dark:border-zinc-800"
              />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{m.name}</h3>
                <p className="text-[10px] text-[#335CFF] font-bold uppercase tracking-wider mt-1">{m.role}</p>
                <p className="text-[10px] text-zinc-400 font-semibold">{m.affiliation}</p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed text-left">
                {m.bio}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-50 dark:border-zinc-800/40 flex items-center justify-center gap-4">
              <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1">
                <Mail className="w-4 h-4" />
              </button>
              <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
