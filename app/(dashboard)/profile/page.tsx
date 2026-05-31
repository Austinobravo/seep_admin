"use client";

import React from "react";
import { Users, Save, Mail, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Configure your personal information, public biography, and contact address details.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Save className="w-4 h-4 mr-1.5" />
          Update Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs flex flex-col items-center text-center space-y-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
            alt="Tokunbo Michael"
            className="w-28 h-28 rounded-full object-cover border-2 border-[#335CFF]/30 p-1"
          />
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Tokunbo Michael</h3>
            <p className="text-[10px] text-[#335CFF] font-bold uppercase tracking-wider mt-1">System Administrator</p>
            <p className="text-[10px] text-zinc-400 font-semibold">SEE-Support Centre</p>
          </div>
          <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800/40 w-full flex justify-center gap-6 text-[10px] font-bold text-zinc-500">
            <div>
              <p>Programs Created</p>
              <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-1">12</p>
            </div>
            <div>
              <p>Actions Audited</p>
              <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-1">247</p>
            </div>
          </div>
        </Card>

        {/* Profile Inputs */}
        <Card className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="text-sm font-bold">Personal Information</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">First Name</label>
                <input
                  type="text"
                  defaultValue="Tokunbo"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Last Name</label>
                <input
                  type="text"
                  defaultValue="Michael"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Primary Contact Email</label>
              <input
                type="email"
                defaultValue="tokunbo@seesupport.org"
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Administrative Biography</label>
              <textarea
                rows={4}
                defaultValue="Head of Technical Infrastructure and System Operations at SEE-Support Centre. Coordinating mentor onboardings and tracking local financial donations ledger records."
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
