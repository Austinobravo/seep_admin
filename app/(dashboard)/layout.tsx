"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  BookOpen,
  Image as ImageIcon,
  HeartHandshake,
  Users,
  Award,
  Activity,
  FileCode,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  FileText,
  Clock,
  Ban,
  UserPlus,
  DollarSign,
  ShieldAlert,
  Heart,
  CheckCircle2,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define Notification Type
interface Notification {
  id: string;
  type: "donation" | "volunteer" | "blog" | "failed_login" | "generic";
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Sidebar collapsed state (persisted in localStorage)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Notification drawer state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<"all" | "unread">("all");

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock Notifications list matching screenshot 5 exactly
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "donation",
      title: "New donation received - ₦50,000",
      description: "A donation was made through the website.",
      time: "30 minutes ago",
      unread: true,
    },
    {
      id: "notif-2",
      type: "volunteer",
      title: "New volunteer registered",
      description: "A new volunteer joined the platform.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: "notif-3",
      type: "blog",
      title: "Blog post posted successfully",
      description: "Your blog post is now live.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "notif-4",
      type: "failed_login",
      title: "Failed login attempt detected",
      description: "Multipled failed login attempts were recorded.",
      time: "5 hours ago",
      unread: false,
    },
    {
      id: "notif-5",
      type: "donation",
      title: "New Donation Received - ₦50,000",
      description: "A donation was made through the website.",
      time: "10 hours ago",
      unread: false,
    },
    {
      id: "notif-6",
      type: "donation",
      title: "New donation received - ₦50,000",
      description: "A donation was made through the website.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: "notif-7",
      type: "volunteer",
      title: "New volunteer registered",
      description: "A new volunteer joined the platform.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: "notif-8",
      type: "blog",
      title: "Blog post posted successfully",
      description: "Your blog post is now live.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: "notif-9",
      type: "blog",
      title: "Blog post posted successfully",
      description: "Your blog post is now live.",
      time: "3 weeks ago",
      unread: false,
    },
  ]);

  // Read sidebar state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Handle clicking outside profile and search dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebarCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem("sidebar_collapsed", String(nextState));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Sidebar Menu Items
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Programs", icon: Calendar, href: "/programs" },
    { name: "Project", icon: Briefcase, href: "/project" },
    { name: "Blog", icon: BookOpen, href: "/blog" },
    { name: "Gallery", icon: ImageIcon, href: "/gallery" },
    { name: "Donations", icon: HeartHandshake, href: "/donations" },
    { name: "Volunteers", icon: Users, href: "/volunteers" },
    { name: "Advisory Board", icon: Award, href: "/advisory-board" },
    { name: "Impact", icon: Activity, href: "/impact" },
    { name: "Content Management", icon: FileCode, href: "/content-management" },
    { name: "Audit Log", icon: FileText, href: "/audit-log" },
  ];

  // List of searchable items for functional search bar
  const searchableResources = [
    { name: "Dashboard", type: "Page Link", action: () => router.push("/") },
    { name: "Programs page", type: "Page Link", action: () => router.push("/programs") },
    { name: "Projects page", type: "Page Link", action: () => router.push("/project") },
    { name: "Blog page", type: "Page Link", action: () => router.push("/blog") },
    { name: "Gallery page", type: "Page Link", action: () => router.push("/gallery") },
    { name: "Donations list", type: "Page Link", action: () => router.push("/donations") },
    { name: "Volunteers directory", type: "Page Link", action: () => router.push("/volunteers") },
    { name: "Advisory Board list", type: "Page Link", action: () => router.push("/advisory-board") },
    { name: "Impact statistics", type: "Page Link", action: () => router.push("/impact") },
    { name: "Settings panel", type: "Page Link", action: () => router.push("/settings") },
    { name: "My Profile", type: "Page Link", action: () => router.push("/profile") },
    { name: "Sarah Johnson (Volunteer)", type: "Recent Volunteer", action: () => router.push("/volunteers?search=Sarah") },
    { name: "Mike Davis (Program Manager)", type: "Staff Member", action: () => router.push("/volunteers?search=Mike") },
    { name: "Entrepreneurship Scaling Project", type: "Active Project", action: () => router.push("/project") },
    { name: "Clean Water Initiative Program", type: "Active Program", action: () => router.push("/programs") },
    { name: "Publish Scheduled Blog action", type: "Dashboard Shortcut", action: () => router.push("/?trigger=publish_blog") },
    { name: "Approve Volunteer action", type: "Dashboard Shortcut", action: () => router.push("/?trigger=approve_volunteer") },
  ];

  const filteredSearchResults = searchQuery
    ? searchableResources.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (action: () => void) => {
    action();
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  // Render Notification Icon based on type
  const renderNotifIcon = (type: Notification["type"]) => {
    switch (type) {
      case "donation":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#335CFF]/10 text-[#335CFF]">
            <Lock className="w-4 h-4 fill-[#335CFF]" />
          </div>
        );
      case "volunteer":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <Users className="w-4 h-4" />
          </div>
        );
      case "blog":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <BookOpen className="w-4 h-4" />
          </div>
        );
      case "failed_login":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };


  return (
    <div className="flex min-h-screen bg-[#FAFBFC] dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50">
      <TooltipProvider>
        {/* Desktop Sidebar Navigation */}
        <aside
          className={cn(
            "hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 p-6 space-y-8 shrink-0 transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[80px] px-3 items-center" : "w-[260px]"
          )}
        >
          {/* Logo / Collapsible trigger Header */}
          <div
            className={cn(
              "flex items-center w-full",
              isCollapsed ? "flex-col gap-4 justify-center" : "justify-between gap-3"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#335CFF]/10 text-[#335CFF] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              {!isCollapsed && (
                <span className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-sm whitespace-nowrap animate-in fade-in duration-300">
                  SEE-Support Centre
                </span>
              )}
            </div>
            <button
              onClick={toggleSidebarCollapse}
              className={cn(
                "p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-all",
                isCollapsed && "mt-1"
              )}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Menu list */}
          <nav className="flex-1 w-full space-y-1.5 overflow-y-auto no-scrollbar">
            {menuItems.map((item, idx) => {
              const isActive = item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href);

              const linkContent = (
                <Link
                  key={idx}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center rounded-xl text-xs font-semibold tracking-wide transition-all",
                    isCollapsed ? "justify-center p-3" : "gap-3.5 px-4 py-3",
                    isActive
                      ? "bg-[#335CFF] text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
                  )}
                >
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={12}>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>

          {/* Footer menu */}
          <div
            className={cn(
              "w-full pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5",
              isCollapsed && "flex flex-col items-center"
            )}
          >
            {/* Settings button */}
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                    className={cn(
                      "flex items-center justify-center p-3 rounded-xl transition-all",
                      pathname === "/settings"
                        ? "bg-[#335CFF] text-white"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900"
                    )}
                  >
                    <Settings className="w-4.5 h-4.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  Settings
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/settings"
                className={cn(
                  "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                  pathname === "/settings"
                    ? "bg-[#335CFF] text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
                )}
              >
                <Settings className="w-4.5 h-4.5" />
                Settings
              </Link>
            )}

            {/* Logout button */}
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to log out?")) {
                        router.push("/logout");
                      }
                    }}
                    className="flex items-center justify-center p-3 rounded-xl text-zinc-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4.5 h-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  Log Out
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to log out?")) {
                    router.push("/logout");
                  }
                }}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all text-left cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5" />
                Log Out
              </button>
            )}
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <aside className="relative flex flex-col w-[260px] max-w-xs bg-white dark:bg-zinc-900 p-6 space-y-8 h-full shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#335CFF]/10 text-[#335CFF]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">SEE-Support Centre</span>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
                {menuItems.map((item, idx) => {
                  const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className={cn(
                        "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                        isActive
                          ? "bg-[#335CFF] text-white shadow-xs"
                          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
                      )}
                    >
                      <item.icon className="w-4.5 h-4.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
                <Link
                  href="/settings"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all",
                    pathname === "/settings"
                      ? "bg-[#335CFF] text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900"
                  )}
                >
                  <Settings className="w-4.5 h-4.5" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    if (confirm("Are you sure you want to log out?")) {
                      router.push("/logout");
                    }
                  }}
                  className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all text-left cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  Log Out
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="flex items-center justify-between h-20 px-6 lg:px-8 bg-[#FAFBFC] dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1">
              {/* Hamburger menu for mobile */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Functional Search Bar */}
              <div ref={searchRef} className="relative w-full max-w-md hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search resources, actions, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#335CFF]/20 focus:border-[#335CFF] text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
                />

                {/* Autocomplete Dropdown Search Menu */}
                {isSearchFocused && searchQuery && (
                  <div className="absolute left-0 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[320px] overflow-y-auto py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-4 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Search Results
                    </div>
                    {filteredSearchResults.length > 0 ? (
                      filteredSearchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(result.action)}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-xs font-semibold text-zinc-700 dark:text-zinc-300 text-left transition-all cursor-pointer"
                        >
                          <span className="truncate">{result.name}</span>
                          <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full uppercase shrink-0">
                            {result.type}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-xs text-zinc-400">
                        No matches found for &quot;{searchQuery}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Header Panel */}
            <div className="flex items-center gap-5">
              {/* Notification bell trigger */}
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="relative p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-white dark:border-zinc-950 animate-pulse" />
                )}
              </button>

              {/* Profile Menu with Settings/Logout Dropdown */}
              <div ref={profileRef} className="relative flex items-center pl-3 border-l border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3.5 text-left focus:outline-none cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                    alt="Tokunbo Michael"
                    className="w-9 h-9 rounded-full object-cover border border-zinc-100 dark:border-zinc-800"
                  />
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Tokunbo Michael</span>
                    <span className="text-[10px] font-medium text-zinc-400">Admin</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-400 hidden md:block transition-transform duration-200" />
                </button>

                {/* Profile Dropdown panel */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 top-full w-48 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-[10px] font-medium text-zinc-400 leading-none">Signed in as</p>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mt-1 truncate">tokunbo@seesupport.org</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (confirm("Are you sure you want to log out?")) {
                          router.push("/logout");
                        }
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all text-left cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Child Page Rendering */}
          <main className="flex-1 min-h-0 relative">
            {children}
          </main>
        </div>

        {/* Right Notification Drawer */}
        {isNotificationOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
              onClick={() => setIsNotificationOpen(false)}
            />
            {/* Slide-out Panel */}
            <aside className="relative w-full max-w-md bg-[#FAFBFC] dark:bg-zinc-950 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="flex items-center justify-center bg-red-600 text-white text-[10px] font-bold h-5 px-1.5 rounded-full min-w-[20px]">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="p-1 rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Tabs Panel */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900">
                <div className="flex gap-4">
                  <button
                    onClick={() => setNotificationTab("all")}
                    className={cn(
                      "text-xs font-bold pb-2 relative transition-all cursor-pointer",
                      notificationTab === "all"
                        ? "text-zinc-900 dark:text-zinc-100 border-b-2 border-[#335CFF]"
                        : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setNotificationTab("unread")}
                    className={cn(
                      "text-xs font-bold pb-2 relative flex items-center gap-1.5 transition-all cursor-pointer",
                      notificationTab === "unread"
                        ? "text-zinc-900 dark:text-zinc-100 border-b-2 border-[#335CFF]"
                        : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="bg-red-600 text-white text-[9px] font-bold h-4 px-1 rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs font-semibold text-[#335CFF] hover:text-[#224BE6] transition-all cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              {/* Notifications List Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Filter items by tab */}
                {(() => {
                  const filtered = notifications.filter(
                    (n) => notificationTab === "all" || n.unread
                  );

                  if (filtered.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400 space-y-3">
                        <Bell className="w-8 h-8 opacity-40" />
                        <p className="text-xs font-medium">No notifications yet</p>
                      </div>
                    );
                  }

                  // Group items: Today vs Older
                  const todayItems = filtered.filter(
                    (n) => n.time.includes("minute") || n.time.includes("hour")
                  );
                  const olderItems = filtered.filter(
                    (n) => !n.time.includes("minute") && !n.time.includes("hour")
                  );

                  return (
                    <>
                      {/* Today Section */}
                      {todayItems.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2">
                            Today
                          </h3>
                          <div className="space-y-1">
                            {todayItems.map((n) => (
                              <button
                                key={n.id}
                                onClick={() => handleNotificationClick(n.id)}
                                className={cn(
                                  "w-full flex items-start gap-4 p-3 rounded-2xl transition-all text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/60 relative group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800/40 bg-white dark:bg-zinc-900 shadow-xs cursor-pointer"
                                )}
                              >
                                {renderNotifIcon(n.type)}
                                <div className="flex-1 min-w-0 pr-4">
                                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-snug">
                                    {n.title}
                                  </h4>
                                  <p className="text-[11px] text-zinc-400 dark:text-zinc-400 mt-1 leading-normal">
                                    {n.description}
                                  </p>
                                  <span className="text-[10px] font-medium text-zinc-400 mt-2 block">
                                    {n.time}
                                  </span>
                                </div>
                                {n.unread && (
                                  <span className="w-2 h-2 rounded-full bg-[#335CFF] shrink-0 mt-2" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Older Section */}
                      {olderItems.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2">
                            Older
                          </h3>
                          <div className="space-y-1">
                            {olderItems.map((n) => (
                              <button
                                key={n.id}
                                onClick={() => handleNotificationClick(n.id)}
                                className={cn(
                                  "w-full flex items-start gap-4 p-3 rounded-2xl transition-all text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/60 relative group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800/40 bg-white dark:bg-zinc-900 shadow-xs cursor-pointer"
                                )}
                              >
                                {renderNotifIcon(n.type)}
                                <div className="flex-1 min-w-0 pr-4">
                                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-snug">
                                    {n.title}
                                  </h4>
                                  <p className="text-[11px] text-zinc-400 dark:text-zinc-400 mt-1 leading-normal">
                                    {n.description}
                                  </p>
                                  <span className="text-[10px] font-medium text-zinc-400 mt-2 block">
                                    {n.time}
                                  </span>
                                </div>
                                {n.unread && (
                                  <span className="w-2 h-2 rounded-full bg-[#335CFF] shrink-0 mt-2" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </aside>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
}
