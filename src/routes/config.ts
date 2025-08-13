// src/routes/config.ts
import React from 'react';
import { ROLES, type Role } from '../../shared/roles.config';

/**
 * We auto-discover *page entry* files that are exactly one level
 * under ../pages/<role>/, i.e. '../pages/*//*.tsx'. Subfolders like
 * '../pages/seller/components/*.tsx' are ignored by design.
 */
const modules = import.meta.glob('../pages/*/*.tsx');

// Map of componentKey -> Lazy component *type* (not JSX element).
// We'll create JSX elements later in main.tsx via React.createElement.
export const lazyPages: Record<string, React.LazyExoticComponent<React.ComponentType<React.ComponentPropsWithoutRef<'div'>>>> = {};

type ParsedPage = {
  roleDir: string;      // 'seller' | 'debtor' | 'funder' | 'admin'
  componentKey: string; // file base name, e.g. 'SellerPage1'
  label: string;        // nav label, e.g. 'Seller Page 1'
  path: string;         // route subpath, e.g. 'page1' or 'seller-dashboard'
};

const parsed: ParsedPage[] = [];

// Helpers
const toKebab = (s: string) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();

function labelAndPathFromBaseName(baseName: string): { label: string; path: string } {
  // Insert spaces before capitals: 'SellerPage2' -> 'Seller Page 2'
  const label = baseName.replace(/([a-z])([A-Z])/g, '$1 $2');

  // If ends with "Page<digits>", prefer "page<digits>" as the path
  const m = baseName.match(/Page(\d+)$/);
  if (m) return { label, path: `page${m[1]}` };

  // Otherwise kebab-case the whole name
  return { label, path: toKebab(baseName) };
}

// Build lazyPages (component constructors) and parsed metadata
for (const fullPath in modules) {
  // Example: '../pages/seller/SellerPage1.tsx'
  const parts = fullPath.split('/');      // ['..','pages','seller','SellerPage1.tsx']
  const roleDir = parts[2];               // 'seller'
  const fileName = parts[3];              // 'SellerPage1.tsx'
  const baseName = fileName.replace(/\.tsx$/, ''); // 'SellerPage1'

  if (!['seller', 'debtor', 'funder', 'admin'].includes(roleDir)) continue;

  // Lazy component type (no JSX here)
  const loader = modules[fullPath] as () => Promise<{ default: React.ComponentType<React.ComponentPropsWithoutRef<'div'>> }>;
  const LazyComp = React.lazy(loader);
  lazyPages[baseName] = LazyComp;

  const { label, path } = labelAndPathFromBaseName(baseName);
  parsed.push({ roleDir, componentKey: baseName, label, path });
}

// RoleSection type used by router + sidebar
export type RoleSection = {
  label: Role;
  basePath: string;
  allowedGroups: Role[]; // e.g. ['Seller','Admin'] or ['Admin'] for Admin
  pages: { path: string; label: string; componentKey: string }[];
};

// Build roleSections strictly from ROLES (frontend+backend single source of truth)
export const roleSections: RoleSection[] = ROLES.map((role) => {
  const dir = role.toLowerCase();
  const pagesForRole = parsed
    .filter(p => p.roleDir === dir)
    .map(p => ({ path: p.path, label: p.label, componentKey: p.componentKey }))
    .sort((a, b) => a.path.localeCompare(b.path));

  return {
    label: role,
    basePath: dir,
    allowedGroups: role === 'Admin' ? ['Admin'] : [role, 'Admin'],
    pages: pagesForRole,
  };
});
