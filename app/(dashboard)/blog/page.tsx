"use client";

import React from "react";
import { Plus, BookOpen, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BlogPage() {
  const articles = [
    {
      title: "Summer 2024 Impact Report",
      desc: "An in-depth review of our developmental operations, community integrations, and metrics successes.",
      category: "Impact Report",
      time: "5 min read",
      status: "Scheduled",
      date: "Scheduled for Jun 10, 2026",
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: "Empowering Rural Communities through Technology",
      desc: "How tech coding spaces and mentorship networks are transforming lives in outlying regions.",
      category: "Case Study",
      time: "8 min read",
      status: "Published",
      date: "Published May 28, 2026",
      cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: "Mentor Onboarding Insights",
      desc: "Best practices, outlines, and curriculum summaries compiled by our lead program advisors.",
      category: "Volunteer Story",
      time: "4 min read",
      status: "Draft",
      date: "Last edited 2 days ago",
      cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Articles</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Publish updates, announcement stories, case studies, and impact reports.
          </p>
        </div>
        <Button className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-fit cursor-pointer">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Blog Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art, index) => (
          <Card key={index} className="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:border-[#335CFF]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 relative bg-zinc-100 overflow-hidden">
                <img
                  src={art.cover}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  art.status === "Published"
                    ? "bg-emerald-500 text-white"
                    : art.status === "Scheduled"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-500 text-white"
                }`}>
                  {art.status}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-semibold uppercase">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {art.time}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {art.desc}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-zinc-50 dark:border-zinc-800/40 mt-2 text-[10px] text-zinc-400 font-medium pt-3 flex items-center justify-between">
              <span>{art.date}</span>
              <button className="text-[#335CFF] font-semibold hover:underline">Edit Article</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
