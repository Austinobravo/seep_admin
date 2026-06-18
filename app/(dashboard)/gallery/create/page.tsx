"use client";

import React, { useState } from "react";
import { Search, Plus, Play, ChevronDown, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UpdateMediaModal from "./_components/UpdateMediaModal";

// Mock Data matching the clean visual design layout rows
const MOCK_GALLERY_ITEMS = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600", isVideo: false },
  { id: 2, type: "video", src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600", isVideo: true },
  { id: 3, type: "image", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600", isVideo: false },
  { id: 4, type: "image", src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600", isVideo: false },
  { id: 5, type: "video", src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600", isVideo: true },
  { id: 6, type: "image", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600", isVideo: false },
];

export default function GalleryPage() {

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      {/* Top Profile Header Strip Area */}
      <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-2xl p-4 md:p-6 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Gallery
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Tech-2-School</h1>
          <p className="text-xs text-gray-400 font-medium">SEEP Initiative • 5 Media items</p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px] h-10 rounded-xl border-gray-200 text-xs font-medium bg-white">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="images">Images</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
            </SelectContent>
          </Select>

          {/* Dialog Trigger linking components seamlessly */}
           <UpdateMediaModal /> 
        </div>
      </div>

      {/* Filter and Interactive Utility Navigation Row */}
      <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search by Program or Projects..." 
            className="pl-10 h-10 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 text-xs focus-visible:ring-blue-500 w-full"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-full md:w-[140px] h-10 rounded-xl border-gray-200 text-xs font-medium bg-white">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all-projects">All Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-status">
            <SelectTrigger className="w-full md:w-[140px] h-10 rounded-xl border-gray-200 text-xs font-medium bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all-status">All Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dynamic Visual Masonry-Style Grid Stack */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_GALLERY_ITEMS.map((item) => (
          <div key={item.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden group bg-gray-100 border border-gray-100 shadow-sm">
            <img 
              src={item.src} 
              alt="Gallery media element thumbnail" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            {item.isVideo && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}