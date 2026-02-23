import * as React from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  color = 'primary',
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  const classes = cn(styles.icon, color && styles[color], className);

  return (
    <svg
      width={width}
      height={height}
      className={classes}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
