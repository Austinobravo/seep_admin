"use client";

import React from "react";
import { FileText, Shield, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AuditLogPage() {
  const logs = [
    { user: "Tokunbo Michael", action: "Approved Volunteer Mentor Sarah Johnson", ip: "192.168.1.105", date: "May 31, 2026, 03:30 PM", category: "Approvals" },
    { user: "Tokunbo Michael", action: "Created Program draft 'Empowerment Initiative'", ip: "192.168.1.105", date: "May 31, 2026, 03:00 PM", category: "Programs" },
    { user: "System Scheduler", action: "Failed donation payment: John Smith - $2,500", ip: "Server Process", date: "May 29, 2026, 11:20 AM", category: "Donations" },
    { user: "Tokunbo Michael", action: "Modified Campus Activation program parameters", ip: "192.168.1.105", date: "May 28, 2026, 04:45 PM", category: "Programs" },
    { user: "Security Officer", action: "Role promotion: Mike Davis to Program Manager", ip: "10.0.4.89", date: "May 27, 2026, 09:12 AM", category: "Security" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Historical trail of administrative settings edits, volunteers approvals, and security alerts.
        </p>
      </div>

      <Card className="border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Shield className="w-4.5 h-4.5 text-[#335CFF]" />
            Security Trail
          </h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-[#335CFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                <th className="p-4">User</th>
                <th className="p-4">Action Payload</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Date/Time</th>
                <th className="p-4">Log Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/40">
              {logs.map((l, index) => (
                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20">
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{l.user}</td>
                  <td className="p-4 font-medium text-zinc-650 dark:text-zinc-300">{l.action}</td>
                  <td className="p-4 font-semibold text-zinc-400">{l.ip}</td>
                  <td className="p-4 font-medium text-zinc-400">{l.date}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#335CFF]/10 text-[#335CFF] rounded-md uppercase">
                      {l.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
