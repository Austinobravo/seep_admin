"use client";

import React, { useState } from "react";
import { Settings, CreditCard, Bell, Shield, Users, Plus, MoreVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { AdminUser, PermissionMatrix, SettingsTab, AdminSubTab } from "./_utils/settings";

// --- MOCK CONSTANTS ---
const MOCK_ADMINS: AdminUser[] = [
  { id: "1", name: "Aaron Mensah", email: "aaron@seesupport.org", role: "Super Admin", status: "Active", lastUpdated: "2 minutes ago" },
  { id: "2", name: "Tokunbo Michael", email: "tokunbo@seesupport.org", role: "Admin", status: "Active", lastUpdated: "1 hour ago" },
  { id: "3", name: "Brain Mark", email: "brain@seesupport.org", role: "Content Editor", status: "Active", lastUpdated: "4 hours ago" },
];

const INITIAL_MATRIX: PermissionMatrix[] = [
  { module: "Dashboard", view: true, create: false, edit: false, delete: false },
  { module: "Projects", view: true, create: true, edit: true, delete: true },
  { module: "Programs", view: true, create: true, edit: true, delete: true },
  { module: "Blog", view: true, create: true, edit: true, delete: true },
  { module: "Gallery", view: true, create: true, edit: true, delete: true },
  { module: "Donations", view: true, create: true, edit: true, delete: true },
  { module: "Volunteers", view: true, create: true, edit: true, delete: true },
  { module: "Impact (view only)", view: true, create: false, edit: false, delete: false, viewOnlyText: true },
];

export default function SettingsWorkspace() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>("list");
  
  // Overlay States
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [permissions, setPermissions] = useState<PermissionMatrix[]>(INITIAL_MATRIX);
  const [showSecret, setShowSecret] = useState(false);

  const handlePermissionChange = (moduleIndex: number, fields: keyof PermissionMatrix, value: boolean) => {
    setPermissions(prev => prev.map((p, idx) => idx === moduleIndex ? { ...p, [fields]: value } : p));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400">Configure system preferences and administrative controls.</p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar Panel */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
          <SidebarBtn active={activeTab === "general"} icon={<Settings className="w-4 h-4" />} label="General" onClick={() => setActiveTab("general")} />
          <SidebarBtn active={activeTab === "payment"} icon={<CreditCard className="w-4 h-4" />} label="Payment gateway" onClick={() => setActiveTab("payment")} />
          <SidebarBtn active={activeTab === "notification"} icon={<Bell className="w-4 h-4" />} label="Notification" onClick={() => setActiveTab("notification")} />
          <SidebarBtn active={activeTab === "security"} icon={<Shield className="w-4 h-4" />} label="Security" onClick={() => setActiveTab("security")} />
          <SidebarBtn active={activeTab === "users"} icon={<Users className="w-4 h-4" />} label="User & Roles" onClick={() => setActiveTab("users")} />
        </div>

        {/* Dynamic Context Canvas */}
        <div className="lg:col-span-9 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm min-h-[600px]">
          
          {/* TAB 1: General Info Details View */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">General Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Organization Name" defaultValue="SEE-Support Centre" />
                <FormInput label="Contact Email" defaultValue="info@seesupport.org" />
                <FormInput label="Contact Phone" defaultValue="+234 800 123 4567" />
                <FormInput label="Contact Email (2nd)" defaultValue="info@seesupport.org" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">Office Address</label>
                <Textarea className="rounded-xl border-gray-200 min-h-[80px]" defaultValue="12 Harmony Drive, Victoria Island, Lagos, Nigeria" />
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Social Media Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput label="Twitter / X" placeholder="https://x.com/..." />
                  <FormInput label="LinkedIn" placeholder="https://linkedin.com/..." />
                  <FormInput label="Instagram" placeholder="https://instagram.com/..." />
                  <FormInput label="Youtube" placeholder="https://youtube.com/..." />
                </div>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl w-full text-xs font-bold h-11 mt-4">Save Changes</Button>
            </div>
          )}

          {/* TAB 2: Payment Gateway Setup */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Paystack Configuration</h2>
                <p className="text-xs text-gray-400 mt-0.5">Connect your Paystack account for donations.</p>
              </div>
              <div className="space-y-4 pt-2">
                <FormInput label="Paystack Public Key" defaultValue="pk_live_xxxxxxxxxxxxxxxxxx" />
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-500 block">Paystack Secret Key</label>
                  <div className="relative">
                    <Input type={showSecret ? "text" : "password"} defaultValue="sk_live_secretkeymock" className="rounded-xl pr-10 h-11 border-gray-200" />
                    <button type="button" onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">Currency</label>
                  <Select defaultValue="ngn">
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 text-xs font-medium"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-xl"><SelectItem value="ngn">NGN (₦)</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl w-full text-xs font-bold h-11">Update Payment Settings</Button>
            </div>
          )}

          {/* TAB 3: Notifications Layer Workspace */}
          {activeTab === "notification" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Notification Preferences</h2>
              <div className="space-y-5">
                <ToggleItem title="when a new volunteer signs up" />
                <ToggleItem title="when a donation is received" />
                <ToggleItem title="when a blog post is published" />
              </div>
              <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl w-full text-xs font-bold h-11 pt-2">Save Notification Preferences</Button>
            </div>
          )}

          {/* TAB 4: Core Workspace Security Features Setup */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-inner bg-gray-50/20">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Require strong passwords</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Admins must use a combination of letters, numbers, and symbols.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Login Activity</h3>
                  <p className="text-[11px] text-gray-400">Last 5 login events</p>
                </div>
                <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                  <div className="grid grid-cols-4 bg-gray-50/70 p-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                    <span>Admin Name</span><span>IP Address</span><span>Location</span><span>Date & Time</span>
                  </div>
                  <div className="divide-y divide-gray-50 font-medium text-gray-600">
                    <ActivityRow name="Aaron Mensah" ip="102.89.23.45" loc="Lagos, Nigeria" time="Today, 09:21 AM" />
                    <ActivityRow name="Tokunbo Michael" ip="197.210.54.12" loc="Abuja, Nigeria" time="Yesterday, 03:45 PM" />
                  </div>
                </div>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl w-full text-xs font-bold h-11">Save Security Settings</Button>
            </div>
          )}

          {/* TAB 5: Comprehensive Sub-tab Management for User Roles */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Users & Roles</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Manage administrators and control access to the system.</p>
                </div>
                <Button onClick={() => setIsInviteOpen(true)} className="bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold rounded-xl h-10 px-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add admin
                </Button>
              </div>

              {/* Sub Navigation controls tabs header segments */}
              <div className="flex gap-6 border-b border-gray-100 text-sm font-medium">
                <button onClick={() => setAdminSubTab("list")} className={`pb-2.5 transition-all relative ${adminSubTab === "list" ? "text-gray-900 font-bold border-b-2 border-gray-900" : "text-gray-400"}`}>Users</button>
                <button onClick={() => setAdminSubTab("roles")} className={`pb-2.5 transition-all relative ${adminSubTab === "roles" ? "text-gray-900 font-bold border-b-2 border-gray-900" : "text-gray-400"}`}>Roles & Permissions</button>
              </div>

              {/* VIEW A: Standard Active Users Subview Table Data */}
              {adminSubTab === "list" && (
                <div className="border border-gray-100 rounded-xl overflow-x-auto text-xs font-medium">
                  <table className="w-full text-left min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-50/50 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                        <th className="p-3.5 pl-5">Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Updated</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700">
                      {MOCK_ADMINS.map((adm) => (
                        <tr key={adm.id} className="hover:bg-gray-50/30">
                          <td className="p-4 pl-5 font-bold text-gray-900">{adm.name}</td>
                          <td className="p-4 text-gray-400 font-mono">{adm.email}</td>
                          <td className="p-4 font-semibold text-gray-600">{adm.role}</td>
                          <td className="p-4">
                            <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 shadow-none px-2 rounded-md font-bold text-[10px]">
                              {adm.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-400">{adm.lastUpdated}</td>
                          <td className="p-4">
                            <button onClick={() => setEditingAdmin(adm)} className="text-gray-400 hover:text-gray-700 p-1 rounded-lg">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* VIEW B: Permissions Checkbox Matrix associated with Selected Roles */}
              {adminSubTab === "roles" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Profile Selector Switchboard list items */}
                  <div className="md:col-span-4 space-y-2.5">
                    {["Super Admin", "Admin", "Content Editor", "Finance Manager"].map((roleOption) => (
                      <div 
                        key={roleOption}
                        onClick={() => setSelectedRole(roleOption)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col justify-between relative group ${
                          selectedRole === roleOption 
                            ? "border-blue-500 bg-blue-50/5 text-blue-600 shadow-sm" 
                            : "border-gray-100 bg-white text-gray-700 hover:bg-gray-50/50"
                        }`}
                      >
                        <span className="text-sm font-bold tracking-tight">{roleOption}</span>
                        <span className="text-[11px] text-gray-400 mt-1 font-medium">
                          {roleOption === "Super Admin" ? "Full system access with all permissions" : "Assigned custom administrative controls"}
                        </span>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed border-2 border-gray-200 rounded-xl text-xs font-bold text-blue-600 h-11 hover:bg-blue-50/20">
                      <Plus className="w-4 h-4 mr-1.5" /> Create Role
                    </Button>
                  </div>

                  {/* Right Column: Checkbox Matrix Structure Layout Canvas element */}
                  <div className="md:col-span-8 border border-gray-100 rounded-xl overflow-hidden text-xs">
                    <div className="grid grid-cols-5 bg-gray-50/60 p-3 font-bold text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-100">
                      <span>Module</span><span className="text-center">View</span><span className="text-center">Create</span><span className="text-center">Edit</span><span className="text-center">Delete</span>
                    </div>
                    <div className="divide-y divide-gray-50 font-medium text-gray-700">
                      {permissions.map((p, mIdx) => (
                        <div key={p.module} className="grid grid-cols-5 p-3 items-center hover:bg-gray-50/40 transition-colors">
                          <span className="font-semibold text-gray-900">{p.module}</span>
                          
                          {/* Standard check assignment elements row */}
                          <div className="flex justify-center">
                            <Checkbox checked={p.view} onCheckedChange={(val) => handlePermissionChange(mIdx, "view", !!val)} className="rounded border-gray-300 data-[state=checked]:bg-blue-500" />
                          </div>
                          
                          <div className="flex justify-center">
                            {p.viewOnlyText ? <span className="w-4 h-4 rounded bg-gray-100/60" /> : (
                              <Checkbox checked={p.create} onCheckedChange={(val) => handlePermissionChange(mIdx, "create", !!val)} className="rounded border-gray-300 data-[state=checked]:bg-blue-500" />
                            )}
                          </div>

                          <div className="flex justify-center">
                            {p.viewOnlyText ? <span className="w-4 h-4 rounded bg-gray-100/60" /> : (
                              <Checkbox checked={p.edit} onCheckedChange={(val) => handlePermissionChange(mIdx, "edit", !!val)} className="rounded border-gray-300 data-[state=checked]:bg-blue-500" />
                            )}
                          </div>

                          <div className="flex justify-center">
                            {p.viewOnlyText ? <span className="w-4 h-4 rounded bg-gray-100/60" /> : (
                              <Checkbox checked={p.delete} onCheckedChange={(val) => handlePermissionChange(mIdx, "delete", !!val)} className="rounded border-gray-300 data-[state=checked]:bg-blue-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* --- OVERLAY 1: Slide-out Right Sheet Drawer (Invite Admin) --- */}
      <Sheet open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <SheetHeader>
          <SheetTitle>

          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SheetContent side="right" className="w-full max-w-md p-6 bg-white border-l border-gray-100 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Invite New Admin</h2>
              <p className="text-xs text-gray-400 mt-1">Login instructions will be sent to this email.</p>
            </div>
            <div className="space-y-4">
              <FormInput label="Full Name" placeholder="Aaron Mensah" />
              <FormInput label="Email Address" placeholder="aaron@seesupport.org" />
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">Role</label>
                <Select defaultValue="admin">
                  <SelectTrigger className="h-11 rounded-xl border-gray-200 text-xs font-medium"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Content Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setIsInviteOpen(false)} className="rounded-xl border-gray-200 text-xs font-bold h-11">Cancel</Button>
            <Button className="bg-[#3B82F6] hover:bg-blue-600 rounded-xl text-xs font-bold h-11">Invite Admin</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- OVERLAY 2: Centered Dialog Window Modal (Edit Admin Context) --- */}
      <Dialog open={editingAdmin !== null} onOpenChange={(open) => !open && setEditingAdmin(null)}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="max-w-md p-6 bg-white border-none rounded-2xl shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Admin</h2>
            <p className="text-xs text-gray-400 mt-0.5">Update admin details.</p>
          </div>
          <div className="space-y-4">
            <FormInput label="Full Name" defaultValue={editingAdmin?.name} />
            <FormInput label="Email Address" defaultValue={editingAdmin?.email} />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 block">Role</label>
              <Select defaultValue={editingAdmin?.role === "Super Admin" ? "super" : "admin"}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200 text-xs font-medium"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="super">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 block">Status</label>
              <Select defaultValue="active">
                <SelectTrigger className="h-11 rounded-xl border-gray-200 text-xs font-medium"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl"><SelectItem value="active">Active</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setEditingAdmin(null)} className="rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-bold h-10 px-5">Cancel</Button>
            <Button className="bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded-xl text-xs font-bold h-10 px-6 transition-all">Invite Admin</Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

// --- SUB-COMPONENT ATOM PRIMITIVES ---
function SidebarBtn({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap lg:whitespace-normal ${
        active ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      {icon} <span>{label}</span>
    </button>
  );
}

function FormInput({ label, ...props }: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-bold text-gray-500 block">{label}</label>
      <Input className="rounded-xl border-gray-200 h-11 text-xs font-medium focus-visible:ring-blue-500 bg-white" {...props} />
    </div>
  );
}

function ToggleItem({ title }: { title: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="space-y-0.5">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email notification</p>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
      </div>
      <Switch defaultChecked />
    </div>
  );
}

function ActivityRow({ name, ip, loc, time }: { name: string; ip: string; loc: string; time: string }) {
  return (
    <div className="grid grid-cols-4 p-3 hover:bg-gray-50/40 items-center">
      <span className="font-bold text-gray-900">{name}</span>
      <span className="font-mono text-gray-400 tracking-tight">{ip}</span>
      <span className="text-gray-500 font-semibold">{loc}</span>
      <span className="text-gray-400 font-normal">{time}</span>
    </div>
  );
}