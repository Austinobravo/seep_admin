"use client";

import React, { useState } from "react";
import { Settings, Save, Lock, Bell, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [auditEmails, setAuditEmails] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your administrative preferences, email subscriptions, and security parameters.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Save className="w-4 h-4 mr-1.5" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Lock className="w-4.5 h-4.5 text-[#335CFF]" />
            Security & Credentials
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">New Password</label>
                <input
                  type="password"
                  placeholder="At least 8 chars"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="At least 8 chars"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Bell className="w-4.5 h-4.5 text-[#335CFF]" />
            Preferences Alerts
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-zinc-50 dark:border-zinc-800/40">
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-250">New donation alerts</p>
                <p className="text-[10px] text-zinc-400">Receive email for Stripe or Paystack transactions.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#335CFF] border-zinc-200 focus:ring-[#335CFF]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-50 dark:border-zinc-800/40">
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-250">Audit email logs</p>
                <p className="text-[10px] text-zinc-400">Forward daily audit logs summary to admin security mail.</p>
              </div>
              <input
                type="checkbox"
                checked={auditEmails}
                onChange={(e) => setAuditEmails(e.target.checked)}
                className="w-4 h-4 text-[#335CFF] border-zinc-200 focus:ring-[#335CFF]"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
