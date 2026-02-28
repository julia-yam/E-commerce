export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '/' },
  { label: 'Categories', href: '/product-page' },
  { label: 'About us', href: '/product-page' },
];

export const ACTION_ICONS_CONFIG = {
  width: 30,
  height: 30,
  color: 'primary' as const,
  href: '/product-page',
};
