export interface PermissionType {
  id: string | number;
  category: string;
  permission: string;
  starred: boolean;
  deleted: boolean;
}

export const permissionsList: PermissionType[] = [
  {
    id: 1,
    category: "User",
    permission: "editor",
    starred: true,
    deleted: false,
  },
  {
    id: 2,
    category: "User",
    permission: "reader",
    starred: true,
    deleted: false,
  },
  {
    id: 3,
    category: "Assets",
    permission: "reader",
    starred: true,
    deleted: false,
  },
];
