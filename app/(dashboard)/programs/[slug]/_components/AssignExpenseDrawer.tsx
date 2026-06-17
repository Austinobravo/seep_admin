"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DrawerProps { isOpen: boolean; onClose: () => void; }

export default function AssignExpenseDrawer({ isOpen, onClose }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Assign Expense</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full w-8 h-8 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Shadcn UI direct field component wrapper inputs mapping attributes */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Allocation Amount <span className="text-red-500">*</span>
              </label>
              <Input type="number" defaultValue={0} className="w-full h-11 border-gray-200 bg-white focus-visible:ring-blue-500 rounded-xl px-4" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Funding Source <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full h-11 border border-gray-200 bg-white rounded-xl px-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                  <option>After-School Support</option>
                  <option>General Fund Pool Allocation</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Notes</label>
              <Textarea placeholder="Additional notes here..." className="w-full min-h-[120px] border-gray-200 rounded-xl p-4 text-sm focus-visible:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Bottom Submission Command Action Trigger Wrapper Bar */}
        <Button className="w-full bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-blue-600 hover:text-white rounded-xl h-12 text-sm font-semibold transition-all">
          Assign Expense
        </Button>
      </div>
    </div>
  );
}