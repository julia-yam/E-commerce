import React from 'react';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { type LogoProps, LogoSvg } from './configs';

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(styles.logo, className)} data-testid="logo">
      <LogoSvg />
    </div>
  );
};

export default Logo;
