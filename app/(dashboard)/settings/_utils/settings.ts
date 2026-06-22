export type SettingsTab = "general" | "payment" | "notification" | "security" | "users";
export type AdminSubTab = "list" | "roles";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastUpdated: string;
}

export interface PermissionMatrix {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  viewOnlyText?: boolean;
}