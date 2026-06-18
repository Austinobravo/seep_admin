"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Search, Plus, MoreVertical, Users, UserCheck, 
  CheckCircle2, AlertCircle, Calendar, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"
// Mock Data representing the interface items
const INITIAL_PROGRAMS = [
  {
    id: "1",
    title: "After-School Support",
    tag: "Tech-2-School",
    description: "Literacy improvement program targeting early readers. Building foundational reading skills for success.",
    volunteers: 0,
    beneficiaries: 50,
    status: "Publish", // Matches green dot in mockup
    date: "15th Aug. 26",
    image: "/images/after-school-1.jpg" // Path to your asset
  },
  {
    id: "2",
    title: "Tech Skills Workshop",
    tag: "Innovation Hub",
    description: "Introduction to coding and digital skills for youth. Hands-on learning in modern programming languages.",
    volunteers: 10,
    beneficiaries: 50,
    status: "Publish",
    date: "15th Aug. 26",
    image: "/images/tech-workshop.jpg"
  },
  {
    id: "3",
    title: "Youth Leadership",
    tag: "Youth Leadership",
    description: "Developing leadership skills in young adults. Mentorship and training programs.",
    volunteers: 10,
    beneficiaries: 50,
    status: "Draft", // Matches orange dot in mockup
    date: "15th Aug. 26",
    image: "/images/youth-leadership.jpg"
  },
  // Additional cards mapping directly to your grid layout...
];

export default function ProgramsDashboard() {
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (id: string, newStatus: string) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleDelete = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Programs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your impact projects and their nested programs.</p>
        </div>
        <Button className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl px-5 py-2.5 flex items-center justify-center gap-2 font-medium transition-all">
          <Plus className="w-4 h-4" /> Create New Program
        </Button>
      </div>

      {/* Filter and Control Utilities Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search programs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 rounded-xl h-11 text-sm focus-visible:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <SelectFilter value={statusFilter} onChange={setStatusFilter} options={["All", "Publish", "Draft"]} />
          <SelectFilter value="All Projects" options={["All Projects", "Tech-2-School", "Innovation Hub"]} />
          <SelectFilter value="Newest" options={["Newest", "Oldest", "A-Z"]} />
        </div>
      </div>

      {/* Programs Grid Grid Responsive Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Creation Placeholder Card Block */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[420px] text-center hover:border-blue-400 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-gray-800 text-base">Create New Program</h3>
          <p className="text-xs text-gray-400 max-w-[180px] mt-1">Add a new program to a project</p>
        </div>

        {/* Dynamic Mapping through filtered program arrays */}
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative">
            
            {/* Card Graphic Context Container */}
            <div className="relative h-48 w-full bg-gray-100">
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-sm text-center z-10">
                <span className="block text-xs font-bold text-gray-900 leading-none">15th</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase mt-0.5 block">Aug. 26</span>
              </div>

              {/* Context Actions Dropdown Trigger Block */}
              <div className="absolute top-3 right-3 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-sm hover:bg-white text-gray-700">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 shadow-lg border border-gray-100">
                    <DropdownMenuItem className="rounded-lg text-sm text-gray-700 py-2">View Program</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg text-sm text-gray-700 py-2">Edit Program</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="rounded-lg text-sm text-gray-700 py-2">Change Status</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="rounded-xl p-1">
                        <DropdownMenuItem onClick={() => handleStatusChange(program.id, 'Publish')} className="rounded-lg text-sm text-gray-700 py-2">Mark as Active</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(program.id, 'Draft')} className="rounded-lg text-sm text-gray-700 py-2">Mark as Draft</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <div className="h-px bg-gray-100 my-1" />
                    <DropdownMenuItem onClick={() => handleDelete(program.id)} className="rounded-lg text-sm text-destructive py-2 font-medium focus:bg-red-50">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Placeholder graphic block fallback handling UI layer cleanly */}
              <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 font-medium text-xs">
                Image Placeholder ({program.tag})
              </div>
            </div>

            {/* Content Context Layer */}
            <Link href="/programs/1" className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight line-clamp-1">{program.title}</h3>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none hover:bg-blue-50 rounded-md text-[11px] font-medium px-2 py-0.5 whitespace-nowrap">
                    {program.tag}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6">{program.description}</p>
              </div>

              {/* Footer Meta Layer metrics details indicator section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" /> {program.volunteers} Volunteers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-gray-400" /> {program.beneficiaries} Beneficiaries
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${program.status === 'Publish' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                  <span className="text-gray-700">{program.status === 'Publish' ? 'Publish' : 'Draft'}</span>
                </div>
              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

// Custom Helper Local Control Select Filter Primitive
function SelectFilter({ value, onChange, options }: { value: string; onChange?: (v: string) => void; options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white border-gray-200 rounded-xl px-4 h-11 text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50">
          {value} <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl shadow-md border border-gray-100 min-w-[140px] p-1">
        {options.map((opt) => (
          <DropdownMenuItem key={opt} onClick={() => onChange?.(opt)} className="rounded-lg text-sm text-gray-700 py-2">
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}