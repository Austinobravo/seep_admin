"use client";

import React, { useState } from "react";
import { 
  Calendar, CheckCircle, Clock, Users, UserCheck, 
  Wallet, TrendingUp, ChevronDown, Edit3, Trash2, UserPlus, DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import AssignVolunteerDrawer from "./_components/AssignVolunteerDrawer";
import AssignExpenseDrawer from "./_components/AssignExpenseDrawer";

export default function ProgramDetailView() {
  const [status, setStatus] = useState("Active");
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      {/* Detail Context Hero Header Row Elements */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">After-School Support</h1>
            
            {/* Status Interactive Badge Wrapper Trigger inline */}
            <div className="relative">
              <Badge className={`rounded-full px-3 py-1 font-medium text-xs flex items-center gap-1.5 border border-none ${
                status === 'Active' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {status}
                <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Calendar className="w-3.5 h-3.5" /> 2026-01-15 → 2026-08-15
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">
            Literacy improvement program targeting early readers. Building foundational reading skills for success.
          </p>
        </div>

        {/* Global Action Modals Direct Component Hookpoints */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <Button onClick={() => setIsVolunteerOpen(true)} className="flex-1 lg:flex-none bg-[#3B82F6] hover:bg-blue-600 rounded-xl h-11 text-sm font-medium px-5">
            <UserPlus className="w-4 h-4 mr-2" /> Assign Volunteer
          </Button>
          <Button onClick={() => setIsExpenseOpen(true)} variant="outline" className="flex-1 lg:flex-none bg-white border-gray-200 rounded-xl h-11 text-sm font-medium px-5 text-gray-700 hover:bg-gray-50">
            <DollarSign className="w-4 h-4 mr-2" /> Assign Budget
          </Button>
          <Button variant="ghost" className="bg-[#EF4444]/5 hover:bg-[#EF4444]/10 text-[#EF4444] rounded-xl h-11 w-11 p-0 flex items-center justify-center">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* KPI Highlight Stat Cards Grid Components Array Layout Block */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Budget Allocated" amount="₦500,000" trend="12%" icon={<Wallet className="text-gray-400" />} />
        <StatCard title="Total Spend" amount="₦95,000" trend="2" icon={<Clock className="text-gray-400" />} />
        <StatCard title="Remaining Budget" amount="₦405,000" trend="18%" icon={<TrendingUp className="text-gray-400" />} />
        <StatCard title="Volunteers" amount="3" trend="24%" icon={<Users className="text-gray-400" />} />
        <StatCard title="Beneficiaries" amount="2" trend="5%" icon={<UserCheck className="text-gray-400" />} />
      </div>

      {/* Segment Workspace Views Panel Block */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-auto p-0 gap-6 overflow-x-auto scrollbar-none mb-6">
          <TabsTrigger value="overview" className="tab-style">Overview</TabsTrigger>
          <TabsTrigger value="volunteers" className="tab-style">Volunteers</TabsTrigger>
          <TabsTrigger value="beneficiaries" className="tab-style">Beneficiaries</TabsTrigger>
          <TabsTrigger value="budget" className="tab-style">Budget & Expenses</TabsTrigger>
          <TabsTrigger value="updates" className="tab-style">Updates</TabsTrigger>
          <TabsTrigger value="analytics" className="tab-style">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-6 outline-none">
          {/* Main Context Left Description Content Module Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-base">Program Description</h3>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600"><Edit3 className="w-4 h-4" /></Button>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Literacy improvement program targeting early readers. Building foundational reading skills for success.
              </p>
            </div>

            {/* Metric Visualization Progress Tracking Module Elements */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-2">
                  <span>21% of timeline completed</span>
                  <span className="text-gray-400 font-normal">20%</span>
                </div>
                <Progress value={21} className="h-2 bg-gray-100 text-blue-600" />
                <p className="text-xs text-gray-400 mt-1.5">Program duration progress</p>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-2">
                  <span>Budget Usage</span>
                  <span className="text-gray-400 font-normal">10%</span>
                </div>
                <Progress value={10} className="h-2 bg-gray-100 text-[#10B981]" />
                <p className="text-xs text-gray-400 mt-1.5">₦95,000 Spent</p>
              </div>
            </div>
          </div>

          {/* Activity Timeline Stream Widget System Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-base">Activity Timeline</h3>
              <Button variant="outline" size="sm" className="rounded-xl text-xs font-medium border-gray-200">
                All <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400" />
              </Button>
            </div>

            <div className="relative border-l border-gray-100 pl-4 ml-2 space-y-6">
              <TimelineItem text="Amara Okafor added as beneficiary" date="Jan 18, 2026" />
              <TimelineItem text="Program status changed to Draft" date="Jan 18, 2026" />
              <TimelineItem text="Budget allocated: ₦50,000 from General Fund" date="Jan 18, 2026" />
              <TimelineItem text="Expense recorded: Classroom Supplies (₦25,000)" date="Jan 18, 2026" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Slide-out Drawer Panel Overlays Control Management States hooks */}
      <AssignVolunteerDrawer isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
      <AssignExpenseDrawer isOpen={isExpenseOpen} onClose={() => setIsExpenseOpen(false)} />
    </div>
  );
}

// Internal Local Component Primitives for Detail Metrics Visual Layout Grid
function StatCard({ title, amount, trend, icon }: { title: string; amount: string; trend: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400 font-medium line-clamp-1">{title}</span>
        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline justify-between flex-wrap gap-1">
        <span className="text-xl font-bold text-gray-900 tracking-tight">{amount}</span>
        <span className="text-[11px] font-medium text-[#10B981] bg-[#10B981]/5 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          ↗ {trend}
        </span>
      </div>
    </div>
  );
}

function TimelineItem({ text, date }: { text: string; date: string }) {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-500" />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <p className="text-sm text-gray-700 font-medium">{text}</p>
        <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
      </div>
    </div>
  );
}