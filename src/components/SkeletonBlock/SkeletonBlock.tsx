import React from 'react';
import cn from 'classnames';

import styles from './SkeletonBlock.module.scss';

interface SkeletonBlockProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ width, height, className }) => {
  const formatValue = (val?: string | number) => {
    if (typeof val === 'number') return `${val / 16}rem`;
    return val;
  };

  const inlineStyles = {
    '--width-value': formatValue(width),
    '--height-value': formatValue(height),
  } as React.CSSProperties;

  return (
    <div className={cn(styles.skeletonBlock, className)} style={inlineStyles} aria-hidden="true" />
  );
};

export default SkeletonBlock;
