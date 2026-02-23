import * as React from 'react';
import cn from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  maxLines,
  children,
  view,
  tag = 'p',
  weight,
  color,
}) => {
  const Component = tag;

  const classes = cn(
    styles.text,
    view && styles[`view_${view}`],
    weight && styles[`weight_${weight}`],
    color && styles[`color_${color}`],
    className
  );

  const style: React.CSSProperties | undefined = maxLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : undefined;

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

export default Text;
