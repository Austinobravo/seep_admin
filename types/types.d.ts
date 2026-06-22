type BASEENTITY = {
    id: string
    createdAt?: string
    updatedAt?: string
}

type AuditLogItemType = BASEENTITY & {
  user: {
    name: string;
    initials: string;
    avatarColor: string; 
  };
  action: string;
  actionColor: string; 
  module: "Programs" | "Content Management" | "Blog" | "Donations" | "Users & Roles" | "Security";
  details: string;
  dateTime: string;
  ipAddress: string;
  browser: string;
}