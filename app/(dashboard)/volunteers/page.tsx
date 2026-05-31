"use client";

import React, { useState } from "react";
import { UserCheck, UserPlus, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([
    { id: "1", name: "Sarah Johnson", email: "sarah.j@gmail.com", role: "Mentor", status: "Active", joined: "May 10, 2026", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64&auto=format&fit=crop" },
    { id: "2", name: "John Doe", email: "johndoe@gmail.com", role: "Technical Tutor", status: "Pending", joined: "May 28, 2026", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&auto=format&fit=crop" },
    { id: "3", name: "Alicia Smith", email: "alicia.smith@yahoo.com", role: "Organizer", status: "Active", joined: "Feb 14, 2026", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64&auto=format&fit=crop" },
    { id: "4", name: "Mike Davis", email: "mdavis@work.org", role: "Program Lead", status: "Active", joined: "Jan 05, 2026", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=64&auto=format&fit=crop" },
  ]);

  const handleApprove = (id: string) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Active" } : v))
    );
  };

  const handleReject = (id: string) => {
    setVolunteers((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Volunteers Directory</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Review applicant submissions, onboarding statuses, and mentor assignments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
            <UserPlus className="w-4 h-4 mr-1.5" />
            Invite Mentor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {volunteers.map((v) => (
          <Card key={v.id} className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs flex items-start gap-4 hover:border-[#335CFF]/30 transition-all relative">
            <img
              src={v.avatar}
              alt={v.name}
              className="w-12 h-12 rounded-full object-cover border border-zinc-100 dark:border-zinc-800 shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{v.name}</h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    v.status === "Active"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                  }`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-semibold">{v.email}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-2 font-medium">
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-600 dark:text-zinc-300 font-bold uppercase tracking-wider">{v.role}</span>
                  <span>Joined {v.joined}</span>
                </div>
              </div>

              {v.status === "Pending" && (
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-50 dark:border-zinc-800/40">
                  <Button
                    onClick={() => handleApprove(v.id)}
                    className="bg-[#335CFF]/10 text-[#335CFF] hover:bg-[#335CFF]/20 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(v.id)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
