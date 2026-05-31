"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  AlertCircle,
  Clock,
  Ban,
  MoreVertical,
  Plus,
  DollarSign,
  UserPlus,
  FolderSync,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FundsRaisedChart, ImpactCategoryChart } from "@/components/CustomCharts";
import {
  ConfirmationDialog,
  AddBlogPostDialog
} from "@/components/DashboardConfirmationDialogs";
import { CreateProgramDialog } from "@/components/CreateProgramDialog";

function DashboardContent() {
  const searchParams = useSearchParams();

  // Timeframe and Currency Dropdowns
  const [timeframe, setTimeframe] = useState("Monthly");
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  // Confirmation dialogs states
  const [dialogState, setDialogState] = useState<{
    type: "approve_volunteer" | "reject_volunteer" | "publish_blog" | null;
    targetId: string | null;
  }>({ type: null, targetId: null });

  // Add Program & Add Blog States
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isAddBlogPostOpen, setIsAddBlogPostOpen] = useState(false);

  // Quick actions list with state to support dynamic updates
  const [quickActions, setQuickActions] = useState([
    {
      id: "qa-1",
      type: "volunteer",
      title: "Pending Volunteer",
      subtitle: "Sarah Johnson was approved as a mentor",
      hasButtons: true,
    },
    {
      id: "qa-2",
      type: "comment",
      title: "Pending Blog Comment",
      subtitle: `"Great initiative! Would love..."`,
      hasButtons: false,
    },
    {
      id: "qa-3",
      type: "review",
      title: "Program Awaiting Review",
      subtitle: "Tech Career Mentorship",
      hasButtons: false,
    },
    {
      id: "qa-4",
      type: "blog-schedule",
      title: "Scheduled Blog Post",
      subtitle: "Summer 2024 Impact Report",
      hasButtons: true,
      isScheduledBlog: true,
    },
    {
      id: "qa-5",
      type: "donation-failed",
      title: "Failed Donation Attempt",
      subtitle: "John Smith - $2,500",
      hasButtons: false,
      isFailed: true,
      errorText: "Payment Declined",
    },
  ]);

  // System activities list state
  const [activities, setActivities] = useState([
    {
      id: "act-1",
      title: "Volunteer approved",
      desc: "Sarah Johnson was approved as a mentor",
      time: "10 minutes ago",
      type: "volunteer",
    },
    {
      id: "act-2",
      title: "Blog updated",
      desc: 'New post published: "Summer 2024 Impact Report"',
      time: "15 minutes ago",
      type: "blog",
    },
    {
      id: "act-3",
      title: "Donation recorded",
      desc: "Anonymous donation of $5,000 received",
      time: "25 minutes ago",
      type: "donation",
    },
    {
      id: "act-4",
      title: "Role changed",
      desc: "Mike Davis promoted to Program Manager",
      time: "2 days ago",
      type: "role",
    },
    {
      id: "act-5",
      title: "Program updated",
      desc: "Campus Activation program parameters modified",
      time: "3 days ago",
      type: "program",
    },
  ]);

  // Listen to trigger param from Header Autocomplete Search
  useEffect(() => {
    const trigger = searchParams.get("trigger");
    if (trigger === "publish_blog") {
      setDialogState({ type: "publish_blog", targetId: "qa-4" });
    } else if (trigger === "approve_volunteer") {
      setDialogState({ type: "approve_volunteer", targetId: "qa-1" });
    }
  }, [searchParams]);

  // Action handlers
  const handleConfirmAction = () => {
    const { type, targetId } = dialogState;
    if (!type || !targetId) return;

    if (type === "approve_volunteer") {
      setQuickActions((prev) => prev.filter((item) => item.id !== targetId));
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: "Volunteer Approved",
          desc: "Sarah Johnson has been successfully onboarded as a mentor",
          time: "Just now",
          type: "volunteer",
        },
        ...prev,
      ]);
    } else if (type === "reject_volunteer") {
      setQuickActions((prev) => prev.filter((item) => item.id !== targetId));
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: "Volunteer Application Rejected",
          desc: "Sarah Johnson's mentor application was rejected",
          time: "Just now",
          type: "volunteer",
        },
        ...prev,
      ]);
    } else if (type === "publish_blog") {
      setQuickActions((prev) => prev.filter((item) => item.id !== targetId));
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: "Blog Post Published",
          desc: 'Scheduled blog post "Summer 2024 Impact Report" is now live',
          time: "Just now",
          type: "blog",
        },
        ...prev,
      ]);
    }
  };

  const handleCreateProgram = (data: {
    projectTitle: string;
    programTitle: string;
    programDescription: string;
  }) => {
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: "Program Created",
        desc: `New program "${data.programTitle}" under project "${data.projectTitle}" created successfully.`,
        time: "Just now",
        type: "program",
      },
      ...prev,
    ]);
  };

  const handleAddBlogPost = (data: { title: string; category: string }) => {
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: "Blog Post Draft Created",
        desc: `"${data.title}" saved to drafts under ${data.category}`,
        time: "Just now",
        type: "blog",
      },
      ...prev,
    ]);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 overflow-y-auto h-full bg-[#FAFBFC] dark:bg-zinc-950">
      {/* Dashboard Title & Actions Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Overview of financial performance and program impact.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setIsCreateProgramOpen(true)}
            className="bg-[#335CFF] hover:bg-[#224BE6] text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Create New Program
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddBlogPostOpen(true)}
            className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs py-2.5 px-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Add Blog Post
          </Button>

          {/* Timeframe Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
            >
              {timeframe}
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {isTimeframeOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                {["Weekly", "Monthly", "3 months", "Yearly"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setTimeframe(item);
                      setIsTimeframeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all cursor-pointer"
            >
              Select currency ({currency})
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                {[
                  { code: "USD", symbol: "$" },
                  { code: "NGN", symbol: "₦" },
                  { code: "GBP", symbol: "£" },
                  { code: "EUR", symbol: "€" }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setIsCurrencyOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium cursor-pointer"
                  >
                    {c.code} ({c.symbol})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Funds */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <DollarSign className="w-4.5 h-4.5" />
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-md">
              ~ 12%
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">$328,000</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Total Funds Raised</p>
          </div>
        </Card>

        {/* Card 2: Active Programs */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <Calendar className="w-4.5 h-4.5" />
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-md">
              ~ 2
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">13</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Active Programs</p>
          </div>
        </Card>

        {/* Card 3: Registered Volunteers */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <Users className="w-4.5 h-4.5" />
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-md">
              ~ 18%
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">247</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Registered Volunteers</p>
          </div>
        </Card>

        {/* Card 4: Beneficiaries */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <TrendingUp className="w-4.5 h-4.5" />
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-md">
              ~ 24%
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">3,650</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Beneficiaries Reached</p>
          </div>
        </Card>

        {/* Card 5: Blog Posts */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <BookOpen className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">28</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Blog Posts Published</p>
          </div>
        </Card>

        {/* Card 6: Pending Approvals */}
        <Card className="p-4 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <AlertCircle className="w-4.5 h-4.5" />
            </span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 px-1.5 py-0.5 rounded-md">
              ~ 8
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">8</h4>
            <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 uppercase tracking-wider">Pending Approvals</p>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FundsRaisedChart />
        <ImpactCategoryChart />
      </div>

      {/* Bottom Grid: Activities & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Activity Feed */}
        <Card className="p-6 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">System Activity</h3>
            <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer">
              View all
            </button>
          </div>

          <div className="flex-1 space-y-5">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-4">
                <span className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shrink-0">
                  {act.type === "volunteer" ? (
                    <UserPlus className="w-4 h-4" />
                  ) : act.type === "blog" ? (
                    <BookOpen className="w-4 h-4" />
                  ) : act.type === "donation" ? (
                    <DollarSign className="w-4 h-4" />
                  ) : (
                    <FolderSync className="w-4 h-4" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug">{act.title}</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{act.desc}</p>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 whitespace-nowrap shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Action Block */}
        <Card className="p-6 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Quick Actions</h3>
            <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer">
              View all
            </button>
          </div>

          <div className="flex-1 space-y-5">
            {quickActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between gap-4 py-1.5 border-b border-zinc-50 dark:border-zinc-800/40 last:border-0">
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5">
                    {action.type === "volunteer" ? (
                      <Users className="w-4 h-4" />
                    ) : action.type === "blog-schedule" ? (
                      <Clock className="w-4 h-4" />
                    ) : action.type === "donation-failed" ? (
                      <Ban className="w-4 h-4 text-red-500" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-zinc-400 leading-none">{action.title}</h4>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1.5 truncate">
                      {action.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {action.hasButtons && !action.isScheduledBlog && (
                    <>
                      <Button
                        onClick={() =>
                          setDialogState({ type: "approve_volunteer", targetId: action.id })
                        }
                        className="bg-[#335CFF]/10 text-[#335CFF] hover:bg-[#335CFF]/20 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          setDialogState({ type: "reject_volunteer", targetId: action.id })
                        }
                        className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {action.isScheduledBlog && (
                    <>
                      <Button
                        variant="ghost"
                        className="text-zinc-500 hover:bg-zinc-100 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          setDialogState({ type: "publish_blog", targetId: action.id })
                        }
                        className="bg-zinc-50 text-zinc-700 hover:bg-zinc-100 text-[10px] font-bold px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                      >
                        Publish
                      </Button>
                    </>
                  )}

                  {action.isFailed && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 px-2 py-1 rounded-lg">
                      {action.errorText}
                    </span>
                  )}

                  <button className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Confirmation Dialog System */}
      <ConfirmationDialog
        isOpen={dialogState.type === "approve_volunteer"}
        onClose={() => setDialogState({ type: null, targetId: null })}
        onConfirm={handleConfirmAction}
        title="Approve Volunteer"
        description="Are you sure you want to approve Sarah Johnson as a mentor? They will be notified via email."
        confirmText="Approve Volunteer"
        variant="seep"
      />

      <ConfirmationDialog
        isOpen={dialogState.type === "reject_volunteer"}
        onClose={() => setDialogState({ type: null, targetId: null })}
        onConfirm={handleConfirmAction}
        title="Reject Application"
        description="Are you sure you want to reject Sarah Johnson's application? This action is permanent."
        confirmText="Reject Application"
        variant="destructive"
      />

      <ConfirmationDialog
        isOpen={dialogState.type === "publish_blog"}
        onClose={() => setDialogState({ type: null, targetId: null })}
        onConfirm={handleConfirmAction}
        title="Publish Scheduled Blog"
        description="Would you like to publish this post immediately instead of waiting for the scheduled time?"
        confirmText="Publish Now"
        variant="seep"
      />

      {/* Forms Modals */}
      <CreateProgramDialog
        isOpen={isCreateProgramOpen}
        onClose={() => setIsCreateProgramOpen(false)}
        onSubmit={handleCreateProgram}
      />

      <AddBlogPostDialog
        isOpen={isAddBlogPostOpen}
        onClose={() => setIsAddBlogPostOpen(false)}
        onSubmit={handleAddBlogPost}
      />
    </div>
  );
}

// Custom ChevronDown icon wrapper to prevent duplicate imports
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
