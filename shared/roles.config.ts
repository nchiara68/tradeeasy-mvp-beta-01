// shared/roles.config.ts
export const ROLES = ['Seller', 'Debtor', 'Funder', 'Admin'] as const;
export type Role = typeof ROLES[number];
