"use client";

import React from "react";
import { Plus, Image as ImageIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GalleryPage() {
  const images = [
    {
      title: "Students in Ohio classroom",
      desc: "Coding session during the NextGen computer training initiative.",
      tag: "Education",
      location: "Ohio Hub",
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Mentorship orientation panel",
      desc: "Group of volunteers planning the 2026 empowerment curriculums.",
      tag: "Mentors",
      location: "Support Centre HQ",
      url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Water filter distribution",
      desc: "Locals loading supply crates containing clean filtration systems.",
      tag: "Health Campaign",
      location: "Sub-Saharan Hub",
      url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Youth Tech Lab Construction",
      desc: "Inaugural laying of the foundation structures for our new computing lab.",
      tag: "Infrastructure",
      location: "North Region",
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery Media</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Visual archive of program activities, community milestones, and site constructs.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Media
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <Card key={index} className="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:border-[#335CFF]/30 transition-all flex flex-col justify-between group">
            <div className="h-48 bg-zinc-100 overflow-hidden relative">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 text-[9px] font-bold px-2 py-0.5 bg-black/60 text-white backdrop-blur-xs rounded-full">
                {img.tag}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{img.title}</h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{img.desc}</p>
              <div className="flex items-center gap-1 text-[9px] text-zinc-400 font-semibold uppercase pt-2">
                <MapPin className="w-3 h-3" /> {img.location}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
