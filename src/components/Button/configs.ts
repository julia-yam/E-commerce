import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

export const BUTTON_TEXT_CONFIG = {
  view: 'button' as const,
  weight: 'normal' as const,
  tag: 'span' as const,
};

export const BUTTON_LOADER_SIZE = 's';
