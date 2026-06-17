"use client";

import React, { useState } from "react";
import { X, Search, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DrawerProps { isOpen: boolean; onClose: () => void; }

export default function AssignVolunteerDrawer({ isOpen, onClose }: DrawerProps) {
  if (!isOpen) return null;

  const volunteers = Array(8).fill({ name: "Aaron Bashiru", email: "aaron@domain.com", initial: "AB" });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed Overlay Background Backdrop Layout Layer */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer Body Container Elements panel layout wrapper */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Assign Volunteers</h2>
              <p className="text-xs text-gray-400 mt-0.5">Tech-2-School</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full w-8 h-8 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Core Assignment Actions Search Input Row Block */}
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search by volunteer name or email..." className="pl-9 bg-gray-50/50 border-gray-200 rounded-xl text-sm" />
            </div>
            <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl text-xs font-semibold px-4 h-10">Invite</Button>
          </div>

          <div className="flex items-center gap-3 py-2 border-b border-gray-100 mb-3">
            <Checkbox id="selectAll" className="rounded border-gray-300 text-blue-600" />
            <label htmlFor="selectAll" className="text-sm font-semibold text-gray-700 cursor-pointer">Select All</label>
          </div>

          {/* Dynamic Scrollable List of Volunteers Section */}
          <div className="space-y-3">
            {volunteers.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center gap-3">
                  <Checkbox className="rounded border-gray-300 text-blue-600" />
                  <Avatar className="w-9 h-9 bg-blue-600 text-white font-bold text-xs flex items-center justify-center rounded-full">
                    <AvatarFallback>{v.initial}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{v.name}</span>
                    <span className="text-xs text-gray-400">{v.email}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[#3B82F6] font-semibold text-xs rounded-lg hover:bg-blue-50 hover:text-blue-700 px-3">
                  Assign
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Action Footer Module Control Elements Panel Block */}
        <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center gap-2">
            <Link2 className="w-4 h-4" /> Copy link
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl text-sm font-medium">
            Assign Volunteer
          </Button>
        </div>
      </div>
    </div>
  );
}