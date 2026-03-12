import React from 'react';

export type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

export const BACK_BUTTON_TEXT_CONFIG = {
  view: 'p-20' as const,
  weight: 'normal' as const,
  tag: 'span' as const,
};

export const BACK_ICON_CONFIG = {
  width: 32,
  height: 32,
};
