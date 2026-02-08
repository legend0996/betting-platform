export const ADMIN_PERMISSIONS = {
  CREATE_ADMIN: "create_admin",
  MANAGE_USERS: "manage_users",
  MANAGE_MATCHES: "manage_matches",
  SET_MATCH_RESULTS: "set_match_results",
  MANAGE_WALLETS: "manage_wallets",
  VIEW_REPORTS: "view_reports",
} as const;

export type AdminPermission =
  (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS];
