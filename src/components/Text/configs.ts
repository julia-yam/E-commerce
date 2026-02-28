import * as React from 'react';

export type TextView = 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
export type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
export type TextWeight = 'normal' | 'medium' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'accent';

export type TextProps = {
  className?: string;
  view?: TextView;
  tag?: TextTag;
  weight?: TextWeight;
  children: React.ReactNode;
  color?: TextColor;
  maxLines?: number;
};

export const getMaxLinesStyle = (maxLines?: number): React.CSSProperties | undefined => {
  if (!maxLines) return undefined;

  return {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
};
