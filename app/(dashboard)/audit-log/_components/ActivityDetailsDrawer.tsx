"use client";

import React from "react";
import { X } from "lucide-react";

interface ActivityDetailsDrawerProps {
  log: AuditLogItemType;
  onClose: () => void;
}

export default function ActivityDetailsDrawer({ log, onClose }: ActivityDetailsDrawerProps) {
  return (
    <div className="h-full flex flex-col justify-between bg-white relative">
      
      {/* Drawer Context Top Header Title Bar Row */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Activity Details</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-gray-50 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Central Content Structured Properties Display Body Container */}
      <div className="flex-1 divide-y divide-gray-100/70 overflow-y-auto px-6">
        
        <div className="py-4.5 space-y-1.5">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Created by</p>
          <div className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-full ${log.user.avatarColor} font-bold text-[9px] flex items-center justify-center tracking-tight shrink-0`}>
              {log.user.initials}
            </div>
            <p className="text-sm font-bold text-gray-800 leading-none">{log.user.name}</p>
          </div>
        </div>

        <div className="py-4.5 space-y-1">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Action</p>
          <p className="text-sm font-bold text-gray-800">{log.action}</p>
        </div>

        <div className="py-4.5 space-y-1">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Module</p>
          <p className="text-sm font-bold text-gray-800">{log.module}</p>
        </div>

        <div className="py-4.5 space-y-1">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Details</p>
          <p className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-wrap">{log.details}</p>
        </div>

        <div className="py-4.5 space-y-1">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Date & Time</p>
          <p className="text-sm font-bold text-gray-800">{log.dateTime}</p>
        </div>

        <div className="py-4.5 space-y-1">
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">IP Address</p>
          <p className="text-sm font-bold text-gray-800 font-mono tracking-tight">{log.ipAddress}</p>
        </div>

        <div className="py-4.5 space-y-1">
          {/* FIXED: Labeled properly as Browser details instead of a duplicate IP heading */}
          <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400">Browser / User Agent</p>
          <p className="text-sm font-bold text-gray-800">{log.browser}</p>
        </div>

      </div>

      {/* Optional Sticky Drawer Footer spacing frame layer */}
      <div className="p-4 bg-gray-50/30 border-t border-gray-50" />
    </div>
  );
}