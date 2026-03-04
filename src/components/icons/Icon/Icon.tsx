import * as React from 'react';
import cn from 'classnames';

import { type IconProps, ICON_DEFAULTS } from './configs';

import styles from './Icon.module.scss';

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  color = ICON_DEFAULTS.COLOR,
  width = ICON_DEFAULTS.SIZE,
  height = ICON_DEFAULTS.SIZE,
  className,
  ...props
}) => {
  const classes = cn(styles.icon, color && styles[color], className);

  return (
    <svg
      width={width}
      height={height}
      className={classes}
      viewBox={ICON_DEFAULTS.VIEW_BOX}
      fill="currentColor"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
