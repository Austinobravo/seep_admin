"use client";

import React from "react";
import { FileCode, Save, Image as ImageIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContentManagementPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Configure homepage banners, navigation layouts, logo headers, and site assets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs py-2 px-4 rounded-xl hover:bg-zinc-50 transition-all cursor-pointer">
            <Eye className="w-4 h-4 mr-1.5" />
            Live Preview
          </Button>
          <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all cursor-pointer">
            <Save className="w-4 h-4 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main forms column */}
        <Card className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="text-sm font-bold">Homepage Setup</h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Hero Section Header Title</label>
              <input
                type="text"
                defaultValue="Empowering Local Communities and Uplifting Youth Support Centre"
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Hero Subtext Description</label>
              <textarea
                rows={3}
                defaultValue="We create sustainable community hubs, coordinate volunteer mentoring, and provide technical coding academies."
                className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Primary Button Label</label>
                <input
                  type="text"
                  defaultValue="Join as Volunteer"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Secondary Button Label</label>
                <input
                  type="text"
                  defaultValue="Donate Now"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-[#335CFF] dark:text-zinc-50"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Side media/asset uploads column */}
        <Card className="p-6 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="text-sm font-bold">Media Banners</h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Header Logo Asset</label>
              <div className="border border-dashed border-zinc-200 dark:border-zinc-700 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-zinc-55 dark:hover:bg-zinc-800/40">
                <ImageIcon className="w-6 h-6 text-zinc-400" />
                <span className="text-[10px] font-bold text-[#335CFF]">Upload logo image</span>
                <span className="text-[9px] text-zinc-400">PNG, SVGs under 2MB</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Homepage Background Hero</label>
              <div className="border border-dashed border-zinc-200 dark:border-zinc-700 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-zinc-55 dark:hover:bg-zinc-800/40">
                <ImageIcon className="w-6 h-6 text-zinc-400" />
                <span className="text-[10px] font-bold text-[#335CFF]">Upload hero background</span>
                <span className="text-[9px] text-zinc-400">JPGs up to 5MB</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
