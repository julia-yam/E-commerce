import React from 'react';
import cn from 'classnames';

import { type LogoProps, LogoSvg } from './configs';

import styles from './Logo.module.scss';

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(styles.logo, className)} data-testid="logo">
      <LogoSvg />
    </div>
  );
};

export default Logo;
