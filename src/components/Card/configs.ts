import React from 'react';

export type CardProps = {
  className?: string;
  image?: string;
  captionSlot?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  isLoading?: boolean;
  onImageLoad?: () => void;
};

export const CARD_TEXT_CONFIG = {
  caption: {
    view: 'p-14' as const,
    weight: 'normal' as const,
    tag: 'p' as const,
    color: 'secondary' as const,
  },
  title: {
    view: 'p-20' as const,
    weight: 'medium' as const,
    tag: 'h3' as const,
    maxLines: 2,
  },
  subtitle: {
    view: 'p-16' as const,
    weight: 'normal' as const,
    tag: 'p' as const,
    color: 'secondary' as const,
    maxLines: 3,
  },
  content: {
    view: 'p-18' as const,
    weight: 'bold' as const,
  },
};
