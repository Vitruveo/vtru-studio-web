export interface RoleType {
  id: string | number;
  name: string;
  description: string;
  permissions: string[];
  starred: boolean;
  deleted: boolean;
}

export const roleList: RoleType[] = [
  {
    id: 1,
    name: "Create assets",
    description: "Admin permissions",
    permissions: ["all"],
    starred: true,
    deleted: false,
  },
  {
    id: 2,
    name: "Guest",
    description: "guest permissions",
    permissions: ["all"],
    starred: true,
    deleted: false,
  },
  {
    id: 3,
    name: "Regular User",
    description: "Regular user permissions",
    permissions: ["all"],
    starred: true,
    deleted: false,
  },
];
