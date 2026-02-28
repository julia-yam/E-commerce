import * as React from 'react';

export type IconColor = 'primary' | 'secondary' | 'accent';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
  width?: number;
  height?: number;
};

export const ICON_DEFAULTS = {
  SIZE: 24,
  COLOR: 'primary' as IconColor,
  VIEW_BOX: '0 0 24 24',
};
