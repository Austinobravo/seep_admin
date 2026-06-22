"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActivityDetailsDrawer from "./_components/ActivityDetailsDrawer";


export const MOCK_AUDIT_LOGS: AuditLogItemType[] = [
  {
    id: "log_1",
    user: { name: "Tokunbo Michael", initials: "TM", avatarColor: "bg-blue-100 text-blue-600" },
    action: "Expense Recorded",
    actionColor: "text-blue-600 hover:underline cursor-pointer",
    module: "Programs",
    details: "₦25,000 Classroom Suppl...",
    dateTime: "May 15, 2026 — 10:20 AM",
    ipAddress: "197.210.45.12",
    browser: "Chrome Browser"
  },
  {
    id: "log_2",
    user: { name: "Aaron Samuel", initials: "AS", avatarColor: "bg-sky-100 text-sky-600" },
    action: "Event Created",
    actionColor: "text-blue-500 hover:underline cursor-pointer",
    module: "Content Management",
    details: "Annual Scholarship Gala",
    dateTime: "May 18, 2026 — 09:40 AM",
    ipAddress: "102.88.10.45",
    browser: "Firefox Browser"
  },
  {
    id: "log_3",
    user: { name: "Brain Okafor", initials: "BO", avatarColor: "bg-indigo-100 text-indigo-600" },
    action: "Blog Published",
    actionColor: "text-emerald-600 font-medium",
    module: "Blog",
    details: "Community Literacy Initiati...",
    dateTime: "May 17, 2026 — 04:20 PM",
    ipAddress: "102.88.11.80",
    browser: "Safari Browser"
  },
  {
    id: "log_4",
    user: { name: "System", initials: "SY", avatarColor: "bg-purple-100 text-purple-600" },
    action: "Donation Received",
    actionColor: "text-emerald-600 font-medium",
    module: "Donations",
    details: "₦50,000",
    dateTime: "May 20, 2026 — 10:58 AM",
    ipAddress: "—",
    browser: "System Automated Trigger"
  },
  {
    id: "log_5",
    user: { name: "Tokunbo Michael", initials: "TM", avatarColor: "bg-blue-100 text-blue-600" },
    action: "Volunteer Assigned",
    actionColor: "text-emerald-600 font-medium",
    module: "Programs",
    details: "Grace Eze - After-School....",
    dateTime: "May 24, 2026 — 02:20 PM",
    ipAddress: "197.210.45.12",
    browser: "Chrome Browser"
  },
  {
    id: "log_6",
    user: { name: "Aaron Samuel", initials: "AS", avatarColor: "bg-sky-100 text-sky-600" },
    action: "Admin Created",
    actionColor: "text-blue-500 hover:underline cursor-pointer",
    module: "Users & Roles",
    details: "New admin: Ngozi Uche",
    dateTime: "May 25, 2026 — 03:50 PM",
    ipAddress: "102.88.10.45",
    browser: "Chrome Browser"
  },
  {
    id: "log_7",
    user: { name: "System", initials: "SY", avatarColor: "bg-purple-100 text-purple-600" },
    action: "Login Failed",
    actionColor: "text-red-600 font-medium",
    module: "Security",
    details: "Multiple failed attempts fro...",
    dateTime: "May 27, 2026 — 02:40 PM",
    ipAddress: "41.58.12.90",
    browser: "Edge Browser"
  }
];

export default function AuditLogPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  
  // Selection drawer state
  const [activeLog, setActiveLog] = useState<AuditLogItemType | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Multi-parameter filtration layout loop pipeline
  const filteredLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter((log) => {
      const matchesSearch = 
        log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesModule = selectedModule === "all" || log.module === selectedModule;
      const matchesUser = selectedUser === "all" || log.user.name === selectedUser;

      return matchesSearch && matchesModule && matchesUser;
    });
  }, [searchQuery, selectedModule, selectedUser]);

  // Derived arrays matching localized pagination frames
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      {/* Top Main Section Header Profile Row */}
      <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit Log</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track and review all administrative activities across the platform.</p>
        </div>

        {/* Dropdown Menu block for Export Controls */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-semibold h-11 rounded-xl px-5 flex items-center gap-2 shadow-sm ml-auto sm:ml-0">
              Export Logs <ChevronDown className="w-4 h-4 opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border border-gray-100 shadow-md p-1 min-w-[140px]">
            <DropdownMenuItem className="text-xs font-medium py-2.5 rounded-lg cursor-pointer text-gray-600">Export CSV</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium py-2.5 rounded-lg cursor-pointer text-gray-600">Export Excel</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-medium py-2.5 rounded-lg cursor-pointer text-gray-600">Export PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Workspace Filters Navigation Panel Row */}
      <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by user, action or module...." 
            className="pl-10 h-11 rounded-xl border-gray-200 bg-gray-50/40 text-xs font-medium placeholder:text-gray-400 focus-visible:ring-blue-500 w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-end">
          <Select value={selectedModule} onValueChange={(val) => { setSelectedModule(val); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 rounded-xl border-gray-200 text-xs font-semibold bg-white text-gray-700">
              <SelectValue placeholder="All Modules" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg border-gray-100">
              <SelectItem value="all" className="text-xs">All Modules</SelectItem>
              <SelectItem value="Programs" className="text-xs">Programs</SelectItem>
              <SelectItem value="Content Management" className="text-xs">Content Management</SelectItem>
              <SelectItem value="Blog" className="text-xs">Blog</SelectItem>
              <SelectItem value="Donations" className="text-xs">Donations</SelectItem>
              <SelectItem value="Users & Roles" className="text-xs">Users & Roles</SelectItem>
              <SelectItem value="Security" className="text-xs">Security</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedUser} onValueChange={(val) => { setSelectedUser(val); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-[160px] h-11 rounded-xl border-gray-200 text-xs font-semibold bg-white text-gray-700">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg border-gray-100">
              <SelectItem value="all" className="text-xs">All Users</SelectItem>
              <SelectItem value="Tokunbo Michael" className="text-xs">Tokunbo Michael</SelectItem>
              <SelectItem value="Aaron Samuel" className="text-xs">Aaron Samuel</SelectItem>
              <SelectItem value="Brain Okafor" className="text-xs">Brain Okafor</SelectItem>
              <SelectItem value="System" className="text-xs">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table Interface Frame Module */}
      <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[520px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 px-6 font-semibold">User</th>
                <th className="py-4 px-6 font-semibold">Action</th>
                <th className="py-4 px-6 font-semibold">Module</th>
                <th className="py-4 px-6 font-semibold">Details</th>
                <th className="py-4 px-6 font-semibold">Date & Time</th>
                <th className="py-4 px-6 font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => setActiveLog(log)}
                    className="hover:bg-gray-50/60 transition-colors group cursor-pointer text-xs font-medium text-gray-700"
                  >
                    {/* User profile avatar cell */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${log.user.avatarColor} font-bold text-[10px] flex items-center justify-center tracking-tight shrink-0`}>
                        {log.user.initials}
                      </div>
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{log.user.name}</span>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={log.actionColor}>{log.action}</span>
                    </td>
                    
                    <td className="py-4 px-6 text-gray-400">{log.module}</td>
                    <td className="py-4 px-6 text-gray-800 font-medium max-w-[200px] truncate">{log.details}</td>
                    <td className="py-4 px-6 text-gray-400 font-normal">{log.dateTime}</td>
                    <td className="py-4 px-6 text-gray-500 font-mono tracking-tight">{log.ipAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-xs font-medium text-gray-400">
                    No administrative records found matching selected filtration filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Context Footer Bar Module */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white select-none">
          <p className="text-xs text-gray-400 font-semibold">
            Showing {filteredLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="w-8 h-8 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <Button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all p-0 ${
                    currentPage === pageNum 
                      ? "bg-[#3B82F6] hover:bg-blue-600 text-white shadow-sm" 
                      : "bg-transparent hover:bg-gray-50 text-gray-500"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="w-8 h-8 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-out Sheet Drawer Element Hook */}
      <Sheet open={activeLog !== null} onOpenChange={(open) => !open && setActiveLog(null)}>
        <SheetContent side="right" className="p-0 border-l border-gray-100 w-full max-w-md bg-white shadow-2xl">
          {activeLog && (
            <ActivityDetailsDrawer log={activeLog} onClose={() => setActiveLog(null)} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}